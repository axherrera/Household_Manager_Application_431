import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState({name: "ken"})
  // const [user, setUser] = useState(null)

  return <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Login user={user}/>} />
        
        <Route path='signup' element={<Signup user={user}/>}></Route>

        <Route path='dashboard/*' element={
          <ProtectedRoute user={user}>
            <Dashboard user={user}/>
          </ProtectedRoute>
        } />

      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
