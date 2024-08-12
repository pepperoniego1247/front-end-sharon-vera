import { Typography, Grid, Stack, Box, Avatar } from "@mui/material";
import { SideBar } from "../components/sideBar";
import { CardDashBoard } from "../components/cardDashBoard";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";
import { Gauge } from '@mui/x-charts/Gauge';
import { useNavigate } from "react-router-dom";
import { LoadData } from "../api/requests";
import { useEffect } from "react";
import { IsNotAllowed } from "../helpers/urls";

export const DashBoardPage: React.FC<{}> = () => {
    const navigator = useNavigate();

    // useEffect(() => {
    //     if (!localStorage.getItem("expirationDate") || new Date(localStorage.getItem("expirationDate")!) < new Date())
    //         navigator("/");
    // }, []);

    IsNotAllowed(["Moderador", "Usuario"]);

    const loadDataIngresos = LoadData("loadDataIngresos", "https://backend-sharon-3.onrender.com/dash_board_ingresos_totales_netos/");
    const loadDataVentaPorSemana = LoadData("loadDataVentaPorSemana", "https://backend-sharon-3.onrender.com/dash_board_venta_por_semana/");
    const loadDataEmpleadosAsignados = LoadData("loadDataEmpleadosAsignados", "https://backend-sharon-3.onrender.com/dash_board_empleados_asignados/");
    const loadDataReservasPorDia = LoadData("loadDataReservasPorDia", "https://backend-sharon-3.onrender.com/dash_board_reservas_por_dia/");
    const loadDataReservasPorEmpleados = LoadData("loadDataReservasPorEmpleados", "https://backend-sharon-3.onrender.com/dash_board_total_reservas_por_empleados/");
    const loadDataVentaPorMes = LoadData("loadDataVentaPorMes", "https://backend-sharon-3.onrender.com/dash_board_venta_por_mes/");
    const loadDataProductosMasVendidos = LoadData("loadDataProductosMasVendidos", "https://backend-sharon-3.onrender.com/dash_board_productos_mas_vendidos_por_mes/");
    const loadDataReservasPorMes = LoadData("loadDataReservasPorMes", "https://backend-sharon-3.onrender.com/dash_board_total_reservas_por_mes/");

    const dataRowPieEmpleadosAsignados = () => {
        const data: any[] = [];
        if (!loadDataEmpleadosAsignados.data) return [];
        loadDataEmpleadosAsignados.data["empleados"].forEach((employee: string, index: number) => {
            data.push({ id: index + 1, value: loadDataEmpleadosAsignados.data["reservesPerEmployees"][index], label: employee });
        });

        return data;
    }

    const dataRowPieReservasPorEmpleados = () => {
        const data: any[] = [];
        if (!loadDataReservasPorEmpleados.data) return [];
        loadDataReservasPorEmpleados.data["empleados"].forEach((employee: string, index: number) => {
            data.push({ id: index + 1, value: loadDataReservasPorEmpleados.data["reservesPerEmployees"][index], label: employee });
        });

        return data;
    }
    const valueFormatter = (value: number | null) => `${value}`;
    console.log(localStorage.getItem("jwt"));

    const dataRowProductosMasVendidos = (type?: string) => {
        const loadData: any[] = [];
        if (!loadDataProductosMasVendidos.data) return [];

        if (type === "json") {
            loadDataProductosMasVendidos.data["productsName"].forEach((name: string, index: number) => {
                loadData.push({ [name]: loadDataProductosMasVendidos.data["productsQuantity"][index] });
            });

            return loadData;
        }

        loadDataProductosMasVendidos.data["productsName"].forEach((name: string) => {
            loadData.push({ dataKey: name, label: name, valueFormatter });
        });

        return loadData;
    }

    console.log(loadDataProductosMasVendidos.data);

    const weeks = ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"];

    return (
        <Box>
            <SideBar title="DASHBOARD"></SideBar>

            <Stack sx={{ marginTop: "13vh" }} gap={2}>
                <Stack gap={3} direction="row" sx={{ justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center", display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
                    <Stack gap={1}>
                        <CardDashBoard title="GANANCIAS TOTALES" number={loadDataIngresos.data ? loadDataIngresos["data"]["ingresosTotal"] : "Loading..."}></CardDashBoard>
                        <CardDashBoard title="GANANCIAS NETAS" number={loadDataIngresos.data ? loadDataIngresos["data"]["ingresosNeto"] : "Loading..."}></CardDashBoard>
                    </Stack>

                    <Stack sx={{ backgroundColor: "secondary.main", justifyItems: "center", alignItems: "center", alignContent: "center", justifyContent: "center", height: "40vh", borderRadius: "5px" }}>
                        <Typography sx={{ marginTop: "2vh" }} variant="h4">Venta por semana</Typography>
                        <BarChart
                            series={[
                                { data: loadDataVentaPorSemana.data ? loadDataVentaPorSemana["data"]["salesPerWeek"] : [] },
                            ]}
                            height={290}
                            width={500}
                            xAxis={[{ data: weeks, scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    </Stack>

                    <Stack sx={{ backgroundColor: "secondary.main", justifyItems: "center", alignItems: "center", alignContent: "center", justifyContent: "center", height: "40vh", borderRadius: "5px" }}>
                        <Typography sx={{ marginTop: "2vh" }} variant="h4">Empleados asignados</Typography>
                        <PieChart
                            series={[
                                {
                                    data: dataRowPieEmpleadosAsignados(),
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Stack>
                </Stack>


                <Stack gap={3} direction="row" sx={{ justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center", display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
                    <Stack sx={{ backgroundColor: "secondary.main", justifyItems: "center", alignItems: "center", alignContent: "center", justifyContent: "center", height: "40vh", borderRadius: "5px" }}>
                        <Typography sx={{ marginTop: "2vh" }} variant="h4">Total reservas por dia</Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Lunes', 'Martes', 'Miercoles', "Jueves", "Viernes", "Sabado", "Domingo"] }]}
                            series={[{ data: loadDataReservasPorDia.data ? loadDataReservasPorDia.data["reservesPerDay"] : [] }]}
                            width={500}
                            height={300}
                        />
                    </Stack>

                    <Stack sx={{ backgroundColor: "secondary.main", justifyItems: "center", alignItems: "center", alignContent: "center", justifyContent: "center", height: "40vh", borderRadius: "5px" }}>
                        <Box>
                            <Typography sx={{ marginTop: "2vh" }} variant="h4">Total de reservas por</Typography>
                            <Typography variant="h4">empleado</Typography>
                        </Box>
                        <PieChart
                            series={[
                                {
                                    data: dataRowPieReservasPorEmpleados(),
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Stack>

                    <Stack sx={{ width: "50vh", backgroundColor: "secondary.main", justifyItems: "center", alignItems: "center", alignContent: "center", justifyContent: "center", display: "flex", height: "40vh", borderRadius: "5px" }}>
                        <Typography sx={{ marginTop: "2vh" }} variant="h4">Venta por mes</Typography>
                        <Gauge width={350} height={250} sx={{ color: "white" }} value={(loadDataVentaPorMes.data ? loadDataVentaPorMes.data["productSalePerMonth"] : 0)} startAngle={-90} endAngle={90} />
                    </Stack>
                </Stack>

                <Stack gap={3} direction="row" sx={{ marginBottom: "5vh", justifyContent: "center", alignContent: "center", alignItems: "center", justifyItems: "center", display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
                    <Box sx={{ backgroundColor: "secondary.main", justifyItems: "center", alignItems: "center", alignContent: "center", justifyContent: "center", height: "52vh", borderRadius: "5px" }}>
                        <BarChart
                            dataset={dataRowProductosMasVendidos("json")}
                            yAxis={[
                                { scaleType: 'band', data: loadDataProductosMasVendidos.data ? loadDataProductosMasVendidos["data"]["productsName"] : [] },
                            ]}
                            series={[ { data: loadDataProductosMasVendidos.data ? loadDataProductosMasVendidos["data"]["productsQuantity"] : [] } ]}
                            layout="horizontal"
                            xAxis={[{ label: "Productos mas vendidos" }]}
                            width={925}
                            height={400}
                        />
                    </Box>

                    <Stack gap={1}>
                        <Stack direction="row" gap={3} sx={{ height: "52vh", borderRadius: "5px", width: "50vh", backgroundColor: "secondary.main", justifyContent: "center", padding: "4vh", alignContent: "center", alignItems: "center", display: "flex" }}>
                            <Avatar sx={{ height: "9vh", width: "9vh", fontSize: 30, backgroundColor: "red" }}>R</Avatar>
                            <Stack gap={1} sx={{ width: "30vh" }}>
                                <Typography variant="h6">TOTAL DE RESERVAS</Typography>
                                <Typography variant="h3">{ loadDataReservasPorMes.data ? loadDataReservasPorMes["data"]["totalReserves"] : "Loading..." }</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}