import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, fetchTopRatedMovies, searchMovie } from './thunks/thunks';

const initialState = {
  films: [],
  query: '',
  isLoaded: false,
  error: null
};

export const catalogSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    handleFavoriteFilm(state, action) {
      let filmId = -1
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

      favorites.forEach(film => {
        if (film.id === action.payload.id) {
          filmId = favorites.findIndex(film => film.id === action.payload.id)
          return
        }
      })

      if (filmId === -1) {
        localStorage.setItem("favorites", JSON.stringify(Array(...favorites, action.payload)))
      } else {
        favorites.splice(filmId, 1)
        localStorage.setItem("favorites", JSON.stringify(favorites))
      }
    },
    setQuery(state, action) {
      state.query = action.payload
    }
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.isLoaded = true
      state.error = null
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.isLoaded = false
      state.films = action.payload
    },
    [fetchMovies.rejected]: (state, action) => {
      state.isLoaded = false
      state.error = action.payload
    },
    [searchMovie.pending]: (state) => {
      state.isLoaded = true
      state.error = null
    },
    [searchMovie.fulfilled]: (state, action) => {
      state.isLoaded = false
      state.films = action.payload
    },
    [searchMovie.rejected]: (state, action) => {
      state.isLoaded = false
      state.error = action.payload
    },
    [fetchTopRatedMovies.pending]: (state) => {
      state.isLoaded = true
      state.error = null
    },
    [fetchTopRatedMovies.fulfilled]: (state, action) => {
      state.isLoaded = false
      state.films = action.payload
    },
    [fetchTopRatedMovies.rejected]: (state, action) => {
      state.isLoaded = false
      state.error = action.payload
    }
  },
});

export const { handleFavoriteFilm, setQuery } = catalogSlice.actions;

export default catalogSlice.reducer;