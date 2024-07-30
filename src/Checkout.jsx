import axios from 'axios';
import React from 'react';

function Checkout() {
    const checkout = async (amount) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa3JhbUBrYW5kcmFkaWdpdGFsLmNvbSIsInN1YiI6IjY2ODdkOTk3YzExZjYzNzU5YTAwNDYzOCIsImlhdCI6MTcyMjM0MjgwNSwiZXhwIjoxNzIyMzUwMDA1fQ.LDZuUKStkgpCp2nRMj1tPM1HIkDDbOLG3gVTZ9YYbLk';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data: key } = await axios.get('http://localhost:8000/razorpay', config);

        const data = {
            amount: amount
        };

        const { data: order } = await axios.post(
            'http://localhost:8000/razorpay/checkout',
            data,
            config,
        );

        const callbackUrl = `http://localhost:8000/payment-verification`;

        var options = {
            "key": key,
            "amount": order.amount,
            "currency": "INR",
            "name": "Zenit Edu",
            "description": "Test Transaction",
            "image": "https://zenit.blr1.cdn.digitaloceanspaces.com/school_images/logo.png",
            "order_id": order.id,
            "callback_url": callbackUrl,
            "prefill": {
                "name": "Shuheb",
                "email": "shuheb@kandradigital.com",
                "contact": "7676657896"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    };

    return (
        <button onClick={() => checkout(5000)}>
            Checkout
        </button>
    );
}

export default Checkout;
