import styles from '../../CssStyles.js'
import {
  Box,
  Link,
  Typography,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
} from '@mui/material'
import { GetGravatarProfile } from '../../shared/fetch/gravatar'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'

import { Modal } from '../../shared/modal/modal'
import {
  useDeleteModal,
  useEditModal,
  useModal,
} from '../../shared/modal/useModal'
import { NewCategoryModal } from '../newCategoryModal/newcategoryModal'
import { EditCategoryModal } from '../editCategoryModal/editCategoryModal'
import { AddButton } from '../../shared/buttons/button-default'
import React from 'react'
import { GetUserCreatedCatogories } from '../../shared/fetch/category'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DeleteCategoryModal } from '../deleteCategorModal/deleteCategoryModal'

function ProfileFeature() {
  const user = useUserContext()

  var CryptoJS = require('crypto-js')
  let userEmail = user.email
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
  const [data, setdata] = useState('')

  const [categorySendName, setCategorySendName] = useState('')
  const [categorySendId, setCategorySendId] = useState('')
  const { isShown, toggle } = useModal()
  const { isShownEdit, toggleEdit } = useEditModal()
  const { isShownDelete, toggleDelete } = useDeleteModal()

  const onConfirm = () => toggle()
  const onConfirmEdit = () => toggleEdit()
  const onConfirmDelete = () => toggleDelete()
  // const onCancel = () => toggle();
  // const onCancelEdit = () => toggleEdit();
  // const onCancelDelete = () => toggleDelete();

  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getUserProfile() {
      const response: any = await GetGravatarProfile(hash)
      if (response === 'User not found') {
        setdata(response)
        setProfileloadingState(true)
      } else {
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
      setCategories(Response)
    })
  }, [])

  const [loadingState, setProfileloadingState] = useState(false)

  function getCategories(): any {
    GetUserCreatedCatogories(user.userId).then((Response) => {
      setCategories(Response)
    })
  }

  const ToEdit = (catId: React.SetStateAction<string>, catName: any) => {
    setCategorySendId(catId)
    setCategorySendName(catName)
    toggleEdit()
  }

  const ToDelete = (catId: React.SetStateAction<string>, catName: any) => {
    setCategorySendId(catId)
    setCategorySendName(catName)
    toggleDelete()
  }

  return (
    <>
      <Box sx={{ flexDirection: 'column' }}>
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
              return (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )
            }
            if (data === 'User not found') {
              return (
                <Box>
                  <br />
                  <Typography variant='h5'>
                    Name: {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant='h5'>Email: {user.email}</Typography>
                  <Typography variant='h5'>
                    Create your profile at :{' '}
                    <Link href='https://en.gravatar.com/'>Gravatar</Link>
                  </Typography>
                  <br />
                </Box>
              )
            } else {
              return (
                <Box>
                  <div style={styles.userProfileBOX}>
                    <div style={styles.userProfileIMG}>
                      <img
                        src={`${profileImage}?s=200`}
                        alt='UserprofileImage'
                      />
                    </div>
                    <div style={styles.userProfileInfo}>
                      <Typography variant='subtitle1'>Name: {name}</Typography>
                      <Typography variant='subtitle1'>
                        Email: {email}
                      </Typography>
                      <Typography variant='subtitle1'>
                        Location: {location}
                      </Typography>
                      <Typography variant='subtitle1'>
                        Phone: {phone}
                      </Typography>
                      <Typography variant='subtitle1'>
                        Twitter Handle:{' '}
                        <Link href='https://www.twitter.com'>{twitter}</Link>
                      </Typography>
                      <Typography variant='subtitle1'>
                        BTC Adress: {btcAddress}
                      </Typography>
                      <Typography variant='subtitle1'>
                        Change your profile here:{' '}
                        <Link href='https://en.gravatar.com/'>Gravatar</Link>
                      </Typography>
                    </div>
                  </div>
                </Box>
              )
            }
          })()}
        </Box>
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant='h3'>Handle Categories</Typography>
            <Typography variant='h6'>
              To create your own catogory click on the plus sign
            </Typography>
          </Box>
          <React.Fragment>
            <Box style={styles.addButton} onClick={toggle}>
              <AddButton />
            </Box>
            <Modal
              isShown={isShown}
              hide={toggle}
              headerText='Lägg till egen kategori'
              modalContent={
                <NewCategoryModal
                  onConfirm={onConfirm}
                  // onCancel={onCancel}
                  message='Skriv in namn på nya kategorin'
                  categories={categories}
                  callBack={getCategories}
                />
              }
            />
          </React.Fragment>
          <Box
            sx={{
              width: '100%',
              'li:nth-child(even)': { background: '#D3D3D3' },
            }}
          >
            <List>
              <Divider />
              {categories.map((category: any) => (
                <ListItem key={category.categoryId} disablePadding>
                  <ListItemText primary={category.categoryName} />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => {
                        ToEdit(category.categoryId, category.categoryName)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton
                      onClick={() => {
                        ToDelete(category.categoryId, category.categoryName)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
              <Divider />
            </List>
          </Box>
        </Box>
        <React.Fragment>
          <Modal
            isShown={isShownEdit}
            hide={toggleEdit}
            headerText='Edit category'
            modalContent={
              <EditCategoryModal
                onConfirm={onConfirmEdit}
                // onCancel={onCancel}
                message={'Edit the category'}
                categories={categories}
                categoryId={categorySendId}
                categoryName={categorySendName}
                callBack={getCategories}
              />
            }
          />
        </React.Fragment>
        <React.Fragment>
          <Modal
            isShown={isShownDelete}
            hide={toggleDelete}
            headerText='Delete category'
            modalContent={
              <DeleteCategoryModal
                onConfirm={onConfirmDelete}
                message={'Delete the category'}
                categories={categories}
                categoryId={categorySendId}
                categoryName={categorySendName}
                callBack={getCategories}
              />
            }
          />
        </React.Fragment>
      </Box>
    </>
  )
}

export default ProfileFeature
