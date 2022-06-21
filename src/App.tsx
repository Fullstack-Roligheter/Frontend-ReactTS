import './App.css'
import Button from '@mui/material/Button'
import ExpenseRoutes from './routes'
import Header from './shared/Layout'

function App() {
	return (
		<div>
			<Header />
			<div>{ExpenseRoutes}</div>
		</div>
	)
}

export default App
