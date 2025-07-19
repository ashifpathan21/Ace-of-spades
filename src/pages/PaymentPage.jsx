import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutButton from "../components/CheckoutButton";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { courses } = useSelector((state) => state.courses);
  const selectedCourse = courses?.find((course) => course._id === id);

  if (!selectedCourse) {
    toast.error("Course not found!");
    navigate("/courses");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Checkout - {selectedCourse.courseName}
        </h1>

        <div className="flex items-center gap-4">
          <img
            src={selectedCourse.thumbnail}
            alt={selectedCourse.courseName}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <p className="text-lg font-medium">{selectedCourse.courseName}</p>
            <p className="text-sm text-gray-500">
              Instructor: {selectedCourse.instructor.name}
            </p>
            <p className="text-md text-green-600 font-semibold">
              ₹ {selectedCourse.price}
            </p>
          </div>
        </div>

        <CheckoutButton />
      </div>
    </div>
  );
};

export default PaymentPage;
