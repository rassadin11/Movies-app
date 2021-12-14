import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import counterSlice from '../redux/reducers/counterSlice';
=======
import catalogSlice from '../redux/reducers/catalogSlice';
import movieSlice from '../redux/reducers/movieSlice';
>>>>>>> a265d12c83cad46ae665f9fc784bd7b1a6861391

export const store = configureStore({
  reducer: {
    catalog: catalogSlice,
    movie: movieSlice
  },
});
