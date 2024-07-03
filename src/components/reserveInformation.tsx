import { Card, Box, Divider, CardContent, Typography, Stack, CircularProgress } from "@mui/material";
import { SubHeaderList } from "./listSubHeader";
import { DisplayInformationProps } from "../helpers/types";
import { format } from "date-fns";
import { es } from 'date-fns/locale'
import { useState } from "react";

export const DisplayInformation: React.FC<DisplayInformationProps> = ({ data, detail, isPending }: DisplayInformationProps) => {

    let total: number = 0;
    
    detail.forEach((object: any) => {
        const { microServicio, promotion, service } = object;

        if (microServicio) total += microServicio["price"];
        if (service) total += service["price"];
        if (promotion) total += promotion["precio"];
    });

    const upperCaseFirstLetter = (word: string) => { return word[0].toUpperCase() + word.slice(1) }

    return (
        <Card sx={{ width: "50vh", padding: "1vh", height: "79vh" }}>
            <Typography gutterBottom variant="h4" component="div">
                Informacion de reserva
            </Typography>

            <Divider />

            <Stack gap={2} sx={{ padding: "1vh", height: "100%", justifyItems: "center", alignItems: "center", justifyContent: (isPending) ? "center" : undefined, alignContent: "center"}}>
                { isPending ? <CircularProgress/> : <>
                    <Stack gap={1} justifyItems="center">
                    <Stack sx={{ justifyItems: "center", alignItems: "center" }} >
                        <Typography variant="h6">Fecha de creacion: </Typography>
                        <Typography color="text.secondary" fontSize={16} variant="h6">{ (data["creationDate"]) ? upperCaseFirstLetter(format(data["creationDate"], "EEEE d 'de' MMMM 'del' yyyy", { locale: es })) : "Seleccione un dato" }</Typography>
                    </Stack>

                    <Stack sx={{ justifyItems: "center", alignItems: "center" }} >
                        <Typography variant="h6">Fecha reservada: </Typography>
                        <Typography color="text.secondary" fontSize={16} variant="h6">{ (data["dateReserved"]) ? upperCaseFirstLetter(format(data["dateReserved"], "EEEE d 'de' MMMM 'del' yyyy", { locale: es })) : "Seleccione un dato" }</Typography>
                    </Stack>

                    <Stack sx={{ justifyItems: "center", alignItems: "center" }} >
                        <Typography variant="h6">Hora inicio - Hora fin: </Typography>
                        <Typography color="text.secondary" fontSize={16} variant="h6">{ (data["creationDate"]) ? `${ data["initionTime"] } - ${ data["expirationTime"] }` : "Seleccione un dato" }</Typography>
                    </Stack>

                    <Stack sx={{ justifyItems: "center", alignItems: "center" }} >
                        <Typography variant="h6">Cliente: </Typography>
                        <Typography color="text.secondary" fontSize={16} variant="h6">{ (data["creationDate"]) ? data["asignedCustomer"] : "Seleccione un dato"}</Typography>
                    </Stack>

                    <Stack sx={{ justifyItems: "center", alignItems: "center" }} >
                        <Typography variant="h6">Empleado: </Typography>
                        <Typography color="text.secondary" fontSize={16} variant="h6">{ (data["creationDate"]) ? data["asignedEmployee"] : "Seleccione un dato" }</Typography>
                    </Stack>
                </Stack>

                { (data["creationDate"]) ? <>
                    <SubHeaderList reserveDetail={detail}></SubHeaderList>

                    <Stack>
                        <Typography variant="h6">Total a pagar </Typography>
                        <Typography color="text.secondary" fontSize={16} variant="h6">S/. { total }</Typography>
                    </Stack>
                </> : "" }
                </> }
            </Stack>
        </Card>
    );
}