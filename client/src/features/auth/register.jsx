import React,{useEffect} from "react";
import {useRegisterMutation} from './authApiSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { TextField, Button, Box,Grid,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Register=()=>{
    const dispatch=useDispatch() 
    const navigate = useNavigate();
    const [registerFunc,{data, error, isLoading,isSuccess,isError }]=useRegisterMutation()
    

    const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const onSubmit = async (data) => {
  try {
    const result = await registerFunc(data);

    if ("error" in result) {
      const errMsg = result.error?.data?.message;

      if (errMsg === "User already exists") {
        setError("username", {
          type: "server",
          message: "שם משתמש כבר קיים במערכת",
        });
      } else {
        setError("username", {
          type: "server",
          message: errMsg || "שגיאה לא ידועה",
        });
      }
    }
  } catch (err) {
    console.error("שגיאה בלתי צפויה:", err);
  }
};


  useEffect(
    ()=>{
        if(isSuccess){
          dispatch(setToken({token: data?.accessToken}))
          navigate("/options");}
    },[isSuccess] )
    

  return (
    <>

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


     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name", { required: "Name is required" })}
        //error={!!errors.name}
       // helperText={errors.name?.message}
      />

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
       error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Address"
        fullWidth
        margin="normal"
        {...register("address")}
      />

      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        {...register("phone", {
          minLength: {
            value: 8,
            message: "Phone number must be at least 8 digits",
          },
        })}
       
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        sight_in
      </Button>
    </Box>
    </>
  )
  
   
}
export default Register