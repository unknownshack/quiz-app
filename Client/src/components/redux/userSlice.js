import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name : "user",
    initialState:{
        current_user:{name:null},
    },

    reducers:{
        login:(state,action)=>{

            state.current_user = action.payload;
        },
        
        logout:(state)=>{

            state.current_user = {name:null};
        },
    },
});

export const {login,logout} = userSlice.actions;
export const selectUser = (state) =>state.user.current_user;
export default userSlice.reducer;