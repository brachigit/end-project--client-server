import AddReactionIcon from '@mui/icons-material/AddReaction';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppleIcon from '@mui/icons-material/Apple';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import RecipesList from '../recipes/RecipesList';
const ManagerOptions=()=>{
return(
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          ManagerOptions
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <AddReactionIcon />
        </ListItemIcon>
        <ListItemText primary="User Options" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary="Recipe Options" />
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          <AppleIcon/>
        </ListItemIcon>
        <ListItemText primary="Menu Options" />
        </ListItemButton>
    </List>
)
}
export default ManagerOptions