import { ratingsEndpoints , courseEndpoints} from "../apis"
import { toast } from 'react-toastify'; // Assuming you're using toast for error handling
import apiConnector from '../apiConnector'; // Adjust the import based on your actual file structure


const {REVIEWS_DETAILS_API } = ratingsEndpoints
  

export function fetchAllRatingsAndReviews() {
    return async (dispatch) => {
      try {
        const response = await apiConnector("GET", REVIEWS_DETAILS_API);
  
        if (!response?.data?.success) {
          throw new Error("Could not fetch ratings and reviews.");
        }
  
        // Assuming you're using redux, dispatch the data to your redux store
        // dispatch({
        //   type: 'FETCH_REVIEWS_SUCCESS',
        //   payload: response.data.data,
        // });
  
        return response.data.data; // You can return or handle this data as needed
  
      } catch (error) {
        console.log("FETCH REVIEWS API ERROR............", error);
        toast.error('Something went wrong while fetching reviews');
      }
    };
  }



  export function fetchAverageRating(courseId, token) {
    return async (dispatch) => {
      try {
        const response = await apiConnector("GET", GET_AVERAGE_RATING_API, {
          courseId
        });
  
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
        console.log("FETCH AVERAGE RATING API ERROR............", error);
        toast.error('Something went wrong while fetching the average rating');
      }
    };
  }



