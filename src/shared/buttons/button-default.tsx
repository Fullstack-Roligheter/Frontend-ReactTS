import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react'





export function SubmitButton(props: any) {

  const [isLoading, setIsLoading] = useState(false)

  const loading = props.isLoading
  const onClick = (loading: boolean) => {
    if (loading) {
      setIsLoading(true)
    }
  }

  return (
    <Button variant="contained" type="submit" onClick={(() => onClick(props))}>Submit
      {(() => {
        if (isLoading) {
          return (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          )
        }
      })()}
    </Button>
  )
}

export function DisabledSubmitButton() {
  return (
    <Button variant="contained" type="submit" disabled >Submit</Button>
  )
}