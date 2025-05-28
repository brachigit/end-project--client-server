import { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,Box
} from '@mui/material';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import { blueGrey } from '@mui/material/colors';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import ButtonBaseDemo from './ButtonBaseDemo';
const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/flat-lay-assortment-vegetables-with-copy-space.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200vh',
  };

const WelcomeDashboard = () => {
  const [recentRecipes, setRecentRecipes] = useState([]);
  const navigate = useNavigate();

  const handleClick = (recipe) => {
    navigate(`/recipe/${recipe._id}`, { state: { item: recipe } });
  };

  useEffect(() => {
    const stored = localStorage.getItem('recentRecipes');
    if (stored) {
      setRecentRecipes(JSON.parse(stored));
    }
  }, []);

  const cardStyle = {
    padding: 2,
    backgroundColor: '#f0f4ff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    height: 200, // גובה אחיד לכל הכרטיסים
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
  };

  return (
   
    <Box
  sx={{
    backgroundColor: '#eeeeee', 
    padding: 2,
    borderRadius: 2,
  }}
>
    <Grid
      container
      spacing={3}
      padding={2}
      dir="rtl"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      {/* כותרת ראשית */}
      <Grid item xs={12}>
        <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
     gap={1} // רווח בין הלוגו לטקסט
     marginBottom={2}
   >
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          NutryPath
        </Typography>
        <img
        src={"images/Ellipse 50.png"}
         alt="לוגו"
        style={{ width: 50, height: 50, marginBottom: 8 }}
        />
        
        </Box>
        <Typography variant="subtitle1" style={{ textAlign: 'center', color: '#444' }}>
         ברוכים הבאים לפלטפורמה התזונתית שלנו. כאן תמצאו כלים מתקדמים לבניית תפריט אישי ומאוזן, מתכונים בריאים ומגוונים, 
         ומידע שיסייע לכם לשמור על אורח חיים בריא — בקלות, באחריות ובהתאמה מלאה להעדפותיכם.
       </Typography>

      </Grid>


<ButtonBaseDemo/>
     {/* מתכונים נצפים לאחרונה */}
      {recentRecipes.length > 0 && (
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
               מתכונים שנצפו לאחרונה
            </Typography>
            <List>
              {recentRecipes.map((recipe, i) => (
                <ListItem
                  key={i}
                  disableGutters
                  button
                  onClick={() => handleClick(recipe)}
                >
                  <ListItemText primary={recipe.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      )}
    </Grid>
    </Box>
    
  );
};

export default WelcomeDashboard;
