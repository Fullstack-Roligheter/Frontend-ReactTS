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
    })
}
