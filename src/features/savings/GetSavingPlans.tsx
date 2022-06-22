import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plan } from "./Plan";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const userId = 1;
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CheckSavingPlans: React.FC = () => {
  const [planList, setPlanList] = useState<Plan[]>([]);

  const getPlans = async () => {
    try {
      const { data } = await axios(
        `https://localhost:7073/api/saving/getplans?UserId=${userId}`
      );
      let planList = data as Plan[];
      setPlanList(planList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const deletPlan = (id: number) => {
    if (id !== null) {
      axios
        .delete(`https://localhost:7073/api/saving/deteleplan/${id}`)
        .then((res) => {
          if (res.status === 200) {
            getPlans();
          }
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Plan Title</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">End Date</StyledTableCell>
            <StyledTableCell align="right">Countdown Days</StyledTableCell>
            <StyledTableCell align="right">Edit/Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planList.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">
                {row.planStartDate}
              </StyledTableCell>
              <StyledTableCell align="right">{row.planEndDate}</StyledTableCell>
              <StyledTableCell align="right">{row.countDown}</StyledTableCell>
              <div className="icon-container">
                <Link to={""}>
                  <FiTrash2
                    className="icon"
                    onClick={() => deletPlan(row.savingId)}
                  />
                </Link>
                <Link to={`/saving/editplan/${row.savingId}`}>
                  <FiEdit className="icon" />
                </Link>
              </div>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CheckSavingPlans;
