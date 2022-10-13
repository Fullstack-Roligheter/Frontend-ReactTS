
import styles from '../../CssStyles.js'
import { Box, Link, Typography, CircularProgress, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List } from '@mui/material'
import { userType } from '../../shared/Interfaces/userToken'
import { GetGravatarProfile } from '../../shared/fetch/gravatar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { flexbox } from '@mui/system'
import { useUserContext } from '../../context/UserContext'

import { Modal } from '../../shared/modal/modal'
import { useModal } from '../../shared/modal/useModal'
import { NewCategoryModal } from '../newCategoryModal/newcategoryModal'
import { DisabledSubmitButton, SubmitButton, AddButton } from '../../shared/buttons/button-default'
import React from 'react'
import { GetCategoriesForUser, GetUserCreatedCatogories } from '../../shared/fetch/category'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ProfileFeature() {
  const user = useUserContext()

  var CryptoJS = require('crypto-js')
  let userEmail = user.email;
  if (userEmail != null) {
    var hash = CryptoJS.MD5(userEmail.toLowerCase()).toString()
  }
  
    const [name, setName] = useState([])
    const [aboutMe, setaboutMe] = useState([])
    const [twitter, settwitter] = useState([])
    const [profileImage, setprofileImage] = useState([])
    const [email, setemail] = useState([])
    const [location, setlocation] = useState([])
    const [phone, setphone] = useState([])
    const [btcAddress, setbtcAddress] = useState([])
    const [data, setdata] = useState("")

    const [message, setmessage] = useState('')
    const [messageState, setmessageState] = useState(false)
    const { isShown, toggle } = useModal();
    
    const [isLoading, setloadingState] = useState(false)
    const onConfirm = () => toggle();
    const onCancel = () => toggle();

    const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getUserProfile(){
      const response: any = await GetGravatarProfile(hash)
      if (response === "User not found") {
        setdata(response)
        setProfileloadingState(true)
      } 
      else {
        JSON.stringify(response)
          setName(response.entry[0].name.formatted)
          setemail(response.entry[0].emails[0].value)
          setaboutMe(response.entry[0].aboutMe)
          settwitter(response.entry[0].accounts[0].display)
          setprofileImage(response.entry[0].photos[0].value)
          setlocation(response.entry[0].currentLocation)
          setphone(response.entry[0].phoneNumbers[0].value)
          setbtcAddress(response.entry[0].currency[0].value)
          setProfileloadingState(true)
      }
    }
    getUserProfile()
  }, [])

  useEffect(() => {
    GetUserCreatedCatogories(user.userId).then((Response) => {
      debugger
      setCategories(Response)
    })
  }, [])

const [loadingState, setProfileloadingState] = useState(false)

  return (
    <>
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
              if (!loadingState) {
                return(
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                )
              }
              if (data === "User not found") {
                return (
                  <Box>
                    <br />
                      <Typography variant='h5' >Förnamn: {user.firstName}</Typography>
                      <Typography variant='h5' >Efternamn: {user.lastName}</Typography>
                      <Typography variant='h5' >Epost: {user.email}</Typography>
                      <Typography variant='h5' >Create your profile at : <Link href="https://en.gravatar.com/" >Gravatar</Link></Typography>
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
                      <Typography variant='subtitle1' >Twitter Handle: <Link href="https://www.twitter.com">{twitter}</Link></Typography>
                      <Typography variant='subtitle1' >BTC Adress: {btcAddress}</Typography>
                      <Typography variant='subtitle1' >Change your profile here: <Link href="https://en.gravatar.com/" >Gravatar</Link></Typography>
                    </div>
                  </div>
                </Box>
                )
              }
            })()}   
    </Box>
    <Box sx={{
        width: 850,
        m: 3,
        mt: 3,
        p: 3,
        pt: 3,
        borderRadius: 2,
        bgcolor: 'RGBA(255,255,255,0.65)',
        boxShadow: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <Box>
        <Typography variant='h3'>Handler </Typography>
    </Box>
        <Typography variant='h6'>To create your own catogory click on the plus sign</Typography>

     <React.Fragment>
                <IconButton style={styles.addButton} onClick={toggle}><AddButton /></IconButton>
                <Modal
                  isShown={isShown}
                  hide={toggle}
                  headerText='Lägg till egen kategori'
                  modalContent={
                    <NewCategoryModal
                      onConfirm={onConfirm}
                      // onCancel={onCancel}
                      message="Skriv in namn på nya kategorin"
                      userId={user.userId} categories={[]}                    />
                  }
                />
      </React.Fragment>
        <Box sx={{ width: '100%', "li:nth-child(even)": { background: '#D3D3D3' }, }}>
          <List>
            <Divider />
            {categories.map((category: any) => (
              <ListItem key={category.categoryId} className="listitem145" disablePadding>
                <ListItemText primary={category.categoryName} />
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
              </ListItem>
            ))}
            <Divider />
          </List>
        </Box>
      </Box>
    </>
  )
}

export default ProfileFeature
