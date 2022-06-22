import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const CreateSaving: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const successMessage = () => {
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your plan has been successfully saved!
        </Alert>
      </Snackbar>
    );
  };
  const showError = () => {
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          You need to fill in correctly!
        </Alert>
      </Snackbar>
    );
  };

  const addPlan = async () => {
    try {
      const sendData = await axios.post(
        "https://localhost:7073/api/saving/addplan",
        {
          userId: 1,
          name: title,
          amount: amount,
          planStartDate: startDate,
          planEndDate: endDate,
        }
      );
      if (sendData.status === 200) {
        setStatus(sendData.status);
        setOpen(true);
        setTitle("");
        setAmount("");
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      if ((error = "AxiosError")) {
        setOpen(true);
        setStatus(400);
      }
    }
  };
  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <TextField
          required
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          required
          value={amount}
          label="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <TextField
          required
          value={startDate}
          label="Start Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <TextField
          required
          value={endDate}
          label="End Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <br />
        <Button variant="contained" type="button" onClick={addPlan}>
          Submit
        </Button>
      </Box>
      {status !== 200 ? showError() : successMessage()}
    </Fragment>
  );
};
export default CreateSaving;
