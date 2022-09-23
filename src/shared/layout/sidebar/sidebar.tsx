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
import { useNavigate } from 'react-router-dom'
import { AccountBalance, AccountBalanceWallet, AttachMoney, Info, QuestionAnswer } from '@mui/icons-material'

const drawerWidth = 240

type Props = {
  user: number,
  show: boolean,
 
}

export default function Sidebar(props: Props) {
  const navigate = useNavigate()
  console.log(props.show)
  const MenuTargets = [
    {
      title: 'Transactions',
      route: `/transactions`,
      icon: <AccountBalance />,
    },
    {
      title: 'Budgets',
      route: `/budgets`,
      icon: <AccountBalanceWallet />,
    },
    {
      title: 'Saving Plans',
      route: `/saving`,
      icon: <AttachMoney />,
    },
  ]

  const SubMenu = [
    { title: 'Faq', route: `/faq`, icon: <QuestionAnswer /> },
    { title: 'About us', route: `/omoss`, icon: <Info /> },
  ]


  const {show} = props;

  return (
    <Box sx={{ display: 'flex', marginRight: 3 }}  >
      <CssBaseline />
      <Drawer
        variant='persistent'
        open={show}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(65, 162, 72, 0.1)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', backgroundColor: 'rgba(65, 162, 72, 0.3)' }}>
          <List>
            {MenuTargets.map((menuItem, index) => (
              <ListItem key={menuItem.title} disablePadding>
                <ListItemButton onClick={() => navigate(menuItem.route)}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {SubMenu.map((subMenuItem) => (
              <ListItem key={subMenuItem.title} disablePadding>
                <ListItemButton onClick={() => navigate(subMenuItem.route)}>
                  <ListItemIcon>{subMenuItem.icon}</ListItemIcon>
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
