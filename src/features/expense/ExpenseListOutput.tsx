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
import { Collapse, IconButton, Box } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

const ExpenseListOutput = () => {
  const user = useUserContext()

  const [debits, setDebits] = useState<any[]>([])
  const [open, setOpen] = useState(-1)

  //Get all debits to put in list
  useEffect(() => {
    GetDebitsForUser(user.userId).then((Response) => {
      setDebits(Response)
    })
  }, [])
  console.log(debits)

  return (
    <>
      <Box sx={{ width: 800, mt: 7 }}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell colSpan={5}>Budget</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debits.map((debit, index) => (
                <>
                  <TableRow key={debit.id}>
                    <TableCell sx={{ paddingBottom: 0, borderBottom: '0px' }}>
                      <IconButton
                        onClick={() => setOpen(open === index ? -1 : index)}
                      >
                        {open === index ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ paddingBottom: 0, borderBottom: '0px' }}>
                      {debit.date}
                    </TableCell>
                    <TableCell sx={{ paddingBottom: 0, borderBottom: '0px' }}>
                      {debit.amount}
                    </TableCell>
                    <TableCell sx={{ paddingBottom: 0, borderBottom: '0px' }}>
                      {debit.category}
                    </TableCell>
                    <TableCell
                      colSpan={5}
                      sx={{ paddingBottom: 0, borderBottom: '0px' }}
                    >
                      {debit.budget}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ paddingBottom: 0 }}>
                      <Collapse
                        in={open === index}
                        timeout='auto'
                        unmountOnExit
                      >
                        <Box>Comment</Box>
                        {debit.comment}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default ExpenseListOutput