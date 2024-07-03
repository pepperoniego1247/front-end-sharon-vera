import { Grid, AppBar, Toolbar, IconButton, Button, ButtonGroup, Stack, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Divider, Typography } from "@mui/material";
import "../styles/temp.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const MicroServiceCrud: React.FC<{}> = () => {
    const stars = Array.from({ length: 5 });
    const buttonList = ["Inicio", "Promociones", "Ubicacion"];
    const dataCards = [
        {
            image: "https://cdn-icons-png.flaticon.com/512/182/182900.png",
            subtitle: "PAGO",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et natus mollitia dignissimos quae quam non quos inventore cumque suscipit temporibus, hic molestias alias ducimus pariatur eveniet, debitis deleniti quisquam!"
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/15887/15887518.png",
            subtitle: "LA ROPA",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et natus mollitia dignissimos quae quam non quos inventore cumque suscipit temporibus, hic molestias alias ducimus pariatur eveniet, debitis deleniti quisquam!"
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4784/4784554.png",
            subtitle: "DELIVERY",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et natus mollitia dignissimos quae quam non quos inventore cumque suscipit temporibus, hic molestias alias ducimus pariatur eveniet, debitis deleniti quisquam!"
        },
    ];
    const reviewPersons = [
        {
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSaWko_YUg1IhOewnjYNp7_qoohapS9Vg7g&s",
            stars: 5,
            name: "Eduardo Gomez",
            datePublished: "March 5, 2023",
            review: "Increíble experiencia, el servicio fue impecable y superó todas mis expectativas. Definitivamente recomendaría este lugar a todos mis amigos y familiares."
        },
        {
            avatar: "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg",
            stars: 4,
            name: "Carlos Pinedo",
            datePublished: "April 6, 2023",
            review: "Muy buen lugar, con algunos detalles menores que se pueden mejorar, pero en general una experiencia muy positiva."
        },
        {
            avatar: "https://i.pinimg.com/236x/e7/bd/2d/e7bd2da7c2b310123b6aec5e2955bc65.jpg",
            stars: 5,
            name: "Maria Angela",
            datePublished: "May 7, 2023",
            review: "Un lugar fantástico, el personal es extremadamente amable y los servicios son de primera calidad. Sin duda volveré pronto."
        },
        {
            avatar: "https://imageio.forbes.com/specials-images/imageserve/65c509083d4414004e08ea4d/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds",
            stars: 3,
            name: "Fabio Joaquin",
            datePublished: "June 8, 2023",
            review: "El lugar es decente, aunque hay varios aspectos que podrían mejorar. No fue una mala experiencia, pero tampoco fue la mejor."
        },
        {
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZX4XwGXX0_lmNckrqUQhMzPWe9qkx-hYng&s",
            stars: 4,
            name: "Julio Fernandez",
            datePublished: "July 9, 2023",
            review: "Muy buen servicio y atención al cliente, aunque encontré algunos detalles menores que podrían ser mejorados, lo recomiendo parcialmente"
        },
        {
            avatar: "https://wallpapers.com/images/hd/cute-aesthetic-profile-pictures-1200-x-1600-pjfl391j3q0f7rlz.jpg",
            stars: 4,
            name: "Fernanda Phoenix",
            datePublished: "August 10, 2023",
            review: "Buena experiencia en general, con algunas áreas para mejorar. El personal fue muy atento y amable, gracias por su servicio."
        },
    ];
    const dataCardsContracts = [
        {
            title: "PLAN BASICO",
            price: 45,
            detalle: ["Lavado de prendas por kilo", "Secado normal"],
            productos: ["Detergente"],
            description: "El delivery es una opcion aparte. Maximo 10 - 20 kilos semanales"
        },
        {
            title: "PLAN INTERMEDIO",
            price: 95,
            detalle: ["Lavado de prendas por kilo", "Secado profesional"],
            productos: ["Detergente", "Suavizante"],
            delivery: "Delivery: Solo entrega o recojo a domicilio",
            description: "Contactarnos para la seleccion"
        },
        {
            title: "PLAN COMPLETO",
            price: 145,
            detalle: ["Lavado de prendas por kilo", "Secado profesional", "Planchado"],
            productos: ["Detergente", "Suavizante", "Quitamanchas"],
            delivery: "Delivery: Recojo y entrega a domicilio",
            description: "100 kilos la cantidad maxima"
        },
    ];

    return (
        <Grid>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#ace2ed", zIndex: 9999 }} >
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, transform: "translateX(-50.5vh)", fontWeight: 700 }}>
                            Lavanderia Tadeo
                        </Typography>

                        {buttonList.map((btn: string) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button color="inherit" sx={{ color: "black", fontWeight: 700 }}>{btn}</Button>
                                <Divider orientation="vertical" sx={{ backgroundColor: "black" }} variant="middle" flexItem />
                            </Box>
                        ))}
                        <Button color="inherit" sx={{ color: "black", fontWeight: 700 }}>Ayuda</Button>
                        <Button color="inherit" sx={{ color: "black", marginLeft: "5vh", fontWeight: 700 }}>Iniciar Sesion</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Stack direction="row" sx={{ width: "100%" }}>
                <img src="https://miro.medium.com/v2/resize:fit:1200/1*THyHfZqpR82doPDk8hsSqg.jpeg" style={{ width: "100vh", height: "60vh" }} alt="" />

                <Stack sx={{ width: "47%", padding: "6vh", justifyContent: "center", alignContent: "center", backgroundColor: "#ececdc" }} gap={2}>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>Acerca de nosotros</Typography>
                    <Typography variant="h6"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et natus mollitia dignissimos quae quam non quos inventore cumque suscipit temporibus, hic molestias alias ducimus pariatur eveniet, debitis deleniti quisquam! </Typography>
                </Stack>
            </Stack>

            <Stack marginTop="6vh">
                <Box>
                    <Typography sx={{ fontWeight: "700" }} variant="h3">ESTAMOS PARA AYUDARTE</Typography>
                    <Typography variant="h6">UNA LAVANDERIA EN QUIEN PODRAS CONFIAR</Typography>
                </Box>

                <Stack direction="row">
                    {dataCards.map((data: any) => (
                        <Stack sx={{ width: "47%", padding: "6vh", justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center" }} gap={1}>
                            <img src={data["image"]} style={{ width: "15vh", height: "15vh" }} alt="" />
                            <Typography variant="h5" sx={{ fontWeight: 900 }}>{data["subtitle"]}</Typography>
                            <Typography variant="h6"> {data["description"]} </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>

            <Stack direction="row" sx={{ width: "100%" }}>

                <Stack sx={{ width: "47%", padding: "6vh", justifyContent: "center", alignContent: "center", backgroundColor: "#ececdc" }} gap={2}>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>NUESTRA MISION</Typography>
                    <Typography variant="h6"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et natus mollitia dignissimos quae quam non quos inventore cumque suscipit temporibus, hic molestias alias ducimus pariatur eveniet, debitis deleniti quisquam! </Typography>
                </Stack>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/USS_Enterprise_%28CVN-65%29%2C_laundry.jpg" style={{ width: "100vh", height: "60vh" }} alt="" />
            </Stack>

            <Stack direction="row" sx={{ width: "100%" }}>
                <img src="https://automaticlaundry.com/wp-content/uploads/sites/2/2020/10/laundry-room.png" style={{ width: "100vh", height: "60vh" }} alt="" />

                <Stack sx={{ width: "47%", padding: "6vh", justifyContent: "center", alignContent: "center", backgroundColor: "#ececdc" }} gap={2}>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>NUESTRA VISION</Typography>
                    <Typography variant="h6"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et natus mollitia dignissimos quae quam non quos inventore cumque suscipit temporibus, hic molestias alias ducimus pariatur eveniet, debitis deleniti quisquam! </Typography>
                </Stack>
            </Stack>

            <Stack marginTop="6vh" sx={{ justifyItems: "center", alignItems: "center" }}>
                <Box>
                    <Typography sx={{ fontWeight: "700" }} variant="h3">CONTRATOS</Typography>
                    <Typography variant="h6">PRECIOS SENCILLOS, SIN CARGOS OCULTOS</Typography>
                </Box>

                <Stack direction="row" sx={{ padding: "6vh", display: "flex" }} aria-label="Large button group" gap={0}>
                    <Button variant="contained" sx={{ backgroundColor: "#5AB2FF", fontWeight: 600 }}>MENSUAL</Button>
                    <div style={{ display: "flex", backgroundColor: "#5AB2FF" }}>
                        <Divider orientation="vertical" sx={{ backgroundColor: "black", color: "#FFFDB5" }} variant="middle" flexItem />
                    </div>
                    <Button variant="contained" sx={{ backgroundColor: "#5AB2FF", fontWeight: 600 }}>ANUAL</Button>
                </Stack>

                <Stack direction="row" paddingBottom="6vh" sx={{ width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center" }} gap={10}>
                    {dataCardsContracts.map((data: any) => (
                        <Stack sx={{ height: "80%", padding: "5vh", width: "50vh", display: "flex", backgroundColor: "#d9d3bd", justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center", borderRadius: "5px" }} gap={3}>
                            <Typography variant="h5" sx={{ fontWeight: 900 }}>{data["title"]}</Typography>
                            <Typography variant="h2" sx={{ fontWeight: 700 }}>{`S/. ${data["price"]}`}</Typography>

                            <Divider sx={{ backgroundColor: "black", width: "80%" }} />

                            <Stack>
                                <ol style={{ textAlign: "start" }}>
                                    {data["detalle"].map((detalle: string) => (<li style={{ marginBottom: "10px", fontWeight: 600 }}>{detalle}</li>))}
                                    {(!data["delivery"]) ? undefined : <li style={{ marginBottom: "10px", fontWeight: 600 }}>{data["delivery"]}</li>}

                                    <li style={{ marginBottom: "10px", fontWeight: 600 }}>
                                        Productos:
                                        <ul>
                                            {data["productos"].map((producto: string) => (<li style={{ marginBottom: "10px", marginTop: "10px", fontWeight: 600 }}>{producto}</li>))}
                                        </ul>
                                    </li>
                                </ol>

                                <Typography sx={{ backgroundColor: "#848073", borderRadius: "5px", fontSize: "17px", padding: "3vh" }} variant="h6">{data["description"]}</Typography>
                            </Stack>

                            <Button variant="contained" sx={{ backgroundColor: "#2f2e29", fontWeight: 600, color: "white", borderRadius: "8px" }} size="large">MENSUAL</Button>
                        </Stack>
                    ))}
                </Stack>
            </Stack>

            <Stack sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: "700" }} variant="h3">RESEÑAS</Typography>

                <Grid container spacing={2} sx={{ padding: "5vh" }}>
                    {(reviewPersons.map((person: any) => (
                        <Grid item xs={12} sm={6} md={4} >
                            <Box sx={{ width: '90%', height: "100%", transform: "translateX(2.5vh)" }}>
                                <Stack sx={{ backgroundColor: "#acc7df", height: "100%", borderRadius: "5px", textAlign: "center", justifyItems: "center", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                    <Stack sx={{ backgroundColor: "#acc7df", padding: "2vh", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", width: "100%", height: "40%" }} direction="row" gap={2}>
                                        <Avatar sx={{ width: "7vh", height: "7vh" }} src={person["avatar"]} />

                                        <Stack gap={0.5}>
                                            <Typography fontWeight={800}>{person["name"]}</Typography>
                                            <Stack direction="row">
                                                {stars.map((_: any, index: number) => (person["stars"] > index) ? <StarIcon/> : <StarBorderIcon />)}
                                            </Stack>
                                        </Stack>

                                        <Typography sx={{ position: "absolute", transform: "translateY(3.5vh) translateX(27vh)" }}>{person["datePublished"]}</Typography>
                                    </Stack>

                                    <Typography sx={{ padding: 0.5, margin: "1vh", textAlign: "center", justifyItems: "center", fontWeight: "500" }}>{person["review"]}</Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    )))}
                </Grid>
            </Stack>

            <Stack sx={{ width: "100%", justifyContent: "center", alignContent: "center", paddingBottom: "3vh" }} direction="row" gap={10}>
                <Stack >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Siguenos</Typography>

                    <a href="https://www.facebook.com/profile.php?id=100051575637253">
                        <IconButton >
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" style={{ height: "8vh", width: "8vh" }} alt="" />
                        </IconButton>
                    </a>
                </Stack>

                <Stack >
                    <IconButton >
                        <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" style={{ height: "8vh", width: "8vh" }} alt="" />
                    </IconButton>

                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Informaciones: 922970918</Typography>
                </Stack>
            </Stack>
        </Grid>
    );
}