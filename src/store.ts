import { configureStore } from '@reduxjs/toolkit';
import  loadingSlice  from './redux/loadingSlice/loadingSlice';
import themeSlice from './redux/themeSlice/themeSlice';
import errorSlice from './redux/errorSlice/errorSlice'
export const store =configureStore({
    reducer:{
        isLoading:loadingSlice,
        theme:themeSlice,
        error:errorSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>;