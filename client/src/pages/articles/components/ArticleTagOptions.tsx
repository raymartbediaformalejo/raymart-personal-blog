import { useGetTagsQuery } from "../../../redux/tags/tags.api";
import CheckboxTag from "../../../components/CheckboxTag";
import classes from "../../../styles/pages/articles/ArticleTagOptions.module.css";

const ArticleTagOptions = () => {
  const { data: tags, isLoading, isSuccess, isError } = useGetTagsQuery();
  let content;

  console.log("tags: ", tags);

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>Something went wrong.</p>;

  if (isSuccess) {
    const { ids } = tags;
    content = (
      <div className={classes["tags"]}>
        {ids.map((tag) => (
          <CheckboxTag key={tag} tagId={tag as string} />
        ))}
      </div>
    );
  }

  return content;
};

export default ArticleTagOptions;
