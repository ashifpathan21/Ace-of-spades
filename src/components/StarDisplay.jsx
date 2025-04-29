import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarDisplay = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" size={24} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" size={24} />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" size={24} />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarDisplay;
