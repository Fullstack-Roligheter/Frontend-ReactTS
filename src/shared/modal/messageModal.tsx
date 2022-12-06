import { Typography } from '@mui/material'

export const MessageModal = (props: any) => {
  return (
    <>
      <Typography variant='subtitle1' align='center'>
        {props.message}
      </Typography>
      <br />
    </>
  )
}
