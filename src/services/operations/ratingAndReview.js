import { ratingsEndpoints, courseEndpoints } from "../apis";
import { toast } from "react-toastify"; // Assuming you're using toast for error handling
import { apiConnector } from "../apiConnector";

const { REVIEWS_DETAILS_API, GET_AVERAGE_RATING_API } = ratingsEndpoints;

const { CREATE_RATING_API } = courseEndpoints;

export function fetchAllRatingsAndReviews() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", REVIEWS_DETAILS_API);

      if (!response?.data?.success) {
        throw new Error("Could not fetch ratings and reviews.");
      }

      //(response)
      // Assuming you're using redux, dispatch the data to your redux store
      // dispatch({
      //   type: 'FETCH_REVIEWS_SUCCESS',
      //   payload: response.data.data,
      // });

      return response.data.data; // You can return or handle this data as needed
    } catch (error) {
      //("FETCH REVIEWS API ERROR............", error);
      toast.error("Something went wrong while fetching reviews");
    }
  };
}

export function fetchAverageRating(courseId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_AVERAGE_RATING_API, {
        courseId,
      });

      //(response)

      if (!response?.data?.success) {
        throw new Error("Could not fetch average rating.");
      }

      // Assuming you're using redux, dispatch the data to your redux store
      // dispatch({
      //   type: 'FETCH_AVERAGE_RATING_SUCCESS',
      //   payload: response.data.averageRating,
      // });

      return response.data.averageRating; // Return the average rating value
    } catch (error) {
      //("FETCH AVERAGE RATING API ERROR............", error);
      toast.error("Something went wrong while fetching the average rating");
    }
  };
}

export function sendFeedBack({ rating, review, courseId }, token) {
  return async (dispatch) => {
    try {
      //({rating , review , courseId} , token)
      const response = await apiConnector(
        "POST",
        CREATE_RATING_API,
        {
          rating,
          review,
          courseId,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.data?.success) {
        throw new Error("Could not fetch average rating.");
      } else {
        toast.success("Review Sent");
      }

      // Assuming you're using redux, dispatch the data to your redux store
      // dispatch({
      //   type: 'FETCH_AVERAGE_RATING_SUCCESS',
      //   payload: response.data.averageRating,
      // });

      return response; // Return the average rating value
    } catch (error) {
      //("SEND RATING API ERROR............", error);
      toast.error("Something went wrong while sending the  rating");
    }
  };
}
