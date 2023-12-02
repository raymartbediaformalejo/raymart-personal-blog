import { useGetPostsQuery } from "../../redux/posts/posts.api";
import FeaturedPostCard from "./components/FeaturedPostCard";

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
    console.log(ids);

    if (Array.isArray(ids)) {
      content = (
        <section>
          <div>
            <h3>Featured Blog</h3> <a href="/">View all</a>
          </div>
          {ids.map((postId) => (
            <FeaturedPostCard key={postId} postId={postId as string} />
          ))}
        </section>
      );
    } else {
      content = <p>Not Array</p>;
    }
  }

  return <> {content}</>;
};

export default FeturedPosts;
