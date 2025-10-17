import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import razorpay from '@/lib/razorpay'; 
import { v4 as uuidv4 } from 'uuid'; 

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { customerName, customerEmail, shippingAddress, items } = await req.json();

        if (!customerEmail || !items || items.length === 0) {
            return NextResponse.json({ message: 'Missing required order details (email or items).' }, { status: 400 });
        }
        
        if (!customerName || !shippingAddress) {
             return NextResponse.json({ message: 'Missing required customer details (name or address).' }, { status: 400 });
        }

        let totalAmount = 0; 
        const itemDetails = [];
        const watchIds = items.map(item => item.watchId);

        const watches = await prisma.watch.findMany({
            where: { id: { in: watchIds } }
        });

        const watchMap = new Map(watches.map(w => [w.id, w]));

        for (const item of items) {
            const watch = watchMap.get(item.watchId);
            
            if (!watch) {
                return NextResponse.json({ message: `Watch ID ${item.watchId} not found.` }, { status: 404 });
            }
            if (watch.inStock < item.quantity) {
                return NextResponse.json({ message: `Insufficient stock for ${watch.name}. Requested: ${item.quantity}, Available: ${watch.inStock}.` }, { status: 400 });
            }
            
            const itemPrice = watch.price; 
            
            if (isNaN(itemPrice) || itemPrice <= 0) {
                 return NextResponse.json({ message: `Invalid price data for ${watch.name}` }, { status: 400 });
            }

            totalAmount += itemPrice * item.quantity;

            itemDetails.push({
                watchId: item.watchId,
                quantity: item.quantity,
                price: itemPrice,
            });
        }
        
        const newOrder = await prisma.order.create({
            data: {
                shippingAddress,
                customerName,
                customerEmail,
                totalAmount: totalAmount, 

                status: 'PENDING',
                razorpayOrderId: null, 

                orderItems: {
                    createMany: {
                        data: itemDetails,
                    },
                },
            },
            select: {
                id: true, 
                customerEmail: true, 
                totalAmount: true,
            }
        });

        const razorpayOptions = {
            amount: Math.round(newOrder.totalAmount * 100), 
            currency: 'INR', 
            
            receipt: `rcpt_${uuidv4().replace(/-/g, '')}`, 
            
            notes: {
                internalOrderId: newOrder.id, 
                customerEmail: newOrder.customerEmail,
            },
        };

        const razorpayOrder = await razorpay.orders.create(razorpayOptions);

        const updatedOrder = await prisma.order.update({
            where: { id: newOrder.id },
            data: {
                razorpayOrderId: razorpayOrder.id,
            },
        });

        return NextResponse.json({
            orderId: updatedOrder.id,           
            razorpayOrderId: razorpayOrder.id,  
            amount: razorpayOrder.amount,       // In paise
            currency: razorpayOrder.currency,
        }, { status: 200 });

    } catch (error) {
        console.error('Error creating order:', error);
        
        if (error.message.includes('Insufficient stock') || error.message.includes('not found')) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
        
        // Important: Include the full error message for debugging if it fails
        return NextResponse.json({ message: 'Order creation failed due to a server error.', error: error.message }, { status: 500 });
    }
}