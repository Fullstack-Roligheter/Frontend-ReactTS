import { Navigate } from 'react-router-dom'

function DashboardFeature(props: any) {
	console.log('dashboard props:', props)

	if (!props.user) {
		return <Navigate to='/login' replace />
	}

	return (
		<div className='Welcome'>
			<p>DASHBOARD</p>
			<h1>YOU ARE LOGGED IN</h1>
			<h2>UserId: {props.user}</h2>
		</div>
	)
}

export default DashboardFeature
