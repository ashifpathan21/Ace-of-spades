import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";

// Destructure endpoints
const { CAPTURE_PAYMENT, VERIFY_SIGNATURE, SEND_PAYMENT_SUCCESS_EMAIL } =
  paymentEndpoints;

// Capture Razorpay Order (Step 1)
export const capturePayment = async (courses, token) => {
  let result = null;
  const toastId = toast.loading("Initializing payment...");
  try {
    const response = await apiConnector(
      "POST",
      CAPTURE_PAYMENT,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not create payment.");
    }

    result = response.data.data; // Razorpay order object
    toast.success("Payment initialized.");
  } catch (error) {
    console.error("Capture Payment Error:", error);
    toast.error("Failed to initiate payment.");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// Verify Razorpay Signature (Step 2)
export const verifyPayment = async (
  { razorpay_order_id, razorpay_payment_id, razorpay_signature },
  courses , token
) => {
  let success = false;
  const toastId = toast.loading("Verifying payment...");
  try {
    const response = await apiConnector(
      "POST",
      VERIFY_SIGNATURE,
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courses,
      },
      { Authorization: `Bearer ${token}` }
    );
  
    if (!response?.data?.success) {
      throw new Error("Payment verification failed");
    }

    toast.success("Payment verified.");
    success = true;
  } catch (error) {
    console.error("Verify Payment Error:", error);
    toast.error("Verification failed.");
  } finally {
    toast.dismiss(toastId);
  }

  return success;
};

// Send Payment Confirmation Email (Step 3)
export const sendPaymentSuccessEmail = async (
  { orderId, paymentId, amount  },
  token , navigate 
) => {
  const toastId = toast.loading("Sending payment confirmation email...");
  try {
    const response = await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL,
      { orderId, paymentId, amount },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Email could not be sent.");
    }

    toast.success("Email sent successfully.");
    navigate('/courses')
  } catch (error) {
    console.error("Email Error:", error);
    toast.error("Failed to send email.");
  } finally {
    toast.dismiss(toastId);
  }
};
