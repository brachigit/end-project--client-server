import apiSlice  from "../../App/apiSlice";

const MenuApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getMenu:build. query({
            query:(Type)=>({
                url:"/api/nutrition",
                body:Type
          }),providesTags:["Menu"]
        }),
})
})
const{useGetMenuQuery}=MenuApiSlice
