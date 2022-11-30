import { Box, IconButton, Typography } from '@mui/material'
import { Link, Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { userType } from '../../shared/Interfaces/userToken'
import styles from '../../CssStyles.js'
import { useEffect, useState } from 'react'
import DebitChart from '../../shared/charts/DebitChart'
import { Plan } from '../../shared/Interfaces/savingPlan'
import { GetPlans } from '../../shared/fetch/savingplan'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { color } from '@mui/system'

function DashboardFeature() {

  const [dashboardTextSize, setDashboardTextSize] = useState('big')
  const [planList, setPlanList] = useState<any[]>([])
  const [planName, setPlanName] = useState("")
  const [planAmount, setPlanAmount] = useState("")
  const [planStartDate, setPlanStartDate] = useState("")
  const [planEndDate, setPlanEndDate] = useState("")

  useEffect(() => {
    getPlans()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setDashboardTextSize('small')
      } else {
        setDashboardTextSize('big')
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let timeMilli = Date.now().toString().slice(-3)

  const user = useUserContext()

  if (user.userId === null) {
    return <Navigate to='/login' replace />
  }


  //Savingsplan

  const getPlans = async () => {
    GetPlans(user.userId).then((response) => {
      let latestItem: number = response.length - 1
      setPlanName(response[latestItem].name)
      setPlanAmount(response[latestItem].amount)
      setPlanStartDate(response[latestItem].planStartDate)
      setPlanEndDate(response[latestItem].planEndDate)
    })
  }

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

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: 'row', height: "450px" }}>
        <Box
          sx={
            {
              width: 650,
              m: 3,
              mt: 3,
              p: 3,
              pt: 3,
              borderRadius: 2,
              bgcolor: 'RGBA(255,255,255,0.65)',
              boxShadow: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }
          }
        >
          <Typography variant='h4' style={styles.blackTypography}>
            Expense Oversight
          </Typography>

          <DebitChart />
        </Box>
          <Box
          sx={
            {
              width: 450,
              m: 3,
              mt: 3,
              p: 3,
              pt: 3,
              borderRadius: 2,
              bgcolor: 'RGBA(255,255,255,0.65)',
              boxShadow: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: ' space-between',
              alignItems: 'center',
            }
          }
          >
          <Typography variant='h4' style={styles.blackTypography}>
            Latest Savingsplan
          </Typography>
          <Typography variant="h3" style={styles.savingsPlanInfo}> 
            {planName}
          </Typography>
          <Typography variant="h3" style={styles.savingsPlanInfo}>
            {planAmount}:-
          </Typography>
          <div style={{ display: "flex", flexDirection: 'column', width: "100%"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" style={styles.savingsplanDate}>
                Startdate
              </Typography>
              <Typography variant="h6" style={styles.savingsplanDate}>
                Enddate
              </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" style={styles.savingsplanDate}>
                {planStartDate}
              </Typography>
              <Typography variant="h6" style={styles.savingsplanDate}>
                {planEndDate}
              </Typography>
            </div>
          </div>
          
          </Box>
      </Box>
    </>
  )
}

export default DashboardFeature
