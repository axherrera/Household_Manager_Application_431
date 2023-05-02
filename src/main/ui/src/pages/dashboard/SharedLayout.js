import React, { useContext } from 'react'
import {Outlet} from 'react-router-dom'
import ResponsiveAppBar from '../../components/Navbar'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'

const SharedDashboardLayout = () => {
  const navigate = useNavigate();
  
  const { user, setUser } = useContext(LoginContext);

  const pages = [
    {
      name: 'Bills',
      link: '/dashboard/bills'
    },
    {
      name: 'Chores',
      link: '/dashboard/chores'
    }
  ];

  const settings = [
    {
      name: `House ID: ${user.Household.id}`,
      link: '/',
      onClick: () => {}
    },
    {
      name: 'Logout',
      link: '/',
      onClick: () => {
        setUser(null)
        navigate('/')
      }
    }
  ]

  return (
    <>
      <ResponsiveAppBar title={user.Household.name} pages={pages} settings={settings} avatar={user.firstName?.charAt(0).toUpperCase()}/>
      <Outlet />
    </>
  )
}

export default SharedDashboardLayout