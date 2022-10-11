import { Box, Link, Typography } from "@mui/material"
import { userType } from "../../shared/Interfaces/userToken"
import { GetGravatarProfile } from "../../shared/fetch/gravatar"
import { useEffect, useState } from "react"
import styles from '../../styles.js'

function ProfileFeature(user: userType) {

  var CryptoJS = require('crypto-js')
  let userEmail = user.email;
  var hash = CryptoJS.MD5(userEmail.toLowerCase()).toString()
  
  const [name, setName] = useState([])
  const [aboutMe, setaboutMe] = useState([])
  const [accounts, setaccounts] = useState([])
  const [profileImage, setprofileImage] = useState([])
  const [email, setemail] = useState([])
  const [location, setlocation] = useState([])
  const [phone, setphone] = useState([])
  const [btcAddress, setbtcAddress] = useState([])
  const [data, setdata] = useState("")
  
  useEffect(() => {
    async function getUserProfile(){
      const response: any = await GetGravatarProfile(hash)
      if (response === "User not found") {
        setdata(response)
      } 
      else {
        JSON.stringify(response)
        console.log(response)
        setName(response.entry[0].name.formatted)
        setemail(response.entry[0].emails[0].value)
        setaboutMe(response.entry[0].aboutMe)
        setaccounts(response.entry[0].accounts[0].display)
        setprofileImage(response.entry[0].photos[0].value)
        setlocation(response.entry[0].currentLocation)
        setphone(response.entry[0].phoneNumbers[0].value)
        setbtcAddress(response.entry[0].currency[0].value)
      }
    }
  getUserProfile()
},[])

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
              if (data === "User not found") {
                return (
                  <Box>
                    <br />
                      <Typography variant='subtitle1' >Create your profile at : <Link href="https://en.gravatar.com/">Gravatar</Link></Typography>
                    <br />
                  </Box>
                )
              } else {
                return (
                <Box>
                  <div style={styles.userProfileBOX} >
                    <div style={styles.userProfileIMG}>
                      <img src={`${profileImage}?s=200`} alt="UserprofileImage"/>
                    </div>
                    <div style={styles.userProfileInfo}>
                      <Typography variant='subtitle1' >Name: {name}</Typography>
                      <Typography variant='subtitle1' >Email: {email}</Typography>
                      <Typography variant='subtitle1' >Location: {location}</Typography>
                      <Typography variant='subtitle1' >Phone: {phone}</Typography>
                      <Typography variant='subtitle1' >Twitter Handle: <Link href="https://www.twitter.com">{accounts}</Link></Typography>
                      <Typography variant='subtitle1' >BTC Adress: {btcAddress}</Typography>
                      <Typography variant='subtitle1' >Change your profile here: <Link href="https://en.gravatar.com/">Gravatar</Link></Typography>
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

