import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import StarDisplay from "../components/StarDisplay.jsx";

const RatingAndReviews = ({ reviews }) => {
  const reviewsContainerRef = useRef(null);

  //(reviews)
  useEffect(() => {
    const container = reviewsContainerRef.current;

    const totalWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;

    const animation = gsap.to(container, {
      x: `-${totalWidth - visibleWidth}px`,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={reviewsContainerRef}
        className="flex gap-5 p-4 whitespace-nowrap"
        style={{ minWidth: "100%" }}
      >
        {reviews.map((review , index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[300px] h-auto p-4 backdrop-blur-3xl shadow shadow-cyan-400 hover:shadow-md transition-all duration-200 rounded-xl"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={review?.user?.image}
                className="w-16 h-16 object-cover rounded-full"
              />
              <h3 className="font-semibold text-md">
                {review?.user?.firstName + " " + review?.user?.lastName}
              </h3>
            </div>
            <p className="text-sm break-words whitespace-pre-wrap">
              {review?.review?.split(" ").slice(0, 20).join(" ")}...
            </p>
            <div className="mt-3">
              <StarDisplay rating={review?.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingAndReviews;
