import React,{useEffect} from "react";
import {useLoginMutation} from './authApiSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { TextField, Button, Box } from "@mui/material";


const Login=()=>{
    const dispatch=useDispatch() 
    const [loginFunc,{data, error, isLoading,isSuccess,isError }]=useLoginMutation()
    

    const { register, handleSubmit , formState: { errors }, setErro} = useForm()
  const onSubmit = (data) =>{ 

    try {loginFunc(data)}

    catch (err) {
      if (err?.data?.message === "User already exists") {
        data.setError("username", {
          type: "server",
          message: "Username already exists",
        });
      }
      }
}

  useEffect(
    ()=>{
        if(isSuccess)
            dispatch(setToken({token: data?.accessToken}))
    },[isSuccess] )
    

  return (

       <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      
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
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
       Log_in
      </Button>
    </Box>
  )
  
   
}
export default Login