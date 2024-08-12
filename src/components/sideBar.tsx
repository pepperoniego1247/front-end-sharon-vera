import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { MenuItem, Menu, Button, ButtonGroup, Tooltip, Avatar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import image from "../assets/logo.png";
import ListItem from '@mui/material/ListItem';
import CategoryIcon from '@mui/icons-material/Category';
import ListItemButton from '@mui/material/ListItemButton';
import ArticleIcon from '@mui/icons-material/Article';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useQuery } from '@tanstack/react-query';
import ListItemText from '@mui/material/ListItemText';
import { SideBarProps } from '../helpers/types';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { LoadData } from '../api/requests';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { getUrls } from '../helpers/urls';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const SideBar: React.FC<SideBarProps> = ({ title }: SideBarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const links: any[][] = getUrls(localStorage.getItem("type")!);
  const subtitles: string[] = links[0];
  const urls: string[] = links[1];
  const icons: JSX.Element[] = links[2];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const settings = ["Perfil", 'Cerrar sesion'];
  const urlSettings = [`/user/account_menu/${localStorage.getItem("type")}`, `/user/loggin_out/${localStorage.getItem("type")}`];

  // const loadDataUser = LoadData("loadDataUser", `http://localhost:3001/user/get_by_id/${localStorage.getItem("type")}`);

  const loadDataUser = useQuery({
    queryKey: ["loadDataUser"],
    queryFn: async () => {
      const response = await fetch(`https://backend-sharon-3.onrender.com/user/get_by_id/${localStorage.getItem("id")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("jwt")}`
        }
      });

      if (!response.ok) throw new Error("HTTP ERROR");
      return response.json();
    }
  })

  const userAvatar = () => {
    if (!loadDataUser.data) return null;
    const { userId } = loadDataUser.data;
    return userId["avatar"];
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ textAlign: "center" }} position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>

          <Typography sx={{ marginLeft: "13.5vh", display: { xs: "none", lg: "block" }, fontWeight: 900, fontSize: "20px", flexGrow: 1, width: "60%" }}>
            SHARON VERA BEAUTY
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", alignContent: "flex-end", justifyItems: "flex-end", alignItems: "flex-end" }}>
            <Tooltip title="Configuracion">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={userAvatar()} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', display: "flex" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting} onClick={() => {
                  setAnchorElUser(null);
                  navigate(urlSettings[index]);
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {subtitles.map((text, index) => (
            <>
              <ListItem key={text} disablePadding onClick={() => navigate(urls[index])}>
                <ListItemButton>
                  <ListItemIcon>
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>

              <Divider />
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  )
};