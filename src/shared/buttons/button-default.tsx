import Button from '@mui/material/Button';

export function SubmitButton() {
  return (
    <Button variant="contained" type="submit">Submit</Button>
  )
}

export function DisabledSubmitButton() {
  return (
    <Button variant="contained" type="submit" disabled >Submit</Button>
  )
}