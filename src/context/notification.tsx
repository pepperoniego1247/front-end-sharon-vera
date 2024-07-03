import React, { useState } from "react";
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

    const getError = () => {
        setSeverity("error");
        setOpen(true);
        setMessage(message);
    }

    const value = {
        getError
    }

    return (
        <NotificationContext.Provider value={value}>
            <Notification handleClose={handleClose} open={open} severity={severity} message={message}/>
            {children}
        </NotificationContext.Provider>
    );
}