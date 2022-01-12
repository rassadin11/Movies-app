import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { fetchMovies } from "../redux/reducers/thunks/thunks"
import { makeStyles } from '@mui/styles'
import { searchMovie } from '../redux/reducers/thunks/thunks'
import Masonry from "react-masonry-css"
import BookCard from './Card'
import { fetchTopRatedMovies } from '../redux/reducers/thunks/thunks';
import { useLocation, useNavigate } from "react-router-dom"

const useStyles = makeStyles({
  main: {
    padding: "74px 20px 0",
    textAlign: '0 auto',
  },
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '@media (max-width: 520px)': {
      flexDirection: 'column',

      '& > *:first-child': {
        marginBottom: 10
      }
    }
  }
})

const Catalog = (props) => {
  const dispatch = useDispatch()
  const { query } = useSelector(state => state.catalog)
  const films = useSelector((state) => state.catalog.films)
  const { main, headerBar } = useStyles()
  let navigate = useNavigate()
  let location = useLocation()
  let favoriteFilms = JSON.parse(localStorage.getItem('favorites') || '[]')
  let [category, setCategory] = React.useState('')

  const breakpoints = {
    default: 6,
    1500: 4,
    1300: 3,
    850: 2,
    520: 1
  }

  React.useEffect(() => {
    if (location.search === '?query=0' || location.search === '?query=1' || location.search === '?query=2') {
      return dispatch(fetchTopRatedMovies(+location.search[location.search.length - 1]))
    } else if (query) {
      return dispatch(searchMovie(query))
    } else dispatch(fetchMovies())
  }, [dispatch, location.search, query])

  const handleChange = (event) => {
    setCategory(event.target.value)
    dispatch(fetchTopRatedMovies(event.target.value))
    navigate(`/?query=${event.target.value}`)
  };

  return (
    <div className={main}>
      <div className={headerBar}>
        <div>
          <Typography variant="h4" element="h4" color="#fff">Different movies</Typography>
          <Typography element="p" color="#fff">* powered by The Movie DB API</Typography>
        </div>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Choose category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            label="Choose category"
            onChange={handleChange}
            sx={{
              minWidth: 150,
              '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff'
              }
            }}
          >
            <MenuItem value={0}>Top movies</MenuItem>
            <MenuItem value={1}>Upcoming movies</MenuItem>
            <MenuItem value={2}>Top rating</MenuItem>
          </Select>
        </FormControl>
      </div>
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
