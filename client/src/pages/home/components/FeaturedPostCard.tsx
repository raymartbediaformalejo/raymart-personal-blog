import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../redux/posts/posts.api";

type FeaturedPostCardProps = {
  postId: string;
};

const FeaturedPostCard = ({ postId }: FeaturedPostCardProps) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  return (
    <div>
      <img src={post?.image} alt={post?.title} />
      <h2>{post?.title}</h2>
      {/* <p>{post.}</p> */}
    </div>
  );
};

export default FeaturedPostCard;
