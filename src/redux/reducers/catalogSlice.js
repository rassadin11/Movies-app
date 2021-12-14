import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//  search by movie

const initialState = {
  films: [],
  favorites: [],
  isLoaded: false,
  error: null
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', () => {
  return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
    .then(response => {
      return response.data
    })
})

export const searchMovie = createAsyncThunk('queryMovies/searchMovie', (query) => {
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&query=${query}&page=1&include_adult=true`)
    .then(response => {
      return response.data
    })
})

export const catalogSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    handleFavoriteFilm(state, action) {
      let filmId = -1

      state.favorites.forEach(film => {
        if (film.id === action.payload.id) {
          filmId = state.favorites.findIndex(film => film.id === action.payload.id)
          return
        }
      })

      if (filmId === -1) {
        state.favorites.push(action.payload)
      } else {
        state.favorites.splice(filmId, 1)
      }
    }
  },
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
      state.isLoaded = true
      state.error = null
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.isLoaded = false
      state.films = action.payload
    },
    [fetchMovies.rejected]: (state, action) => {
      state.isLoaded = false
      state.error = 'error'
    },
    [searchMovie.pending]: (state) => {
      state.isLoaded = true
      state.error = null
    },
    [searchMovie.fulfilled]: (state, action) => {
      state.isLoaded = false
      state.films = action.payload
    },
    [searchMovie.rejected]: (state) => {
      state.isLoaded = false
      state.error = 'error'
    },
  },
});

export const { handleFavoriteFilm } = catalogSlice.actions;

export default catalogSlice.reducer;