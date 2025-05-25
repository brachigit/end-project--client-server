import apiSlice  from "../../App/apiSlice";

const UserApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getUsers:build.query({
            query:()=>({
                url:"/api/user",
                
            }),providesTags:["users"]
        }),
       
    })
})

export const { useGetUsersQuery}=UserApiSlice
