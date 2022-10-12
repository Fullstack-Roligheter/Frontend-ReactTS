import { useEffect, useState } from 'react'
import { GetDebitsForUser } from '../../shared/fetch/expense'
import { userType } from '../../shared/Interfaces/userToken'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Debits</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debits.map((debit) => (
              <TableRow
                key={debit.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{debit.amount}</TableCell>
                <TableCell>{debit.category}</TableCell>
                <TableCell>{debit.date}</TableCell>
                <TableCell>{debit.budget}</TableCell>
                <TableCell>{debit.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ExpenseListOutput
