import { makeStyles } from "@mui/styles";
import React from "react"
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    item: {
        color: "#e5e9e9",
        fontSize: 20,
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: '5px',
        borderBottom: (border) => border ? "1px dotted #fff" : 'none',

        '& > *:first-child': {
            flex: '0 0 30%',
        },

        '& > *:last-child': {
            flex: '0 0 60%'
        },
    }
})

const MovieDetails = ({ title, text, border }) => {
    const { item } = useStyles(border)
    return (
        <div className={item}>
            <span>{title}</span>
            <span>{text}</span>
        </div>
    )
};

MovieDetails.propTypes = {
    title: PropTypes.string.isRequired,
}

export default MovieDetails;