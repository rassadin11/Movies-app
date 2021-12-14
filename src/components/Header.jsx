import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material"
import React from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase, useStyles } from './HeaderStyles'
import { useDispatch } from "react-redux";
import { fetchMovies, searchMovie } from "../redux/reducers/catalogSlice";

const Header = (props) => {
    const params = useLocation()
    const dispatch = useDispatch()

    const { toolbar, searchBar, leftSide, navbarDrawer, navbarItem, active, link } = useStyles(props)
    const [drawer, setDrawer] = React.useState(false)
    const [input, setInput] = React.useState('')

    const navbarElements = [
        {
            id: 1,
            title: "My favorite movies",
            path: '/favorites',
        },
        {
            id: 2,
            title: "Films",
            path: '/'
        }
    ]

    const handleInputClick = () => {
        if (input !== '') {
            setInput('')
            dispatch(searchMovie(input))
        } else {
            dispatch(fetchMovies())
        }
    }

    const changeDrawer = () => {
        setDrawer(!drawer)
    }

    const handleClick = (e) => {
        if (e.key === "Enter") {
            handleInputClick()
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        <SearchIconWrapper onClick={handleInputClick} >
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ color: "#fff" }}
                            placeholder="Search movies"
                            inputProps={{ 'aria-label': 'search movies' }}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={handleClick}
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