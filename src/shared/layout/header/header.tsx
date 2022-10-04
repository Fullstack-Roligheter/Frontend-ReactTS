// @ts-nocheck
import * as React from 'react'
import { Avatar, Link, Tooltip } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import LoginIcon from '@mui/icons-material/Login'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { userType } from '../../Interfaces/userToken'
import { UserContext } from '../../UserContext'
import LoginModal from '../../modals/LoginModal'

const ResponsiveAppBar = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  var CryptoJS = require('crypto-js')
  let userEmail = user.user.email
  var hash = CryptoJS.MD5(userEmail).toString()

  const [loggedIn, setLoggedIn] = useState(undefined)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const styles = {
    logo: {
      mr: 2,
      display: { xs: 'none', md: 'flex' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    },
  }

  useEffect(() => {
    if (userEmail) {
      setLoggedIn(userEmail)
    }
    console.log('setLogged useEffect: ', loggedIn)
  }, [loggedIn, user])

  let userMenu = [
    { title: 'Profile', route: '/profile' },
    { title: 'Account', route: '/account' },
    { title: 'Dashboard', route: `/dashboard` },
    { title: 'Log Out', route: 'handleLogout' },
  ]

  let siteNav = [
    { title: 'FAQ', route: '/faq' },
    { title: 'Om Oss', route: `/omoss` },
  ]

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleMenuClick = (props: string) => {
    if (props === 'handleLogout') {
      handleLogout()
    } else {
      navigate(props)
    }
  }

  const handleLogoClick = (e: any) => {
    if (userEmail) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
    alert('Du är nu Utloggad')
    navigate('/')
    window.location.reload()
  }

  const handleCallback = (prop: string) => {
    console.log('Callback entered: ', prop)
    setLoggedIn({
      ...loggedIn,
      value: prop,
    })
    console.log('new loggedIn state: ', loggedIn)
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(25, 118, 210, 1)',
        height: '70px',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          height: 'inherit',
        }}
      >
        {/* --------------------------------------Mobile Header BELOW HERE */}
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: 'flex',
              md: 'none',
            },
            alignItems: 'center',
            height: 'inherit',
          }}
        >
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
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
              display: { xs: 'flex', md: 'none' },
            }}
          >
            {siteNav.map((page) => (
              <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                <Link href={page.route} underline='none'>
                  {page.title}
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <Box
            onClick={handleCloseNavMenu}
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'space-between',
            }}
          >
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              onClick={handleLogoClick}
              style={styles.logo}
            >
              Xpense-Mobile
            </Typography>
          </Box>
          <IconButton
            href='/login'
            sx={{
              p: '20px',
              color: 'white',
            }}
          >
            <LoginIcon />
          </IconButton>
        </Box>
        {/* -------------------------------------Desktop Header BELOW HERE */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex' },
              alignItems: 'center',
            }}
          >
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              style={styles.logo}
              onClick={handleLogoClick}
            >
              Xpense-Desktop
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex' },
              alignItems: 'center',
            }}
          >
            {siteNav.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
                href={page.route}
              >
                {page.title}
              </Button>
            ))}

            <Box>
              {loggedIn ? (
                <>
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
                      {userMenu.map((page) => (
                        <MenuItem
                          sx={{ backgroundColor: 'rgba(65, 162, 72, 0.5)' }}
                          key={page.title}
                          onClick={(e) => {
                            handleMenuClick(page.route)
                          }}
                        >
                          <Typography textAlign='center'>
                            {page.title}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              ) : (
                <>
                  {/* <IconButton
                    sx={{
                      color: 'white',
                      align: 'center',
                      width: '100%',
                    }}
                  > */}
                  <LoginModal callBack={handleCallback} />
                  {/* <LoginIcon />
                  </IconButton> */}
                </>
              )}
            </Box>

            {/* <IconButton
            href='/login'
            sx={{
              p: '20px',
              color: 'white',
            }}
          >
            <LoginIcon />
          </IconButton> */}
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar

/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
<Typography
  variant='h6'
  noWrap
  component='a'
  href='/'
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
</Typography> */

/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
<Typography
  variant='h5'
  noWrap
  component='a'
  href='/'
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
</Typography> */
