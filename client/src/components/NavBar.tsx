import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "../store/uiSlice";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../api/accountApi";

const midLinks = [
    { title: 'Home', path: '/' },
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
]

const NavStyle = {
    color: 'inherit',
    typography: 'h6',
    '&:hover': { color: 'orange' },
    '&.active': { color: 'orange' }
}

export default function NavBar() {
    const dispatch = useAppDispatch();
    const { data: user } = useUserInfoQuery();
    const isLoading = useAppSelector(state => state.ui.isLoading);
    const isDarkMode = useAppSelector(state => state.ui.isDarkMode);
    const catItemsCount = useAppSelector(state => state.ui.cartItemsCount);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant="h6">
                    Online Store
                </Typography>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(item => (
                        <ListItem
                            key={item.title}
                            component={NavLink}
                            to={item.path}
                            sx={NavStyle}
                        >
                            {item.title}
                        </ListItem>
                    ))}
                </List>
                <List sx={{ display: 'flex', marginLeft: 'auto', right: '0rem' }}>
                    <ListItem>
                        <IconButton component={NavLink} to='/shopping-cart' size="large" color="inherit">
                            <Badge badgeContent={catItemsCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {user ? (
                            <UserMenu user={user} />
                        ) : (
                            rightLinks.map(item => (
                                <ListItem
                                    key={item.title}
                                    component={NavLink}
                                    to={item.path}
                                    sx={NavStyle}
                                >
                                    {item.title}
                                </ListItem>
                            ))
                        )}
                        <IconButton onClick={() => dispatch(setDarkMode(!isDarkMode))}>
                            {isDarkMode ? <DarkMode /> : <LightMode sx={{ color: 'orange' }} />}
                        </IconButton>
                    </ListItem>
                </List>
            </Toolbar>
            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            )}
        </AppBar>
    )
}