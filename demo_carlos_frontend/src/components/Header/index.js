import React from 'react'
import {Link} from 'wouter'
import "./Header.css"

export default function Header () {

  return (
    <header className='header'>
        <Link to='/'>
          News
        </Link>
        <Link to='/archived'>
          Archived News
        </Link>
    </header>
  )
}