import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

const NavBar = () => {
	const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

	return (
		<nav>
			{user ? (
				<ul>
					<li>Welcome, {user.username}</li>
                    <li>
						<Link to="/" onClick={handleSignOut}>Sign Out</Link>
					</li>
					<li>
						<Link to="/">Dashboard</Link>
					</li>
						<li><Link to='/books'>Books</Link></li>
						<li><Link to='/books/new'>Add a Book</Link></li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to="/sign-up">Sign Up</Link>
					</li>
                    <li>
						<Link to="/sign-in">Sign In</Link>
					</li>
                    <li>
						<Link to="/">Home</Link>
					</li>
				</ul>
			)}
		</nav>
	)
}

export default NavBar
