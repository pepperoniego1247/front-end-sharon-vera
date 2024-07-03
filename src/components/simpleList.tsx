import React from "react";
import { SimpleList } from "../helpers/types";
import { Box, List, ListItemAvatar, ListItemText, Avatar, ListItem, Divider, Typography } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';

//* 

export const SimpleListDetail: React.FC<SimpleList> = ({ dataRow, sx }: SimpleList) => {
    return (
        <Box sx={ sx }>
            <Typography sx={{ marginTop: "2vh" }} component="h3">Detalles de la reserva</Typography>
            <List dense={ true } sx={{ overflowY: "auto", maxHeight: "18.3vh", transform: "scale(0.9)" }}>
                {dataRow.map((reserveDetail: any, index: number) => {
                    let name = "";
                    let type = "";

                    if (reserveDetail["promotion"]) {
                        name = reserveDetail["promotion"]["name"];
                        type = "Promocion";
                    }

                    if (reserveDetail["service"]) {
                        name = reserveDetail["service"]["description"];
                        type = "Servicio";
                    }

                    if (reserveDetail["microServicio"]) {
                        name = reserveDetail["microServicio"]["name"];
                        type = "Microservicio";
                    }

                    return (
                        <>
                            <Divider/>

                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ type }
                                    secondary={`Nombre: ${name}`}
                                />
                            </ListItem>

                            <Divider/>
                        </>
                    );
                })}
            </List>
        </Box>
    );
}