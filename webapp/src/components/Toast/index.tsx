import { Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface ToastProps {
    variant: "error" | "warning" | "info" | "success",
    text: string,
}

function Toast({ variant, text }: ToastProps) {

    const [open, setOpen] = useState(true);

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if(!open) return null

    return (
        <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
            { text }
        </Alert>  
    )
}

export default Toast

