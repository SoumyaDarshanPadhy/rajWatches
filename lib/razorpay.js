import Razorpay from 'razorpay';

console.log("Loading Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? 'LOADED' : 'MISSING');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;