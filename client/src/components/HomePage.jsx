import React from 'react';
import Button from '@mui/material/Button';
import {Typography,Grid} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd'//add
import PersonIcon from '@mui/icons-material/Person'//login

const buttons = [
  <Button key="login" color="success" startIcon={<PersonIcon/>}  href="/login">כניסת משתמשים</Button>,
  <Button key="register" color="success" startIcon={<PersonAddIcon/>} href="/register">משתמש חדש</Button>,
];
const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/top-view-healthy-balanced-vegetarian-food.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };
const HomePage = () => {
  return (
    <div style={backgroundStyle}>
   <Grid item xs={12}>
        <Box
      display="flex"
      alignItems="right"
      justifyContent="right"
     gap={1} // רווח בין הלוגו לטקסט
     marginBottom={2}
   >
    <Typography variant="h5" gutterBottom style={{ textAlign: 'right' }}>
          NutryPath
        </Typography>
    <img
        src={"images/Ellipse 50.png"}
         alt="לוגו"
        style={{ width: 30, height: 30, marginBottom: 8 }}
        />
        
         </Box></Grid>
    <Box
      sx={{
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        
      }}
      
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        sx={{ backgroundColor: '#d2b48c' }}
       
      >
        {buttons}
      </ButtonGroup>
    </Box>
    </div>
  );
};

export default HomePage;
