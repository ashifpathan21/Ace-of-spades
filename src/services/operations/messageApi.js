import axios from 'axios' 
import {apiConnector} from '../apiConnector.js'
import {endpoints  } from '../apis.js'
import toast from 'react-hot-toast'


 const {
    SEND_MESSAGE ,
    SEEN_MESSAGE
  } = endpoints ;

export function sendMessage({to, text} , token) {
    return async (dispatch) => {
         //console.log(to , text ,token)
      try {
        const response = await apiConnector("POST", SEND_MESSAGE, {
          to , text 
        } , { Authorization: `Bearer ${token}`});
  
        if (!response.data.success) {
          toast.error("Message not sent. Try again.");
          return;
        }
        //console.log(response)
        toast.success("Message sent!");
       return response.data
  
      } catch (error) {
        //("SEND MESSAGE ERROR >>>", error);
        toast.error("Could not send message.");
        setLoading(false);
      }
    };
  }


export function markMessagesAsSeen(chatId, token) {
  return async () => {
    try {
      const res = await apiConnector(
        "PUT",
        SEEN_MESSAGE,
        { chatId },
        { Authorization: `Bearer ${token}` }
      );

      const data = res?.data;
      if (!data?.success) {
        toast.error("Failed to mark messages as seen.");
        return;
      }

      //console.log("✅ Messages marked as seen");
    } catch (err) {
      //console.error("❌ Error marking seen:", err?.response || err);
      toast.error("Could not mark messages as seen.");
    }
  };
}
