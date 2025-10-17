import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req) {
  try {
    if (!RAZORPAY_SECRET) {
      console.error('RAZORPAY_KEY_SECRET is not set in environment variables.');
      return NextResponse.json(
        { message: 'Server configuration error: Missing Secret Key.' },
        { status: 500 }
      );
    }

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId, // Local order ID
    } = await req.json();

    // Validate input
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderId) {
      return NextResponse.json(
        { message: 'Missing required payment details or order ID.' },
        { status: 400 }
      );
    }

    // Fetch local order
    const localOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!localOrder || localOrder.status !== 'PENDING') {
      return NextResponse.json(
        { message: 'Order not found or already processed.' },
        { status: 404 }
      );
    }

    if (localOrder.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json(
        { message: 'Razorpay Order ID mismatch.' },
        { status: 400 }
      );
    }

    // Verify signature
    const shasum = crypto.createHmac('sha256', RAZORPAY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = shasum.digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('Signature verification failed.');
      return NextResponse.json(
        { message: 'Payment verification failed: Invalid signature.', verified: false },
        { status: 400 }
      );
    }

    // ✅ Update Order to PAID
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    // ✅ Update stock for all items atomically
    const updateStockPromises = localOrder.orderItems.map((item) =>
      prisma.watch.update({
        where: { id: item.watchId },
        data: { inStock: { decrement: item.quantity } },
      })
    );
    await prisma.$transaction(updateStockPromises);

    // ✅ Success response
    return NextResponse.json({
      message: 'Payment successful and order confirmed!',
      orderId: updatedOrder.id,
      status: updatedOrder.status,
      verified: true,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { message: 'Payment verification failed due to an internal server error.' },
      { status: 500 }
    );
  }
}