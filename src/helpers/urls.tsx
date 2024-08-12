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
import { SideBarProps } from './types';
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
import { useEffect } from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const getUrls = (type: string) => {
    let subtitles: string[] = ["Menu", "Caja registradora", "Clientes", "Anamnesis", "Empleados", "Reservas", "Servicios", "Productos", "Usuarios del sistema", "Proveedores", "Ordenes de entrada", "DashBoard"];
    let urls: string[] = [`/user/menu/${localStorage.getItem("type")}`, `/user/caja_registradora/${localStorage.getItem("type")}`, `/user/mantenedor_clientes/${localStorage.getItem("type")}`, `/user/customer/anamnesis_clientes/${localStorage.getItem("type")}`, `/user/mantenedor_empleados/${localStorage.getItem("type")}`, `/user/reservas_core/${localStorage.getItem("type")}`, `/user/mantenedor_servicios/${localStorage.getItem("type")}`, `/user/mantenedor_productos/${localStorage.getItem("type")}`, `/user/mantenedor_usuarios/${localStorage.getItem("type")}`, `/user/mantenedor_proveedores/${localStorage.getItem("type")}`, `/user/orden_entrada_core/${localStorage.getItem("type")}`, `/user/dash_board/${localStorage.getItem("type")}`];
    let icons: JSX.Element[] = [<MenuBookIcon fontSize='large' />, <AttachMoneyIcon fontSize='large' />, <PersonIcon fontSize='large' />, <ArticleIcon fontSize='large' />, <GroupsIcon fontSize='large' />, <FactCheckIcon fontSize='large' />, <HomeRepairServiceIcon fontSize='large' />, <CategoryIcon fontSize='large' />, <SupervisedUserCircleIcon fontSize='large' />, <LocalShippingIcon fontSize='large' />, <ListAltIcon fontSize='large' />, <DashboardIcon fontSize='large' />];

    const filterLinks = (array: string[]) => {
        array.forEach((subtitle: string) => {
            const index: number = subtitles.indexOf(subtitle);
            subtitles = subtitles.filter((n: string, indexTemp: number) => index !== indexTemp);
            urls = urls.filter((n: string, indexTemp: number) => indexTemp !== index);
            icons = icons.filter((n: JSX.Element, indexTemp: number) => index !== indexTemp);
        });
    }

    switch (type) {
        case "Moderador":
            filterLinks(["Proveedores", "Ordenes de entrada", "DashBoard"]);
            break;
        case "Usuario":
            filterLinks(["Proveedores", "Ordenes de entrada", "DashBoard", "Servicios", "Productos", "Usuarios del sistema"]);
            break;
    }

    return [
        subtitles,
        urls,
        icons
    ];
}

export const IsNotAllowed = (roles: ("Moderador" | "Usuario")[] = []) => {
    const navigator = useNavigate();

    const redirect = (): boolean => {
        return roles.some((rol: "Moderador" | "Usuario") => localStorage.getItem("type") === rol);
    }

    return useEffect(() => {
        if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
            navigator("/");

        if (roles.length > 0 && redirect())
            navigator(`/user/menu/${ localStorage.getItem("type") }`);
    }, []);
}