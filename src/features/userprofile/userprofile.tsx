import React from 'react'
import { FormEvent, useEffect, useState } from 'react'

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
  TextField,
  Button,
  InputAdornment,
} from '@mui/material'
import { FormControl } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { useUserContext } from '../../context/UserContext'

import { Modal } from '../../shared/modal/modal'
import {
  useDeleteModal,
  useEditModal,
  useModal,
  useMessageModal,
  useDeleteUserModal,
} from '../../shared/modal/useModal'
import { NewCategoryModal } from '../Category/newCategoryModal/newcategoryModal'
import { EditCategoryModal } from '../Category/editCategoryModal/editCategoryModal'
import { DeleteCategoryModal } from '../Category/deleteCategorModal/deleteCategoryModal'
import { DeleteUserModal } from './deleteUserModal'
import { MessageModal } from '../../shared/modal/messageModal'

import { GetGravatarProfile } from '../../shared/fetch/gravatar'
import { GetUserCreatedCatogories } from '../../shared/fetch/category'
import { UpdateUser, DeleteUser } from '../../shared/fetch/user'

import { AddButton } from '../../shared/buttons/button-default'
import styles from '../../CssStyles.js'

function ProfileFeature() {
  const user = useUserContext()

  var CryptoJS = require('crypto-js')
  let userEmail = user.email
  if (userEmail != null) {
    var hash = CryptoJS.MD5(userEmail.toLowerCase()).toString()
  }

  const [name, setName] = useState([])
  const [aboutMe, setAboutMe] = useState([])
  const [twitter, setTwitter] = useState([])
  const [profileImage, setProfileImage] = useState([])
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState([])
  const [phone, setPhone] = useState([])
  const [btcAddress, setBtcAddress] = useState([])
  const [data, setData] = useState('')

  const [categories, setCategories] = useState([])

  const [categorySendName, setCategorySendName] = useState('')
  const [categorySendId, setCategorySendId] = useState('')
  const { isShown, toggle } = useModal()
  const { isShownEdit, toggleEdit } = useEditModal()
  const { isShownDelete, toggleDelete } = useDeleteModal()
  const { isShownMessage, toggleMessage } = useMessageModal()
  const { isShownDeleteUser, toggleDeleteUser } = useDeleteUserModal()

  const [localEmail, setLocalEmail] = useState<string | null>('')
  const [localFirstName, setLocalFirstName] = useState<string | null>('')
  const [localLastName, setLocalLastName] = useState<string | null>('')
  const [localPassword, setLocalPassword] = useState<string>('')
  const [localPasswordCheck, setLocalPasswordCheck] = useState<string>('')

  const [loadingState, setProfileloadingState] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [message, setMessage] = useState('')
  const [messageState, setMessageState] = useState(false)

  const [messageHeader, setMessageHeader] = useState('')
  const [messageBody, setMessageBody] = useState('')
  const [messageTaskbarTitle, setMessageTaskbarTitle] = useState('')

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2)
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2)

  const onConfirm = () => toggle()
  const onConfirmEdit = () => toggleEdit()
  const onConfirmDelete = () => toggleDelete()
  const onConfirmMessage = () => toggleMessage()
  const onConfirmDeleteUser = () => toggleMessage()

  const validEmail = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$'
  )

  async function GetUserProfile() {
    const response: any = await GetGravatarProfile(hash)
    if (response === 'User not found') {
      setData(response)
      setProfileloadingState(true)
      setLocalFirstName(user.firstName)
      setLocalLastName(user.lastName)
      setLocalEmail(user.email)
    } else {
      JSON.stringify(response)
      setName(response.entry[0].name.formatted)
      setAboutMe(response.entry[0].aboutMe)
      setProfileImage(response.entry[0].photos[0].value)

      if (response.entry[0].emails !== undefined) {
        setEmail(response.entry[0].emails[0].value)
      }
      if (response.entry[0].accounts !== undefined) {
        setTwitter(response.entry[0].accounts[0].display)
      }
      if (response.entry[0].phoneNumbers !== undefined) {
        setPhone(response.entry[0].phoneNumbers[0].value)
      }
      if (response.entry[0].currency !== undefined) {
        setBtcAddress(response.entry[0].currency[0].value)
      }
      if (response.entry[0].currentLocation !== undefined) {
        setLocation(response.entry[0].currentLocation)
      }
      setProfileloadingState(true)
    }
  }

  useEffect(() => {
    GetUserProfile()
  }, [])

  useEffect(() => {
    GetUserCreatedCatogories(user.userId).then((Response) => {
      setCategories(Response)
    })
  }, [])

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

  const ToDeleteUser = () => {
    toggleDeleteUser()
  }

  const ShowMessage = () => {
    toggleMessage()
  }

  const handleDelete = () => {
    ToDeleteUser()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (localPassword !== null) {
      if (!validEmail.test(localPassword!)) {
        setMessage('Password must be more complex')
        setMessageState(true)
        setTimeout(() => {
          setMessageState(false)
        }, 3000)
      } else if (localPassword !== localPasswordCheck) {
        setMessage('Passwords do not match')
        setMessageState(true)
        setTimeout(() => {
          setMessageState(false)
        }, 3000)
      } else {
        const userUpdates = {
          userId: user.userId,
          email: localEmail,
          firstName: localFirstName,
          lastName: localLastName,
          password: localPassword,
        }

        UpdateUser(userUpdates)
          .then((response) => {
            user.updateUser(response)
            setLocalPassword('')
            setLocalPasswordCheck('')
            setMessageTaskbarTitle('Update Profile')
            setMessageHeader('Update Successful')
            setMessageBody('')
            ShowMessage()
          })
          .catch((error) => {
            setMessageTaskbarTitle('Update Profile')
            setMessageHeader('Update Unsuccessful')
            ShowMessage()
            console.log(error.response.data)
          })
      }
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                <Box sx={{ display: 'flex', alignContent: 'flex-start' }}>
                  <CircularProgress />
                </Box>
              )
            }
            if (data === 'User not found') {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'flex-start',
                    width: '100%',
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <TextField
                        margin='normal'
                        label='First Name'
                        variant='outlined'
                        type='text'
                        name='localFirstName'
                        required={true}
                        value={localFirstName}
                        onChange={(e) => {
                          setLocalFirstName(e.target.value)
                        }}
                        style={styles.textfield}
                      />
                      <TextField
                        margin='normal'
                        label='Last Name'
                        variant='outlined'
                        type='text'
                        name='localLastName'
                        required={true}
                        value={localLastName}
                        onChange={(e) => {
                          setLocalLastName(e.target.value)
                        }}
                        style={styles.textfield}
                      />
                      <TextField
                        margin='normal'
                        label='Email'
                        variant='outlined'
                        type='text'
                        name='localEmail'
                        required={true}
                        value={localEmail}
                        onChange={(e) => {
                          setLocalEmail(e.target.value)
                        }}
                        style={styles.textfield}
                      />
                      <TextField
                        margin='normal'
                        label='New Password'
                        variant='outlined'
                        type={showPassword ? 'text' : 'password'}
                        name='localPassword'
                        required={true}
                        value={localPassword}
                        onChange={(e) => {
                          setLocalPassword(e.target.value)
                        }}
                        style={styles.textfield}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        margin='normal'
                        label='Confirm Password'
                        variant='outlined'
                        type={showPassword2 ? 'text' : 'password'}
                        name='localPasswordCheck'
                        required={true}
                        value={localPasswordCheck}
                        onChange={(e) => {
                          setLocalPasswordCheck(e.target.value)
                        }}
                        style={styles.textfield}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                              >
                                {showPassword2 ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <br />
                      {(() => {
                        if (messageState) {
                          return (
                            <>
                              <Typography sx={{ height: '10px' }}>
                                {message}
                              </Typography>
                            </>
                          )
                        } else {
                          return (
                            <>
                              <Typography sx={{ height: '10px' }}></Typography>
                            </>
                          )
                        }
                      })()}
                      <Button
                        type='submit'
                        variant='contained'
                        sx={{ mt: '20px' }}
                      >
                        Submit Changes
                      </Button>
                      <Button
                        onClick={handleDelete}
                        variant='contained'
                        sx={{ mt: '20px', backgroundColor: 'error.main' }}
                      >
                        DELETE USER
                      </Button>
                    </FormControl>
                  </form>
                </Box>
              )
            } else {
              return (
                <Box>
                  <Box style={styles.userProfileBOX}>
                    <Box style={styles.userProfileIMG}>
                      <img
                        src={`${profileImage}?s=200`}
                        alt='UserprofileImage'
                      />
                    </Box>
                    <Box style={styles.userProfileInfo}>
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
                    </Box>
                  </Box>
                  <Button
                    onClick={handleDelete}
                    variant='contained'
                    sx={{ mt: '20px', backgroundColor: 'error.main' }}
                  >
                    DELETE USER
                  </Button>
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
            <Typography variant='h3'>Custom Categories</Typography>
          </Box>
          <>
            <Box style={styles.addButton} onClick={toggle}>
              <AddButton />
            </Box>
            <Modal
              isShown={isShown}
              hide={toggle}
              headerText='Create New Category'
              modalContent={
                <NewCategoryModal
                  onConfirm={onConfirm}
                  message='Category Name'
                  categories={categories}
                  callBack={getCategories}
                />
              }
            />
          </>
          <Box
            sx={{
              width: '100%',
              'li:nth-of-type(even)': { background: '#D3D3D3' },
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
        <>
          <Modal
            isShown={isShownEdit}
            hide={toggleEdit}
            headerText='Edit Category'
            modalContent={
              <EditCategoryModal
                onConfirm={onConfirmEdit}
                message={'Change Name'}
                categories={categories}
                categoryId={categorySendId}
                categoryName={categorySendName}
                categoryOldName={categorySendName}
                callBack={getCategories}
              />
            }
          />
        </>
        <>
          <Modal
            isShown={isShownDelete}
            hide={toggleDelete}
            headerText='Delete Category'
            modalContent={
              <DeleteCategoryModal
                onConfirm={onConfirmDelete}
                message={'Delete following Category?'}
                categories={categories}
                categoryId={categorySendId}
                categoryName={categorySendName}
                callBack={getCategories}
              />
            }
          />
        </>
        <>
          <Modal
            isShown={isShownMessage}
            hide={toggleMessage}
            headerText={messageHeader}
            modalContent={
              <MessageModal
                onConfirm={onConfirmMessage}
                taskbarTitle={messageTaskbarTitle}
                message={messageBody}
              />
            }
          />
        </>
        <>
          <Modal
            isShown={isShownDeleteUser}
            hide={toggleDeleteUser}
            headerText='Delete User'
            modalContent={
              <DeleteUserModal
                onConfirm={onConfirmDeleteUser}
                message={'ARE YOU SURE?'}
              />
            }
          />
        </>
      </Box>
    </>
  )
}

export default ProfileFeature
