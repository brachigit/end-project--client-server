import { ResetTvOutlined } from "@mui/icons-material"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAddRecipeMutation } from "./recipeApiSlice"
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Button } from "@mui/material";
import {useState,useEffect}  from "react"


 

const AddRecipe=({open, setOpen})=>{
const { register, handleSubmit, formState: { errors }, setError } = useForm()
const [AddRecipe,{ data, error:dataEror, isLoading, isSuccess, isError }] = useAddRecipeMutation();
const [preview, setPreview] = useState(null);

useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);


const handleClose = () => {
    setOpen(false);
  };

const onSubmit = (data) =>{ 
console.log(data)
   const file = data.image[0];
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("title", data.title);
  formData.append("ingredients", data.ingredients);
  formData.append("instructions", data.instructions);
  formData.append("image", file); 
    try {AddRecipe(formData)}
  
    catch (err) {
      if (err?.data?.message === "User already exists") {
        data.setError("username", {
          type: "server",
          message: "Username already exists",
        });
      }
      }
    handleClose()  
}

return(
   
 <Dialog
  open={open}
  onClose={handleClose}>
  
    <DialogTitle>Add Recipe</DialogTitle>
    <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} id="form-dialog">
          <TextField
                 label="Name"
                 type="String"
                 fullWidth
                 margin="normal"
                 {...register("name", { required: "Name is required" })}
          
               />
           <TextField
           type="file"
         inputProps={{ accept: "image/*" }}
          {...register("image", { required: "Image is required" })}
         onChange={(e) => {
         const file = e.target.files[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
             }
           }}
              />

             {preview && (
             <img
             src={preview}
             alt="Preview"
             style={{
            width: "100%",
            maxWidth: 250,
            marginTop: 12,
            borderRadius: 8,
            display: "block",
             }}
            />
            )}


            <TextField
                 label="Title"
                 type="String"
                 fullWidth
                 margin="normal"
                 {...register("title", { required: "Title is required" })}
          
               /> 
               <TextField
                 label="Ingredients"
                 type="String"
                 fullWidth
                 margin="normal"
                 {...register("ingredients", { required: "Title is required" })}
          
               />     
               <TextField
                 label="Instructions"
                 type="String"
                 fullWidth
                 margin="normal"
                 {...register("instructions", { required: "Title is required" })}
          
               />             
          
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Save</Button>
        </DialogActions>
        </form>
    </DialogContent>

  </Dialog>

  
)
}
export default AddRecipe