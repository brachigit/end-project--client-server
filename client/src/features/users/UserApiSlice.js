import apiSlice  from "../../App/apiSlice";

const UserApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        /*getUsers:build.query({
            query:()=>({
                url:"/api/user",
                
            }),providesTags:["users"]
        }),*/
        getUsers:build.query({
            query:({skip,limit})=>({
                url:`/api/user/skip?skip=${skip}&limit=${limit}`,
                
            }),providesTags:["getUsers"]
        }),
        addNewManager:build.mutation({
            query:(user)=>({
                url:'/api/user/manager',
                method:"POST",
                body: user
                
            }),invalidatesTags:["getUsers"]
        }),
       
    })
})

export const { useGetUsersQuery,useAddNewManagerMutation}=UserApiSlice
