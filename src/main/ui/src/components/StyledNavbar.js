import React from 'react'
import { Nav, NavLink, NavMenu } from './NavbarElements'

const Navbar = ({ logOutFn }) => {
  return (
    <Nav>
      <NavMenu>
        {/* TODO: *BUG* Styled Navbar stays highlighted on the Home Navlink even if it is not selected */}
        <NavLink to='/dashboard' >Home </NavLink>
        <br></br>
        <NavLink to='/dashboard/bills' >Bills</NavLink>
        <br></br>
        <NavLink to='/dashboard/chores' >Chores</NavLink>
        <br></br>
        <NavLink to='/' onClick={logOutFn}>Logout</NavLink>
      </NavMenu>
    </Nav>
  )
}

export default Navbar