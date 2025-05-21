import { useLocation } from "react-router-dom";

const Recipe=()=>{
  const location = useLocation();
  const item = location.state?.item;

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
