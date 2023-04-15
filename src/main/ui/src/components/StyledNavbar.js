import React from 'react'
import {Nav, NavLink, NavMenu} from './NavbarElements'

const Navbar = ({logOutFn}) => {
  return (
    <Nav>
      <NavMenu>
      {/* TODO: *BUG* Styled Navbar stays highlighted on the Home Navlink even if it is not selected */}
        <NavLink to='/dashboard' activeStyle >Home </NavLink>
        <br></br>
        <NavLink to='/dashboard/bills' activeStyle>Bills</NavLink>
        <br></br>
        <NavLink to='/dashboard/chores' activeStlye>Chores</NavLink>
        <br></br>
        <NavLink to='/' activeStlye onClick={logOutFn}>Logout</NavLink>
      </NavMenu>
    </Nav>
  )
}

export default Navbar