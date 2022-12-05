import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { UserContextProvider } from './context/UserContext'
import AppRouter from './routes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightBlue, teal } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[900]
    },
    secondary: {
      main: teal[200]
    }
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <AppRouter />
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
