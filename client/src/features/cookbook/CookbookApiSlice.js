import apiSlice  from "../../App/apiSlice";
const CookbookApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getCookbook:build.query({
            query:()=>({
                url:"/api/cookbook"
          }),providesTags:["Cookbook"]
        }),
        deleteRecipe:build.mutation({
            query:(id)=>({
                url:`/api/cookbook/${id}`,
                method:"DELETE"
            }),invalidatesTags:["Cookbook"]
        })   
     })
    })
 export const{useGetCookbookQuery,useDeleteRecipeMutation}=CookbookApiSlice
