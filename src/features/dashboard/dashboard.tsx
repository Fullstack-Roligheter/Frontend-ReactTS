import { Navigate } from 'react-router-dom'

function DashboardFeature() {
	let UserIsLoggedIn = localStorage.getItem('user')
	console.log('authenticatedLayout: ', UserIsLoggedIn)

	if (UserIsLoggedIn === null) {
		return <Navigate to='/login' replace />
	}

	return (
		<div className='Welcome'>
			<p>DASHBOARD</p>
			<h1>YOU ARE LOGGED IN</h1>
			<h2>UserId: {UserIsLoggedIn}</h2>
		</div>
	)
}

export default DashboardFeature
