import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material"
import React from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase, useStyles } from './HeaderStyles'
import { useDispatch } from "react-redux";
import { fetchMovie, searchMovie } from "../redux/reducers/thunks/thunks";

const Header = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { toolbar, searchBar, leftSide, navbarDrawer, navbarItem, active, link } = useStyles(props)
    let [query, setQuery] = React.useState('')
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

    React.useEffect(() => {
        if (location.search.indexOf("?search_query=") > -1) {
            dispatch(searchMovie(location.search.slice(14, location.search.length)))
        }
    }, [dispatch, location.search])

    const changeDrawer = () => {
        setDrawer(!drawer)
    }

    const handleClick = (e) => {
        setQuery(e.target.value)
    }

    const handleKeyPress = (e) => {
        setQuery(e.target.value)

        if (e.key === "Enter" && query !== '') {
            dispatch(searchMovie(query))
            navigate(`/?search_query=${query}`)
        } else if (e.key === 'Enter' && query === '') {
            dispatch(fetchMovie())
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
                    {location.pathname === '/' && <Search className={searchBar}>
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
                    {navbarElements.map(item => <Link to={`${item.path}`} className={item.path === location.pathname ? `${navbarItem} ${active}` : `${navbarItem}`} key={item.id}>{item.title}</Link>)}
                </div>
            </Drawer>
        </Box >
    )
};

export default Header;