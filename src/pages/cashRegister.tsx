import { Divider, Drawer, Button, Typography, FormControl, TextField, InputLabel, Badge, Grid, Box, Stack, Select, MenuItem, SelectChangeEvent, Checkbox, FormControlLabel, InputAdornment, CircularProgress } from "@mui/material";
import emptyListImage from "../assets/empty-list-image.png";
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import SearchIcon from '@mui/icons-material/Search';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from "react-router-dom";
import { SelectTextField } from "../components/select";
import "../styles/cashRegisterPage.css";
import { styled } from '@mui/material/styles';
import { FormEvent } from "react";
import { BadgeProps } from "@mui/material";
import { Table } from "../components/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, ChangeEvent } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SideBar } from "../components/sideBar";
import { DisplayInformation } from "../components/reserveInformation";
import CheckIcon from '@mui/icons-material/Check';
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { MediaCard } from "../components/card";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { CancelReserveType, ProductDataType, ReserveDataType, SaleProductType, TypeOfDocumentProps, filterDataType } from "../helpers/types";
import { LoadData, RegisterData } from "../api/requests";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 0,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export const CashRegisterPage: React.FC<{}> = () => {
    const navigator = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
            navigator("/");
    }, []);

    const headersReserve: any = [
        { field: "creationDate", type: "date", width: 100, headerName: "Fecha de creacion" },
        { field: "dateReserved", type: "date", width: 116, headerName: "Fecha reservada" },
        { field: "initionTime", type: "time", width: 120, headerName: "Hora de inicio" },
        { field: "expirationTime", type: "string", width: 130, headerName: "Hora de finalizacion" },
        { field: "asignedCustomer", type: "string", width: 200, headerName: "Cliente" },
        {
            field: 'paymentMethod', headerName: 'Metodo de pago', width: 170,
            renderCell: (params: any) => {
                return params.row.id === reserveId[0] && params.row.activo !== false ? (
                    <Select
                        value={dataReserve.paymentMethod}
                        onChange={(event) => setDataReserve({ ...dataReserve, [event.target.name]: event.target.value })}
                        variant="outlined"
                        name="paymentMethod"
                        required
                        size="small"
                        fullWidth
                    >
                        {["VISA", "EFECTIVO", "BCP", "YAPE", "PLIN", "BBVA"].map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    params.value
                )
            }
        },
        {
            field: 'typeOfDocument', headerName: 'Documento', width: 120,
            renderCell: (params: any) => {
                return params.row.id === reserveId[0] && params.row.activo !== false ? (
                    <Select
                        value={dataReserve.typeOfDocument}
                        onChange={(event) => setDataReserve({ ...dataReserve, [event.target.name]: event.target.value })}
                        variant="outlined"
                        name="typeOfDocument"
                        size="small"
                        required
                        fullWidth
                    >
                        {["Nota de venta", "Boleta de venta"].map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    params.value
                )
            }
        },
        {
            field: "", type: "actions", width: 100, cellClassName: "actions", headerClassName: 'super-app-theme--header', headerAlign: "center", headerName: "Pagar", getActions: (params: any) => {
                return params.row.id === reserveId[0] && params.row.activo !== false ? [
                    <GridActionsCellItem
                        icon={<CheckIcon />}
                        label="Pagar"
                        onClick={async () => {
                            try {
                                const data = await registerSaleReserve.mutateAsync();
                                window.open(data["pdfUrl"]);
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        color="inherit"
                    />
                ] : [];
            }
        },
        { field: "activo", type: "boolean", width: 100, headerName: "Pendiente" },
    ];

    const [counter, setCounter] = useState<number>(0);
    const [listCategory, setListCategory] = useState<string[]>([]);
    const [dataReserveDetail, setDataReserveDetail] = useState<any[]>([]);
    const [typeOfDocument, setTypeOfDocument] = useState<TypeOfDocumentProps>({
        type: "Nota de venta"
    });
    const [dataProductSale, setDataProductSale] = useState<SaleProductType>({
        date: new Date(),
        paymentMethod: "",
        employee: "",
        customer: "",
        saleDetails: [],
        customerAddress: ""
    });
    const [total, setTotal] = useState<number>(0);
    const [filterData, setFilterData] = useState<filterDataType>({
        name: "",
        category: "",
        inStock: false
    });

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [listShoppingCar, setListShoppingCar] = useState<ProductDataType[]>([]);
    const [dataReserve, setDataReserve] = useState<CancelReserveType>({
        asignedCustomer: "",
        asignedEmployeeId: "",
        creationDate: undefined,
        typeOfDocument: "Nota de venta",
        dateReserved: undefined,
        initionTime: "",
        expirationTime: "",
        paymentMethod: "",
        asignedEmployee: ""
    });

    const [value, setValue] = useState('1');
    const [reserveId, setReserveId] = useState<GridRowSelectionModel>([]);
    const [listProduct, setListProduct] = useState<ProductDataType[]>([]);
    const [tempListProduct, setTempListProduct] = useState<ProductDataType[]>([]);
    const [tempList, setTempList] = useState<ProductDataType[]>([]);

    const registerSaleReserve = RegisterData("registerSaleReserve", `https://backend-sharon-3.onrender.com/sale/register/${reserveId}`, {
        date: new Date(),
        paymentMethod: dataReserve["paymentMethod"],
        asignedEmployee: dataReserve["asignedEmployeeId"],
        typeOfDocument: dataReserve["typeOfDocument"]
    });

    // const registerSaleReserve = useMutation({
    //     mutationFn: async () => {
    //         const response = await fetch(`http://localhost:3001/sale/register/${ reserveId }`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 date: new Date(),
    //                 paymentMethod: dataReserve["paymentMethod"],
    //                 asignedEmployee: dataReserve["asignedEmployeeId"],
    //                 typeOfDocument: dataReserve["typeOfDocument"]
    //             })
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //      }
    // });

    const registerSaleProduct = RegisterData("registerSaleProduct", "https://backend-sharon-3.onrender.com/sale_product/register/", {
        ...dataProductSale,
        typeOfDocument: typeOfDocument["type"]
    });

    // const registerSaleProduct = useMutation({
    //     mutationFn: async () => {
    //         const response = await fetch("http://localhost:3001/sale_product/register/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ ...dataProductSale, typeOfDocument: typeOfDocument["type"] })
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const loadDataCustomer = LoadData("getDataCustomer", "https://backend-sharon-3.onrender.com/customer/get_all/");
    // const loadDataCustomer = useQuery({
    //     queryKey: ["getDataCustomer"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/customer/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const loadDataEmployee = LoadData("getDataEmployee", "https://backend-sharon-3.onrender.com/employee/get_all/");

    // const loadDataEmployee = useQuery({
    //     queryKey: ["getDataEmployee"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/employee/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const loadDataReserve = LoadData("getDataReserve", "https://backend-sharon-3.onrender.com/reserve/get_all/");

    // const loadDataReserve = useQuery({
    //     queryKey: ["getDataReserve"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/reserve/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR!");
    //         return response.json();
    //     }
    // });

    // const loadDataProduct = LoadData("getDataProductN", "http://localhost:3001/product/get_all/");

    const loadDataProduct = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ["getDataProductN"],
        queryFn: async () => {
            const response = await fetch("https://backend-sharon-3.onrender.com/product/get_all/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("jwt")}`
                }
            });

            if (!response.ok) throw new Error("HTTP ERROR");
            return response.json();
        }
    });

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleSubmitShoppingCar = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await registerSaleProduct.mutateAsync();
            console.log(data)
            setTempListProduct([]);
            setListShoppingCar([]);
            setCounter(0);
            loadDataProduct.refetch();
            setDataProductSale({
                date: new Date(),
                paymentMethod: "",
                employee: "",
                customer: "",
                saleDetails: [],
                customerAddress: ""
            });
            window.open(data["pdfUrl"]);
        } catch (error) {
            console.log(error);
        }
    }

    const dataRowCustomer = () => {
        const list = new Map<string, string>;
        if (!loadDataCustomer.data) return list;

        list.set("", "Ninguno");
        loadDataCustomer.data.forEach((customer: any) => list.set(`${customer["person"]["firstName"]}`, `${customer["person"]["firstName"]} ${customer["person"]["lastName"]}`));
        return list;
    }

    const dataRowPayment = () => {
        const list = new Map<string, string>;
        ["VISA", "EFECTIVO", "BCP", "YAPE", "PLIN", "BBVA"].forEach((payment: any) => list.set(`${payment}`, `${payment}`));
        return list;
    }

    const dataRowTypeOfDocument = () => {
        const list = new Map<string, string>;
        list.set("Nota de venta", "Nota de venta");
        list.set("Boleta de venta", "Boleta de venta");
        return list;
    }

    const dataRowEmployee = () => {
        const list = new Map<string, string>;
        if (!loadDataEmployee.data) return list;

        loadDataEmployee.data.forEach((employee: any) => list.set(`${employee["person"]["firstName"]}`, `${employee["person"]["firstName"]} ${employee["person"]["lastName"]}`));
        return list;
    }

    const dataRowReserve = () => {
        const loadedData: any = [];
        if (!loadDataReserve.data) return loadedData;

        loadDataReserve["data"].forEach((reserve: any) => {
            const { asignedCustomer, reserveDetails, asignedEmployee } = reserve;

            loadedData.push({
                id: reserve["id"],
                activo: reserve["activo"],
                asignedEmployee: asignedEmployee,
                asignedCustomer: `${asignedCustomer["person"]["firstName"]} ${asignedCustomer["person"]["lastName"]}`,
                reserveDetails: reserveDetails,
                //* ------------------------
                creationDate: new Date(reserve["reserveDate"]),
                dateReserved: new Date(reserve["initionDate"]),
                initionTime: new Date(reserve["initionDate"]).toLocaleTimeString(),
                expirationTime: new Date(reserve["expirationDate"]).toLocaleTimeString(),
            });
        });

        return loadedData;
    }

    const sortListProduct = (list: ProductDataType[]) => {
        const newList = list.sort((before, after) => {
            const firstLetter = before["name"].charAt(0).toLocaleUpperCase();
            const secondLetter = after["name"].charAt(0).toLocaleUpperCase();

            if (firstLetter < secondLetter) return -1;
            if (firstLetter > secondLetter) return 1;
            return 0;
        });

        return newList;
    }

    useEffect(() => {
        const loadedData: any = [];
        const loadedCategory: string[] = [];
        if (!loadDataProduct.data) return undefined;

        loadDataProduct["data"].forEach((product: any) => {
            loadedData.push(product);
            loadedCategory.push(product["category"]);
        });

        setListCategory(Array.from(new Set(loadedCategory)));
        setTempList(sortListProduct(loadedData));
    }, [loadDataProduct.data]);

    useEffect(() => {
        setListProduct(tempList);
        setTempListProduct(tempList);
    }, [tempList]);

    useEffect(() => {
        const reserve: any = dataRowReserve().find((reserve: any) => reserve["id"] === reserveId[reserveId.length - 1]);
        if (reserve) {
            const { asignedEmployee, asignedCustomer, reserveDetails } = reserve;
            setDataReserve({
                asignedCustomer: asignedCustomer,
                creationDate: reserve["creationDate"],
                dateReserved: reserve["dateReserved"],
                initionTime: reserve["initionTime"],
                typeOfDocument: "Nota de venta",
                expirationTime: reserve["expirationTime"],
                asignedEmployeeId: asignedEmployee["id"],
                paymentMethod: "",
                asignedEmployee: `${asignedEmployee["person"]["firstName"]} ${asignedEmployee["person"]["lastName"]}`
            });
            setDataReserveDetail(reserveDetails);
        } else {
            setDataReserveDetail([]);
            setDataReserve({
                asignedCustomer: "",
                creationDate: undefined,
                asignedEmployeeId: "",
                dateReserved: undefined,
                typeOfDocument: "Nota de venta",
                initionTime: "",
                expirationTime: "",
                paymentMethod: "",
                asignedEmployee: ""
            });
        }
    }, [reserveId]);

    useEffect(() => console.log(dataReserve), [dataReserve]);

    useEffect(() => {
        const tempListCar: string[] = [];
        let newTotal = 0;
        if (listShoppingCar.length > 0) listShoppingCar.forEach((product: any) => newTotal += (product["price"] * product["cantidadSolicitada"]));
        setTotal(newTotal);
        setListProduct(sortListProduct(listProduct));
        setTempListProduct(sortListProduct(listProduct));
        listShoppingCar.forEach((product: ProductDataType) => tempListCar.push(`${product["cantidadSolicitada"]}.${product["name"]}`));
        setDataProductSale({ ...dataProductSale, saleDetails: tempListCar });
    }, [listShoppingCar]);

    return (
        <Grid className="body-cash-register" >
            <SideBar title="CAJA"></SideBar>
    
            <Drawer sx={{ justifyItems: "center", alignItems: "center" }} open={isOpenDrawer} anchor="right" onClose={() => setIsOpenDrawer(false)}>
                <Stack gap={1} sx={{ margin: "auto", alignItems: "center", width: { xs: "90vw", sm: "80vw", md: "65vh" } }}>
                    {registerSaleProduct.isPending ? <CircularProgress /> : <>
                        <SelectTextField setData={setTypeOfDocument} data={typeOfDocument} listData={dataRowTypeOfDocument()} label="Tipo de documento" name="type"></SelectTextField>
    
                        <Typography variant="h4">Carrito de compras</Typography>
                        <Divider sx={{ width: "80%" }} />
    
                        <List sx={{ width: '100%', maxWidth: 460, maxHeight: "50.8vh", overflowY: "auto" }}>
                            {(listShoppingCar.length > 0) ? listShoppingCar.map((product: any) => (
                                <ListItem sx={{ marginBottom: "1vh", justifyContent: "center", alignContent: "center" }}>
                                    <ListItemAvatar>
                                        <Avatar alt="" sx={{ borderRadius: 1, transform: "scale(1.7)" }} src={product["image"]} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={product["name"]}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    Precio unitario: S/. {product["price"]}
                                                </Typography>
                                                <Typography color="text.secondary" variant="body2">Subtotal: S/. {product["price"] * product["cantidadSolicitada"]}</Typography>
                                            </>
                                        }
                                        sx={{ marginLeft: "2vh" }}
                                    />
    
                                    <Stack direction="row" gap={3}>
                                        <TextField value={product["cantidadSolicitada"]} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.value > product["cantidad"]) {
                                                e.target.value = product["cantidad"];
                                            } else {
                                                setListShoppingCar((prevList) => prevList.map((productN) => productN["name"] === product["name"] ? { ...productN, cantidadSolicitada: Number(e.target.value) } : productN));
                                            }
                                        }} autoComplete="off" variant="outlined" size="small" sx={{
                                            width: "7vh", '& .MuiInputBase-input': {
                                                textAlign: 'center',
                                            }
                                        }}></TextField>
    
                                        <IconButton onClick={() => {
                                            setListShoppingCar((prevList) => prevList.filter(item => item["name"] !== product["name"]));
                                            setListProduct([...listProduct, product]);
                                            setCounter(counter - 1);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </ListItem>
                            )) : <img src={emptyListImage} style={{ width: "100%", height: "97%", objectFit: "cover" }} alt="" />}
                        </List>
    
                        <Divider sx={{ width: "80%" }} />
    
                        <form action="" onSubmit={handleSubmitShoppingCar}>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: "4vh", width: "100%" }} gap={2}>
                                <SelectTextField setData={setDataProductSale} required={false} data={dataProductSale} label="Cliente" listData={dataRowCustomer()} name="customer"></SelectTextField>
                                <TextField autoComplete="off" size="small" label="Direccion" name="customerAddress" variant="outlined"></TextField>
                            </Stack>
    
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: "2vh", width: "100%" }} gap={2}>
                                <SelectTextField setData={setDataProductSale} data={dataProductSale} label="Empleado" listData={dataRowEmployee()} name="employee"></SelectTextField>
                                <SelectTextField setData={setDataProductSale} data={dataProductSale} label="Metodo de pago" listData={dataRowPayment()} name="paymentMethod"></SelectTextField>
                            </Stack>
    
                            <Stack direction="row" gap={20} sx={{ marginTop: "4vh" }}>
                                <Typography variant="h6">Total: S/. {total}</Typography>
                                <Button variant="contained" type="submit" sx={{ color: "white" }}>Realizar compra</Button>
                            </Stack>
                        </form>
                    </>}
                </Stack>
            </Drawer>
    
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: { md: "10vh", xs: "15vh" } }}>
                    <TabList onChange={handleChange} sx={{ backgroundColor: "secondary.main", width: { xs: "90vw", sm: "80vw", md: "50vh" }, borderTopRightRadius: "5px" }}>
                        <Tab label="Cancelacion de reserva" value="1" />
                        <Tab label="Venta de productos" value="2" />
                    </TabList>
                </Box>
    
                <TabPanel value="1" sx={{ backgroundColor: "primary.main", height: { xs: "auto", md: "83.8vh" } }} >
                    <Stack gap={3} direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "center", alignContent: "center" }}>
                        <Table disableSelectionRow={true} active={false} setData={setReserveId} sx={{ height: { xs: "auto", md: "79vh" }, width: "70vw" }} dataRow={dataRowReserve()} data={reserveId} headers={headersReserve}></Table>
                        <DisplayInformation isPending={registerSaleReserve.isPending} data={dataReserve} detail={dataReserveDetail}></DisplayInformation>
                    </Stack>
                </TabPanel>
    
                <TabPanel value="2" sx={{ backgroundColor: "primary.main", height: "100" }} >
                    <Stack>
                        <Box sx={{ padding: "3vh", backgroundColor: "secondary.main", display: "flex", flexDirection: { xs: "column", sm: "row" }, height: "100%", alignItems: "center", justifyItems: "center", borderRadius: "5px" }}>
                            <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 1, md: 4 }}>
                                <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setFilterData({ ...filterData, name: e.target.value });
                                }} value={filterData["name"]} label="Buscar" size="small" variant="outlined" autoComplete="off" InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"> <SearchIcon /> </InputAdornment>
                                    )
                                }}></TextField>
    
                                <Box sx={{ Width: 200 }}>
                                    <FormControl>
                                        <InputLabel size="small" id="demo-simple-select-label">Categoria</InputLabel>
                                        <Select
                                            sx={{ width: 200 }}
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Categoria"
                                            onChange={(e: SelectChangeEvent) => setFilterData({ ...filterData, category: e.target.value })}
                                        >
                                            <MenuItem value={""}><em>Ninguno</em></MenuItem>
                                            {listCategory.map((category: string) => (<MenuItem value={category}>{category[0].toLocaleUpperCase()}{category.slice(1)}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </Box>
    
                                <FormControlLabel control={<Checkbox value={filterData.inStock} onChange={(e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                    setFilterData({ ...filterData, inStock: checked });
                                }} />} label="En stock" />
                                
                                <IconButton onClick={() => setIsOpenDrawer(true)} aria-label="cart" sx={{ position: "absolute", right: { xs: "10vh", sm: "10%", md: "6vh" } }}>
                                    <StyledBadge badgeContent={counter} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </Stack>
    
                        </Box>
    
                        <Grid alignContent="center" container gap={4} sx={{ paddingLeft: "3vh", marginBottom: "5vh", marginTop: "3vh", height: "100" }}>
                            {tempListProduct.filter((product: ProductDataType) => product["name"].toLocaleLowerCase().includes(filterData["name"].toLocaleLowerCase()) && product["category"].includes(filterData["category"]) && (!filterData["inStock"] || product["cantidad"] > 0)).map((product: any) => (
                                <MediaCard counter={counter} setCounter={setCounter} data={product} setListProduct={setListProduct} listProduct={listProduct} setData={setListShoppingCar} list={listShoppingCar}></MediaCard>
                            ))}
                        </Grid>
                    </Stack>
                </TabPanel>
            </TabContext>
        </Grid >
    ); }