import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteAlertDialog = ({ onClose }) => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleDelete = async () => {
        const validate = document.getElementById("deleteTextValidation");
        try {
            if (validate.value === "צ'יפופו") {
                const url = `${import.meta.env.VITE_SERVER}/admin/problem/${questionId}`;
                const response = await axios.delete(url, { withCredentials: true });
                console.log(response);
                if (response.data.status === "success") {
                    navigate("/");
                }
            } else {
                alert("לא הקשת את מילת הסוד הנכונה")
                return;
            }
        } catch (error) {
            console.error(
                "Error deleting question:",
                error.response ? error.response.data : error.message
            );
        }
        setOpen(false);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"האם אתה בטוח?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    אתה עומד לבצע פעולת מחיקת שאלה. פעולה זו היא קבועה ולא ניתן לבטל אותה.
                    אם אתה בטוח, הקלד את מילת הקסם:
                    <br />
                    <br />
                    <input
                        id="deleteTextValidation"
                        type="text"
                        placeholder="רמז: צ'יפופו"
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>לא מסכים</Button>
                <Button onClick={handleDelete} autoFocus>
                    מסכים
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAlertDialog;
