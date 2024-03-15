import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { ListService, UserService } from "../service/DatabaseService";
import { arrayRemove } from "firebase/firestore";

const DeleteListButton = ({ listId, uid }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setInputValue("");
    setError("");
  };

  const handleConfirm = async () => {
    if (inputValue === "DELETE") {
      try {
        await UserService.update(uid, { lists: arrayRemove(listId) });  
        await ListService.remove(listId);
        handleClose();
        navigate("/library");
      } catch (error) {
        console.error("Error deleting list:", error);
        setError("An error occurred while deleting the list.");
      }
    } else {
      setError("Please enter 'DELETE' to confirm deletion.");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Delete List
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this list? This action cannot be
            undone. Please type <strong>"DELETE"</strong> to confirm.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Confirmation"
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteListButton;