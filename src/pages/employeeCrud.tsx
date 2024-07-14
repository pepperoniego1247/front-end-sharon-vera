import { Table } from "../components/table";
import { Grid, Button, Stack, Autocomplete, TextField, Box, Divider, Typography, CircularProgress } from "@mui/material";
import { SideBar } from "../components/sideBar";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import "../styles/roleCrudForm.css";
import MailIcon from '@mui/icons-material/Mail';
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { EmployeeDataType } from "../helpers/types";
import "../styles/employeeCrudForm.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import GroupIcon from '@mui/icons-material/Group';
import Checkbox from "@mui/material/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { RoleData } from "../helpers/types";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SellIcon from '@mui/icons-material/Sell';
import { useParams } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LoadData, RegisterData, UpdateData } from "../api/requests";

export const EmployeeCrud: React.FC<{}> = () => {
    const { id } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
            navigator("/");
    }, []);

    const headers: any = [
        { field: "dni", type: "string", width: 105, headerName: "Dni" },
        { field: "firstName", type: "string", width: 150, headerName: "Nombres" },
        { field: "lastName", type: "string", width: 170, headerName: "Apellidos" },
        { field: "role", type: "string", width: 135, headerName: "Rol" },
        { field: "payment", type: "string", width: 100, headerName: "Sueldo" },
        { field: "phoneNumber", type: "string", width: 115, headerName: "Numero celular" },
        { field: "activo", type: "boolean", width: 130, headerName: "Estado" }
    ];

    const headersRole: any = [
        { field: "name", type: "string", width: 180, headerName: "Asignacion" },
        { field: "payment", type: "string", width: 170, headerName: "Sueldo base" }
    ];

    const [isError, setIsError] = useState<boolean>(false);
    const [isRoleError, setIsRoleError] = useState<boolean>(false);
    const [roleId, setRoleId] = useState<GridRowSelectionModel>([]);
    const [isRegisterRole, setIsRegisterRole] = useState<boolean>(true);
    const [role, setRole] = useState<RoleData>({
        name: "",
        payment: ""
    });
    const [employeeId, setEmployeeId] = useState<GridRowSelectionModel>([]);
    const [value, setValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isRegister, setIsRegister] = useState<boolean>(true);
    const [employeeData, setEmployeeData] = useState<EmployeeDataType>({
        dni: "",
        firstName: "",
        lastName: "",
        role: "",
        payment: 0,
        phoneNumber: "",
        activo: true
    });

    const loadDataEmployee = LoadData("getDataEmployee", "https://backend-sharon-3.onrender.com/employee/get_all/");

    // const loadDataEmployee = useQuery({
    //     queryKey: ["getDataEmployee"],
    //     queryFn: async () => {
    //         const loadedData = await fetch("http://localhost:3001/employee/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (!loadedData.ok) throw new Error("Ha ocurrido un error");
    //         return loadedData.json();
    //     },
    // });


    const updateEmployee = UpdateData("updateEmployee", `https://backend-sharon-3.onrender.com/employee/update_employee_by_id/${employeeId[0]}`, {
        dni: employeeData["dni"],
        phoneNumber: employeeData["phoneNumber"],
        role: employeeData['role'],
        activo: employeeData["activo"]
    });

    // const updateEmployee = useMutation({
    //     mutationFn: async () => {
    //         const { dni, phoneNumber, role, activo } = employeeData;

    //         const response = await fetch(`http://localhost:3001/employee/update_employee_by_id/${employeeId[0]}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 dni: dni,
    //                 phoneNumber: phoneNumber,
    //                 role: role,
    //                 activo: activo
    //             })
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const registerEmployee = RegisterData("registerEmployee", "https://backend-sharon-3.onrender.com/employee/register/", {
        dni: employeeData["dni"],
        phoneNumber: employeeData["phoneNumber"],
        role: employeeData['role'],
        activo: employeeData["activo"]
    });


    // const registerEmployee = useMutation({
    //     mutationFn: async () => {
    //         const { dni, phoneNumber, role, activo } = employeeData;

    //         const response = await fetch("http://localhost:3001/employee/register/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `${ localStorage.getItem("jwt") }`
    //             },
    //             body: JSON.stringify({
    //                 dni: dni,
    //                 phoneNumber: phoneNumber,
    //                 role: role,
    //                 activo: activo
    //             })
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR");
    //         return response.json();
    //     }
    // });

    const loadDataRole = LoadData("getDataRole", "https://backend-sharon-3.onrender.com/role/get_all/");

    // const loadDataRole = useQuery({
    //     queryKey: ["getDataRole"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/role/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (!response.ok) throw new Error("HTTP ERROR!");
    //         return response.json();
    //     }
    // });

    const registerRole = RegisterData("registerRole", "https://backend-sharon-3.onrender.com/role/register/", role);

    // const registerRole = useMutation({
    //     mutationFn: async () => {
    //         const response = await fetch("http://localhost:3001/role/register/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(role)
    //         });

    //         if (!response.ok) throw new Error(await response.json());
    //         return response.json();
    //     }
    // });

    const updateRole = UpdateData("updateRole", "https://backend-sharon-3.onrender.com/role/register/", role);

    // const updateRole = useMutation({
    //     mutationFn: async () => {
    //         const response = await fetch(`http://localhost:3001/role/update_by_id/${roleId[roleId.length - 1]}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(role)
    //         });

    //         if (!response.ok) throw new Error(await response.json());
    //         return response.json();
    //     }
    // });

    const roleData = LoadData("getRoleData", "https://backend-sharon-3.onrender.com/role/get_all/");

    // const roleData = useQuery({
    //     queryKey: ["getRoleData"],
    //     queryFn: async () => {
    //         const response = await fetch("http://localhost:3001/role/get_all/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (!response.ok) throw new Error(await response.json());
    //         return response.json();
    //     }
    // });

    useEffect(() => console.log(employeeData), [employeeData]);


    const dataRowRole = () => {
        const loadedData: any = [];
        if (!loadDataRole.data) return loadedData;
        loadDataRole["data"].forEach((role: any) => loadedData.push(role["name"]));
        return loadedData;
    }

    const dataRow = () => {
        const loadedData: any = [];
        if (!loadDataEmployee.data) return loadedData;

        loadDataEmployee["data"].forEach((employee: any) => {
            const { person, role } = employee;
            //!CODIGO DE ABAJO SUPERVISAR!
            if (!employee || !role || !person) return null;

            loadedData.push({
                id: employee["id"],
                dni: person["dni"],
                firstName: person["firstName"],
                lastName: person["lastName"],
                role: role["name"],
                payment: role["payment"],
                phoneNumber: person["phoneNumber"],
                activo: person["activo"]
            });
        });

        return loadedData;
    }

    const getDataRoleRows = () => {
        const loadedData: any = [];

        if (!roleData["data"]) return loadedData;

        roleData["data"].forEach((role: any) => {
            const { id, name, payment } = role;

            loadedData.push({
                id: id,
                name: name,
                payment: payment
            });
        });

        return loadedData;
    }

    const dataEmployee = (e: ChangeEvent<HTMLInputElement>) => setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    const changeIsError = () => setIsError(false);
    const changeIsRoleError = () => setIsRoleError(false);
    const dataRole = (e: ChangeEvent<HTMLInputElement>) => setRole({ ...role, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            (isRegister) ? await registerEmployee.mutateAsync() : await updateEmployee.mutateAsync();

            setEmployeeData({
                dni: "",
                firstName: "",
                lastName: "",
                role: "",
                payment: 0,
                phoneNumber: "",
                activo: true
            });

            setValue("");
            loadDataEmployee.refetch();
            loadDataRole.refetch();
            setIsRegister(true);
            setEmployeeId([]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitRole = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            (isRegisterRole) ? await registerRole.mutateAsync() : await updateRole.mutateAsync();
            setRole({ name: "", payment: "" });
            loadDataRole.refetch();
            roleData.refetch();
            setRoleId([]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const employee: EmployeeDataType = dataRow().find((employee: any) => employee["id"] === employeeId[employeeId.length - 1])!;
        if (employee) {
            setEmployeeData(employee);
            setValue(employee.role);
            setIsRegister(false);
        } else {
            setEmployeeData({
                dni: "",
                firstName: "",
                lastName: "",
                role: "",
                payment: 0,
                phoneNumber: "",
                activo: true
            });
            setValue("");
            setIsRegister(true)
        }
    }, [employeeId]);

    useEffect(() => {
        try {
            const role: RoleData = roleData["data"].find((role: any) => role["id"] === roleId[roleId.length - 1])!;

            if (role) {
                setRole(role);
                setIsRegisterRole(false);
            } else {
                setRole({
                    name: "",
                    payment: ''
                });
                setIsRegisterRole(true);
            }
        } catch (error) {
            console.log(error);
        }
    }, [roleId]);

    return (
        <Grid className="body-employee-crud" sx={{ padding: "2vh" }}>
            <SideBar title="EMPLEADOS"></SideBar>
            <Stack direction="row" sx={{ marginTop: "8vh", flexDirection: { xs: "column", lg: "row" }, paddingBottom: "3vh" }} gap={3}>
                <Stack sx={{ justifyItems: "center", alignItems: "center" }} gap={3}>
                    <Box className="data-crud-form" sx={{ height: { lg: "30vh", xs: "55vh" }, width: { lg: "64.5vw", xs: "90vw" } }} >
                        {registerEmployee.isPending || updateEmployee.isPending ? <CircularProgress /> : <div className="data-crud-background">
                            <form action="submit-data" onSubmit={handleSubmit}>
                                <Stack gap={0.5} sx={{ justifyItems: "center", alignItems: "center" }}>
                                    <Typography variant="h4" component="h1">Empleados</Typography>

                                    <Divider className="divider" sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                    <Stack sx={{ flexDirection: { lg: "row", xs: "column" }, gap: { xs: "2.5vh", lg: "2.5vw" } }}>
                                        <TextField required onChange={dataEmployee} disabled={!isRegister} error={isError} onClick={changeIsError} value={employeeData.dni} variant="outlined" name="dni" label="Dni" type="text" autoComplete="off"></TextField>
                                        <TextField required onChange={dataEmployee} value={employeeData.phoneNumber} error={isError} onClick={changeIsError} variant="outlined" name="phoneNumber" label="Telefono" type="text" autoComplete="off"></TextField>

                                        <Autocomplete inputValue={inputValue} onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }} renderInput={(params) => <TextField required {...params} label="Rol" error={isError} />} value={employeeData.role} onClick={changeIsError} onChange={(event: any, newValue: string | null) => {
                                            setEmployeeData({ ...employeeData, role: newValue! });
                                        }} options={dataRowRole()} sx={{ width: 276 }} />

                                        <FormControlLabel control={<Checkbox checked={employeeData.activo} onChange={(e: ChangeEvent<HTMLInputElement>, checked: boolean) => setEmployeeData({ ...employeeData, activo: checked })} />} label="Activo" />
                                    </Stack>

                                    <Divider className="divider" sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                    {(isRegister) ? <Button sx={{ width: { xs: "70vw", lg: "30vw" } }} variant="contained" onClick={() => setIsRegister(true)} type="submit">Registrar</Button> : <Button sx={{ width: { xs: "70vw", lg: "30vw" }  }} variant="contained" onClick={() => setIsRegister(false)} type="submit">Editar</Button>}
                                </Stack>
                            </form>
                        </div>}

                    </Box>

                    <Table setData={setEmployeeId} headers={headers} dataRow={dataRow()} sx={{ height: { lg: "55vh", xs: "60vh" }, width: { xs: "90vw", lg: "64.5vw" } }} data={employeeId}></Table>
                </Stack>

                <Stack sx={{ justifyItems: "center", alignItems: "center" }} gap={3}>
                    <Box className="data-crud-role-form" sx={{ height: { lg: "30vh" }, width: { xs: "90vw", lg: "31.6vw" } }}>
                        { registerRole.isPending || updateRole.isPending ? <CircularProgress/> : <div className="data-crud-role-background">
                            <form onSubmit={handleSubmitRole}>
                                <Stack gap={0.5} sx={{ width: "30vh" }}>
                                    <Typography variant="h5" component="h1">Roles</Typography>

                                    <Divider className="divider" sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                    <TextField required size="small" onChange={dataRole} onClick={changeIsRoleError} error={isRoleError} value={role.name} variant="outlined" name="name" label="Rol" type="text" autoComplete="off"></TextField>
                                    <TextField required size="small" onChange={dataRole} sx={{ marginTop: "1vh" }} onClick={changeIsRoleError} error={isRoleError} value={role.payment} variant="outlined" name="payment" label="Sueldo" type="text" autoComplete="off"></TextField>

                                    <Divider className="divider" sx={{ marginTop: "10px", marginBottom: "10px" }} />

                                    <Box>
                                        {(isRegisterRole) ? <Button sx={{ width: "30vh" }} variant="contained" onClick={() => setIsRegisterRole(true)} type="submit">Registrar</Button> : <Button sx={{ width: "30vh" }} variant="contained" onClick={() => setIsRegisterRole(false)} type="submit">Editar</Button>}
                                    </Box>
                                </Stack>
                            </form>
                        </div>}
                    </Box>

                    <Table headers={headersRole} data={roleId} dataRow={getDataRoleRows()} setData={setRoleId} sx={{ height: { lg: "55vh", xs: "60vh" }, width: { lg: "31.6vw", xs: "90vw" } }}></Table>
                </Stack>

            </Stack>
        </Grid>
    );
}