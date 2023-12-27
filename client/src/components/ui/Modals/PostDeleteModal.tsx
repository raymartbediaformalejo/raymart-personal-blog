import { Modal, Button, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import classes from "../../../styles/component/ui/Modals/PostDeleteModal.module.css";
import { useDeletePostMutation } from "../../../redux/posts/posts.api";

type PostDeleteModalProps = {
  open: boolean;
  selectedItem: string[];
  onClose: () => void;
};

const PostDeleteModal = ({
  open,
  selectedItem,
  onClose,
}: PostDeleteModalProps) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const handleDeletePosts = async () => {
    await deletePost(selectedItem);
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes["delete-modal"]}>
        <IconButton onClick={onClose} className={classes["close-modal-button"]}>
          <CloseOutlinedIcon fontSize="small" />
        </IconButton>
        <div className={classes["delete-modal-inner-wrapper"]}>
          <DeleteIcon
            className={classes["delete-modal-illustrator"]}
            fontSize="large"
          />
          <h2>Are you sure?</h2>
          <p
            className={classes["delete-modal-description"]}
          >{`Do you really want to delete ${
            selectedItem.length > 1 ? "these" : "this"
          } ${selectedItem.length} post(s)? This process cannot be undone.`}</p>
          <div className={classes["delete-modal__button-wrapper"]}>
            <Button
              className={classes["cancel-button"]}
              variant="contained"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className={classes["delete-button"]}
              variant="contained"
              onClick={handleDeletePosts}
              disabled={isLoading}
            >{`${isLoading ? "Loading..." : "Delete"}`}</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDeleteModal;
