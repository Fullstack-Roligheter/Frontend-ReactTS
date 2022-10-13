import Button from '@mui/material/Button'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import Box from '@mui/material/Box'

const SavingsLayout: React.FC = () => {
  const user = useUserContext()

  if (user.userId === null) {
    return <Navigate to='/login' replace />
  }

  return (
    <>
      <Box className='container'>
        <NavLink
          to={'create'}
          className={({ isActive }) => `text-link ${isActive ? 'active' : ''}`}
        >
          <Button variant='contained'>Create saving plan</Button>
        </NavLink>
      </Box>
      <Box className='container'>
        <Outlet />
      </Box>
    </>
  )
}
export default SavingsLayout
