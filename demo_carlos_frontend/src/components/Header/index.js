import React from 'react'
import {Link} from 'wouter'
import useUser from '../../hooks/useUser'
import "./Header.css"

export default function Header () {
  const {isLogged, logout} = useUser()

  const handleLogoutClick = e => {
    e.preventDefault()
    logout()
  }

  return (
    <header className='header'>
        {isLogged &&
          <React.Fragment>
            <Link to='/'>
              News
            </Link>
            <Link to='/archived'>
              Archived News
            </Link>
          </React.Fragment>
        }
        {isLogged ?
          <Link to='/login' onClick={handleLogoutClick}>
            Logout
          </Link>
          :
          <React.Fragment>
            <Link to='/login'>
              Login
            </Link>
            <Link to='/register'>
              Register
            </Link>
          </React.Fragment>
        }
    </header>
  )
}