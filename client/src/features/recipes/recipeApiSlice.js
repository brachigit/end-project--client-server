import apiSlice  from "../../App/apiSlice";

const recipeApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getRecipes:build. query({
            query:()=>({
                url:"/api/recipe"
          }),providesTags:["recipes"]
        }),
        addFavoriteRecipe:build.mutation({
            query:(recipe)=>({
                url:"/api/cookbook/newRecipe",
                 method:"POST",
                 body:recipe
          })
        }),
        DeleteRecipe:build.mutation({
            query:(id)=>({
                url:`/api/recipe/${id}`,
                method:"DELETE"
                
          }),invalidatesTags:["recipes"]
        }),
        AddRecipe:build.mutation({
            query:(recipe)=>({
                url:"/api/recipe",
                method:"POST",
                body:recipe
                
          }),invalidatesTags:["recipes"]
        }),


})
})
export const{useGetRecipesQuery,useAddFavoriteRecipeMutation,useDeleteRecipeMutation,useAddRecipeMutation}=recipeApiSlice;