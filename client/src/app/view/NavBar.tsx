import { AppBar, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";

type NavBarProps = {
    themeSwitcher: () => void;
}

export default function NavBar(props: NavBarProps) {
    return (
        <AppBar position="static">
            <Toolbar
                sx={{ justifyContent: 'space-between' }}
            >
                <Typography variant="h6">
                    Online Store
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={props.themeSwitcher}
                            color="default"
                            aria-label="dark mode switch"
                        />
                    }
                    label="Dark Mode"
                />
            </Toolbar>
        </AppBar>
    )
}