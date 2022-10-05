import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { UserContextProvider } from './context/UserContext'
import AppRouter from './routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
