import { TextField, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { ButtonCollection } from '../../CustomComponents'
import { WarningButton } from '../../shared/buttons/button-default'
import { useUserContext } from '../../context/UserContext'
import { DeleteUserModalProps } from '../../shared/Interfaces/deleteUserModal'
import { DeleteUser } from '../../shared/fetch/user'
import { useNavigate } from 'react-router'
import styles from '../../CssStyles'

export const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = (
  props
) => {
  const user = useUserContext()
  const navigate = useNavigate()

  const [isLoading, setLoadingState] = useState(false)
  const [message, setMessage] = useState('')
  const [messageState, setMessageState] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  const deleteData: any = {
    userId: user.userId,
    email: user.email,
    password: deletePassword,
  }

  function sleeper(ms: any) {
    return function (x: any) {
      return new Promise((resolve) => setTimeout(() => resolve(x), ms))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoadingState(true)
    setMessage('Deleting User')
    setMessageState(true)
    DeleteUser(deleteData)
      .then(() => {
        setLoadingState(false)
        setMessage('User Successfully Deleted')
        sessionStorage.clear()
      })
      .then(sleeper(2000))
      .then(() => {
        navigate('/')
        window.location.reload()
      })
      .catch((err) => {
        setMessage('Delete Unsuccessful')
        setLoadingState(false)
        setTimeout(() => {
          setMessageState(false)
        }, 3000)
      })
  }

  return (
    <>
      <Typography variant='subtitle1' align='center'>
        {props.message}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant='subtitle1' align='center'>
          Please provide current Password to Confirm
        </Typography>
        <TextField
          margin='normal'
          variant='outlined'
          type='text'
          name='deletePassword'
          required={true}
          value={deletePassword}
          onChange={(e) => {
            setDeletePassword(e.target.value)
          }}
          style={styles.textfield}
        />
        {(() => {
          if (messageState) {
            return (
              <>
                <Typography sx={{ height: '25px', textAlign: 'center' }}>
                  {message}
                </Typography>
              </>
            )
          } else {
            return (
              <>
                <Typography
                  sx={{ height: '25px', textAlign: 'center' }}
                ></Typography>
              </>
            )
          }
        })()}
        <ButtonCollection>
          <WarningButton
            isLoading={isLoading}
            buttontext={'DELETE USER'}
            backgroundColor='error.main'
          />
        </ButtonCollection>
      </form>
    </>
  )
}
