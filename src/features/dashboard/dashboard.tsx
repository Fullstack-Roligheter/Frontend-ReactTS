import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import styles from '../../CssStyles.js'
import { useEffect, useState } from 'react'
import DebitChart from '../../shared/charts/DebitChart'
import { GetPlans } from '../../shared/fetch/savingplan'


function DashboardFeature() {

  const [dashboardTextSize, setDashboardTextSize] = useState('big')
  const [planName, setPlanName] = useState("")
  var [planAmount, setPlanAmount] = useState("")
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

  const user = useUserContext()

  if (user.userId === null) {
    return <Navigate to='/login' replace />
  }

  const getPlans = async () => {
    GetPlans(user.userId).then((response) => {
      let latestItem: number = response.length - 1
      setPlanName(response[latestItem].name)
      setPlanAmount(response[latestItem].amount)
      setPlanStartDate(response[latestItem].planStartDate)
      setPlanEndDate(response[latestItem].planEndDate)
    })
  }

function numberWithSpaces(planAmountWithoutSpaces: string) {
    return planAmountWithoutSpaces.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

planAmount =  numberWithSpaces(planAmount);

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
              <Box>
              {(() => {
                if (planName === "") {
                  return (
                    <div>
                      <Typography variant='h4' style={styles.blackTypography}>
                        Latest Savingsplan
                      </Typography>
                      <div style={{height: "300px", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                        <Typography variant="h6" align='left'>No Active Savings plan</Typography>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div style={{height: "350px", width: "100%", display:"flex", flexDirection: "column", justifyContent: "space-between"}}>
                      <Typography variant='h4' style={styles.blackTypography}>
                        Latest Savingsplan
                      </Typography>
                      <div  style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography variant="h3" style={styles.savingsPlanInfo}> 
                          {planName}
                        </Typography>
                        <Typography variant="h3" style={styles.savingsPlanInfo}>
                          {planAmount}:-
                        </Typography>
                      </div>
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
                  </div>
                  )
                }
              })()}
            </Box>
          </Box>
      </Box>
    </>
  )
}

export default DashboardFeature
