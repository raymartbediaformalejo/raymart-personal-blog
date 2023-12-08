import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../redux/posts/posts.api";
import ArticleTag from "./ArticleTag";
import Button from "../../../components/ui/Button";
import ArrrowIcon from "../../../components/icons/ArrrowIcon";
import classes from "../../../styles/pages/articles/ArticleCard.module.css";
import { Link } from "react-router-dom";

type ArticleCardProps = {
  postId: string;
};

const ArticleCard = ({ postId }: ArticleCardProps) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  let content;

  if (post) {
    content = (
      <article className="card">
        <header>
          <Link to={`/`}>
            <h2 className={classes["title"]}>{post.title}</h2>
          </Link>
          <p className={classes["date"]}>{`${post.createdAt.toLocaleDateString(
            "en-PH",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}`}</p>
          <div className={classes["tag-wrapper"]}>
            {post.tag.map((tag) => (
              <ArticleTag key={tag} tagId={tag} />
            ))}
          </div>
        </header>
        <p className={classes["summary"]}>{post.summary}</p>
        <Button
          icon={<ArrrowIcon />}
          size="x-small"
          color="primary"
          noHover
          text="Read more"
          className={`read-more-btn ${classes["read-more-button"]}`}
        />
      </article>
    );
  } else null;

  return content;
};

export default ArticleCard;