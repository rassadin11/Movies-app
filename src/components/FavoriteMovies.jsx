import React from "react"
import Masonry from "react-masonry-css";
import { useSelector } from 'react-redux'
import BookCard from "./Card";
import '../App.css'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    main: {
        padding: "10px 20px 0",
        textAlign: '0 auto'
    }
})

const FavoriteMovies = (props) => {
    const favorites = useSelector(state => state.catalog.favorites)
    const { main } = useStyles()

    const breakpoints = {
        default: 6,
        1400: 3,
        992: 2,
        520: 1
    }

    return (
        <div className={main}>
            <Masonry breakpointCols={breakpoints} className="movies" columnClassName="movies-grid">
                {favorites && favorites.map(favorite => <div key={favorite.id}><BookCard {...favorite} tab /></div>)}
            </Masonry>
        </div>
    )
};

export default FavoriteMovies;