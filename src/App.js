import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Catalog from './components/Catalog';
import { makeStyles } from '@mui/styles';
import FavoriteMovies from './components/FavoriteMovies';
import Movie from './components/Movie';
import bg from './components/img/blog-detail.jpg';
import { createMuiTheme, ThemeProvider } from "@mui/material"

const useStyles = makeStyles({
  body: {
    minHeight: '100vh',
    zIndex: 2
  },
  backgroundImage: {
    position: 'fixed',
    height: '105vh',
    width: '105vw',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    left: "-2%",
    top: "-2%",
    filter: 'blur(3px)',
    zIndex: -1,
  },
  backgroundSheet: {
    position: 'fixed',
    height: '105vh',
    left: "-2%",
    top: "-2%",
    width: '105vw',
    background: '#000',
    opacity: 0.5,
    zIndex: 1
  }
})

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      small: 520,
      sm: 600,
      avg: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  }
})

function App() {
  const { body, backgroundImage, backgroundSheet } = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={body}>
          <div className={backgroundImage}>
            <div className={backgroundSheet}></div>
          </div>
          <Header />
          <Routes>
            <Route exact path="/" element={<Catalog />} />
            <Route exact path="/favorites" element={<FavoriteMovies />} />
            <Route exact path="/movies/:movieId" element={<Movie />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
