import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useNavigate } from 'react-router-dom'
import { menuItemClasses } from '@mui/material'

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
  ]

  const SubMenu = [
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
            {SubMenu.map((subMenuItem, index) => (
              <ListItem key={subMenuItem.title} disablePadding>
                <ListItemButton onClick={() => navigate(subMenuItem.route)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={subMenuItem.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  )
}
