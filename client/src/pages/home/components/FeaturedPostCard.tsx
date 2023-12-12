import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../redux/posts/posts.api";
import FeaturedPostTag from "./FeaturedPostTag";
import classes from "../../../styles/pages/home/FeaturedPostCard.module.css";
import Button from "../../../components/ui/Button";
import ArrrowIcon from "../../../components/icons/ArrrowIcon";
import { useNavigate } from "react-router-dom";

type FeaturedPostCardProps = {
  postId: string;
};

const FeaturedPostCard = ({ postId }: FeaturedPostCardProps) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (post) {
      navigate(`/article/${post?._id}`);
    }
  };
  return (
    <article
      onClick={handleRedirect}
      className={`card ${classes["feature-post-card"]}`}
    >
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
        <div className={classes["info__bottom-wrapper"]}>
          <Button
            icon={<ArrrowIcon />}
            size="x-small"
            color="primary"
            noHover
            text="Read more"
            className="read-more-btn"
            onClick={handleRedirect}
          />
          <div className={classes["tags-wrapper"]}>
            {post?.tag.map((tag) => (
              <FeaturedPostTag key={tag} tagId={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPostCard;
