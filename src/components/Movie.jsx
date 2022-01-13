import React from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { CardMedia, Container, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MovieDetails from "./MovieDetails";
import getYear from "date-fns/fp/getYear";
import Button from '@mui/material/Button';
import { getDate, getMonth, parseISO } from "date-fns";
import Grid from '@mui/material/Grid';
import basic from './img/basic.png'
import { fetchMovie, fetchMovieReleaseDate, fetchSimilarMovies } from "../redux/reducers/thunks/thunks";
import { nanoid } from "@reduxjs/toolkit";

const useStyles = makeStyles({
    grid: {
        marginTop: 20,
        paddingTop: 74
    },
    link: {
        textDecoration: 'none',
        padding: '4px 10px 5px',
        borderRadius: 5,
        width: 150,
        display: 'block',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        height: '100%',
        color: '#e5e9e9',
        border: '1px solid #e5e9e9',
        minHeight: 35,
        boxSizing: 'border-box',

        '&:hover': {
            color: '#000',
            background: "#c3c3c3",
            border: '1px solid #c3c3c3',
        }
    },
    details: {
        marginTop: 15,

        '& > *:not(:first-child)': {
            marginTop: 10,
        }
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: '100%',
    },
    similarMoviesText: {
        color: '#e5e9e9',
        fontSize: 20,
    },
    containerPadding: {
        paddingBottom: 25
    }
})

const Movie = (props) => {
    const dispatch = useDispatch()
    const params = useParams()
    const { film, similarMovies, isLoading } = useSelector(state => state.movie)
    const { backdrop_path, original_title, overview, id } = film
    const { grid, link, details, flex, image, similarMoviesText, containerPadding } = useStyles()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let [favorite, setFavorite] = React.useState(null)

    React.useEffect(() => {
        let filmId = -1

        favorites.forEach(film => {
            if (film.id === id) {
                filmId = favorites.findIndex(film => film.id === id)
                return
            }
        })

        if (filmId === -1) setFavorite(false)
        else setFavorite(true)
    }, [dispatch, favorites, id])

    React.useMemo(() => {
        dispatch(fetchMovie(params.movieId))
        dispatch(fetchMovieReleaseDate(params.movieId))
        dispatch(fetchSimilarMovies(params.movieId))
    }, [params.movieId, dispatch])

    function handleFavorites() {
        let filmId = -1

        favorites.forEach(film => {
            if (film.id === id) {
                filmId = favorites.findIndex(film => film.id === id)
                return
            }
        })

        if (filmId === -1) {
            let array = [...favorites, { backdrop_path, original_title, overview, id }]
            localStorage.setItem("favorites", JSON.stringify(array))
            setFavorite(true)
        } else {
            favorites.splice(filmId, 1)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            setFavorite(false)
        }
    }

    const computeDate = () => {
        let days = getDate(parseISO(film.results[0].release_dates[0].release_date)) // get days
        let month = getMonth(parseISO(film.results[0].release_dates[0].release_date)) + 1 // get month
        let year = getYear(parseISO(film.results[0].release_dates[0].release_date)) // get year

        if (days < 10) days = `0${days}`
        if (month < 10) month = `0${month}`

        return `${days}.${month}.${year}`
    }

    const renderReleaseTime = () => {
        let date = computeDate(String(film.results[0].release_dates[0].release_date)) // get time when movie will be release
        return < MovieDetails title="Release date" text={date} />
    }

    if (isLoading === true) return <Container maxWidth='lg'><CircularProgress /></Container>

    return (
        <Container maxWidth='lg' className={`${grid} ${containerPadding}`}>
            {film ? < Grid container spacing={2} >
                <Grid item md={6} xs={12}>
                    <a href={film.homepage}>
                        <CardMedia
                            component="img"
                            image={film.backdrop_path ? `https://image.tmdb.org/t/p/w500${film.backdrop_path}` : basic}
                            alt="no photo on server =(, it isn't my mistake"
                            sx={{
                                maxWidth: {
                                    avg: '80%',
                                    xs: '100%',
                                }, margin: '0 auto'
                            }}
                        />
                    </a>
                </Grid>
                <Grid item md={6} xs={12}> {/* main content */}
                    <Typography variant='h6' sx={{ fontSize: 28 }} color="#e5e9e9">
                        {film.title}
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: 18 }} color="#e5e9e9">
                        {film.overview}
                    </Typography>
                    <div className={`${flex}`}>
                        <Button size="small" sx={{
                            textDecoration: 'none',
                            padding: '4px 10px 5px',
                            transition: 'all 0.3s ease',
                            marginTop: '10!important',
                            marginRight: '15px',
                            color: '#e5e9e9',
                            border: '1px solid #e5e9e9',
                            height: '100%',
                            minHeight: 35,

                            '&:hover': {
                                color: '#000',
                                background: "#c3c3c3",
                                border: '1px solid #c3c3c3',
                            }
                        }} onClick={handleFavorites}>{favorite ? 'Remove from favorites' : 'Add to favorites'}</Button>
                        <a className={link} href={film.homepage}>WATCH</a>
                    </div>
                    {
                        film ? <div className={details}>
                            <MovieDetails title="Year of production" text={String(getYear(parseISO(film.release_date)))} />
                            {film.results ? renderReleaseTime() : ''}
                            {film.revenue ? <MovieDetails title="Revenue" text={film.revenue.toLocaleString() + '$'} /> : ''}
                            {film.budget ? <MovieDetails title="Budget" text={film.budget.toLocaleString() + '$'} /> : ''}
                            <MovieDetails title="Genres" text={film.genres && film.genres.map((genre, idx) => idx !== film.genres.length - 1 ? `${genre.name.toLowerCase()}, ` : `${genre.name.toLowerCase()} `)}></MovieDetails>
                            {film.popularity ? <MovieDetails title="Popularity" text={Math.round(film.popularity)} /> : ''}
                            <MovieDetails title="Time duration (minutes)" text={film.runtime} />
                            <MovieDetails title="Average rate" text={film.vote_average} />
                            <MovieDetails title="Amount of votes" text={film.vote_count} />
                            <MovieDetails title="Adult" text={film.adult ? '18+' : 'no'} />
                            {film.spoken_languages && <MovieDetails title="Original language" text={film.spoken_languages[0] && film.spoken_languages[0].english_name} border={false} />}
                        </div> : ''
                    }
                </Grid>
            </Grid > : 'This film doesn`t available'}
            <Typography variant="h5" component='p' color="#e5e9e9" sx={{
                marginTop: {
                    xs: '30px',
                    lg: '10px'
                },
                marginBottom: '10px'
            }}>Similar movies</Typography>
            <Grid container spacing={2}>
                {similarMovies.results ? similarMovies.results.map(movie => {
                    return (
                        <Grid item lg={4} xs={12} small={6} key={nanoid()}>
                            <div className={image}>
                                <a href={`/movies/${movie.id}`}><img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : basic} alt="" className={image} /></a>
                                <div className={similarMoviesText}>{movie.title}</div>
                            </div>
                        </Grid>
                    )
                }) : ''}
            </Grid>
        </Container >
    )
};

export default Movie;