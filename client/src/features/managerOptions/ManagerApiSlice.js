import apiSlice  from "../../App/apiSlice";

const ManagerApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
     
        addRecipe:build.mutation({
            query:(recipe)=>({
                url:"/api/recipe",
                 method:"POST",
                 body:recipe
          })
        })

})
})
export const{useAddRecipeMutation}=ManagerApiSlice;
