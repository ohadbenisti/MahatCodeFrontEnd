import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const AlertDialog = ({ userId, renderUsers }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const validate = document.getElementById("deleteTextValidation");
    try {
      if (validate.value === "צ'יפופו") {
        const url = `${import.meta.env.VITE_SERVER}/admin/users/${userId}`;
        const response = await axios.delete(url, { withCredentials: true });
        console.log(response);
        if (response.data.status === "success") {
          renderUsers();
        }
      } else {
        alert("לא הקשת את מילת הסוד הנכונה");
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        מחק משתמש
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"האם אתה בטוח?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            אתה עומד לבצע פעולת מחיקת משתמש. פעולה זו היא קבועה ולא ניתן לבטל
            אותה. אם אתה בטוח, הקלד את מילת הקסם:
            <br />
            <br />
            <input
              id="deleteTextValidation"
              typeof="text"
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
    </React.Fragment>
  );
};

export default AlertDialog;
