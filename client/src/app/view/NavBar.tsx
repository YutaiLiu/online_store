import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";

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

type NavBarProps = {
    darkMode: boolean;
    themeSwitcher: () => void;
}

export default function NavBar(props: NavBarProps) {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant="h6">
                    Online Store
                </Typography>
                <List sx={{ display: 'flex'}}>
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
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </ListItem>
                    {rightLinks.map(item => (
                        <ListItem 
                            key={item.title}
                            component={NavLink}
                            to={item.path}
                            sx={NavStyle}
                        >
                            {item.title}
                        </ListItem>
                    ))}
                    <ListItem>
                        <IconButton onClick={props.themeSwitcher}>
                            {props.darkMode ? <DarkMode /> : <LightMode sx={{ color: 'orange' }} />}
                        </IconButton>
                    </ListItem>
                </List>
            </Toolbar>
        </AppBar>
    )
}