import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import {IconButton,Typography,Box,Container,AppBar,Toolbar,} 
    from '@mui/material'
import ExportTextButton from '../context/ExportTextButton'
import {PdfProvider} from '../context/PdfProvider'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';


const NutritionLayout = () => {

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const role = decoded?.roles 
  

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5',
      }}>

      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            תפריט דיאטה – 1200 קלוריות
          </Typography>
          {role === 'Admin' && (
             <>
            <IconButton
              component={Link}
              to="addIteam"
              //href="addIteam"
              variant="contained"
              color="secondary"
              sx={{ mt: { xs: 1, sm: 0 } }}
            >
              <AddCircleIcon/>
            </IconButton>
            
          <IconButton
          component={Link}
          to="deleteIteam"
          variant="contained"
          color="secondary"
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          <DeleteIcon/>
        </IconButton>
        </>
          )
          
          
          }
        </Toolbar>
      </AppBar>

      <PdfProvider>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',  // מרכז אופקי
      justifyContent: 'center',
      mt: 8,
      mb: 8,
      px: 2,
      gap: 3,                // רווח בין הכפתורים לתוכן
      width: '100%',
    }}
  >
    {/* כפתור הורד סיכום */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      <ExportTextButton />
    </Box>

    {/* התוכן הדינמי תחת הכפתור, במרכז ורספונסיבי */}
    <Box
      sx={{
        mt: 4,
        width: { xs: '100%', sm: '80%', md: '60%' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Box>
  </Box>
</PdfProvider>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: '#e3f2fd', py: 4, px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom align="center">
            מה חשוב לדעת בתפריט דיאטה 1200 קלוריות:
          </Typography>

          <ul style={{ direction: 'rtl', paddingInlineStart: '20px' }}>
            {[
              'מומלץ להתחיל לאכול את הארוחה הראשונה עד שעה מהיקיצה.',
              'המרווח בין הארוחות נע בין שעה וחצי לשלוש שעות.',
              'אין חשיבות לסדר הארוחות. ניתן להחליף ארוחה אחת בארוחה שניה במלואה.',
              'לא ניתן לפצל, לצרף או לדלג על ארוחות.',
              'מנה מותרת בנוסף לתפריט פעם בשבוע.',
              'כוס חלב ביום לקפה.',
              'ירקות ניתן לשלב בכל ארוחה בשפיות ובצלילות הדעת.',
              'יש לשתות מינימום 12 כוסות מים ביום (אפשר לגוון עם תה צמחים או סודה).',
              'מומלץ לשתות כוס מים לפני ואחרי כל ארוחה.',
              'חשוב לדייק בכמויות.',
              'מומלץ לגוון את הארוחות עם תחליפים הנמצאים בחוברת ובאתר.',
              'מומלץ ללכת ברגל 3 פעמים בשבוע למשך שעה.',
              'מזון המכיל ממתיק מלאכותי יש לצרוך בכמויות מבוקרות.',
              'מומלץ שהלחם והפחמימות יהיו מדגנים מלאים (כלחם, אורז, פסטה ועוד).',
            ].map((text, index) => (
              <li key={index}>
                <Typography variant="body1" gutterBottom>
                  {text}
                </Typography>
              </li>
            ))}
          </ul>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, direction: 'rtl' }}
          >
            מחפשים תפריט בריא? תפריט הדיאטה באתר זה, לרבות תפריט לדיאטה
            1200 קלוריות לירידה במשקל, אינם מתאימים לכל הנשים והגברים באופן
            גורף – ולכן יש להיצמד להוראות המנחים להתאמת תפריט לתזונה נכונה
            עבורכם.
          </Typography>

          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            ** התפריט אינו המלצה רפואית. יש להתייעץ עם הרופא המטפל על מנת לוודא
            כי אין מניעה רפואית. ט.ל.ח. <br />
            התפריטים לשימוש אישי בלבד.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
};

export default NutritionLayout;
