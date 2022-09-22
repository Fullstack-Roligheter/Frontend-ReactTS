import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { DateRangeOutlined } from '@mui/icons-material';
import { breakpoints } from '@mui/system';

interface BudgetList {
    id: number;
    budgetName: string;
    budgetStartDate: Date;
    budgetEndDate: Date;
    budgetMaxAmount: number;
};

const tempUserId: number = 1;

const rows = [
  { id: 1, budgetName: 'Mat',            budgetStartDate: new Date("2022-10-10").toLocaleString(), budgetEndDate: new Date("2022-12-30").toLocaleString(), budgetMaxAmount: 4000 },
  { id: 2, budgetName: 'Transport',      budgetStartDate: new Date("2022-10-10").toLocaleString(), budgetEndDate: new Date("2022-12-31").toLocaleString(), budgetMaxAmount: 2500 },
  { id: 3, budgetName: 'Hem/hushåll',    budgetStartDate: new Date("2022-10-10").toLocaleString(), budgetEndDate: new Date("2022-12-31").toLocaleString(), budgetMaxAmount: 400 },
  { id: 4, budgetName: 'Fiske',          budgetStartDate: new Date("2022-10-10").toLocaleString(), budgetEndDate: new Date("2022-12-31").toLocaleString(), budgetMaxAmount: 1500 },
  { id: 5, budgetName: 'Köksrenovering', budgetStartDate: new Date("2021-11-12").toLocaleString(), budgetEndDate: new Date("2022-12-31").toLocaleString(), budgetMaxAmount: 65000 },
  { id: 6, budgetName: 'Övrig hobby',    budgetStartDate: new Date("2021-11-12").toLocaleString(), budgetEndDate: new Date("2022-12-31").toLocaleString(), budgetMaxAmount: 650 },
  { id: 7, budgetName: 'Trädgård',       budgetStartDate: new Date("2021-11-12").toLocaleString(), budgetEndDate: new Date("2022-12-31").toLocaleString(), budgetMaxAmount: 8000 }
];

const Budget = () => {
  let rowsNew: object[] = [];
  
  const [rowsValue, setRowsValue] = useState<{object: BudgetList}[]>();

  const [budgetId, setBudgetId] = useState(0);
  const [budgetName, setBudgetName] = useState("");
  const [budgetStartDate, setBudgetStartDate] = useState(new Date);
  const [budgetEndDate, setBudgetEndDate] = useState(new Date);
  const [budgetMaxAmount, setBudgetMaxAmount] = useState(0);

  // const SetValues = (arr: BudgetList) => {
  //   setBudgetId(arr.id);
  //   setBudgetName(arr.budgetName);
  //   setBudgetStartDate(arr.budgetStartDate);
  //   setBudgetEndDate(arr.budgetEndDate);
  //   setBudgetMaxAmount(arr.budgetMaxAmount);
  //   // console.log(arr);
  //   // rowsNew.push(arr);
  // };

  const stuff = (arr: any[]) => {
    arr.forEach(element => {
      console.log(element)
      rowsNew = Object.assign([], rowsNew);
      rowsNew.push(element);
    });
  }

  axios({
    method: 'post',
    url: 'https://localhost:7073/ListAllBudgetInfosForSpecificUser',
    data:  {
      userId: 1 
    }
    }).then((res) => {
      stuff(res.data);
    }  )  

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {
      field: 'budgetName',
      headerName: 'Budget',
      width: 200,
      editable: false,
    },
    {
      field: 'budgetStartDate',
      headerName: 'Startdatum',
      width: 200,
      editable: false,
    },
    {
      field: 'budgetEndDate',
      headerName: 'Slutdatum',
      width: 200,
      editable: false,
    },
    {
      field: 'budgetMaxAmount',
      headerName: 'Summa',
      type: 'number',
      width: 140,
      editable: false
    }
  ];

  return (
        <Fragment>
            <Box sx={{ height: 370.5, width: 662}}>
                <DataGrid
                    rows={rowsNew}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Fragment>
    );
}

export default Budget;