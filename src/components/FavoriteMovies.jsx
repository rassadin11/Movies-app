import React from "react"
import Masonry from "react-masonry-css";
import BookCard from "./Card";
import { makeStyles } from "@mui/styles";
import '../App.css'

const useStyles = makeStyles({
    main: {
        padding: "84px 20px 0",
        textAlign: '0 auto'
    },
    empty: {
        color: '#fff',
        margin: 0,
    }
})

const FavoriteMovies = (props) => {
    const { main, empty } = useStyles()
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

    const breakpoints = {
        default: 6,
        1400: 3,
        992: 2,
        520: 1
    }

    return (
        <div className={main}>
            {favorites.length ?
                <Masonry breakpointCols={breakpoints} className="movies" columnClassName="movies-grid">
                    {favorites.length && favorites.map(favorite => {
                        return (<div key={favorite.id}><BookCard {...favorite} tab custom /></div>)
                    })}
                </Masonry>
                : <h1 className={empty}>You haven't got favourite movies</h1>}
        </div>
    )
};

export default FavoriteMovies;