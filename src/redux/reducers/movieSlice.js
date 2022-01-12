import { createSlice } from "@reduxjs/toolkit";
import { fetchMovie, fetchMovieReleaseDate, fetchSimilarMovies } from "./thunks/thunks";

const initialState = {
    film: [],
    similarMovies: [],
    isLoading: false,
    error: null
}

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