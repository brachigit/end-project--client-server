import React,{useEffect} from "react";
import {useRegisterMutation} from './authApiSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";


const Register=()=>{
    const dispach=useDispatch() 
    const [registerFunc,{data, error, isLoading,isSuccess,isError }]=useRegisterMutation()
    

    const { register, handleSubmit } = useForm()
  const onSubmit = (data) =>{registerFunc(data)}

  useEffect(
    ()=>{
        if(isSuccess)
            dispach(setToken(data))
    },isSuccess
  )
    

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true}) }placeholder="name" />
      <br/>
      <input {...register("username", { required: true}) }placeholder="username"  />
      <input {...register("password", { required: true,min: 8 }) }placeholder="password"  />
      <input {...register("email", { required: true }) }placeholder="email"  />
      <input {...register("address") }placeholder="address"  />
      <input {...register("phone", { required: true,min: 8 }) }placeholder="phone"  />
      <input type="submit" />
    </form>
  )
  
   
}
export default Register
