import React from 'react'
import {Outlet} from 'react-router-dom'
import StyledNavbar from '../../components/StyledNavbar'

const SharedDashboardLayout = ({logOutFn}) => {
  return (
    <>
        <StyledNavbar logOutFn={logOutFn}/>
        <Outlet />
    </>
  )
}

export default SharedDashboardLayout