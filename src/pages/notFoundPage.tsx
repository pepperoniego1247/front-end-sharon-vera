import React from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import NotFoundImage from '../assets/404_not_found.png';

export const NotFoundPage: React.FC = () => {
    return (
        <Grid sx={{ backgroundColor: "#1e2844", justifyItems: "center", alignItems: "center", justifyContent: "center", alignContent: "center", height: "100vh" }}>
            <Stack sx={{ justifyItems: "center", alignItems: "center", justifyContent: "center", alignContent: "center", }}>
                <Typography variant='h2'>
                    <strong>Error 404</strong>
                </Typography>
                <Typography variant='h2'>
                    ¡Página no encontrada!
                </Typography>
                <img src={NotFoundImage} alt="" style={{ height: "50vh", width: "100vh", transform: "translateY(16.5vh) translateX(40vh)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} />
            </Stack>
        </Grid>
    );
}