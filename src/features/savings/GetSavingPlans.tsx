import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Plan } from './Plan'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { baseURL } from '../../config'
import React from 'react'
import { GetPlans } from '../../shared/fetch/savingplan'
import { userType } from '../../shared/Interfaces/userToken'

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CheckSavingPlans = (props: userType) => {
  const [planList, setPlanList] = useState<Plan[]>([])

  const getPlans = async () => {
    // const userId = sessionStorage.getItem('userId')
    GetPlans(props.userId).then((response) => {
      console.log('response: ', response)
      let planList = response as Plan[]
      setPlanList(planList)
    })
    // try {
    //   //
    //   // let numberValue: string | null = ''
    //   const value = sessionStorage.getItem('userId')
    //   // if (value !== null) {
    //   //   numberValue = JSON.parse(value)
    //   // } else {
    //   //   console.log('never entered parse value')
    //   // }
    //   //

    //   const { data } = await axios.get(
    //     `${baseURL}/saving/getplans?UserId=${value}`
    //   )
    //   let planList = data as Plan[]
    //   setPlanList(planList)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  useEffect(() => {
    console.log('getPlans in GetSavingsPlans init')
    getPlans()
  }, [])

  const deletPlan = (id: number) => {
    if (id !== null) {
      axios.delete(`${baseURL}/saving/deteleplan/${id}`).then((res) => {
        if (res.status === 200) {
          getPlans()
        }
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
            <StyledTableCell align='right'>Countdown Days</StyledTableCell>
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
              <StyledTableCell align='right'>{row.countDown}</StyledTableCell>
              <div className='icon-container'>
                <Link to={''}>
                  <IconButton
                    className='icon'
                    onClick={() => deletPlan(row.savingId)}
                  >
                    <DeleteOutlineIcon></DeleteOutlineIcon>
                  </IconButton>
                </Link>
                <Link to={`editplan/${row.savingId}`}>
                  <IconButton className='icon'>
                    <EditIcon />
                  </IconButton>
                </Link>
              </div>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CheckSavingPlans
