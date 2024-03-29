import * as React from 'react'
import { useNavigate } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import LoginIcon from '@mui/icons-material/Login'
import { useUserContext } from '../../../context/UserContext'

/* Generate a md5-hash of a email address for Gravatar URL */

const AuthenticatedHeader = (props: any) => {
  const navigate = useNavigate()
  const user = useUserContext()

  var CryptoJS = require('crypto-js')
  let userEmail = user.email
  var hash = CryptoJS.MD5(userEmail?.toLowerCase()).toString()

  let settings = [
    { title: 'Profile', route: '/profile' },
    { title: 'Account', route: '/account' },
    { title: 'Dashboard', route: `/dashboard` },
    { title: 'Log Out', route: 'handleLogout' },
  ]

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMenuClick = (props: string) => {
    if (props === 'handleLogout') {
      handleLogout()
    } else {
      navigate(props)
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
    alert('You are now logged out')
    navigate('/')
    window.location.reload()
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(25, 118, 210, 1)',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href={`/dashboard`}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Xpense
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={props.toggleSidebar}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            ></Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href={`/dashboard`}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Xpense-Mobile
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          ></Box>

          {(() => {
            if (user.userId !== null) {
              return (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt='Remy Sharp'
                        src={`https://s.gravatar.com/avatar/${hash}?d=wavatar`}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: '45px',
                      '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                        paddingBottom: '0px',
                        paddingTop: '0px',
                      },
                    }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        sx={{ backgroundColor: 'rgba(65, 162, 72, 0.5)' }}
                        key={setting.title}
                        onClick={(e) => {
                          handleMenuClick(setting.route)
                        }}
                      >
                        <Typography textAlign='center'>
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )
            } else if (!user.userId) {
              return (
                <IconButton
                  href='/login'
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    color: 'white',
                  }}
                >
                  <LoginIcon />
                </IconButton>
              )
            }
          })()}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AuthenticatedHeader
