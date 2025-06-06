import apiSlice from "../../App/apiSlice";

const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRecipeSortByName: build.query({
      query: () => ({
        url: "/api/recipe/name",
      }),
      providesTags: ["sort"],
    }),

    getRecipeSortByDate: build.query({
      query: () => ({
        url: "/api/recipe/date",
      }),
      providesTags: ["sort"],
    }),

    getRecipes: build.query({
      query: () => ({
        url: "/api/recipe",
      }),
      providesTags: ["recipes"],
    }),
    getRecipeById: build.query({
      query: (id) => ({
        url: `/api/recipe/${id}`,
      }),
      
    }),

    addFavoriteRecipe: build.mutation({
      query: (recipe) => ({
        url: "/api/cookbook/newRecipe",
        method: "POST",
        body: recipe,
      }),
    }),

    DeleteRecipe: build.mutation({
      query: (id) => ({
        url: `/api/recipe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["recipes", "sort"],
    }),

    AddRecipe: build.mutation({
      query: (recipe) => ({
        url: "/api/recipe",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["recipes", "sort"],
    }),

    UpdateRecipe: build.mutation({
      query: ({ id, recipe }) => ({
        url: `/api/recipe/${id}`,
        method: "PUT",
        body: recipe,
      }),
      invalidatesTags: ["recipes", "sort"],
    }),

    SearchRecipe: build.query({
      query: (name) => ({
        url: `/api/recipe/search?name=${name}`,
      }),
      
    }),

    getComments: build.query({
      query: (id) => ({
        url: `/api/recipe/comment/${id}`,
      }),
      providesTags: ["comments"],
    }),

    addComment: build.mutation({
      query: ({ id, text }) => ({
        url: `/api/recipe/${id}`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddFavoriteRecipeMutation,
  useDeleteRecipeMutation,
  useAddRecipeMutation,
  useSearchRecipeQuery,
  useUpdateRecipeMutation,
  useGetRecipeSortByDateQuery,
  useGetRecipeSortByNameQuery,
  useAddCommentMutation,
  useGetCommentsQuery,
  useGetRecipeByIdQuery
} = recipeApiSlice;
