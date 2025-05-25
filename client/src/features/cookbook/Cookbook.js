import {useGetCookbookQuery}from "./CookbookApiSlice"
import RecipesList from "../recipes/RecipesList"


const Cookbook=()=>{
 const { data:CookbookQuery, error, isLoading, isSuccess, isError } = useGetCookbookQuery();   
  if (isLoading) return <div>טוען...</div>;
  
  if (!CookbookQuery ||CookbookQuery.length === 0) return <div>אין מתכונים להצגה</div>; 
return(
<>
<RecipesList cookbook={CookbookQuery.recipeList}/>
</>
)
}
export default Cookbook