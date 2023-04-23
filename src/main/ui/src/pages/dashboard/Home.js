import { React, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../contexts/LoginContext';
import { Typography, Fade, Paper } from '@mui/material';

const Home = () => {
  const { user } = useContext(LoginContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
    <Fade in={isVisible} timeout={1000}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h3" align="center">
          Welcome, {user.firstName} 👋
        </Typography>
      </Paper>
    </Fade>
    </div>
  );

}

export default Home