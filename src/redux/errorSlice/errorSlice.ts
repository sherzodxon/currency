import {createSlice} from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        error: false
    },
     reducers:{
        changeError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const {changeError} = errorSlice.actions;
export default  errorSlice.reducer