import { Grid, Stack, Box, TextField, Button, Divider, Typography, Switch, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import "../styles/customerPage.css";
import { SideBar } from "../components/sideBar";    
import { Table } from "../components/table";
import { FormDialog } from "../components/openDialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { CustomerDataType, RoleData } from "../helpers/types";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { LoadData, RegisterData, UpdateData } from "../api/requests";
import { useNavigate } from "react-router-dom";

export const CustomersPage: React.FC<{}> = () => {
    const navigator = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
            navigator("/");
    }, []);

    const headers: any = [
        { field: "firstName", type: "string", width: 200, headerName: "Nombres" },
        { field: "lastName", type: "string", width: 200, headerName: "Apellidos" },
        { field: "dni", type: "string", width: 180, headerName: "Dni" },
        { field: "phoneNumber", type: "string", width: 180, headerName: "Numero celular" },
        { field: "activo", type: "boolean", width: 170, headerName: "Activo" },
    ];

    const [dataCustomer, setDataCustomer] = useState<CustomerDataType>({
        dni: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        notation: "",
        activo: true
    });
    const [customerId, setCustomerId] = useState<GridRowSelectionModel>([]);
    const [isRegisterCustomer, setIsRegisterCustomer] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [switchState, setSwitchState] = useState<boolean>(false);

    const registerCustomer = RegisterData("RegisterCustomer", "https://backend-sharon-3.onrender.com/customer/register/", dataCustomer);

    // const registerCustomer = useMutation({
    //     mutationFn: async () => {
    //         const response = await fetch("http://localhost:3001/customer/register/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    //             },
    //             body: JSON.stringify(dataCustomer)
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // })

    const updateCustomer = UpdateData("updateCustomer", `https://backend-sharon-3.onrender.com/customer/update_by_id/${customerId[customerId.length - 1]}`, dataCustomer);

    // const updateCustomer = useMutation({
    //     mutationFn: async () => {
            // const response = await fetch(`http://localhost:3001/customer/update_by_id/${customerId[customerId.length - 1]}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    //             },
    //             body: JSON.stringify(dataCustomer)
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // })

    const loadDataCustomer = LoadData("getDataCustomer", "https://backend-sharon-3.onrender.com/customer/get_all/");

    // const loadDataCustomer = useQuery({
    //     queryKey: ["getDataCustomer"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/customer/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    //             }
    //         });

    //         if (!response.ok) return new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const dataCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(dataCustomer);

        setDataCustomer({ ...dataCustomer, [e.target.name]: e.target.value })
    };

    const dataRowCustomer = () => {
        const loadedData: any[] = [];
        if (!loadDataCustomer.data) return loadedData;

        loadDataCustomer["data"].forEach((customer: any) => {
            delete customer["person"]["id"];
            loadedData.push({ id: customer["id"], notation: (!customer["notation"]) ? "" : customer["notation"], ...customer["person"] })
        });

        return loadedData;
    }

    useEffect(() => {
        const customer = dataRowCustomer().find((customer: any) => customer["id"] === customerId[customerId.length - 1]);

        if (customer) {
            const { id, ...data } = customer;
            setDataCustomer({ ...data });
            setIsRegisterCustomer(false);
            (customer.dni) ? setIsAllowed(true) : setIsAllowed(false);
        } else {
            setDataCustomer({
                firstName: "",
                lastName: "",
                dni: "",
                notation: "",
                activo: true,
                phoneNumber: ""
            });
            setIsRegisterCustomer(true);
        }
    }, [customerId]);

    const changeIsError = () => setIsError(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            (isRegisterCustomer) ? await registerCustomer.mutateAsync() : await updateCustomer.mutateAsync();
            setDataCustomer({
                dni: "",
                firstName: "",
                lastName: "",
                notation: "",
                phoneNumber: "",
                activo: true
            });
            loadDataCustomer.refetch();
            setCustomerId([]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid className="body-customer-crud">
            <SideBar title="CLIENTES"></SideBar>

            <Stack sx={{ height: "100vh", justifyItems: "center", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                <Stack  sx={{ marginTop: { lg: "8vh", xs: (customerId.length > 0) ? "72vh" : "60vh" }, flexDirection: { lg: "row", xs: "column-reverse" }, justifyContent: { xs: "center" }, paddingBottom: { xs: "4vh", lg: "0vh" }, alignContent: { xs: "center" }, justifyItems: { xs: "center" }, alignItems: { xs: "center", lg: "normal" } }} gap={4}>
                    <Table headers={headers} data={customerId} dataRow={dataRowCustomer()} setData={setCustomerId} sx={{ width: { lg: "68vw", xs: "90vw" }, height: { lg: "85vh", xs: "70vh" } }}></Table>

                    <Box className="data-crud-customer-form" sx={{ minHeight: (customerId.length > 0) ? "73vh" : "60vh", width: { lg: "27vw", xs: "90vw" } }}>
                       { registerCustomer.isPending || updateCustomer.isPending ? <CircularProgress/> :  <div className="data-crud-customer-background">
                            <form onSubmit={handleSubmit}>
                                <Stack gap={2} sx={{ width: "40vh" }}>
                                    <div>
                                        <Stack direction="row" gap={15} alignItems="center">
                                            <Typography variant="h4" component="h1">Cliente</Typography>

                                            {/* //!VOLVER ESTO UN COMPONENTE */}
                                            {(isRegisterCustomer) ? <Stack direction="row" alignItems="center">
                                                <Typography fontSize={12}>Dni</Typography>
                                                <Switch size='small' value={switchState} onClick={() => {
                                                    if (switchState) {
                                                        setSwitchState(false);
                                                        setDataCustomer({ ...dataCustomer, dni: "" });
                                                    } else {
                                                        setSwitchState(true);
                                                        setDataCustomer({ ...dataCustomer, firstName: "" });
                                                        setDataCustomer({ ...dataCustomer, lastName: "" });
                                                    }
                                                }} />
                                                <Typography fontSize={12}>Datos</Typography>
                                            </Stack> : null}

                                        </Stack>

                                        <Stack gap={2} sx={{ paddingBottom: "4vh" }}>
                                            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                            {(isRegisterCustomer) ? (!switchState) ? <>
                                                <TextField onChange={dataCustomerChange} required value={dataCustomer.dni} error={isError} onClick={changeIsError} variant="outlined" name="dni" label="Dni" type="text" autoComplete="off"></TextField>
                                            </> : <>
                                                <TextField onChange={dataCustomerChange} required value={dataCustomer.firstName} error={isError} onClick={changeIsError} variant="outlined" name="firstName" label="Nombre(s)" type="text" autoComplete="off"></TextField>
                                                <TextField onChange={dataCustomerChange} required value={dataCustomer.lastName} error={isError} onClick={changeIsError} variant="outlined" name="lastName" label="Apellidos" type="text" autoComplete="off"></TextField>
                                            </> : <>
                                                <TextField onChange={dataCustomerChange} disabled={isAllowed} value={dataCustomer.dni} error={isError} onClick={changeIsError} variant="outlined" name="dni" label="Dni" type="text" autoComplete="off"></TextField>
                                                <TextField onChange={dataCustomerChange} disabled={!isRegisterCustomer} value={dataCustomer.firstName} error={isError} onClick={changeIsError} variant="outlined" name="firstName" label="Nombre(s)" type="text" autoComplete="off"></TextField>
                                                <TextField onChange={dataCustomerChange} disabled={!isRegisterCustomer} value={dataCustomer.lastName} error={isError} onClick={changeIsError} variant="outlined" name="lastName" label="Apellidos" type="text" autoComplete="off"></TextField>
                                            </>}

                                            <TextField onChange={dataCustomerChange} value={dataCustomer.phoneNumber} error={isError} onClick={changeIsError} variant="outlined" name="phoneNumber" label="Numero celular" type="text" autoComplete="off"></TextField>

                                            {(!isRegisterCustomer) ?
                                                <FormDialog title="Anotaciones" icon={<EditNoteIcon />} sx={{ width: { lg: "37.3vw", xs: "83vw" }, justifyItems: "center", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                                                    <Stack gap={4}>
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            label="Bloc de notas"
                                                            multiline
                                                            name="notation"
                                                            value={dataCustomer.notation}
                                                            onChange={dataCustomerChange}
                                                            rows={20}
                                                            sx={{ width: { lg: "34.2vw", xs: "70.5vw" } }}
                                                        />

                                                        <Button onClick={async () => {
                                                            try {
                                                                await updateCustomer.mutateAsync();
                                                                loadDataCustomer.refetch();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }} variant="contained" type="submit">Guardar cambios</Button>
                                                    </Stack>
                                                </FormDialog>
                                                : null}
                                            <FormControlLabel control={<Checkbox defaultChecked value={dataCustomer.activo} onChange={(e: ChangeEvent<HTMLInputElement>, checked: boolean) => setDataCustomer({ ...dataCustomer, activo: checked })} />} label="Activo" />

                                            <Divider sx={{ marginTop: "1px", marginBottom: "1px" }} />
                                            {(isRegisterCustomer) ? <Button variant="contained" onClick={() => setIsRegisterCustomer(true)} type="submit">Registrar</Button> : <Button onClick={() => setIsRegisterCustomer(false)} variant="contained" type="submit">Editar</Button>}
                                        </Stack>
                                    </div>
                                </Stack>
                            </form>
                        </div> }
                    </Box>

                </Stack>
            </Stack>
        </Grid>
    );
}