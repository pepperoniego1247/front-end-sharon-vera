import { Box, Stack, Avatar, Typography } from "@mui/material";
import React from "react";
import { DashBoardCardProps } from "../helpers/types";

export const CardDashBoard: React.FC<DashBoardCardProps> = ({ title, number }: DashBoardCardProps) => {
    return (
        <Stack direction="row" gap={3} sx={{ borderRadius: "5px", width: "50vh", backgroundColor: "secondary.main", justifyContent: "center", padding: "4vh", alignContent: "center", alignItems: "center", display: "flex" }}>
            <Avatar sx={{ height: "9vh", width: "9vh", fontSize: 30, backgroundColor: "green" }}>V</Avatar>
            <Stack gap={1} sx={{ width: "30vh" }}>
                <Typography variant="h6">{ title }</Typography>
                <Typography variant="h3">{` S/. ${ number } `}</Typography>
            </Stack>
        </Stack>
    );
}