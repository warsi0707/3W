import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../slice/authSlice";
import postRedcuer from "../slice/postSlice";

const store = configureStore({
   reducer : {
     auth: authReducer,
     posts: postRedcuer
   }
})

export default store;