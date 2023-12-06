import React from "react";
import { useGetTagsQuery } from "../../../redux/tags/tags.api";
import CheckboxTag from "../../../components/CheckboxTag";

const ArticleTagOptions = () => {
  const { data: tags, isLoading, isSuccess, isError } = useGetTagsQuery();
  let content;

  console.log("tags: ", tags);

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>Something went wrong.</p>;

  if (isSuccess) {
    const { ids } = tags;
    content = (
      <div>
        {" "}
        {ids.map((tag) => (
          <CheckboxTag tagId={tag as string} />
        ))}
      </div>
    );
  }

  return content;
};

export default ArticleTagOptions;
