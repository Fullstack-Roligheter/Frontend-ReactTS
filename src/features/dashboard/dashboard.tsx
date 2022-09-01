import { Navigate } from 'react-router-dom'

function DashboardFeature() {
	let UserIsLoggedIn = sessionStorage.getItem('user')
	console.log('authenticatedLayout: ', UserIsLoggedIn)

  let timeMilli = Date.now().toString().slice(-3)

	if (UserIsLoggedIn === null) {
		return <Navigate to='/login' replace />
	}

	return (
		<div className='Welcome'>
			<p>DASHBOARD</p>
			<h1>YOU ARE LOGGED IN</h1>
			<h2>UserId: {UserIsLoggedIn}</h2>
      <p>{timeMilli}</p>
		</div>
	)
}

export default DashboardFeature
