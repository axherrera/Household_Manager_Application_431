import React from 'react'
import {Nav, NavLink, NavMenu} from './NavbarElements'

const Navbar = () => {
  return (
    <Nav>
      <NavMenu>
        <NavLink to='/dashboard' activeStyle >Home </NavLink>
        <br></br>
        <NavLink to='/dashboard/bills' activeStyle>bills</NavLink>
        <br></br>
        <NavLink to='/dashboard/chores' activeStlye>chores</NavLink>
        </NavMenu>
    </Nav>
  )
}

export default Navbar