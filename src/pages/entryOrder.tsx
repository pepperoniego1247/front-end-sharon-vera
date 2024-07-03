import { Table } from "../components/table";
import { Tabs, Grid, List, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItemAvatar, ListItemText, Avatar, Alert, ListItem, Switch, Button, Stack, Autocomplete, TextField, Box, Divider, Typography, Tab } from "@mui/material";
import { SideBar } from "../components/sideBar";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/zh-cn'
import { SimpleListDetail } from "../components/simpleList";
import FeedIcon from '@mui/icons-material/Feed';
import { GridRowSelectionModel } from "@mui/x-data-grid";
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CustomerDataType, EmployeeDataType, OrderEntryData, ReserveDataType } from "../helpers/types";
import "../styles/employeeCrudForm.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import "../styles/reserveForm.css";
import { useParams } from "react-router-dom";
import utc from 'dayjs/plugin/utc';
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ConstructionOutlined } from "@mui/icons-material";
import { LoadData } from "../api/requests";

export const EntryOrder: React.FC<{}> = () => {
    const { id } = useParams();
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const navigator = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
            navigator("/");
    }, []);

    const headers: any = [
        { field: "date", type: "date", width: 140, headerName: "Fecha" },
        { field: "provider", type: "string", width: 200, headerName: "Proveedor" },
        { field: "employee", type: "string", width: 200, headerName: "Empleado" },
        {
            field: "", type: "actions", width: 100, cellClassName: "actions", headerClassName: 'super-app-theme--header', headerAlign: "center", headerName: "Detalle", getActions: () => {
                return [
                    <GridActionsCellItem
                        icon={<FeedIcon />}
                        label="Detalle"
                        onClick={() => setIsOpenDetail(true)}
                        color="inherit"
                    />
                ];
            }
        },
    ];

    const headersDetail: any = [
        { field: "name", type: "string", width: 140, headerName: "Nombre" },
        { field: "quantity", type: "string", width: 200, headerName: "Cantidad" },
    ]

    //! ELIMINAR RESERVA POR QUE NO SE PUEDE MODIFICAR EN CUYO CASO SE QUIERA HACER CAMBIOS!

    const [isError, setIsError] = useState<boolean>(false);
    const [isErrorDisable, setIsErrorDisable] = useState<boolean>(false);

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [isRegisterReserve, setIsRegisterReserve] = useState<boolean>(true);

    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const [isShowAddButton, setIsShowAddButton] = useState<boolean>(false);

    const [isAddDetail, setIsAddDetail] = useState<boolean>(false);
    const [isAddProduct, setIsAddProduct] = useState<boolean>(false);


    const [isOrderComplete, setIsOrderComplete] = useState<boolean>(true);
    const [isDetailComplete, setIsDetailComplete] = useState<boolean>(true);

    const [OrderId, setOrderId] = useState<GridRowSelectionModel>([]);
    const [newOrderDetailId, setNewOrderDetailId] = useState<GridRowSelectionModel>([]);
    const [OrderDetailId, setOrderDetailId] = useState<GridRowSelectionModel>([]);

    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');


    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [isErrorDeleteReserve, setIsErrorDeleteReserve] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isDisableOrder, setIsDisableOrder] = useState<boolean>(false);



    const [dataOrderEntry, setDataOrderEntry] = useState<OrderEntryData>({
        date: dayjs().toDate(),
        activo: true,
        employee: "",
        provider: "",
        orderEntryDetails: []
    })
    const [dataDetailOrderEntry, setDataDetailOrderEntry] = useState<any[]>([]);

    const [newOrderEntryDetail, setNewOrderEntryDetail] = useState<any>({
        name: "",
        quantity: "",
    })

    const handleAddDetail = () => {
        if (newOrderEntryDetail.name != "" && newOrderEntryDetail.quantity != "") {
            console.log("Siuuu");
            setIsDetailComplete(true);
            setDataDetailOrderEntry([...dataDetailOrderEntry, newOrderEntryDetail]);
            setNewOrderEntryDetail({
                name: "",
                quantity: ""
            });
        }
        else {
            console.log("Nouuuuu");
            setIsDetailComplete(false);
            setTimeout(() => {
                setIsDetailComplete(true);
            }, 4000);
        }
    };

    const handleDeleteDetail = () => {
        setDataDetailOrderEntry(dataDetailOrderEntry.filter((_, i) => i !== newOrderDetailId[0]));
    }

    useEffect(() => {
        if (newOrderDetailId[0] != null) {
            setIsAddProduct(false);
        }
        else {
            setIsAddProduct(true);
        }
    }, [newOrderDetailId]);
    /*
        useEffect(() => {
            if (OrderId[0] != null) {
                setIsShowAddButton(false);
            }
            else {
                setIsShowAddButton(true);
            }
        }, [OrderId]);
    */
    const handleIsAddDetail = () => {
        if (dataOrderEntry.provider != "" && dataOrderEntry.employee != "") {
            setIsAddDetail(true);
            setIsOrderComplete(true);

        }
        else {
            setIsAddDetail(false);
            setIsOrderComplete(false);
            setTimeout(() => {
                setIsOrderComplete(true);
            }, 4000);
        }
    }

    const handleBackOrder = () => {
        setIsOpenDetail(false);
    }

    const registerOrder = useMutation({
        mutationFn: async () => {
            const response = await fetch("https://backend-sharon-3.onrender.com/order_entry/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${ localStorage.getItem("jwt") }`
                },
                body: JSON.stringify({
                    ...dataOrderEntry, orderEntryDetails: dataDetailOrderEntry
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error registering Order');
            }

            return response.json();
        },
        onError: (error) => { setIsError(true); setTimeout(() => setIsError(false), 3000); },
        onSuccess: (success) => {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
            setIsAddDetail(false);
            setDataOrderEntry({
                date: dayjs().toDate(),
                activo: true,
                employee: "",
                provider: "",
                orderEntryDetails: []
            });
            setDataDetailOrderEntry([]);
            setNewOrderEntryDetail({
                name: "",
                quantity: "",
            })
        }
    });

    const loadDataEmployee = LoadData("loadDataEmployee", "https://backend-sharon-3.onrender.com/employee/get_all/");

    // const loadDataEmployee = useQuery({
    //     queryKey: ["getDataEmployee"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/employee/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const loadDataProvider = LoadData("loadDataProvider", "https://backend-sharon-3.onrender.com/provider/get_all/");

    // const loadDataProvider = useQuery({
    //     queryKey: ["getDataProvider"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/provider/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const loadDataProduct = LoadData("loadDataProduct", "https://backend-sharon-3.onrender.com1/product/get_all/");

    // const loadDataProduct = useQuery({
    //     queryKey: ["getDataProduct"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/product/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });



    const disableOrder = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`https://backend-sharon-3.onrender.com/order_entry/disable_by_id/${OrderId[0]}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("HTTP ERROR");
                return response.json();
            }
            catch {
                setIsErrorDisable(true); setTimeout(() => setIsErrorDisable(false), 3000);
            }
        },
        onError: (error) => { setIsErrorDisable(true); setTimeout(() => setIsErrorDisable(false), 3000); }
        /*
        onError: (error) => setIsErrorDeleteReserve(true),
        onSettled: () => setTimeout(() => setIsErrorDeleteReserve(false), 2000)
        */
    });
    /*
        const deleteReserve = useMutation({
            mutationFn: async () => {
                const response = await fetch(`http://localhost:3001/reserve/delete/${OrderId[0]}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                if (!response.ok) throw new Error("HTTP ERROR");
                return response.json();
            },
            onError: (error) => setIsErrorDeleteReserve(true),
            onSettled: () => setTimeout(() => setIsErrorDeleteReserve(false), 2000)
        });
    
    */

    const loadDataOrder = LoadData("getDataOrder", "https://backend-sharon-3.onrender.com/order_entry/get_all/");

    // const loadDataOrder = useQuery({
    //     queryKey: ["getDataOrder"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/order_entry/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR!");
    //         return response.json();
    //     }
    // });

    const loadDataDetail = LoadData("getDataDetail", `https://backend-sharon-3.onrender.com/order_entry/get_by_id/${OrderId[0]}`);

    // const loadDataDetail = useQuery({
    //     queryKey: ["getDataDetail"],
    //     queryFn: async () => {
    //         const response = await fetch(`http://localhost:3001/order_entry/get_by_id/${OrderId[0]}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         if (!response.ok) throw new Error("HTTP ERROR!");
    //         return response.json();
    //     }
    // });


    const dataRowEmployee = () => {
        const loadedData: string[] = [];
        if (!loadDataEmployee.data) return loadedData;

        loadDataEmployee["data"].forEach((employee: any) => loadedData.push(employee["person"]["firstName"]));
        return loadedData;
    }

    const dataRowProvider = () => {
        const loadedData: string[] = [];
        if (!loadDataProvider.data) return loadedData;

        loadDataProvider["data"].forEach((provider: any) => loadedData.push(provider["name"]));
        console.log(loadedData);
        return loadedData;
    }

    const dataRowProduct = () => {
        const loadedData: string[] = [];
        if (!loadDataProduct.data) return loadedData;

        loadDataProduct["data"].forEach((product: any) => loadedData.push(product["name"]));
        console.log(loadedData);
        return loadedData;
    }

    const allProducts = dataRowProduct();

    const dataAvailableProducts = () => {
        const addedProductNames = dataDetailOrderEntry.map(entry => entry.name);
        const availableProducts = allProducts.filter(product => !addedProductNames.includes(product));
        return availableProducts;
    };
    /*
        const dataAvailableProducts = () => {
            const data: any[] = dataDetailOrderEntry;
            if (data[0] != null){
                const availableProducts = allProducts.filter((product:any) => !data["name"].includes(product["name"]));
                return availableProducts;
            }
            else{
                return allProducts;
            }
        }
    */

    /*
    useEffect( ()=>{
        console.log(availableProducts);
    },[dataDetailOrderEntry]) */











    const changeIsError = () => setIsError(false);

    const handleSubmitOrder = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (dataDetailOrderEntry.length > 0) {
                await registerOrder.mutateAsync();
            }
            else {
                setIsError(true); setTimeout(() => setIsError(false), 3000);
            }
            /*
            setDataReserve({
                reserveDate: null,
                initionDate: null,
                expirationDate: null,
                activo: true,
                asignedEmployee: "",
                asignedCustomer: "",
            });
            setReserveDetails([]);
            */
            loadDataOrder.refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const dataRowOrder = () => {
        const loadedDataOrder: any = [];
        if (!loadDataOrder.data) return loadedDataOrder;


        loadDataOrder["data"].forEach((order_entry: any) => {
            const { employee, provider } = order_entry;
            loadedDataOrder.push({
                id: order_entry["id"],
                activo: order_entry["activo"],
                date: new Date(order_entry["date"]),
                /*
                initionDate: new Date(reserve["initionDate"]),
                expirationDate: new Date(reserve["expirationDate"]),
                */
                employee: `${employee["person"]["firstName"]} ${employee["person"]["lastName"]}`,
                provider: `${provider["name"]}`,
                /*reserveDetails: reserveDetails,*/
                /*
                //* ------------------------
                creationDate: new Date(reserve["reserveDate"]),
                dateReserved: new Date(reserve["initionDate"]),
                initionTime: new Date(reserve["initionDate"]).toLocaleTimeString(),
                expirationTime: new Date(reserve["expirationDate"]).toLocaleTimeString(),
                */
            });
        });

        return loadedDataOrder;
    }

    const dataRowDetail = () => {
        const loadedDataDetail: any[] = [];
        if (OrderId[0] != null) {
            if (!loadDataDetail.data) return loadedDataDetail;

            const Order = loadDataDetail["data"];
            Order["orderEntryDetails"].forEach((detail: any) => {
                loadedDataDetail.push({
                    id: detail.id,
                    name: detail.name,
                    quantity: detail.quantity,
                });
            })
        }
        else {
            return loadedDataDetail;
        }
        return loadedDataDetail;
    };

    const dataNewRowDetail = () => {
        const loadedDataDetail: any[] = [];
        if (!dataDetailOrderEntry) return loadedDataDetail;

        let idCounter = 0; // Inicializar el contador de IDs

        dataDetailOrderEntry.forEach((detail: any) => {
            loadedDataDetail.push({
                id: idCounter++, // Asignar y luego incrementar el ID
                name: detail.name,
                quantity: detail.quantity,
            });
        });

        console.log(loadedDataDetail);
        return loadedDataDetail;
    };
    /*
        useEffect(() => {
            loadDataDetail.refetch();
        }, [OrderId]);
    */

    useEffect(() => {

        if (OrderId[0] != null) {
            setIsShowAddButton(false);
            setIsDisabled(true);
        }
        else {
            setIsShowAddButton(true);
            setIsDisabled(false);
        }

        loadDataDetail.refetch();

        const order: any = dataRowOrder().find((order: any) => order["id"] === OrderId[OrderId.length - 1]);
        if (order) {
            const { employee, provider } = order;
            const { person } = employee;
            setDataOrderEntry({
                date: order["date"],
                activo: order["activo"],
                employee: order["employee"],
                provider: order["provider"],
                orderEntryDetails: dataDetailOrderEntry
            });
            /*
            setDataReserveDetail(reserveDetails);
            setIsRegisterReserve(false);
            */
        } else {
            setDataOrderEntry({
                date: dayjs().toDate(),
                activo: true,
                employee: "",
                provider: "",
                orderEntryDetails: []
            });
            /*
            setDataReserveDetail([]);
            setDataReserve({
                reserveDate: null,
                initionDate: null,
                expirationDate: null,
                activo: true,
                asignedEmployee: "",
                asignedCustomer: ""
            });
            setIsRegisterReserve(true);
            */
        }
        /*
        const reserve: any = dataRowOrder().find((reserve: any) => reserve["id"] === OrderId[OrderId.length - 1]);
        if (reserve) {
            const { asignedEmployee, asignedCustomer, reserveDetails } = reserve;
            setDataReserve({
                reserveDate: new Date(reserve["reserveDate"]),
                initionDate: new Date(reserve["initionDate"]),
                expirationDate: new Date(reserve["expirationDate"]),
                activo: reserve["activo"],
                asignedEmployee: asignedEmployee,
                asignedCustomer: asignedCustomer
            });
            setDataReserveDetail(reserveDetails);
            setIsRegisterReserve(false);
        } else {
            setDataReserveDetail([]);
            setDataReserve({
                reserveDate: null,
                initionDate: null,
                expirationDate: null,
                activo: true,
                asignedEmployee: "",
                asignedCustomer: ""
            });
            setIsRegisterReserve(true);
        }
            */
    }, [OrderId]);

    /*
        useEffect(() => {
            const detail: any = dataNewRowDetail().find((reserve: any) => reserve["id"] === OrderDetailId[OrderDetailId.length]);
            
        }, [OrderDetailId]);
        */

    return (
        <Grid className="body-reserve-core">
            {(isOpenDialog) ? <>
                <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"¿Estas seguro(a) que quieres deshabilitar esta Orden?"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deshabilitar la orden es una acción irreversible, no podrá deshabilitar una orden si su stock actual es menor que la cantidad ingresada o si el nombre del producto es distinto que en el detalle.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={async () => {
                            await disableOrder.mutateAsync();
                            loadDataOrder.refetch();
                            setIsOpenDialog(false);
                        }}>Confirmar</Button>
                        <Button onClick={() => setIsOpenDialog(false)}>Cancelar</Button>
                    </DialogActions>
                </Dialog>
            </> : null}
            <SideBar title='ORDEN DE ENTRADA'></SideBar>
            <Stack>
                <Box className="reserve-container">

                    {(isSuccess) ? <Alert sx={{ position: "absolute", zIndex: "9999", transform: "translateX(145vh) translateY(9vh)" }} severity="success">
                        La Orden de Entrada se registró correctamente!
                    </Alert> : null}

                    {(isError) ? <Alert sx={{ position: "absolute", zIndex: "9999", transform: "translateX(139vh) translateY(9vh)" }} severity="error">
                        No se pudo registrar la Orden de Entrada!
                    </Alert> : null}

                    {(isErrorDisable) ? <Alert sx={{ position: "absolute", zIndex: "9999", transform: "translateX(139vh) translateY(9vh)" }} severity="error">
                        No se pudo deshabilitar la Orden de Entrada!
                    </Alert> : null}

                    {(!isOrderComplete) ? <Alert sx={{ position: "absolute", zIndex: "9999", transform: "translateX(139vh) translateY(9vh)" }} severity="error">
                        Los campos deben estar llenos antes de añadir productos!
                    </Alert> : null}

                    {(!isDetailComplete) ? <Alert sx={{ position: "absolute", zIndex: "9999", transform: "translateX(139vh) translateY(9vh)" }} severity="error">
                        Los campos deben estar llenos antes de añadir el detalle!
                    </Alert> : null}

                    {(isErrorDeleteReserve) ? <Alert sx={{ position: "absolute", zIndex: "9999", transform: "translateX(139vh) translateY(9vh)" }} severity="error">
                        Ha ocurrido un error al eliminar la reserva!
                    </Alert> : null}

                    <Stack direction="row" gap={4}>
                        {(!isOpenDetail) ? (
                            (!isAddDetail) ?
                                <Table setData={setOrderId} headers={headers} dataRow={dataRowOrder()} sx={{ height: "85vh", width: "130vh", marginTop: "95px", marginLeft: "30px" }} data={OrderId}></Table> :
                                <Table setData={setNewOrderDetailId} headers={headersDetail} dataRow={dataNewRowDetail()} sx={{ height: "85vh", width: "130vh", marginTop: "95px", marginLeft: "30px" }} data={newOrderDetailId}></Table>) :
                            <Table setData={setOrderDetailId} headers={headersDetail} dataRow={dataRowDetail()} sx={{ height: "65vh", width: "80vh", marginTop: "95px", marginLeft: "30px" }} data={OrderDetailId}></Table>
                        }

                        <Stack sx={{ height: "20%", width: "30vh" }} gap={2}>
                            {(!isAddDetail) ? <div className="reserve-form">
                                <div className="data-reserve-form">
                                    <form action="" >
                                        <Typography variant="h4" component="h1">Informacion</Typography>

                                        <Stack gap={2} sx={{ paddingBottom: "4vh" }} onClick={changeIsError}>
                                            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                                <DatePicker disabled maxDate={dayjs()} format="DD/MM/YYYY" value={dayjs(dataOrderEntry.date)} />
                                            </LocalizationProvider>

                                            <Autocomplete inputValue={inputValue} onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }} renderInput={(params) => <TextField {...params} label="Proveedor" />} disabled={isDisabled} value={dataOrderEntry.provider} onClick={changeIsError} onChange={(event: any, newValue: string | null) => {
                                                setDataOrderEntry({ ...dataOrderEntry, provider: newValue! });
                                            }} options={dataRowProvider()} />

                                            <Autocomplete inputValue={inputValue2} onInputChange={(event, newInputValue) => {
                                                setInputValue2(newInputValue);
                                            }} renderInput={(params) => <TextField {...params} label="Empleado" />} disabled={isDisabled} value={dataOrderEntry.employee} onClick={changeIsError} onChange={(event: any, newValue: string | null) => {
                                                setDataOrderEntry({ ...dataOrderEntry, employee: newValue! });
                                            }} options={dataRowEmployee()} />

                                            {(!isOpenDetail) ? (
                                                isShowAddButton ? (
                                                    <Button variant="contained" onClick={handleIsAddDetail} >Añadir Productos</Button>
                                                ) : (
                                                    <Button variant="contained" onClick={async () => {
                                                        setIsOpenDialog(true);
                                                    }} >Deshabilitar</Button>
                                                )
                                            ) : (
                                                <Button variant="contained" type="submit" onClick={handleBackOrder} >Regresar</Button>
                                            )}


                                        </Stack>
                                    </form>
                                </div>
                            </div> :
                                <div className="reserve-form">
                                    <div className="data-reserve-form">
                                        <form action="" onSubmit={handleSubmitOrder}>
                                            <Typography variant="h4" component="h1">Informacion</Typography>
                                            <Stack gap={2} sx={{ paddingBottom: "4vh" }} onClick={changeIsError}>
                                                <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                                <TextField label="Cantidad" value={newOrderEntryDetail.quantity} onClick={changeIsError} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    if (/^\d*$/.test(event.target.value)) { // Expresión regular para permitir solo números
                                                        setNewOrderEntryDetail({ ...newOrderEntryDetail, quantity: event.target.value })
                                                    }
                                                    /*
                                                    setNewOrderEntryDetail({ ...newOrderEntryDetail, quantity: event.target.value });
                                                    */
                                                }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}></TextField>

                                                <Autocomplete inputValue={inputValue3} onInputChange={(event, newInputValue) => {
                                                    setInputValue3(newInputValue);
                                                }} renderInput={(params) => <TextField {...params} label="Producto" />} value={newOrderEntryDetail.name} onClick={changeIsError} onChange={(event: any, newValue: string | null) => {
                                                    setNewOrderEntryDetail({ ...newOrderEntryDetail, name: newValue! });
                                                }} options={dataAvailableProducts()} />

                                                {(isRegisterReserve) ? <>
                                                    {(isAddProduct) ? <Button variant="contained" onClick={handleAddDetail} >Añadir</Button> : <Button variant="contained" onClick={handleDeleteDetail} >Quitar</Button>}
                                                    <Button variant="contained" type="submit">Registrar Orden</Button>
                                                </> : null}
                                            </Stack>
                                        </form>
                                    </div>
                                </div>}


                            {/*(!isRegisterReserve) ? <SimpleListDetail dataRow={dataReserveDetail} sx={{ height: "20%", width: "44vh", backgroundColor: "#262726", maxHeight: "23.3vh", transform: "translateY(12.2vh)", borderRadius: "5px" }}></SimpleListDetail> :
                                null
                            */}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Grid>
    );
}
