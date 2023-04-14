import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <NavLink to='/dashboard' className ={({ isActive }) => isActive ? 'link active' : 'link'}>Home</NavLink>
        <br></br>
        <NavLink to='/dashboard/bills' className ={({ isActive }) => isActive ? 'link active' : 'link'}>bills</NavLink>
        <br></br>
        <NavLink to='/dashboard/chores' className ={({ isActive }) => isActive ? 'link active' : 'link'}>chores</NavLink>
    </nav>
  )
}

export default Navbar