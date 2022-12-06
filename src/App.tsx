import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { UserContextProvider } from './context/UserContext'
import AppRouter from './routes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightBlue, lightGreen , teal, brown, grey, indigo, blueGrey, deepPurple, green } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[900]
    },
    secondary: {
      main: brown[200]
    }
  },
})

//grön och brun     primary: main: teal[900]        secondary: main: brown[100]
//blåGrå och teal     primary: main: blueGrey[700]        secondary: main: teal[100]

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
