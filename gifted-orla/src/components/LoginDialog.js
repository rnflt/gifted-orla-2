import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import AuthUI, { uiConfig } from "../service/AuthUI";
import LoginUI from "./LoginUI";

const LoginDialog = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login / Signup</DialogTitle>
                <LoginUI />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginDialog;
