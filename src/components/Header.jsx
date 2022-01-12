import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material"
import React from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase, useStyles } from './HeaderStyles'
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, searchMovie } from "../redux/reducers/thunks/thunks";
import { setQuery } from "../redux/reducers/catalogSlice";

const Header = (props) => {
    const params = useLocation()
    const dispatch = useDispatch()

    const { toolbar, searchBar, leftSide, navbarDrawer, navbarItem, active, link } = useStyles(props)
    let { query } = useSelector(state => state.catalog)

    const [drawer, setDrawer] = React.useState(false)

    const navbarElements = [
        {
            id: 2,
            title: "Movies",
            path: '/'
        },
        {
            id: 1,
            title: "Favorite movies",
            path: '/favorites',
        },
    ]

    const handleInputClick = () => {
        if (query !== '') {
            dispatch(searchMovie(query))
        } else {
            dispatch(fetchMovies())
        }
    }

    const changeDrawer = () => {
        setDrawer(!drawer)
    }

    const handleClick = (e) => {
        dispatch(setQuery(e.target.value))
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleInputClick()
        }
    }

    return (
        <Box sx={{
            flexGrow: 1,
            position: "fixed",
            top: 0,
            left: 0,
            width: '100vw',
            zIndex: 10
        }}>
            <AppBar position="static" elevation={0}>
                <Toolbar className={toolbar}>
                    <div className={leftSide}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={changeDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" className={link}>
                            <Typography variant='h5' component="div">
                                Movies app
                            </Typography>
                        </Link>
                    </div>
                    {params.pathname === '/' && <Search className={searchBar}>
                        <SearchIconWrapper >
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ color: "#fff" }}
                            placeholder="Search movies"
                            inputProps={{ 'aria-label': 'search movies' }}
                            onChange={handleClick}
                            onKeyPress={handleKeyPress}
                            value={query}
                        />
                    </Search>}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor='left'
                open={drawer}
                onClose={changeDrawer}
                onClick={changeDrawer}
            >
                <div className={navbarDrawer}>
                    {navbarElements.map(item => <Link to={`${item.path}`} className={item.path === params.pathname ? `${navbarItem} ${active}` : `${navbarItem}`} key={item.id}>{item.title}</Link>)}
                </div>
            </Drawer>
        </Box >
    )
};

export default Header;