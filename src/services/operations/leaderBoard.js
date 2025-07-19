// services/operations/leaderboardApi.js

import { apiConnector } from "../apiConnector";
import { leaderboardEndpoints } from "../apis";
import toast from "react-hot-toast";
import {
  setGlobalLeaderboard,
  setCollegeLeaderboard,
} from "../../Slices/leaderboardSlice";

// Destructure the endpoint
const { GET_LEADERBOARD_API } = leaderboardEndpoints;

export const getLeaderboardData = (token) => async (dispatch) => {
  try {
    const response = await apiConnector("GET", GET_LEADERBOARD_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to fetch leaderboard");
    }

    // Optionally dispatch to leaderboardSlice
    if (response?.data?.success) {
      dispatch(setGlobalLeaderboard(response.data.globalLeaderboard));
      dispatch(setCollegeLeaderboard(response.data.collegeLeaderboard));
    }

    return response.data;
  } catch (error) {
    // console.log("GET_LEADERBOARD_API ERROR:", error);
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong while fetching leaderboard"
    );
    return null;
  }
};
