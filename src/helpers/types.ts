import { AlertColor, SxProps, Theme } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Dayjs } from "dayjs";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

export type LoginType = {
    userName: string;
    password: string;
    device: string;
}

export type ProductData = {
    name: string,
    category : string,
    description: string,
    price: string,
    image: string,
    cantidad : string, 
    comerciable: boolean,
    activo: boolean
}

export type DashBoardCardProps = {
    number: number,
    title: string,
}

export type ProfileDataType = {
    phoneNumber: string | null;
    avatar: string | null;
}

export type AvatarUploaderProps = {
    data: any;
    setData: any;
    loadedData: UseQueryResult<any, Error>;
}

export type VerifiedUserType = {
    password: string,
    userName: string,
    passwordVerified: string
}

export type ReserveDataType = {
    reserveDate?: Date | null,
    initionDate?: Date | null,
    expirationDate?: Date | null,
    activo: boolean,
    asignedEmployee: string,
    asignedCustomer: string,
}

export type TransferListProps = {
    sx: SxProps<Theme>,
}

export type EmployeeDataType = {
    dni: string,
    firstName: string,
    lastName: string,
    role: string,
    payment: number,
    phoneNumber: string,
    activo: boolean
}

export type CustomerDataType = {
    dni: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    notation?: string,
    activo: boolean
}

export type NotificationProps = {
    open: boolean,
    message: string,
    severity: AlertColor | undefined,
    handleClose: () => void
}

export type filterDataType = {
    name: string,
    category: string,
    inStock: boolean
}

export type ContextProps = {
    notificate: (message: string, severity: AlertColor) => void;
}

export type RegisterType = {
    userName: string,
    password: string,
    type: string
}

export type NavBarProps = {
    text: string,
    pages: Map<string, string>
}

export type UserData = {
    userName: string,
    password: string,
    dni: string
}

export type SideBarProps = {
    title: string
}

export type TableProps = {
    headers: GridColDef<any>[],
    active?: boolean,
    dataRow: any,
    disableSelectionRow?: boolean,
    sx: SxProps<Theme>,
    setData: any,
    data: any
}

export type RoleData = {
    name: string,
    payment: number | string
}

export type MicroServiceDataType = {
    name: string,
    price: number | string,
    activo: boolean
}

export type SimpleList = {
    dataRow: any[],
    sx: SxProps<Theme>
}

export type CheckBoxListProps = {
    sx: SxProps<Theme>
}

export type AutoCompleteCheckBoxes = {
    sx: SxProps<Theme>
    tag: string,
    setData: any,
    data: any,
    dataRow: string[],
    size: "small" | "medium" | undefined
}

export type FormDialogProps = {
    title: string,
    children: ReactNode,
    sx: SxProps<Theme>,
    icon: JSX.Element,
}

export type PromotionData = {
    name: string,
    precio: string,
    activo: boolean
}

export type ServiceData = {
    description: string,
    price: string,
}

export type MediaCardProps = {
    setData?: any,
    setListProduct: any,
    listProduct: any,
    data?: any,
    list?: any
    setCounter: any,
    counter: any
}

export type SubHeaderListProps = {
    reserveDetail: any[],
}

export type ProductDataType = {
    name: string,
    cantidad: number,
    cantidadSolicitada: number
    category: string,
    price: number,
    image?: string,
    description?: string
}

export type DisplayInformationProps = {
    data: CancelReserveType,
    detail: any[],
    isPending: boolean
}

export type CancelReserveType = {
    asignedCustomer: string,
    creationDate?: Date,
    asignedEmployeeId?: string,
    dateReserved?: Date,
    initionTime: string,
    typeOfDocument: "Nota de venta" | "Boleta de venta",
    expirationTime: string,
    paymentMethod: string,
    asignedEmployee: string
}

export type SelectTextFieldProps = {
    required?: boolean,
    setData: any,
    data: any,
    label: string,
    listData: Map<string, string>,
    name: string
}

export type OrderEntryData = {
    date?: Date | null,
    activo: boolean,
    employee: string,
    provider: string,
    orderEntryDetails: string[]
}

export type TypeOfDocumentProps = {
    type: "Nota de venta" | "Boleta de venta;"
}

export type SaleProductType = {
    date: Date,
    paymentMethod: string,
    employee: string,
    customer: string,
    saleDetails: string[],
    customerAddress?: string
}

export type ProviderData ={
    ruc: string,
    address: string,
    name: string,
    phoneNumber: string,
    activo: boolean;
}


export type AnamnesisDataType = {
    id: number,
    birthDate: string;
    address: string;
    city: string;
    email: string;
    other: string;
    provenencia: string,
    queloide: boolean,
    lentesDeContacto: boolean,
    aspirinas: boolean,
    depresion: boolean,
    enfermedadesCardiovasculares: boolean,
    epilepsia: boolean,
    hipertension: boolean,
    problemasIntestinales: boolean,
    problemasRenales: boolean,
    problemasRespiratorios: boolean,
    problemasCirculatorios: boolean,
    alergias: boolean,
    tatuajes: boolean,
    hemofilia: boolean,
    cancer: boolean,
    vihPlus: boolean,
    marcaPasos: boolean,
    diabetes: boolean,
    glaucoma: boolean,
    embarazada: boolean,
    hepatitis: boolean,
    anemia: boolean,
    radioUno: boolean,
    respuestaUno: string,
    radioDos: boolean,
    respuestaDos: string,
    radioTres: boolean,
    respuestaTres: string,
    radioCuatro: boolean,
    respuestaCuatro: string,
    radioCinco: boolean,
    respuestaCinco: string,
    respuestaSeis: string,
    observacion: string,
    customer: {
      id: number,
      person: {
        id: number,
        firstName: string,
        lastName: string,
        dni: string,
        phoneNumber: string,
        activo: boolean
    }
  }
}
