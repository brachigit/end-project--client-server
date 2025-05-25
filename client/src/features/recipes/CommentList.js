import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Paper,
} from '@mui/material';

const CommentList = ({ comments }) => {
    console.log(comments)
    if (!comments || !Array.isArray(comments)) return null;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        תגובות
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <div key={comment._id || index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{comment.user.username[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.username}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(comment.date).toLocaleDateString()}

                    </Typography>
                    {comment.text}
                  </>
                }
              />
            </ListItem>
            {index < comments.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
    </Paper>
  );
};
export default CommentList
