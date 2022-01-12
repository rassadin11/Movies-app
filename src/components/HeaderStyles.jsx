import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@mui/styles';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#343434',
    transition: "all .3s ease",
    '&:hover': {
        backgroundColor: alpha('#b9b9b9', 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingLeft: theme.spacing(1.5),
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 2, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        '&::placeholder': {
            color: '#fff',
        },
        '&:hover &::placeholder': {
            color: '#fff'
        },
    }
}));

export const useStyles = makeStyles({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        background: "#343434",
    },
    link: {
        textDecoration: 'none',
        color: '#ffffff',
        transition: "all 0.3s ease",

        '&:hover': {
            color: '#f0f0f0'
        }
    },
    leftSide: {
        display: "flex",
        alignItems: "center"
    },
    navbarDrawer: {
        width: '250px',
        background: "#343434",
        height: '100%',
        padding: '5px 0',
        boxSizing: 'border-box',
        fontSize: "22px",
        display: "flex",
        flexDirection: "column",
    },
    navbarItem: {
        padding: '5px 10px',
        borderBottom: '1px solid #fff',
        textDecoration: 'none',
        color: '#fff',
    },
    active: {
        background: "#555"
    },
    searchBar: {
        cursor: 'pointer'
    }
})
