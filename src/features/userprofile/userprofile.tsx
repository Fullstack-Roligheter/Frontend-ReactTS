import { Box, Typography } from "@mui/material"
import axios from "axios"
import { userType } from "../../shared/Interfaces/userToken"




function ProfileFeature(user: userType) {

  var CryptoJS = require('crypto-js')
  let userEmail = sessionStorage.getItem('email') || "";
  var hash = CryptoJS.MD5(userEmail.toLowerCase()).toString()
  
axios.get(`https://localhost:7073/api/Gravatar/GetGravatarProfile?hash=${hash}}`)
                      .then((response) => {
                        debugger
                              const data = response.data
                              console.log(data)
                              return data
                          })
                          .catch((error) => {
                              console.log('Error in userProfile: ', error)
                              throw error
                          })
  
  // console.log(userProfile)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80vw',
        background:
          'radial-gradient(circle at center, rgba(65, 162, 72, 0.4), rgba(65, 162, 72, 0.0))',
        borderRadius: '15px',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '100px',
        paddingBottom: '100px',
        height: 'fit-content',
      }}
    >
      <Typography variant='h1' >Hej</Typography>
      {/* <p variant='h1' >${userProfile}</p> */}
      
    </Box>
  )
}

export default ProfileFeature

