import {useAddNewManagerMutation} from './UserApiSlice'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';

const UserDialog=({open,setOpen})=>{
    
const [formData, setFormData] = useState({
  name: '',
  username: '',
  email: '',
  address: '',
  phone: '',
  password: ''
});


const [AddNewManager,{ data, error, isLoading, isSuccess, isError } ]= useAddNewManagerMutation();

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleAddUser = async () => {
  AddNewManager(formData);
  setOpen(false);
};
   return(
      <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle>הוסף מנהל חדש</DialogTitle>
    <DialogContent>
      <TextField label="Name" name="name" fullWidth onChange={handleChange} margin="dense" />
      <TextField label="Username" name="username" fullWidth onChange={handleChange} margin="dense" />
      <TextField label="Password" name="password" fullWidth onChange={handleChange} margin="dense" />
      <TextField label="Email" name="email" fullWidth onChange={handleChange} margin="dense" />
      <TextField label="Address" name="address" fullWidth onChange={handleChange} margin="dense" />
      <TextField label="Phone" name="phone" fullWidth onChange={handleChange} margin="dense" />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>ביטול</Button>
      <Button onClick={handleAddUser} variant="contained">שמור</Button>
    </DialogActions>
  </Dialog>
   )
}
export default UserDialog