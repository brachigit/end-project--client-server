import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd'//add
import PersonIcon from '@mui/icons-material/Person'//login

const buttons = [
  <Button key="login" startIcon={<PersonIcon/>}  href="/login">כניסת משתמשים</Button>,
  <Button key="register" startIcon={<PersonAddIcon/>} href="/register">משתמש חדש</Button>,
];
const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/preparation-healthy-food-from-organic-products-table-concept-healthy-food-home-cooking.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };
const HomePage = () => {
  return (
    <div style={backgroundStyle}>
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
        variant="contained"
       
      >
        {buttons}
      </ButtonGroup>
    </Box>
    </div>
  );
};

export default HomePage;
