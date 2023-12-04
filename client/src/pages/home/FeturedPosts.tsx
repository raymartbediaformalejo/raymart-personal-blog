import { useGetPostsQuery } from "../../redux/posts/posts.api";
import FeaturedPostCard from "./components/FeaturedPostCard";
import classes from "../../styles/pages/home/FeaturedPost.module.css";
import Chip from "../../components/ui/Chip";
import { MAIN_NAVIGATION_ITEMS } from "../../utils/Constant";

const FeturedPosts = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    // error,
  } = useGetPostsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>Error!</p>;

  if (isSuccess) {
    const { ids } = posts;

    if (Array.isArray(ids)) {
      content = (
        <section className={classes["featured-post-section"]}>
          <div className={classes["featured-post-section__title-wrapper"]}>
            <h3 className={classes["title"]}>Featured blog</h3>
            <Chip
              to={MAIN_NAVIGATION_ITEMS.ARTICLES.url}
              text="View all"
              color="primary"
            />
          </div>
          <div className={classes["featured-post-items-wrapper"]}>
            {ids.map((postId) => (
              <FeaturedPostCard key={postId} postId={postId as string} />
            ))}
          </div>
        </section>
      );
    } else {
      content = <p>Not Array</p>;
    }
  }

  return <>{content}</>;
};

export default FeturedPosts;
