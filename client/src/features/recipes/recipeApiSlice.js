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
        UpdateRecipe:build.mutation({
            query:({ id, recipe })=>({
                url:`/api/recipe/${id}`,
                method:"PUT",
                body:recipe
                
          }),invalidatesTags:["recipes"]
        }),
         SearchRecipe:build. query({
            query:(name)=>({
               url: `/api/recipe/search?name=${name}`
           
                
          }),invalidatesTags:["recipes"]
        }),
        getRecipeSortByName:build. query({
            query:()=>({
                url:"/api/recipe/name"
          })
        }),
        getRecipeSortByDate:build. query({
            query:()=>({
                url:"/api/recipe/date"
          })
        }),
        getComments:build. query({
            query:(id)=>({
                url:`/api/recipe/comment/${id}`

          }),providesTags:["comments"]
        }),
         addComment:build.mutation({
            query:({id,text})=>({
                url:`/api/recipe/${id}`,
                method:"POST",
                body: {text}
          }),invalidatesTags:["comments"]
        }),


})
})
export const{useGetRecipesQuery,useAddFavoriteRecipeMutation,useDeleteRecipeMutation,
  useAddRecipeMutation,useSearchRecipeQuery,useUpdateRecipeMutation,useGetRecipeSortByDateQuery,
  useGetRecipeSortByNameQuery,useAddCommentMutation,useGetCommentsQuery}=recipeApiSlice;