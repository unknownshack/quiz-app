import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

//redux necessary setting
export default configureStore({

    reducer:{
        user : userReducer,

    },
});