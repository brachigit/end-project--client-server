import apiSlice from "../../app/apiSlice";

const authApiSlice=apiSlice.injectEndpoints({

endpoints:(build)=>({

login:
build.mutation({
  query:(logindata)=>({
    url:"/api/auth/login",
    method: "POST",
    body:logindata
  } )}),

 register: build.mutation({
    query:(registerData)=>({
      url:"/api/auth/sight_in/user",
      method: "POST",
      body: registerData
    } )
})



})
})
export const  {useLoginMutation,useRegisterMutation  }= authApiSlice