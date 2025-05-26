import AddReactionIcon from '@mui/icons-material/AddReaction';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppleIcon from '@mui/icons-material/Apple';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import VerifiedIcon from '@mui/icons-material/Verified';
import { jwtDecode } from "jwt-decode";
import RecipesList from '../recipes/RecipesList';
const Options=()=>{
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const isAdmin = decoded?.roles === "Admin";
return(
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Options
        </ListSubheader>
      }
    >
      {(isAdmin)&&
      <ListItemButton href="/user">
        <ListItemIcon>
          <AddReactionIcon />
        </ListItemIcon>
        <ListItemText primary="User Options" />
      </ListItemButton>}
      <ListItemButton href="/recipe">
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary="Recipe " />
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          <AppleIcon/>
        </ListItemIcon>
        <ListItemText primary="Menu " />
        </ListItemButton>
        <ListItemButton href="/cookbook">
        <ListItemIcon>
          <ImageSearchIcon/>
        </ListItemIcon>
        <ListItemText primary="Cookbook " />
        </ListItemButton>
        <ListItemButton href="/bmi">
        <ListItemIcon>
          <VerifiedIcon/>
        </ListItemIcon>
        <ListItemText primary="BMI " />
        </ListItemButton>
         
    </List>
)
}
export default Options