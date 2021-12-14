import React from "react"
import { makeStyles } from '@mui/styles'
import BookCard from './Card'
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../redux/reducers/catalogSlice"
import { CircularProgress, Typography } from "@mui/material"
import Masonry from "react-masonry-css"

const useStyles = makeStyles({
  main: {
    padding: "10px 20px 0",
    textAlign: '0 auto'
  }
})

const Catalog = (props) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const films = useSelector((state) => state.catalog.films)
  const favoriteFilms = useSelector((state) => state.catalog.favorites)
  const { main } = useStyles()

  const breakpoints = {
    default: 6,
    1500: 4,
    1300: 3,
    850: 2,
    520: 1
  }

  return (
    <div className={main}>
      <Typography variant="h4" element="h4" color="#fff">Different movies</Typography>
      <Typography element="p" color="#fff">* powered by The Movie DB API</Typography>
      <Masonry breakpointCols={breakpoints} className="movies" columnClassName="movies-grid">
        {films.results ? !films.results.length && "No films" : ''}
        {films.results ?
          films.results.map(film => {
            let isTab = false;

            favoriteFilms.forEach(movie => {
              if (movie.id === film.id) isTab = true
            })

            return <div key={film.id}><BookCard {...film} tab={isTab} custom /></div>
          })
          : <CircularProgress />}
      </Masonry>
    </div>
  )
};

export default Catalog;
