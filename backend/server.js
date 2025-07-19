// server.js

import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Get keys correctly from process.env
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpaySecretKey = process.env.RAZORPAY_SECRET_KEY;

// Check if keys are loaded
if (!razorpayKeyId || !razorpaySecretKey) {
    console.error("Error: Razorpay API keys are not defined in the .env file.");
    process.exit(1);
}

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpaySecretKey
});

// Endpoint to create an order
app.post('/api/payment/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount,
        currency: currency,
        receipt: `receipt_order_${new Date().getTime()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ order });
    } catch (error) {
        console.error("Razorpay order creation failed:", error);
        res.status(500).send({ error: "Failed to create order", details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running securely on http://localhost:${PORT}`));