import { useParams } from "react-router-dom";
import PostForm from "../../../components/PostForm";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../redux/posts/posts.api";

const EditPost = () => {
  const { id } = useParams();
  const postToEdit = useAppSelector((state) => selectPostById(state, id!));
  console.log("EditPost: ", id);

  return <PostForm postToEdit={postToEdit} />;
};

export default EditPost;
