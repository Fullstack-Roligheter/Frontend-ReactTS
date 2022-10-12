import { Box, Link, Typography } from '@mui/material'
import { userType } from '../../shared/Interfaces/userToken'
import { GetGravatarProfile } from '../../shared/fetch/gravatar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { flexbox } from '@mui/system'
import { useUserContext } from '../../context/UserContext'

const styles = {
  div: {
    display: 'flex',
    align: 'center',
  },
  img: {
    height: '100%',
  },
  profileimgdiv: {
    margin: '5px',
  },
  profileinfodiv: {
    width: '500px',
  },
}

function ProfileFeature() {
  const user = useUserContext()

  var CryptoJS = require('crypto-js')
  let userEmail = user.email
  if (userEmail !== null) {
    var hash = CryptoJS.MD5(userEmail.toLowerCase()).toString()
  }

  const [name, setName] = useState([])
  const [aboutMe, setaboutMe] = useState([])
  const [accounts, setaccounts] = useState([])
  const [profileImage, setprofileImage] = useState([])
  const [email, setemail] = useState([])
  const [location, setlocation] = useState([])
  const [phone, setphone] = useState([])
  const [btcAddress, setbtcAddress] = useState([])
  const [data, setdata] = useState('')

  useEffect(() => {
    async function getUserProfile() {
      const response = await axios.get(
        `https://localhost:7073/api/Gravatar/GetGravatarProfile?hash=${hash}`
      )
      console.log(response)
      if (response.data === 'User not found') {
        console.log(response.data)
        setdata(response.data)
      } else {
        setName(response.data.entry[0].name.formatted)
        setemail(response.data.entry[0].emails[0].value)
        setaboutMe(response.data.entry[0].aboutMe)
        setaccounts(response.data.entry[0].accounts[0].display)
        setprofileImage(response.data.entry[0].photos[0].value)
        setlocation(response.data.entry[0].currentLocation)
        setphone(response.data.entry[0].phoneNumbers[0].value)
        setbtcAddress(response.data.entry[0].currency[0].value)
      }
    }
    getUserProfile()
  }, [])

  return (
    <Box
      sx={{
        width: 850,
        m: 3,
        mt: 3,
        p: 3,
        pt: 3,
        borderRadius: 2,
        bgcolor: 'RGBA(255,255,255,0.65)',
        boxShadow: 5,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {(() => {
        if (data === 'User not found') {
          return (
            <Box>
              <br />
              <Typography variant='subtitle1'>
                Create your profile at :{' '}
                <Link href='https://en.gravatar.com/'>Gravatar</Link>
              </Typography>
              <br />
            </Box>
          )
        } else {
          return (
            <Box>
              <div style={styles.div}>
                <div style={styles.profileimgdiv}>
                  <img src={`${profileImage}?s=200`} style={styles.img} />
                </div>
                <div style={styles.profileinfodiv}>
                  <Typography variant='subtitle1'>Name: {name}</Typography>
                  <Typography variant='subtitle1'>
                    Twitter Handle:{' '}
                    <Link href='https://www.twitter.com'>{accounts}</Link>
                  </Typography>
                  <Typography variant='subtitle1'>Email: {email}</Typography>
                  <Typography variant='subtitle1'>
                    Location: {location}
                  </Typography>
                  <Typography variant='subtitle1'>Phone: {phone}</Typography>
                  <Typography variant='subtitle1'>
                    BTC Adress: {btcAddress}
                  </Typography>
                  <Typography variant='subtitle1'>
                    Ändra din profil här:{' '}
                    <Link href='https://en.gravatar.com/'>Gravatar</Link>
                  </Typography>
                </div>
              </div>
            </Box>
          )
        }
      })()}
    </Box>
  )
}

export default ProfileFeature
