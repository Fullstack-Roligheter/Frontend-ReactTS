import { Fragment } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';



const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {
      field: 'name',
      headerName: 'Budget',
      width: 200,
      editable: false,
    },
    {
      field: 'createdDate',
      headerName: 'Skapad datum',
      width: 200,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Summa',
      type: 'number',
      width: 140,
      editable: false
    }
  ];

  

  const rows = [
    { id: 1, name: 'Mat', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2022, 2, 13, 3, 21, 21, 633))), amount: 4000 },
    { id: 2, name: 'Transport', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2021, 11, 27, 3, 21, 21, 633))), amount: 2500 },
    { id: 3, name: 'Hem/hushåll', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2022, 3, 2, 3, 21, 21, 633))), amount: 400 },
    { id: 4, name: 'Fiske', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2022, 2, 2, 3, 21, 21, 633))), amount: 1500 },
    { id: 5, name: 'Köksrenovering', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2021, 12, 24, 3, 21, 21, 633))), amount: 65000 },
    { id: 6, name: 'Övrig hobby', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2022, 5, 11, 3, 21, 21, 633))), amount: 650 },
    { id: 7, name: 'Trädgård', createdDate: new Intl.DateTimeFormat('sv-SE').format(new Date(Date.UTC(2022, 6, 13, 3, 21, 21, 633))), amount: 8000 }
  ];

  

  export default function Budget() {
    return (
        <Fragment>
            <Box sx={{ height: 370.5, width: 662}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Fragment>
    );
  }