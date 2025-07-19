// /pages/CheckoutPage.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Your public Key ID from Razorpay
  const razorpayKeyId = 'rzp_test_xl0MF0xAdKK3J2';

  const handlePayment = async () => {
    try {
      // 1. Call your backend to create the order
      const { data: { order } } = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: Math.round(cartTotal * 100), // Amount in paise
        currency: 'INR',
      });

      // 2. Configure Razorpay options
      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "QuickKart",
        description: "Secure Online Payment",
        image: "/logo.png", // Your website logo
        order_id: order.id,
        // This handler function gets called after a successful payment
        handler: function (response) {
          toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // In a real app, you would send this response to your server to verify the payment signature
          dispatch(clearCart());
          navigate('/payment-success'); // Redirect to a success page
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "QuickKart Corporate Office, Jaipur",
        },
        theme: {
          color: "#007BFF", // A professional blue color
        },
        // This configuration ensures all payment methods are visible
        config: {
          display: {
            blocks: {
              banks: {
                name: 'Pay with any method',
                instruments: [
                  { method: 'upi', flows: ['collect', 'intent'] },
                  { method: 'card' },
                  { method: 'wallet', providers: ['paytm', 'phonepe'] },
                  { method: 'netbanking' }
                ],
              },
            },
            sequence: ['block.banks'],
            preferences: { show_default_blocks: true },
          },
        },
      };

      // 3. Open the Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });

    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment initiation error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Final Checkout</h1>
        <div className="border-t border-b py-4 my-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <p className="text-3xl font-bold my-4 text-blue-600">${cartTotal.toFixed(2)}</p>
        </div>
        <button
          onClick={handlePayment}
          disabled={cartItems.length === 0}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
        >
          Pay Securely Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;