import { AppBar, MenuItem, Box, Toolbar, IconButton, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { NavBarProps } from "../helpers/types";

export const NavBar: React.FC<NavBarProps> = ({ text, pages }: NavBarProps) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElNav(e.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleOpenNavMenu} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                        {Array.from(pages).map(([key, value]) => (
                            <MenuItem key={key} onClick={() => navigate(value)}>
                                <Typography fontSize={18} textAlign="center">{key}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    <Typography variant="h6" component="div">
                        {text}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}