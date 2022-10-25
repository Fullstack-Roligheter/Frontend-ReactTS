import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import { TablePagination } from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import { GetDebitsForUser } from '../../shared/fetch/expense'
import { useUserContext } from '../../context/UserContext'

const ExpenseListOutput = () => {
  const user = useUserContext()
  const [debits, setDebits] = useState<any[]>([])

  //Get all debits to put in list
  useEffect(() => {
    GetDebitsForUser(user.userId).then((Response) => {
      setDebits(Response)
    })
  }, [])
  console.log(debits)

  //Pagination, sätter startpage 0, visar 5 rows per sida
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //Om inte det finns jämt 5 rows kvar, visa tomma rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - debits.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <TableContainer className="table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Summa</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Kommentar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? debits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : debits
            ).map((debit) => (
              <TableRow
                key={debit.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{debit.date}</TableCell>
                <TableCell>{debit.amount}</TableCell>
                <TableCell>{debit.category}</TableCell>
                <TableCell>{debit.budget}</TableCell>
                <TableCell component="th">{debit.comment}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={debits.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </Table>
      </TableContainer>
  );
}

export default ExpenseListOutput
