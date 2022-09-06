import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useNavigate, NavLink } from 'react-router-dom'

const drawerWidth = 240

type Props = {
  user: number
}

export default function Sidebar(props: Props) {
  const navigate = useNavigate()

  const MenuTargets = [
    { title: 'Transactions', route: `/${props.user}/transactions` },
    { title: 'Budgets', route: `/${props.user}/budgets` },
    { title: 'Saving Plans', route: `/${props.user}/saving` },
    { title: 'Faq', route: `/faq` },
    { title: 'About us', route: `/omoss` },
  ]

  return (
    <Box sx={{ display: 'flex', marginRight: 3 }}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {MenuTargets.map((menuItem, index) => (
              <ListItem key={menuItem.title} disablePadding>
                <ListItemButton onClick={() => navigate(menuItem.route)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <AccountBalanceIcon />
                    ) : (
                      <AttachMoneyIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* 
					<List>
						{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List> */}
        </Box>
      </Drawer>
    </Box>
  )
}
