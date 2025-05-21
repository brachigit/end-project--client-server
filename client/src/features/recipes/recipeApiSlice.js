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
        })

})
})
export const{useGetRecipesQuery,useAddFavoriteRecipeMutation}=recipeApiSlice;