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
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button variant="contained" type="submit" onClick={(() => onClick(props))}>{props.buttontext}
        {(() => {
          if (isLoading) {
            return (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress size={24} sx={{
                  color: 'white', position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }} />
              </Box>
            )
          }
        })()}
      </Button>
    </Box>
  )
}

export function DisabledSubmitButton(props: any) {
  return (
    <Button variant="contained" type="submit" disabled >{props.buttontext}</Button>
  )
}