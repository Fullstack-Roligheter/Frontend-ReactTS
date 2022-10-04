import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

const UnauthenticatedLayout = (props: any) => {
  const user = useContext(UserContext)

  if (!user.user.email) {
    return (
      <>
        <Outlet />
        {props.children}
      </>
    )
  }
  return <></>
}
export default UnauthenticatedLayout
