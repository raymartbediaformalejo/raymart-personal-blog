import { useGetFeaturedPostsQuery } from "../../redux/posts/posts.api";
import FeaturedPostCard from "./components/FeaturedPostCard";
import classes from "../../styles/pages/home/FeaturedPost.module.css";
import LinkButton from "../../components/ui/LinkButton";
import { CircularProgress } from "@mui/material";

const FeturedPosts = () => {
  const {
    data: featuredPosts,
    isLoading,
    isSuccess,
    isError,
    // error,
  } = useGetFeaturedPostsQuery(
    { featured: true },
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  console.log(featuredPosts);

  let content;

  if (isLoading)
    content = (
      <div className="loading-wrapper">
        <CircularProgress size="3rem" />
      </div>
    );

  if (isError) content = <p>Error!</p>;

  if (isSuccess) {
    content = (
      <section className={classes["featured-post-section"]}>
        <div className={classes["featured-post-section__title-wrapper"]}>
          <h3 className={classes["title"]}>Featured blog</h3>
          <LinkButton to="/articles" color="primary">
            View all
          </LinkButton>
        </div>
        <div className={classes["featured-post-items-wrapper"]}>
          {featuredPosts.posts.map((post) => (
            <FeaturedPostCard key={post._id} postId={post._id as string} />
          ))}
        </div>
      </section>
    );
  }

  return <>{content}</>;
};

export default FeturedPosts;
