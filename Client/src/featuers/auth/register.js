import React,{useEffect} from "react";
import {useRegisterMutation} from './authApiSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
//import { TextField, Button, Box } from "@mui/material";


const Register=()=>{
    const dispatch=useDispatch() 
    const [registerFunc,{data, error, isLoading,isSuccess,isError }]=useRegisterMutation()
    

    const { register, handleSubmit } = useForm()
  const onSubmit = (data1) =>{registerFunc(data1)}

  useEffect(
    ()=>{
        if(isSuccess)
            dispatch(setToken({token: data?.accesstoken}))
    },[isSuccess] )
    

  return (

   <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true}) }placeholder="name" />
      <br/>
      <input {...register("username", { required: true}) }placeholder="username"  />
      <br/>
      <input {...register("password", { required: true,minLength:{
      value: 8,
      message: "Phone number must be at least 8 characters"
    } }) }placeholder="password"  />
      <br/>
      <input {...register("email", { required: true}) }placeholder="email"  />
      <br/>
      <input {...register("address") }placeholder="address"  />
      <br/>
      <input {...register("phone", { required: true,minLength:{
      value: 8,
      message: "Phone number must be at least 8 characters"
    } }) }placeholder="phone"  />
      <br/>
      <input type="submit" value="Send" />
    </form>
    /* <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
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
       /// error={!!errors.username}
        //helperText={errors.username?.message}
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
        //error={!!errors.password}
       // helperText={errors.password?.message}
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
       // error={!!errors.email}
        //helperText={errors.email?.message}
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
          required: "Phone is required",
          minLength: {
            value: 8,
            message: "Phone number must be at least 8 digits",
          },
        })}
       // error={!!errors.phone}
        //helperText={errors.phone?.message}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>*/
  )
  
   
}
export default Register