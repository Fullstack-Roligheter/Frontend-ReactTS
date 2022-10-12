import { useEffect, useState } from 'react'
import { GetDebitsForUser } from '../../shared/fetch/expense'
import { userType } from '../../shared/Interfaces/userToken'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ExpenseListOutput = (props: any) => {
  const [debits, setDebits] = useState([])

  //Get all debits to put in list
  useEffect(() => {
    console.log('props.userId: ', props.userId)
    GetDebitsForUser(props.userId).then((Response) => {
      setDebits(Response)
    })
  }, [])
  console.log(debits)

  return (
    <>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debits.map((debits) => (
              <TableRow
                key={debits}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {debits.Amount}
                </TableCell>
                <TableCell align='right'>{debits}</TableCell>
                <TableCell align='right'>{debits}</TableCell>
                <TableCell align='right'>{debits}</TableCell>
                <TableCell align='right'>{debits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  )
}

export default ExpenseListOutput
