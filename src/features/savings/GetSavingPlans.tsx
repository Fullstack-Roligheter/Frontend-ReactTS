import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import { Plan } from '../../shared/Interfaces/savingPlan'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { DeleteSaving, GetPlans } from '../../shared/fetch/savingplan'
import { useUserContext } from '../../context/UserContext'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CheckSavingPlans = () => {
  const user = useUserContext()

  const [planList, setPlanList] = useState<Plan[]>([])

  useEffect(() => {
    getPlans()
  }, [])

  const getPlans = async () => {
    GetPlans(user.userId).then((response) => {
      console.log('response: ', response)
      let planList = response as Plan[]
      setPlanList(planList)
    })
  }

  const DeleteSavingPlan = (id: string) => {
    if (id !== null) {
      DeleteSaving(id)
        .then((res) => {
          if (res.status === 200) {
            getPlans()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Plan Title</StyledTableCell>
            <StyledTableCell align='right'>Amount</StyledTableCell>
            <StyledTableCell align='right'>Start Date</StyledTableCell>
            <StyledTableCell align='right'>End Date</StyledTableCell>
            <StyledTableCell align='right'>Edit/Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planList.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.amount}</StyledTableCell>
              <StyledTableCell align='right'>
                {row.planStartDate}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.planEndDate}</StyledTableCell>
              <StyledTableCell align='right' className='icon-container'>
                <Link to={''}>
                  <IconButton
                    className='icon'
                    onClick={() => DeleteSavingPlan(row.savingId)}
                  >
                    <DeleteOutlineIcon></DeleteOutlineIcon>
                  </IconButton>
                </Link>
                <Link to={`editplan/${row.savingId}`}>
                  <IconButton className='icon'>
                    <EditIcon />
                  </IconButton>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CheckSavingPlans
