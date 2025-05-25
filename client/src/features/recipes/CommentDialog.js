import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, IconButton
} from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

const CommentDialog = ({ onAddComment, isLoading }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setText('');
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onAddComment(text);
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCommentIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        הוסף תגובה
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>הוספת תגובה</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            label="תגובה"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'שולח...' : 'שלח'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentDialog;

