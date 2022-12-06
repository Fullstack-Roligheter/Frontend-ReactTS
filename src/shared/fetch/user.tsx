import { DeleteSubmitDataProps } from '../Interfaces/deleteUserModal'
import instance from './baseURL'

export function Login(data: any) {
  return instance
    .post(`api/user/Login`, data)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in Login: ', error)
      throw error
    })
}

export function Register(data: any) {
  return instance
    .post(`api/user/Register`, data)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in Register: ', error)
      throw error
    })
}

export function UpdateUser(data: any) {
  return instance
    .patch(`api/user/Update`, data)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in UpdateUser: ', error)
      throw error
    })
}

export function DeleteUser(data: DeleteSubmitDataProps) {
  const UserId = data.userId
  const Email = data.email
  const Password = data.password

  return instance
    .delete(
      `api/user/UserDelete?UserId=${UserId}&Email=${Email}&Password=${Password}`
    )
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in DeleteUser: ', error)
      throw error
    })
}
