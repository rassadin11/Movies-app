import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { handleFavoriteFilm } from '../redux/reducers/catalogSlice';
import { Link } from 'react-router-dom';
import basic from './img/basic.png'
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none'
    }
})

export default function BookCard({ backdrop_path, original_title, overview, id, tab, custom }) {
    const dispatch = useDispatch()
    const [isFavorite, setisFavorite] = React.useState(tab)
    const { link } = useStyles()

    const handleFavorite = () => {
        if (custom) {
            setisFavorite(!isFavorite)
            dispatch(handleFavoriteFilm({ backdrop_path, original_title, overview, id }))
        } else {
            dispatch(handleFavoriteFilm({ backdrop_path, original_title, overview, id }))
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link className={link} to={`/movies/${id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    sx={{ overflow: 'hidden', transition: 'all .3s ease', '&:hover': { transform: 'scale(1.2)' } }}
                    image={backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : basic}
                    alt="no photo on server =(, it isn't my mistake"
                />
            </Link>
            <CardContent sx={{ background: "#fff", zIndex: 5, position: "relative" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {original_title}
                </Typography>
                <Typography component={'span'} variant="body2" color="text.secondary">
                    {overview.length <= 200 ? <p>{overview}</p> : overview[199] === ' ' ? <p>{overview.slice(0, 199)}...</p> : <p>{overview.slice(0, 200)}...</p>}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleFavorite}>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</Button>
                <Link className={link} to={`/movies/${id}`}><Button size="small">Learn More</Button></Link>
            </CardActions>
        </Card>
    );
}

BookCard.propTypes = {
    backdrop_path: PropTypes.string,
    original_title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tab: PropTypes.bool.isRequired,
    custom: PropTypes.bool.isRequired,
}