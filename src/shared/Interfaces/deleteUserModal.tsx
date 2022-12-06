export interface DeleteSubmitDataProps {
  userId: string
  email: string
  password: string
}

export interface DeleteUserModalProps {
  onConfirm: () => void
  message: string
}
