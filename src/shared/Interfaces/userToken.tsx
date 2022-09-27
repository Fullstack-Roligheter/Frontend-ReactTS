export type userType = {
  userId: string
  email: string
  firstName: string
  lastName: string
}

export interface userToken {
  user: userType
}
