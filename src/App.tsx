import './App.css'
import Button from '@mui/material/Button'
import ExpenseRoutes from './Routes'
import Layout from './shared/layout/layout'

function App() {
	return (
		<div>
			<Header />
			<div>{ExpenseRoutes}</div>
		</div>
	)
}

export default App
