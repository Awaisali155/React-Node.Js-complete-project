import React from 'react'
import { Link, Outlet} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css'
export const Header = () => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };
  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ mr: 3 }}>
          <Link to='images' style={{ textDecoration: 'none', color: 'white' }}>Images</Link>
          </Typography>
          <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
          <Link color="inherit" to='vedios' style={{ textDecoration: 'none', color: 'white' }}>vedios</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
<Outlet/>
{window.location.pathname==='/'?(<div className="welcome-container">
      <h1 className="welcome-heading">Welcome!</h1>
      <p className="welcome-message">Thank you for visiting our website.</p>
    </div>):("")}

    </div>
  )
}
