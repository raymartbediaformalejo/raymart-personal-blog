import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../redux/posts/posts.api";

type FeaturedPostCardProps = {
  postId: string;
};

const FeaturedPostCard = ({ postId }: FeaturedPostCardProps) => {
  const post = useAppSelector((state) => selectPostById(state, postId));

  console.log(`${postId}: `, post);

  return (
    <div>
      <img src={post?.image} alt={post?.title} />
      <div>
        <div>
          <h2>{post?.title}</h2>
          <p>{post?.summary}</p>
        </div>
        {/* <div
          style={{
            height: "100px",
            width: "100px",
            border: "1px solid red",
            backgroundImage: `url(${post?.image})`,
            backgroundSize: "1px 1px",
            filter: "saturate(5)",
          }}
        ></div> */}
        <div>
          <button>Read more</button>{" "}
          {post?.tag.map((tag) => (
            <a key={tag} href="/">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
