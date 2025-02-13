import { configureStore } from '@reduxjs/toolkit';
import  loadingSlice  from './redux/loadingSlice/loadingSlice';
import themeSlice from './redux/themeSlice/themeSlice';
export const store =configureStore({
    reducer:{
        isLoading:loadingSlice,
        theme:themeSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>;