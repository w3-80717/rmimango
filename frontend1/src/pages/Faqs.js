import React from "react";
import './Faqs.css'

function Faqs() {
    return (
        <div className="fpa">
            <h1 className="faqs">FAQs</h1>

            <p className="fpara">
                <strong>Q. How to order?</strong>
                You can place your order through our website. Head to the link to select the products <a href="https://myalphonso.com/collections/all" target="_blank" rel="noopener noreferrer">here</a> and place your order.
            </p>

            <p className="fpara">
                <strong>Q. What are the accepted payment methods?</strong>
                We accept Visa, MasterCard, American Express, Netbanking, wallets, and UPI via Razorpay. Cash on Delivery is also available.
            </p>

            <p className="fpara">
                <strong>Q. What if I receive a damaged shipment?</strong>
                Don't worry! Email us photos of the damaged Mangoes at support@blobcity.com within 24 hours. We will promptly issue a refund for the damaged Mangoes.
            </p>

            <p className="fpara">
                <strong>Q. When can I expect to receive my delivery after placing an order?</strong>
                The estimated delivery date is shown at checkout. Since Mangoes are freshly plucked, expect up to +/- 7 days on your delivery date.
            </p>

            <p className="fpara">
                <strong>Q. Is there a way to reach out to you for product enquiry or any other issues?</strong>
                You can write to us at support@blobcity.com or send us a WhatsApp message at 9082249404.
            </p>

            <p className="fpara">
                <strong>Q. When can I expect to receive my refund?</strong>
                Refunds are processed within 5-7 working days after being initiated. You'll receive a notification once it has been processed.
            </p>
        </div>
    );
}

export default Faqs;
