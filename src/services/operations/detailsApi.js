import axios from "axios";
import { apiConnector } from "../apiConnector.js";
import { endpoints } from "../apis.js";
import toast from "react-hot-toast";
import { setColleges, setSuggestions } from "../../Slices/detailsSlice";

export function fetchColleges(stateId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        `${endpoints.GET_COLLEGE}${stateId}`
      );

      dispatch(setColleges(response.data.data));
    } catch (error) {
      // console.log(error);
      toast.error("Failed to load colleges");
    }
  };
}

export function getSuggestions(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "GET",
        endpoints.GET_SUGGESTIONS,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      dispatch(setColleges(response.data));
      return response.data;
    } catch (error) {
      toast.error("Failed to load suggestions");
    }
  };
}
