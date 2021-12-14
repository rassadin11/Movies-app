import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    film: [],
    similarMovies: [],
    isLoading: false,
    error: null
}

export const fetchMovie = createAsyncThunk('movieSearch/fetchMovie', (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US`)
        .then(response => {
            return response.data
        })
})

export const fetchMovieReleaseDate = createAsyncThunk('movieSearch/fetchMovieReleaseDate', (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=12bfc5eec58fbcff2e8dd007290d305b`)
        .then(response => {
            return response.data
        })
})

export const fetchSimilarMovies = createAsyncThunk('movieSearch/fetchSimilarMovies', (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
        .then(response => {
            return response.data
        })
})

export const movieSlice = createSlice({
    name: "movieSearch",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMovie.pending]: (state) => {
            state.isLoading = true
        },
        [fetchMovie.fulfilled]: (state, action) => {
            state.film = action.payload
            state.isLoading = false
        },
        [fetchMovie.rejected]: (state) => {
            state.error = 'error'
            state.isLoading = false
        },
        [fetchMovieReleaseDate.pending]: (state) => {
            state.isLoading = true
        },
        [fetchMovieReleaseDate.fulfilled]: (state, { payload }) => {
            let results = payload.results

            state.film = {
                ...state.film,
                results,
            }

            state.isLoading = false
        },
        [fetchMovieReleaseDate.rejected]: (state) => {
            state.error = 'error'
            state.isLoading = false
        },
        [fetchSimilarMovies.pending]: (state) => {
            state.isLoading = true
        },
        [fetchSimilarMovies.fulfilled]: (state, action) => {
            state.similarMovies = action.payload
            state.isLoading = false
        },
        [fetchSimilarMovies.rejected]: (state) => {
            state.error = 'error'
            state.isLoading = false
        },
    },
})

// export const { } = movieSlice.actions;

export default movieSlice.reducer;