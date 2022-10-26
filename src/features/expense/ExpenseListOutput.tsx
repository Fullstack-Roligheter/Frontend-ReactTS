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
import { Collapse, IconButton } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

const ExpenseListOutput = () => {
  const user = useUserContext()

  const [debits, setDebits] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  //Get all debits to put in list
  useEffect(() => {
    GetDebitsForUser(user.userId).then((Response) => {
      setDebits(Response)
    })
  }, [])
  console.log(debits)

  return (
    <>
      {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="right">Datum</TableCell>
        <TableCell align="right">Summa</TableCell>
        <TableCell align="right">Kategori</TableCell>
        <TableCell align="right">Budget</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {debits.map((debit) => (
                    <TableRow key={debit.id}>
                      <TableCell component="th" scope="row">
                        {debit.date}
                      </TableCell>
                      <TableCell>{debit.customerId}</TableCell>
                      <TableCell align="right">{debit.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </Collapse>
        </TableCell>
      </TableRow> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableCell></TableCell>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Summa</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Budget</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debits.map((debit) => (
              <TableRow
                key={debit.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
                <TableCell>{debit.date}</TableCell>
                <TableCell>{debit.amount}</TableCell>
                <TableCell>{debit.category}</TableCell>
                <TableCell>{debit.budget}</TableCell>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <TableRow>
                  <TableCell>Kommentar</TableCell>

                </TableRow>
                <TableCell>{debit.comment}</TableCell>
                </Collapse>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ExpenseListOutput
