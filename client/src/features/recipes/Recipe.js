import { useLocation } from "react-router-dom";
import {useAddCommentMutation,useGetCommentsQuery} from "./recipeApiSlice"
import CommentDialog from './CommentDialog';
import CommentList from "./CommentList";
import {useEffect}  from "react"

const Recipe=()=>{
  
  const location = useLocation();
  const item = location.state?.item;
  const { data: commentsQuery, error, isLoading, isSuccess, isError } = useGetCommentsQuery(item._id);
  const[addComment, { data: commentsMutation, error:AddErr, isLoading:AddIsload, isSuccess:AddIsSuccess, isError:AddIsErr } ]= useAddCommentMutation();

  useEffect(() => {
  let recentRecipes = JSON.parse(localStorage.getItem("recentRecipes")) || [];
recentRecipes = recentRecipes.filter(r => r._id !== item._id);
recentRecipes.unshift(item);
recentRecipes = recentRecipes.slice(0, 5);
localStorage.setItem("recentRecipes", JSON.stringify(recentRecipes));

}, []);


const handleAddComment = async (text) => {
  console.log(text)
     addComment({id:item._id ,text:{text}})
   
  };

  if (!item) return <div>אין נתונים להצגה</div>;


  return (
    <div dir="rtl" style={styles.container}>
      <div style={styles.content}>
        <div style={styles.text}>
          <h2>{item.name}</h2>
          <h3>{item.title}</h3>
          <h4>רכיבים:</h4>
          <p style={styles.paragraph}>{item.ingredients}</p>
          <h4>אופן ההכנה:</h4>
          <p style={styles.paragraph}>{item.instructions}</p>
          <h3>בתאבון!!</h3>
        </div>
        <div style={styles.imageContainer}>
          <img
            src={`http://localhost:2000/uploads/${item.image}`}
            alt={item.name}
            style={styles.image}
          />
        </div>
      </div>
      <CommentDialog onAddComment={handleAddComment} isLoading={AddIsload} />
      <CommentList comments={commentsQuery}/>
    </div>
    
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'flex-start',
  },
  text: {
    flex: '1 1 300px',
    minWidth: '250px',
  },
  imageContainer: {
    flex: '1 1 300px',
    minWidth: '250px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
  },
  paragraph: {
    whiteSpace: 'pre-line',
    lineHeight: '1.6',
  },
};

export default Recipe;
