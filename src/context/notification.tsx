import React, { useContext, useState } from "react";
import { ContextProps } from "../helpers/types";
import { Notification } from "../components";
import { AlertColor } from "@mui/material";

const NotificationContext = React.createContext<ContextProps | null>(null);
export const NotificationProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    
    const handleClose = () => {
        setOpen(false);
    }

    const notificate = (msg: string, severity: AlertColor) => {
        setSeverity(severity);
        setOpen(true);
        setMessage(msg);
    }

    const value = {
        notificate
    }

    return (
        <NotificationContext.Provider value={value}>
            <Notification handleClose={handleClose} open={open} severity={severity} message={message}/>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("Error en el contexto");
    return context;
}