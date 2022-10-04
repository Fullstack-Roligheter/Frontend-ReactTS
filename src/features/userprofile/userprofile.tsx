import { Box, Typography } from "@mui/material"
import axios from "axios"


var CryptoJS = require('crypto-js')
let userEmail = "danielkjellberg@hotmail.com"
var hash = CryptoJS.MD5(userEmail).toString()
var lowercasehash = hash.toLowerCase()

console.log(`https://www.gravatar.com/${lowercasehash}.json`)

var userJSON = axios.get(`https://www.gravatar.com/${lowercasehash}.json`)
                    .then((response) => {
                            const data = response.data
                            console.log(data)
                            return data
                        })
                        .catch((error) => {
                            console.log('Error in userProfile: ', error)
                            throw error
                        })


//console.log(`Gravatar JSON: ${userJSON}`)

function ProfileFeature() {
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
      <Typography variant='h1' >${lowercasehash}</Typography>
      
    </Box>
  )
}

export default ProfileFeature

