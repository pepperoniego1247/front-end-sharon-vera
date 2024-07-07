import { Grid, Stack, TextField, Button, Typography, Box, FormControl, InputLabel, OutlinedInput, IconButton, Divider, Link, InputAdornment } from "@mui/material";
import { MouseEvent, ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LoginType, VerifiedUserType } from "../helpers/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import image from "../assets/aaa.png"
import { UpdateData } from "../api/requests";

export const GetBackPasswordPage: React.FC<{}> = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [verifiedPassword, setVerifiedPassword] = useState<VerifiedUserType>({
        password: "",
        userName: "",
        passwordVerified: ""
    });

    const dataUser = (e: ChangeEvent<HTMLInputElement>) => setVerifiedPassword({ ...verifiedPassword, [e.target.name]: e.target.value });

    const [isError, setIsError] = useState<boolean>(false);
    const [isEqual, setIsEqual] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const mutation = useMutation({
        mutationFn: async () => {
            const response: Response = await fetch(`https://backend-sharon-3.onrender.com/user/edit_by_id/${getUserByUserName["data"]["userId"]}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: verifiedPassword["userName"],
                    password: verifiedPassword["password"]
                })
            });

            if (!response.ok) throw new Error("Ocurrio un error!");
            return response.json();
        }
    });

    // const getUserByUserName = 

    const getUserByUserName = useMutation({
        mutationFn: async () => {
            const response = await fetch(`https://backend-sharon-3.onrender.com/user/get_by_userName/${verifiedPassword["userName"]}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) throw new Error("Ocurrio un error");
            return response.json();
        }
    });

    // const mutation = UpdateData("updatePass", `http://localhost:3001/user/edit_by_id/${getUserByUserName["data"]["userId"]}`, {
    //     userName: verifiedPassword["userName"],
    //     password: verifiedPassword["password"]
    // });

    // useEffect(() => console.log(getUserByUserName["data"]["userId"]), []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            console.log(isEqual, isUser);
            e.preventDefault();
            (!isUser) ? await getUserByUserName.mutateAsync() : await mutation.mutateAsync();
            (isEqual && isUser) ? navigate("/") : setIsError(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => (verifiedPassword["password"] === verifiedPassword["passwordVerified"] ? setIsEqual(true) : setIsEqual(false)), [verifiedPassword["passwordVerified"]]);
    useEffect(() => (getUserByUserName.isSuccess) ? setIsUser(true) : undefined, [getUserByUserName.isSuccess]);

    return (
        <Grid className="container-login-body" container>
            <Grid sx={{ backgroundColor: "white", height: { lg: "55vh", xs: "15vh" }, width: { lg: "25vw", xs: "100vw" }, justifyContent: "center", alignContent: "center" }}>
                <Box
                    component="img"
                    src={image}
                    sx={{ height: { xs: "15vh", lg: "30vh" } }}
                />
            </Grid>

            <Grid className="background-login" sx={{ height: { lg: "55vh", xs: "85vh" }, width: { lg: "30vw", xs: "100vw" } }}>
                <form action="logUser" onSubmit={handleSubmit}>

                    <Stack gap={2} sx={{ width: "40vh", justifyItems: "center", alignItems: (mutation.isPending) ? "center" : "undefined" }}>
                        {mutation.isPending ? <CircularProgress /> : <>
                            <Typography variant="h3" fontSize={30} component="h2">Recuperar contraseña</Typography>

                            <Divider sx={{ width: "100%" }} />

                            {(isUser) ? <>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Nueva contraseña</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        onChange={dataUser}
                                        error={!isEqual}
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    sx={{ marginLeft: "2vh" }}
                                                    onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Nueva contraseña"
                                    />
                                </FormControl>

                                <Box sx={{ textAlign: "start", width: "100%", alignItems: "flex-start", height: "9vh" }}>
                                    <Typography variant="body1">La contraseña debe tener:</Typography>
                                    <ul>
                                        <li style={{ marginTop: "-15px" }}><Typography variant="body2">5 a 30 caracteres como maximo</Typography></li>
                                        <li ><Typography variant="body2">Caracteres en mayuscula o minuscula</Typography></li>
                                    </ul>
                                </Box>

                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Verifique la contraseña</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        onChange={dataUser}
                                        name="passwordVerified"
                                        error={!isEqual}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    sx={{ marginLeft: "2vh" }}
                                                    onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Verifique la contraseña"
                                    />
                                </FormControl>
                            </> : <>
                                {/* <Box sx={{ textAlign: "start", width: "100%", alignItems: "flex-start" }}>
                                <Typography variant="body1">Brinda tu nombre de usuario para identificarte:</Typography>
                            </Box> */}

                                <TextField sx={{ marginTop: "-3px" }} InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start"> <AccountCircleIcon /> </InputAdornment>
                                    )
                                }} variant="outlined" onChange={dataUser} name="userName" label="Usuario" type="text" autoComplete="off"></TextField>
                            </>}

                            <Divider sx={{ width: "100%" }} />

                            <Button id="btn" variant="contained" type="submit">{(isUser) ? "Reestablecer contraseña" : "Verificar identidad"}</Button>
                        </>}
                    </Stack>
                </form>
            </Grid>
        </Grid>
    );
}