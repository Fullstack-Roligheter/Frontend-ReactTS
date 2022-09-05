import Button from '@mui/material/Button'
import { NavLink, Outlet } from 'react-router-dom'
import { Fragment } from 'react'

const SavingsLayout: React.FC = () => {
  return (
    <Fragment>
      <div className='container'>
        {/*  <NavLink
          to={"/saving"}
          className={({ isActive }) => `text-link ${isActive ? "active" : ""}`}
        >
          <Button variant="contained">Saving Plan</Button>
        </NavLink> */}
        <NavLink
          to={'create'}
          className={({ isActive }) => `text-link ${isActive ? 'active' : ''}`}
        >
          <Button variant='contained'>Create saving plan</Button>
        </NavLink>
      </div>
      <div className='container'>
        <Outlet />
      </div>
    </Fragment>
  )
}
export default SavingsLayout
