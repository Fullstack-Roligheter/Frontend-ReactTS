import { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { DateRangeOutlined } from '@mui/icons-material';
import { breakpoints } from '@mui/system';
import Budget from './IBudget';

const tempUserId: number = 1;

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 50},
  {
    field: 'budgetName',
    headerName: 'Budget',
    width: 150,
    editable: false,
  },
  {
    field: 'budgetStartDate',
    headerName: 'Startdatum',
    width: 160,
    editable: false,
  },
  {
    field: 'budgetEndDate',
    headerName: 'Slutdatum',
    width: 160,
    editable: false,
  },
  {
    field: 'budgetMaxAmountMoney',
    headerName: 'Summa',
    width: 140,
    editable: false
  }
];

const GetBudgets = () => {
  const [budgetList, setBudgetList] = useState<Budget[]>([]);

  const FetchData = async () => {
    await axios('https://localhost:7073/ListAllBudgetInfosForSpecificUser/' + tempUserId)
    .then((res) => {;
      let newData = res.data as Budget[];
      setBudgetList(newData);
    })
  }

  useEffect(() => {
    FetchData();
  },[])

  return (
        <Fragment>
            <Box sx={{ height: 370.5, width: 662}}>
                <DataGrid
                    rows={budgetList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Fragment>
    );
}

export default GetBudgets;