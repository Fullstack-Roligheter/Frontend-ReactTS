import { useEffect, useState } from 'react'
import { GetDebitsForUser } from '../../shared/fetch/expense'
import { userType } from '../../shared/Interfaces/userToken'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { TablePagination } from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useUserContext } from '../../context/UserContext'
import { Button } from '@mui/material'
import React from 'react'

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

  const SortDebits = (sortOption: string) => {
    console.log(sortOption)


    //   if (selectedyear !== "Välj år") {
    //     console.log("Har valt år")
    //     const filteredYears = items.filter((item) => item.pubdate.year === selectedyear);
    //     if (selectedmonth !== "Välj månad") {
    //       console.log("Har valt månad")
    //       const filteredMonths = filteredYears.filter((item) => item.pubdate.month === selectedmonth);
    //       dispatch('message', {
    //         arr: filteredMonths,
    //       });
    //     }
    //     else {
    //       console.log("Har valt år men inte månad")
    //       dispatch('message', {
    //         arr: filteredYears,
    //       });
    //     }
    //   }
    //   

  }

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
    <>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 650, maxWidth: '100 %' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell><Button onClick={() => SortDebits('datum')}>Datum</Button></TableCell>
              <TableCell><Button onClick={() => SortDebits('summa')}>Summa</Button></TableCell>
              <TableCell><Button onClick={() => SortDebits('kategori')}>Kategori</Button></TableCell>
              <TableCell><Button onClick={() => SortDebits('budget')}>Budget</Button></TableCell>
              <TableCell><Button onClick={() => SortDebits('kommentar')}>Kommentar</Button></TableCell>
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
                <TableCell className="comments">{debit.comment}</TableCell>
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
    </>
  )
}

export default ExpenseListOutput
