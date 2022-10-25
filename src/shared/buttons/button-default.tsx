import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState } from 'react'
import styles from '../../CssStyles'
import { IconButton } from '@mui/material'

export function SubmitButton(props: any) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button variant='contained' type='submit'>
        {props.buttontext}
        {(() => {
          if (props.isLoading) {
            return (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
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
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button variant='contained' type='submit' disabled>
        {props.buttontext}
      </Button>
    </Box>
  )
}

export function OrdinaryButton(props: any) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button variant='contained'>
        {props.buttontext}
        {(() => {
          if (props.isLoading) {
            return (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              </Box>
            )
          }
        })()}
      </Button>
    </Box>
  )
}
export function CloseButton(props: any) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Box
        style={styles.closeButton}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          '& :hover': {
            cursor: 'pointer',
            backgroundColor: 'red',
            color: 'white',
          },
        }}
      >
        <CloseIcon />
      </Box>
    </Box>
  )
}
export function AddButton() {
  return (
    <Box sx={{ ml: '15px', mt: '5px', align: 'center', justify: 'center' }}>
      <IconButton
        sx={{
          width: '36px',
          height: '36px',
          color: 'white',
          background: 'green',
          border: '1px solid lightgrey',
          '& :hover': {
            cursor: 'pointer',
            color: 'green',
            background: 'white',
            borderRadius: '50px',
          },
        }}
      >
        <AddCircleIcon sx={{ fontSize: 40, color: 'inherit' }} />
      </IconButton>
    </Box>
  )
}
