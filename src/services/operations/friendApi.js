import axios from "axios";
import { apiConnector } from "../apiConnector.js";
import { endpoints, profileEndpoints } from "../apis.js";
import { toast } from "react-hot-toast";
const { FIND_FRIEND, SEND_REQUEST, ACCEPT_REQUEST, REJECT_REQUEST } = endpoints;

export function findFriend({ userName }, token) {
  // //(token)
  return async (dispatch) => {
    // //('searching ')

    try {
      const responce = await apiConnector(
        "POST",
        FIND_FRIEND,
        { userName },
        { Authorization: `Bearer ${token}` }
      );

      if (!responce.data.success) {
        toast.error("Something went wrong , Please try again");

        return; // //(responce.data.message)
      }

      return responce.data.data;
    } catch (error) {
      // //("FINDING FRIEND API ERROR............", error)
    }
  };
}

export function sendRequest({ friendId }, token) {
  return async (dispatch) => {
    try {
      const responce = await apiConnector(
        "POST",
        SEND_REQUEST,
        { friendId },
        { Authorization: `Bearer ${token}` }
      );

      if (!responce.data.success) {
        toast.error("Something went wrong , Please try again");

        return; // //(responce.data.message)
      }

      return responce;
    } catch (error) {
      // //("Sending FRIEND Request  API ERROR............", error)
    }
  };
}

export function acceptRequest({ requesterId }, token) {
  return async (dispatch) => {
    try {
      const responce = await apiConnector(
        "POST",
        ACCEPT_REQUEST,
        { requesterId },
        { Authorization: `Bearer ${token}` }
      );

      if (!responce.data.success) {
        toast.error("Something went wrong , Please try again");

        return; // //(responce.data.message)
      }

      return responce;
    } catch (error) {
      //("accept FRIEND Request  API ERROR............", error)
    }
  };
}

export function rejectRequest({ requesterId }, token) {
  return async (dispatch) => {
    try {
      const responce = await apiConnector(
        "POST",
        REJECT_REQUEST,
        { requesterId },
        { Authorization: `Bearer ${token}` }
      );

      if (!responce.data.success) {
        toast.error("Something went wrong , Please try again");

        return; // //(responce.data.message)
      }

      return responce;
    } catch (error) {
      // //("Sending FRIEND Request  API ERROR............", error)
    }
  };
}
