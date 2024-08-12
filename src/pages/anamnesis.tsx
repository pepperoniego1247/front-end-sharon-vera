import { Grid, Stack, Typography, Divider, Box, TextField, Autocomplete, Button, RadioGroupState } from "@mui/material";
import React, { useState, ChangeEvent, useEffect, FormEvent, useRef } from "react";
import { SideBar } from "../components/sideBar";
import "../styles/anamnesisPage.css";

import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, ThemeProvider, createTheme, TextareaAutosize, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Logo from "../assets/sharonVera-Logo.png";
import { AnamnesisDataType } from "../helpers/types";
import { IsNotAllowed } from "../helpers/urls";

const theme = createTheme({
    palette: {
        text: {
            primary: '#000000', 
        },
    },
    typography: {
        allVariants: {
            color: '#000000',
        },
    },
});

export const Anamnesis: React.FC<{}> = () => {
    const navigator = useNavigate();

    // useEffect(() => {
    //     if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
    //         navigator("/");
    // }, []);

    IsNotAllowed();

    const headers: any = [
        { field: "dni", type: "string", width: 140 },
        { field: "nombres", type: "string", width: 180 },
        { field: "email", type: "email", width: 290 },
        { field: "rol", type: "string", width: 150 }
    ];

    dayjs.locale('es');

    const initialAnamnesis: AnamnesisDataType = {
        id: 0,
        birthDate: dayjs().toDate().toString(),
        address: "",
        city: "",
        email: "",
        other: "",
        provenencia: "",
        queloide: false,
        lentesDeContacto: false,
        aspirinas: false,
        depresion: false,
        enfermedadesCardiovasculares: false,
        epilepsia: false,
        hipertension: false,
        problemasIntestinales: false,
        problemasRenales: false,
        problemasRespiratorios: false,
        problemasCirculatorios: false,
        alergias: false,
        tatuajes: false,
        hemofilia: false,
        cancer: false,
        vihPlus: false,
        marcaPasos: false,
        diabetes: false,
        glaucoma: false,
        embarazada: false,
        hepatitis: false,
        anemia: false,
        radioUno: false,
        respuestaUno: "",
        radioDos: false,
        respuestaDos: "",
        radioTres: false,
        respuestaTres: "",
        radioCuatro: false,
        respuestaCuatro: "",
        radioCinco: false,
        respuestaCinco: "",
        respuestaSeis: "",
        observacion: " ",
        customer: {
            id: 0,
            person: {
                id: 0,
                firstName: "",
                lastName: "",
                dni: "",
                phoneNumber: "",
                activo: false
            }
        }
    };

    const [dni, setDni] = useState('');
    const [anamnesis, setAnamnesis] = useState<AnamnesisDataType>(initialAnamnesis);
    const [isImpriendo, setIsImprimiendo] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [enableButtonNew, enableSetButtonNew] = useState<boolean>(true);
    const [enableButtonEdit, enableSetButtonEdit] = useState<boolean>(true);
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);

    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const alertAddRef = useRef<HTMLDivElement | null>(null);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const alertUpdateRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showAddAlert && alertAddRef.current) {
            alertAddRef.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                setShowAddAlert(false);
            }, 4000); 
        }
    }, [showAddAlert]);

    useEffect(() => {
        if (showUpdateAlert && alertUpdateRef.current) {
            alertUpdateRef.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                setShowUpdateAlert(false);
            }, 4000); 
        }
    }, [showUpdateAlert]);

    useEffect(() => {
        window.addEventListener("beforeprint", () => setIsImprimiendo(true));
        window.addEventListener("afterprint", () => setIsImprimiendo(false));
        return () => {
            window.removeEventListener("beforeprint", () => setIsImprimiendo(true));
            window.removeEventListener("afterprint", () => setIsImprimiendo(false));
        }
    }, []);
    //****los parámetros de useEffect son una función y una variable, si la variable cambia se ejecuta la función***

    const handleNew = () => {
        if (dni == "") {
            setAnamnesis(initialAnamnesis);
        }
        setIsDisabled(false);
        enableSetButtonEdit(false);
        setShowAdd(true);
        setShowUpdate(false);
    };

    const handleCancel = () => {
        setAnamnesis(initialAnamnesis);
        setDni("");
        setIsDisabled(true);
        enableSetButtonEdit(true);
        enableSetButtonNew(true);
        setShowAdd(false);
        setShowUpdate(false);
    };

    const handleEdit = () => {
        if (dni == "") {
            setAnamnesis(initialAnamnesis);
        }
        setIsDisabled(false);
        enableSetButtonNew(false);
        setShowAdd(false);
        setShowUpdate(true);
    }

    //actualizar el objeto anamnesis
    const changeAnamnesis = (path: (string | number)[], value: any) => {
        setAnamnesis(prevState => {
            const newState = { ...prevState };
            let current: any = newState;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newState;
        });
    };

    //Buscar el anamnesis por dni
    const handleSearch = async () => {
        try {
            const response = await fetch(`https://backend-sharon-3.onrender.com/anamnesis/get_by_dni/${dni}`);
            if (!response.ok) {
                throw new Error('HTTP error');
            }
            const data = await response.json();
            setAnamnesis(data);
            if (!(showAdd || showUpdate)) {
                setIsDisabled(true);
            }
            enableSetButtonNew(false);
            enableSetButtonEdit(true);
        } catch (error) {
            console.error('Error fetching anamnesis:', error);
            setAnamnesis(initialAnamnesis);
            // Intentar obtener customer.person si falla la solicitud de anamnesis
            try {
                const response = await fetch(`https://backend-sharon-3.onrender.com/customer/get_by_dni/${dni}`);
                if (!response.ok) {
                    throw new Error('HTTP error');
                }
                const data = await response.json();
                //setCustomer(data.customer.person);
                changeAnamnesis(['customer', 'person', 'firstName'], data.person.firstName);
                changeAnamnesis(['customer', 'person', 'lastName'], data.person.lastName);
                changeAnamnesis(['customer', 'person', 'phoneNumber'], data.person.phoneNumber);

                if (!(showAdd || showUpdate)) {
                    setIsDisabled(true);
                }
                enableSetButtonEdit(false);
                enableSetButtonNew(true);
            } catch (error) {
                console.error('Error fetching customer:', error);
                setIsDisabled(true);
                enableSetButtonNew(false);
                enableSetButtonEdit(false);
            }
        }
    };
    //añadir anamnesis
    const registerAnamnesis = async () => {
        try {
            const response = await fetch(`https://backend-sharon-3.onrender.com/anamnesis/register/${dni}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(anamnesis)
            });
            if (!response.ok) {
                throw new Error('HTTP error');
            }
            console.log("Anamnesisito Registrado");
            setIsRegister(true);
            setShowAddAlert(true);
            setShowAdd(false);
            setIsDisabled(true);
            enableSetButtonEdit(true);
        } catch (error) {
            console.error('Error en el POST de anamnesis:', error);
            console.log("Anamnesisito no Registrado");
            setIsRegister(false);
            setShowAddAlert(true);
            setShowAdd(true);
        }
    };

    //actulizar anamnesis
    const updateAnamnesis = async () => {
        try {
            const response = await fetch(`https://backend-sharon-3.onrender.com/anamnesis/update_by_dni/${dni}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(anamnesis)
            });
            if (!response.ok) {
                throw new Error('HTTP error');
            }
            console.log("Anamnesisito Actualizado");
            setShowUpdateAlert(true);
            setIsUpdate(true);
            setShowUpdate(false);
            setIsDisabled(true);
            enableSetButtonNew(true);
        } catch (error) {
            console.error('Error en el PUT de anamnesis:', error);
            console.log("Anamnesisito no Actualizado");
            setShowUpdateAlert(true);
            setIsUpdate(false);
            setShowUpdate(true);
        }
    };

    //Leer datos del Radio
    const radioValor = (bool = true) => {
        if (bool) {
            return "si"
        }
        else {
            return "no"
        }
    }

    //RadioButtons con un label
    const YesNo = ({ question = "nada", width = 350, radioValue = "no", onChange = '' }) => {
        //const [questionValue, setQuestionValue] = useState(value);

        /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setQuestionValue(event.target.value);
        };*/
        const result = (answer = "") => {
            return answer === "si";
        };
        return (
            <FormControl sx={{ color: "black" }} >
                <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} sx={{ height: 10, width: width }}>
                    <FormLabel sx={{ color: "black" }} id="demo-radio-buttons-group-label">{question}</FormLabel>
                    <RadioGroup
                        row
                        value={radioValue}
                        name="radio-buttons-group"
                        onChange={(e) => changeAnamnesis([onChange], result(e.target.value))}
                    >
                        <FormControlLabel value="si" control={<Radio />} label="Si" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </Stack>
            </FormControl>
        );
    }

    return (
        <Grid className="anamnesis-form" sx={{ paddingBottom: "20vh", flexDirection: { xs: "column", lg: "row" } }} >
            <SideBar title="ANAMNESIS"></SideBar>
            <Grid sx={{ paddingTop: "5vh" }}>
                <Box component="img" src={Logo} sx={{ width: { xs: "80vw", lg: "40vw" } }}></Box>
            </Grid>
            <ThemeProvider theme={theme}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>HOJA DE ANAMNESIS</Typography>
                <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', marginRight: { lg: 72 }, marginTop: { xs: "4vh", lg: "1vh" } }} display="inline-block">Informacion Personal:</Typography>
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: 0.1 }}>
                    <Grid item sx={{ display: 'flex', marginRight: 1 }}>
                        {enableButtonNew ? (<Button variant="contained" sx={{ backgroundColor: "grey" }} onClick={handleNew}>Nuevo</Button>) : (<Grid sx={{ "width": '9.5ch' }}></Grid>)}
                        {/************NUEVO*****************/}
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 0.5 }} >Nombre:</Typography>
                        <TextField disabled={true} sx={{
                            width: { lg: '30vw', xs: "50vw" }, "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "black"
                            }
                        }} value={anamnesis.customer.person.firstName + " " + anamnesis.customer.person.lastName} />
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 0.5 }}>Dni:</Typography>
                        <TextField sx={{ width: { xs: "60vw", lg: "15vw" } }} value={dni} onChange={(e) => setDni(e.target.value)} />{/*****************GUARDAR EL VALOR DEL DNI**************/}
                    </Grid>
                    {(!isImpriendo) ? <Grid item sx={{ display: 'flex' }}>
                        <Button variant="contained" sx={{ backgroundColor: "grey" }} onClick={handleSearch}>Buscar</Button>{/************BUSCAR*****************/}
                    </Grid> : null}

                </Grid>
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: 0.1, paddingLeft: 3 }}>
                    <Grid item sx={{ display: 'flex', marginRight: 3 }}>
                        {enableButtonEdit ? (<Button variant="contained" sx={{ backgroundColor: "grey" }} onClick={handleEdit}>Editar</Button>) : (<Grid sx={{ "width": '9.5ch' }}></Grid>)}
                        {/************EDITAR*****************/}
                    </Grid>
                    <fieldset disabled={isDisabled} style={{ border: 'none', padding: 0, margin: 0 }}>{/*********Estado del murimiento'nt****************/}
                        <Grid item sx={{ marginTop: 1 }}>
                            <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Fecha de Nacimiento: </Typography>
                            <Grid display="inline-block">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                    <DemoContainer components={["DatePicker"]} >
                                        <DatePicker maxDate={dayjs()} format="DD/MM/YYYY" value={dayjs(anamnesis.birthDate)} onChange={(newValue) => { changeAnamnesis(['birthDate'], newValue) }} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </fieldset>
                    <Grid item >
                        <Typography sx={{ marginTop: 2, paddingLeft: 9, marginRight: 0.5 }} display="inline-block" align="center">TLF: </Typography>
                        <TextField disabled={true} value={anamnesis.customer.person.phoneNumber} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" } }} />
                    </Grid>
                    <Grid item sx={{ display: 'flex', marginRight: 1 }}>
                        <Button variant="contained" sx={{ backgroundColor: "grey" }} onClick={handleCancel}>Cancelar</Button>{/************CANCELAR*****************/}
                    </Grid>
                </Grid>
                <fieldset disabled={isDisabled} style={{ border: 'none', padding: 0, margin: 0 }}>{/**************ESTADO DE LOS INPUTS**********/}
                    <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: 0.1 }}>
                        <Grid item >
                            <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Direccion: </Typography>
                            <TextField sx={{ width: '49ch' }} value={anamnesis.address} onChange={(e) => changeAnamnesis(['address'], e.target.value)} />
                        </Grid>
                        <Grid item >
                            <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block" align="center">Ciudad: </Typography>
                            <TextField sx={{ width: '22ch' }} value={anamnesis.city} onChange={(e) => changeAnamnesis(['city'], e.target.value)} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: 0.1 }}>
                        <Grid item >
                            <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">E-mail: </Typography>
                            <TextField sx={{ width: '53ch' }} value={anamnesis.email} onChange={(e) => changeAnamnesis(['email'], e.target.value)} />
                        </Grid>
                        <Grid item >
                            <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block" align="center">Otro: </Typography>
                            <TextField value={anamnesis.other} onChange={(e) => changeAnamnesis(['other'], e.target.value)} />
                        </Grid>
                    </Grid>
                    <Typography sx={{ marginTop: 6, marginRight: 72, fontWeight: 'bold' }} display="block">¿Como conociste mi trabajo? </Typography>
                    <TextField sx={{ width: '94ch' }} value={anamnesis.provenencia} onChange={(e) => changeAnamnesis(['provenencia'], e.target.value)} />

                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginTop: 3, marginBottom: 3 }}>ANAMNESIS</Typography>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Queloide" radioValue={radioValor(anamnesis.queloide)} onChange='queloide' />
                        <YesNo question="Alergias" radioValue={radioValor(anamnesis.alergias)} onChange='alergias' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Lentes de Contacto" radioValue={radioValor(anamnesis.lentesDeContacto)} onChange='lentesDeContacto' />
                        <YesNo question="Tatuajes" radioValue={radioValor(anamnesis.tatuajes)} onChange='tatuajes' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Aspirinas(5 dias previos)" radioValue={radioValor(anamnesis.aspirinas)} onChange='aspirinas' />
                        <YesNo question="Hemofilia" radioValue={radioValor(anamnesis.hemofilia)} onChange='hemofilia' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Depresión" radioValue={radioValor(anamnesis.depresion)} onChange='depresion' />
                        <YesNo question="Cáncer" radioValue={radioValor(anamnesis.cancer)} onChange='cancer' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Enfermedades de Corazón" radioValue={radioValor(anamnesis.enfermedadesCardiovasculares)} onChange='enfermedadesCardiovasculares' />
                        <YesNo question="VIH+" radioValue={radioValor(anamnesis.vihPlus)} onChange='vihPlus' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Epilepsia" radioValue={radioValor(anamnesis.epilepsia)} onChange='epilepsia' />
                        <YesNo question="Marcapasos" radioValue={radioValor(anamnesis.marcaPasos)} onChange='marcaPasos' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Hipertensión" radioValue={radioValor(anamnesis.hipertension)} onChange='hipertension' />
                        <YesNo question="Diabetes" radioValue={radioValor(anamnesis.diabetes)} onChange='diabetes' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Problemas Intestinales" radioValue={radioValor(anamnesis.problemasIntestinales)} onChange='problemasIntestinales' />
                        <YesNo question="Glaucoma" radioValue={radioValor(anamnesis.glaucoma)} onChange='glaucoma' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Problemas Renales" radioValue={radioValor(anamnesis.problemasRenales)} onChange='problemasRenales' />
                        <YesNo question="Embarazada" radioValue={radioValor(anamnesis.embarazada)} onChange='embarazada' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Problemas Respiratorios" radioValue={radioValor(anamnesis.problemasRespiratorios)} onChange='problemasRespiratorios' />
                        <YesNo question="Hepatitis" radioValue={radioValor(anamnesis.hepatitis)} onChange='hepatitis' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 2 }}>
                        <YesNo question="Problemas Circulatorios" radioValue={radioValor(anamnesis.problemasCirculatorios)} onChange='problemasCirculatorios' />
                        <YesNo question="Anmeia" radioValue={radioValor(anamnesis.anemia)} onChange='anemia' />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 4 }}>
                        <YesNo question="1.-¿Tienes algún procedimeinto, micropigmentación o tatuaje?" width={600} radioValue={radioValor(anamnesis.radioUno)} onChange='radioUno' />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Describir: </Typography>
                        <TextField sx={{ width: '75ch' }} value={anamnesis.respuestaUno} onChange={(e) => changeAnamnesis(['respuestaUno'], e.target.value)} />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 4 }}>
                        <Typography sx={{ marginTop: 2, marginRight: 0.5, marginBottom: 2 }} display="block">2.-¿Alguna cirugía plástica en los últimos 6 meses en la región para ser micropigmentada?* </Typography>
                        <YesNo question="" width={600} radioValue={radioValor(anamnesis.radioDos)} onChange='radioDos' />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Describir: </Typography>
                        <TextField sx={{ width: '75ch' }} value={anamnesis.respuestaDos} onChange={(e) => changeAnamnesis(['respuestaDos'], e.target.value)} />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 4 }}>
                        <YesNo question="3.-¿Algún producto inyectado en la región a ser micropigmentada?" width={650} radioValue={radioValor(anamnesis.radioTres)} onChange='radioTres' />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Describir: </Typography>
                        <TextField sx={{ width: '75ch' }} value={anamnesis.respuestaTres} onChange={(e) => changeAnamnesis(['respuestaTres'], e.target.value)} />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 4 }}>
                        <YesNo question="4.-¿Usas acido o peeling?" width={600} radioValue={radioValor(anamnesis.radioCuatro)} onChange='radioCuatro' />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Describir: </Typography>
                        <TextField sx={{ width: '75ch' }} value={anamnesis.respuestaCuatro} onChange={(e) => changeAnamnesis(['respuestaCuatro'], e.target.value)} />
                    </Grid>
                    <Grid item sx={{ marginRight: 15, marginTop: 4 }}>
                        <Typography sx={{ marginTop: 2, marginRight: 0.5, marginBottom: 2 }} display="block">5.-¿Tienes algún problema que creas necesario informar antes de realizar el procedimiento? </Typography>
                        <YesNo question="" width={600} radioValue={radioValor(anamnesis.radioCinco)} onChange='radioCinco' />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">Describir: </Typography>
                        <TextField sx={{ width: '75ch' }} value={anamnesis.respuestaCinco} onChange={(e) => changeAnamnesis(['respuestaCinco'], e.target.value)} />
                    </Grid>
                    <Grid item sx={{ marginTop: 2 }}>
                        <Typography sx={{ marginTop: 2, marginRight: 0.5 }} display="inline-block">6.-Tipo de piel: </Typography>
                        <TextField sx={{ width: '68ch' }} value={anamnesis.respuestaSeis} onChange={(e) => changeAnamnesis(['respuestaSeis'], e.target.value)} />
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 800 }} display="block" align="center">Observación: La información con un asterisco evita que el cliente pueda someterse al procedimiento sin autorización médica. El glaucoma impide el procedimiento solo en los parpados.</Typography>
                    </Grid>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>AUTORIZACION</Typography>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">1. Declaro que la información anterior es precisa e independiente de si mis respuestas son positivas o negativas, confirmo mi deseo de llevar a cabo el trabajo: Micropigmentación o Despigmentación con Sharon Vera.</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">2. He sido informada sobre el procedimiento y las consecuencias del mismo y soy consiente de mis condiciones psicológicas y de salud, así que declaro al profesional y a la propiedad libre de toda responsabilidad por las reacciones que tal vez voy a presentar.</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">3. Declaro que mi salud no esta en riesgo, no presento ninguna enfermedad infecciosa o algún síntoma de debilidad inmunológica y no soy dependiente del alcohol y las drogas.</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">4. Asumo la responsabilidad en los procedimientos posteriores a la micropigmentación, porque declaro que voy a seguir las instrucciones.</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">5. Al iniciar el procedimiento, la profesional Sharon Vera se ha comprometido a informarme y permitirme
                            visualizar los productos y pigmentos que se han seleccionado para los procedimientos</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">6. Autorizo a Sharon Vera a mostrar mi imagen a través de fotos o videos, para su publicidad y cualquier medio de comunicación.</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">7. Los artículos con los que no estoy de acuerdo están tachados con el bolígrafo por mi y perdieron valor en este documento.</Typography>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Typography sx={{ maxWidth: 900, marginBottom: 2 }} display="block" align="center">8. Por la presente certifico estar de acuerdo con los puntos anteriores y que no me queda ninguna duda
                            en cuanto a su contenido y finalidad, por lo tanto, firmo esta autorización.</Typography>
                    </Grid>
                    <Typography sx={{ width: 900 }} display="inline-block" align="left" justifyContent="left">Observaciones técnicas sobre el trabajo: </Typography>
                    <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 2, height: "10vh" }}>
                        <TextareaAutosize className="textarea" style={{ height: "10vh" }} value={anamnesis.observacion} onChange={(e) => changeAnamnesis(['observacion'], e.target.value)}></TextareaAutosize>
                    </Grid>
                    {/*MOSTRAR BOTON AGREGAR SI SELECCIONA EL BOTON NUEVO*/}
                    {enableButtonNew && showAdd && (
                        <Button variant="contained" type="submit" sx={{ marginTop: 2, backgroundColor: "grey" }} onClick={registerAnamnesis}>Agregar</Button>
                    )}
                    {/*MOSTRAR BOTON ACTUALIZAR SI SELECCIONA EL BOTON NUEVO*/}
                    {enableButtonEdit && showUpdate && (
                        <Button variant="contained" type="submit" sx={{ marginTop: 2, backgroundColor: "grey" }} onClick={updateAnamnesis}>Actualizar</Button>
                    )}
                    {showAddAlert && (
                        <Grid item>
                            <Alert ref={alertAddRef} severity={isRegister ? "success" : "error"}>
                                {isRegister ? "Registro exitoso" : "Error en el registro"}
                            </Alert>
                        </Grid>
                    )}
                    {showUpdateAlert && (
                        <Grid item>
                            <Alert ref={alertUpdateRef} severity={isUpdate ? "success" : "error"}>
                                {isUpdate ? "Actualización exitosa" : "Error en la Actualización"}
                            </Alert>
                        </Grid>
                    )}
                </fieldset>
            </ThemeProvider>
        </Grid >
    );
}
