import { Box } from "@mui/material";
import React, { useEffect } from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import LoginOutImage from '../assets/loginOutimage.png';
import { DeleteData } from "../api/requests";
import { useNavigate } from "react-router-dom";

export const LoginOutPage: React.FC<{}> = () => {
    const logginOut = DeleteData("logginOut", `https://backend-sharon-3.onrender.com/user/log_out/${ localStorage.getItem("id") }`)
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
            navigate("/");
    }, []);

    
    useEffect(() => {
        logginOut.mutateAsync();
        const timer = setTimeout(() => {
            if (!logginOut.isPending) {
                localStorage.removeItem("id");
                localStorage.removeItem("jwt");
                localStorage.removeItem("type");
                localStorage.removeItem("expirationDate");
                navigate("/");
            }
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <Grid sx={{ backgroundColor: "#1e2844", justifyItems: "center", alignItems: "center", justifyContent: "center", alignContent: "center", height: "100vh" }}>
            <Stack direction="row" sx={{ justifyItems: "center", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                <img src={LoginOutImage} alt="" style={{ width: "70vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} />
                <Stack marginLeft="-10vh" textAlign="center" justifyContent="center" alignContent="center" justifyItems="center" alignItems="center">
                    <Typography variant='h2'>
                        <strong>Cerrando sesión...</strong>
                    </Typography>
                    <Typography variant='h2' sx={{ marginTop: "5vh" }}>
                        ¡Gracias por navegar aquí,
                    </Typography>
                    <Typography variant='h2'>
                        esperamos que vuelvas pronto!
                    </Typography>
                </Stack>
            </Stack>
        </Grid>
    );
}