import { configureStore } from '@reduxjs/toolkit';
import catalogSlice from '../redux/reducers/catalogSlice';
import movieSlice from '../redux/reducers/movieSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogSlice,
    movie: movieSlice
  },
});
