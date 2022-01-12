import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk('movies/fetchMovies', () => {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
        .then(response => response.data)
})

export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies', (code) => {
    switch (code) {
        case 0:
            return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
                .then(response => response.data)
        case 1:
            return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
                .then(response => response.data);
        case 2:
            return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
                .then(response => response.data)
        default: return
    }
})

export const searchMovie = createAsyncThunk('queryMovies/searchMovie', (query) => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&query=${query}&page=1&include_adult=true`)
        .then(response => response.data)
})

export const fetchMovie = createAsyncThunk('movieSearch/fetchMovie', (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US`)
        .then(response => response.data)
})

export const fetchMovieReleaseDate = createAsyncThunk('movieSearch/fetchMovieReleaseDate', (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=12bfc5eec58fbcff2e8dd007290d305b`)
        .then(response => response.data)
})

export const fetchSimilarMovies = createAsyncThunk('movieSearch/fetchSimilarMovies', (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=12bfc5eec58fbcff2e8dd007290d305b&language=en-US&page=1`)
        .then(response => response.data)
})