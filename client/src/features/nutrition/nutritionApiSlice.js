import apiSlice from "../../App/apiSlice"

const nutritionApiSlice=apiSlice.injectEndpoints({

    endpoints:(build)=>({
    
    getType:
    build.query({
      query:(Type)=>({
        url:`/api/nutrition/readByType/${Type}`,   
      } ) , providesTags: (result, error, type) => [{ type: 'Nutrition', id: type }],
    }),
      
      getById:
      build.query({
        query:(id)=>({
          url:`/api/nutrition/readById/${id}`
        } ) ,providesTags:["Menue"] }),
      
      addNutrion: build.mutation({
        query:(nutrition)=>({
          url:"/api/nutrition/addNutrion",
          method: "POST",
          body: nutrition
        } ),invalidatesTags:["Nutrition"]
    }),

    updateById: build.mutation({
       query:(id)=>({
         url:`/api/nutrition/updateById/${id}`,
         method: "PUT"
     }),invalidatesTags:["Nutrition"]
    }),

    deleteByName: build.mutation({
      query: ({name,nutrientType}) => ({
        url: `/api/nutrition/deleteByName/${name}/${nutrientType}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Nutrition"]
    }),

     sendPdfToEmail: build.mutation({
      query: ({ email, pdfContent }) => ({
        url: "/api/nutrition/send-pdf",
        method: "POST",
        body: { email, pdfContent },
      }),
    }),
 
    
    })
    })
    export const  {useAddNutrionMutation,useDeleteByNameMutation,useGetByIdQuery,useGetTypeQuery,useUpdateByIdMutation,useSendPdfToEmailMutation}= nutritionApiSlice
