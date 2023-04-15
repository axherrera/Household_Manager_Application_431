import React from 'react'
import {Outlet} from 'react-router-dom'
import StyledNavbar from '../../components/StyledNavbar'

const SharedDashboardLayout = () => {
  return (
    <>
        <StyledNavbar />
        <Outlet />
    </>
  )
}

export default SharedDashboardLayout