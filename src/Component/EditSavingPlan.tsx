import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Fragment, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Plan } from "../TypeMap/model";
import { useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const userId = 1;

const EditSavingPlan: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [planList, setPlanList] = useState<Plan[]>([]);
  const [open, setOpen] = useState(false);
  const [planId, setPlanId] = useState(0);

  const { id } = useParams();

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

  const getPlans = async () => {
    try {
      const { data } = await axios(
        `https://localhost:7073/api/saving/getplans?UserId=${userId}`
      );
      let planList = data as Plan[];
      const [plan] = planList.filter((plan) => plan.savingId === +id!);
      setPlanList(planList);
      if (!plan) return;
      setTitle(plan.name);
      setAmount(plan.amount.toString());
      setStartDate(plan.planStartDate);
      setEndDate(plan.planEndDate);
      setPlanId(plan.savingId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleEdit = async (id: number) => {
    if (id === null) return;
    const newData = await axios.put(
      `https://localhost:7073/api/saving/updateplan/${id}`,
      {
        savingId: id,
        name: title,
        amount: amount,
        planStartDate: startDate,
        planEndDate: endDate,
      }
    );
    if (newData.status === 200) {
      setOpen(true);
      setTitle("");
      setAmount("");
      setStartDate("");
      setEndDate("");
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
        <Button
          variant="contained"
          type="button"
          onClick={() => handleEdit(planId)}
        >
          Save Changes
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Change succeeded
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default EditSavingPlan;
