import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../action/auth.action'
import './Header.css'

const Header = (props) => {

	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);

	// const logout = () => {
	// 	dispatch(logout())
	// }

	return (
		<header className='header'>
			<div style={{ display: 'flex' }}>
				<div className="logo">React messenger</div>

				{
					!auth.authenticated ?
						<ul className="leftMenu">
							<li>
								<NavLink to={'/login'}>Login</NavLink>
							</li>
							<li>
								<NavLink to={'/singup'}>Sing up</NavLink>
							</li>
						</ul> : null

				}


			</div>
			<div style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}>
				{auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ''}
			</div>
			<ul className="menu">
				{
					auth.authenticated ?
						<li>
							<Link to={'#'} onClick={() => {
								dispatch(logout(auth.uid))
							}}>Logout</Link>
							
						</li> : null
				}

			</ul>
		</header>
	)

}

export default Header