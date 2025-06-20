import axios from 'axios' 
import {apiConnector} from '../apiConnector.js'
import {endpoints , profileEndpoints } from '../apis.js'
import {toast} from 'react-hot-toast'

const {
   GET_REVIEW
  } = endpoints


  export function support(input) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", GET_REVIEW, { input });
            return response.data; 
        } catch (error) {
            // //console.error("AI Support API Error:", error);
            return "Something went wrong!";
        }
    };
}
