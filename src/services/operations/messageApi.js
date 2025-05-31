import axios from 'axios' 
import {apiConnector} from '../apiConnector.js'
import {endpoints  } from '../apis.js'
import toast from 'react-hot-toast'


 const {
    SEND_MESSAGE ,
    GET_MESSAGES
  } = endpoints ;

export function sendMessage(senderId, receiverId, content, setLoading, clearInput) {
    return async (dispatch) => {
      setLoading(true);
  
      try {
        const response = await apiConnector("POST", SEND_MESSAGE, {
          senderId,
          receiverId,
          content,
        });
  
        if (!response.data.success) {
          toast.error("Message not sent. Try again.");
          setLoading(false);
          return;
        }
  
        toast.success("Message sent!");
        dispatch({ type: "ADD_MESSAGE", payload: response.data.message }); // adjust based on your backend response
        setLoading(false);
        if (clearInput) clearInput();
  
      } catch (error) {
        //("SEND MESSAGE ERROR >>>", error);
        toast.error("Could not send message.");
        setLoading(false);
      }
    };
  }


export function getMessages(friendId, setLoading) {
    return async (dispatch) => {
      setLoading(true);
  
      try {
        const response = await apiConnector("GET", `${GET_MESSAGES}/${friendId}`);
  
        if (!response.data.success) {
          toast.error("Could not load messages.");
          setLoading(false);
          return;
        }
  
        dispatch({ type: "SET_MESSAGES", payload: response.data.messages });
        setLoading(false);
  
      } catch (error) {
        //("GET MESSAGES ERROR >>>", error);
        toast.error("Failed to fetch messages.");
        setLoading(false);
      }}
    }