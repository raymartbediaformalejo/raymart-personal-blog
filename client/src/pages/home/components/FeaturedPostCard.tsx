import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../redux/posts/posts.api";
import FeaturedPostTag from "./FeaturedPostTag";
import classes from "../../../styles/pages/home/FeaturedPostCard.module.css";

type FeaturedPostCardProps = {
  postId: string;
};

const FeaturedPostCard = ({ postId }: FeaturedPostCardProps) => {
  const post = useAppSelector((state) => selectPostById(state, postId));

  return (
    <a href="/">
      <div className={classes["feature-post-card"]}>
        <div
          className={classes["thumbnail-wrapper"]}
          style={{
            backgroundImage: `url(${post?.image})`,
          }}
        >
          <div className={classes["thumbnail__inner-wrapper"]}>
            <img
              src={post?.image}
              alt={post?.title}
              className={classes["thumbnail"]}
            />
          </div>

          <span className={classes["dot-bg"]}></span>
        </div>
        <div className={classes["info-wrapper"]}>
          <div>
            <h2 className={classes["title"]}>{post?.title}</h2>
            <p className={classes["summary"]}>{post?.summary}</p>
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
          <div className={classes["info__bottom-wrapper"]}>
            <button>Read more</button>
            <div className={classes["tags-wrapper"]}>
              {post?.tag.map((tag) => (
                <FeaturedPostTag key={tag} tagId={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default FeaturedPostCard;
