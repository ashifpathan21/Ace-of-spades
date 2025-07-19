import React from "react";
import { useSelector } from "react-redux";
import { useParams , useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} from "../services/operations/paymentApi";

const CheckoutButton = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.user);
  const { id } = useParams();

  const selectedCourses = [id]; // array of courseId to send to backend

  const handlePayment = async () => {
    try {
      // Step 1: Create Order via Razorpay
      const orderData = await capturePayment(selectedCourses, token);

      if (!orderData) return;

      const { id: order_id, amount, currency } = orderData;

      // Step 2: Launch Razorpay Checkout
      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY,
        amount,
        currency,
        name: "AOS-Shiksha",
        description: "Course Purchase",
        image: "/logo.png",
        order_id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // Step 3: Verify payment on backend
          const verified = await verifyPayment(
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            selectedCourses , token
          );

          if (!verified) return;

          // Step 4: Send confirmation email
          await sendPaymentSuccessEmail(
            {
              orderId: razorpay_order_id,
              paymentId: razorpay_payment_id,
              amount,
            },
            token , navigate
          );
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: user?.additionalDetails?.contactNumber, // update if contact exists
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong during payment.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 px-4 rounded-lg"
    >
      Pay Now
    </button>
  );
};

export default CheckoutButton;
