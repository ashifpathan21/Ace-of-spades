import axios from 'axios' 
import {apiConnector} from '../apiConnector.js'
import {endpoints , profileEndpoints } from '../apis.js'
import {toast} from 'react-hot-toast'
const {
    FIND_FRIEND ,
    SEND_REQUEST ,
    ACCEPT_REQUEST ,
    REJECT_REQUEST
  } = endpoints


  export function findFriend ({userName} , token ){
    // console.log(token)
    return async (dispatch) => {
        // console.log('searching ')
          
          try{
         
            const responce = await apiConnector('POST' , FIND_FRIEND ,{ userName} , { Authorization: `Bearer ${token}`}) ;
             
            if(!responce.data.success){
                toast.error('Something went wrong , Please try again')
               
                return // console.log(responce.data.message)
            }
           
             
            
                 return responce.data.data
          }catch(error){
          // console.log("FINDING FRIEND API ERROR............", error)
      
           }
         
    }
 
}




export function sendRequest({friendId} , token ){
  
  return async (dispatch) => {
   
         
        try{
       
          const responce = await apiConnector('POST' , SEND_REQUEST ,{ friendId} , { Authorization: `Bearer ${token}`}) ;
           
          if(!responce.data.success){
              toast.error('Something went wrong , Please try again')
             
              return // console.log(responce.data.message)
          }
           
           
          
               return responce
        }catch(error){
        // console.log("Sending FRIEND Request  API ERROR............", error)
    
         }
       
  }

}



export function acceptRequest({requesterId} , token ){
  
  return async (dispatch) => {
   
         
        try{
       
          const responce = await apiConnector('POST' , ACCEPT_REQUEST ,{ requesterId} , { Authorization: `Bearer ${token}`}) ;
           
          if(!responce.data.success){
              toast.error('Something went wrong , Please try again')
             
              return // console.log(responce.data.message)
          }
           
           
               return responce
        }catch(error){
         console.log("accept FRIEND Request  API ERROR............", error)
    
         }
       
  }

}



export function rejectRequest({requesterId} , token ){
  
  return async (dispatch) => {
   
         
        try{
       
          const responce = await apiConnector('POST' , REJECT_REQUEST ,{ requesterId} , { Authorization: `Bearer ${token}`}) ;
           
          if(!responce.data.success){
              toast.error('Something went wrong , Please try again')
             
              return // console.log(responce.data.message)
          }
           
           
               return responce
        }catch(error){
        // console.log("Sending FRIEND Request  API ERROR............", error)
    
         }
       
  }

}


