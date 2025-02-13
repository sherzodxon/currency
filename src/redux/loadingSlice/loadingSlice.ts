import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  
const loadingSlice = createSlice({
name:'loading',
initialState:{
  loading:true,
},
reducers: {
    setLoading:(state,action)=>{
      state.loading=action.payload
    }
}
})


// Export actions
export const {setLoading} = loadingSlice.actions;

// Export the reducer
export default loadingSlice.reducer;
