import { Snackbar, Alert, Typography } from "@mui/material";
import React from "react";
import { NotificationProps } from "../../helpers/types";

export const Notification: React.FC<NotificationProps> = ({ open, message, severity, handleClose }: NotificationProps) => {
    return (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} open={open} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                <Typography>{message}</Typography>
            </Alert>
        </Snackbar>
    );
}