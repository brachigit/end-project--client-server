import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import{useDeleteRecipeMutation} from "./recipeApiSlice"
import PropTypes from "prop-types";
import {useState}  from "react"

const DeleteRecipe=({ open, setopen,  payload, onClose})=>{
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
     const [deleteRecipe,{ data, error:dataEror, isLoading, isSuccess, isError }] = useDeleteRecipeMutation();
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            console.log(payload)
           deleteRecipe(payload._id)
           setopen(false)
           
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Unknown error");
        } finally {
            setIsDeleting(false);
        }
    };

  return(
        <Dialog fullWidth open={open} onClose={onClose}>
           
            <DialogTitle>Are you sure you want to delete "{payload.name}"?</DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity="error">
                        {`An error occurred while deleting item "${payload.title}":`}
                        <pre>{error}</pre>
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isDeleting}>Cancel</Button>
                <Button onClick={handleDelete} color="error" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteRecipe.propTypes = {
    open: PropTypes.bool.isRequired,
    model: PropTypes.string.isRequired,
    payload: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    LoudData: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeleteRecipe