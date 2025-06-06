import { useGetRecipesQuery,useAddFavoriteRecipeMutation,useSearchRecipeQuery } from "./recipeApiSlice";
import { Link } from "react-router-dom";
import {useState,useEffect}  from "react"
import {useDeleteRecipeMutation} from "../cookbook/CookbookApiSlice"
import { Card,  CardHeader,  CardMedia,  CardContent,  CardActions,  Avatar,  IconButton,  Typography,  Grid,  Box,} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete'; 
import { jwtDecode } from "jwt-decode";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import AddIcon from '@mui/icons-material/Add';
import DeleteRecipe from "./DeleteRecipe";
import AddRecipe from "./AddRecipe";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SortRecipe from "./SortRecipe";







const RecipesList = ({ cookbook }) => {
  const [recipes,SetRecipes] =useState(null)
  const [Deletevalue,SetDeletevalue] =useState({})
  const [DeleteOpen,SetDeleteOpen] =useState()
  const [AddRecipeOpen,SetAddRecipeOpen] =useState(false)
  const [action,SetAction] =useState(null)
  const [id,SetId] =useState(null)
  const [inputValue,SetInputValue] =useState("")
  const [sortValue, setSortValue] = useState('')


  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const isAdmin = decoded?.roles === "Admin";

  const { data: recipesQuery, error, isLoading, isSuccess, isError } = useGetRecipesQuery();
  const [deleteRecipe,{ data:deletData, error:deleteEror, isLoading:deleteLogin, isSuccess:deleteSuccess, isError:deleteIsEror }] = useDeleteRecipeMutation();
  const [addFavorite, {  data: favoriteData,  error: addError,  isLoading: isLoadingFavorite,  isSuccess: isFavoriteSuccess,  isError: isFavoriteError}] = useAddFavoriteRecipeMutation();
  const{data: search,  error: searchError,  isLoading: searchIsLoading,  isSuccess:isSuccesSearch,  isError: isSearcheError}= useSearchRecipeQuery(inputValue);
//SetRecipes(cookbook || recipesQuery);

useEffect(() => {
  SetRecipes(cookbook || recipesQuery);
}, [cookbook, recipesQuery]);


useEffect(()=>{
  setSortValue('')
  if(inputValue&&search&&isSuccesSearch){
    
    SetRecipes(search)}
  else{
    SetRecipes(cookbook || recipesQuery);
  }
 },[inputValue,search,isSuccesSearch])
 

const ManagerDeleteRecipe= (value)=>{
  SetDeletevalue(value)
  SetDeleteOpen(true)
}
const DeleteClose=()=>{
  SetDeleteOpen(false)
}
const ManagerAddRecipe= ()=>{

  SetAction("AddRecipe")
  SetAddRecipeOpen(true)
}
const ManagerUpdateRecipe= (value)=>{

  SetId(value)
  SetAction("UpdateRecipe")
  SetAddRecipeOpen(true)
}



 if (isLoading) return <div>טוען...</div>;
if (isError) {
    
    return <div>שגיאה בטעינת מתכונים</div>;
  }
  //if (!recipes || recipes.length === 0) return <div>אין מתכונים להצגה</div>;
  

  return (
    <>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between',alignItems: 'center', mb: 2 }}>
   <Box
      sx={{
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid lightgray',
        borderRadius: 2,
        padding: '4px 8px 8px 8px',
        width: '100%',
        maxWidth: 150,
        direction: 'rtl' 

      }}
    >
      <SearchIcon sx={{ color: 'gray', mr: 1 }} />
      <InputBase
        sx={{ flex: 1 }}
        placeholder="חיפוש..."
        value={inputValue}
        onChange={(e) => SetInputValue(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
     
    </Box>
        <SortRecipe setRecipe={SetRecipes} sortValue={sortValue} setSortValue={setSortValue} />
 
    </Box>
     
   
  {(recipes && recipes.length != 0)&&(
    <Box sx={{ width: '100%', direction: 'rtl' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {recipes.map((item) => (
          <Grid size={3} key={item._id}>
            
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Link
              to={`/recipe/${item._id}`}
              state={{ item }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {item.name[0]}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.name}
                />
                <Box sx={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:2000/uploads/${item.image}`}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", 
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                </CardContent>
                </Link>
                <CardActions sx={{ mt: "auto" }}>
                  {(!cookbook)?
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={(e) => {e.preventDefault(); addFavorite(item)}}/>
                  </IconButton>:<IconButton aria-label="add to favorites">
                    <AutoDeleteIcon onClick={(e) => {e.preventDefault(); deleteRecipe(item._id)}}/>
                  </IconButton>}
                  {isAdmin && (
                    <>
                  <IconButton aria-label="share">
                    <ShareIcon onClick={() => ManagerUpdateRecipe(item._id)}/>
                  </IconButton>
                  <IconButton >
                    <DeleteIcon aria-label="share" onClick={() => ManagerDeleteRecipe(item)}/>
                  </IconButton></>
                 )}
                </CardActions>
              </Card>
            
          </Grid>
        ))}
      </Grid>
    </Box>)}
    {isAdmin && (
      <IconButton aria-label="share">
        <AddIcon onClick={() => ManagerAddRecipe()} />
      </IconButton>
    )}
    <DeleteRecipe open={DeleteOpen} setopen={SetDeleteOpen}  onClose={DeleteClose} payload={Deletevalue}/>
    <AddRecipe open={AddRecipeOpen} setOpen={SetAddRecipeOpen} action={action} id={id}/>
    </>
  );
};

export default RecipesList;
