import { Grid, Stack, TextField, Button, Typography, Box, FormControl, FormHelperText, InputLabel, OutlinedInput, IconButton, Divider, Link, InputAdornment, CircularProgress } from "@mui/material";
import { MouseEvent, ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LoginType } from "../helpers/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import image from "../assets/aaa.png"

import "../styles/loginForm.css";
import { RegisterData } from "../api/requests";

export const LoginPage: React.FC<{}> = () => {
  const [loginData, setLoginData] = useState<LoginType>({
    userName: "",
    password: "",
    device: navigator.userAgent
  });

  const dataLogin = (e: ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const [isError, setIsError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // const mutation = RegisterData("login", "http://localhost:3001/user/login/", loginData);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("https://backend-sharon-3.onrender.com/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) throw new Error("ERROR LOGIN");
      return response.json();
    }
  });

  const errorManage = () => setIsError(false);
  useEffect(() => setIsError(mutation.isError), [mutation.isError]);

  useEffect(() => console.log(loginData), [loginData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = await mutation.mutateAsync();
      localStorage.setItem("id", result["id"]);
      localStorage.setItem("jwt", result["jwt"]);
      localStorage.setItem("type", result["type"]);
      localStorage.setItem("expirationDate", result["expirationDate"]);
      console.log(localStorage.getItem("expirationDate"));
      navigate(`/user/menu/${result["id"]}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid className="container-login-body" container>
      <Grid sx={{ backgroundColor: "white", height: "60%", width: "40vh", justifyContent: "center", alignContent: "center" }}>
        <img src={image} alt="" style={{ width: "30vh" }} />
      </Grid>

      <Grid className="background-login">
        <form action="logUser" onSubmit={handleSubmit}>
          { mutation.isPending ? <CircularProgress/> :  <Stack gap={2} sx={{ width: "40vh" }}>
            <Typography variant="h3" fontSize={30} component="h2">Inicio de sesión</Typography>

            <Divider />
            <TextField InputProps={{
              endAdornment: (
                <InputAdornment position="start"> <AccountCircleIcon /> </InputAdornment>
              )
            }} onChange={dataLogin} onClick={errorManage} helperText={ (isError) ? "Ha ocurrido un error, ingrese sus datos nuevamente." : "Ingrese su nombre de usuario." } required error={isError} variant="outlined" name="userName" label="Usuario" type="text" autoComplete="off"></TextField>

            <FormControl required error={isError} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                onChange={dataLogin}
                name="password"
                error={isError}
                onClick={ errorManage }
                required
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ marginLeft: "2vh" }}
                      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                    >f
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />

              <FormHelperText>
                { isError ? "Ha ocurrido un error, ingrese sus datos nuevamente." : "Ingrese su contraseña." }
              </FormHelperText>
            </FormControl>
            //TODO ARREGLAR ESTA NAVEGACION
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link component="button" onClick={() => navigate("/user/get_back_password/")} underline="hover">
                {'¿Has olvidado la contraseña?'}
              </Link>
            </Box>

            <Divider />
            <Button id="btn" variant="contained" type="submit">Iniciar sesión</Button>
          </Stack> }
        </form>
      </Grid>
    </Grid>
  );
}