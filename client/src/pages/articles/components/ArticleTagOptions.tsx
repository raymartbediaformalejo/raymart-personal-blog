import { Dispatch, SetStateAction } from "react";

import { useGetTagsQuery } from "../../../redux/tags/tags.api";
import CheckboxTag from "../../../components/CheckboxTag";
import classes from "../../../styles/pages/articles/ArticleTagOptions.module.css";
import { SetURLSearchParams } from "react-router-dom";
import { POST_QUERY_KEYS } from "../../../utils/Constant";
import { CircularProgress } from "@mui/material";

type ArticleTagOptionsProps = {
  tagOptions: string[];
  setTagOptions: Dispatch<SetStateAction<string[]>>;
  setSearchParams: SetURLSearchParams;
};

const ArticleTagOptions = ({
  tagOptions,
  setTagOptions,
  setSearchParams,
}: ArticleTagOptionsProps) => {
  const { data: tags, isLoading, isSuccess, isError } = useGetTagsQuery();
  let content;

  console.log("tags: ", tags);
  console.log("tagOptions: ", tagOptions);

  const handleTagOption = (tag: string) => {
    setTagOptions((prev) => {
      const isTagExist = prev.includes(tag);

      let updatedTagOptions: string[];

      if (isTagExist) {
        updatedTagOptions = prev.filter((existingTag) => existingTag !== tag);
      } else {
        updatedTagOptions = [...prev, tag];
      }
      setSearchParams((prevSearchParams) => {
        if (updatedTagOptions.length > 0) {
          prevSearchParams.set(
            POST_QUERY_KEYS.TAG,
            JSON.stringify(updatedTagOptions)
          );
        } else {
          prevSearchParams.delete(POST_QUERY_KEYS.TAG);
        }

        return prevSearchParams;
      });

      return updatedTagOptions;
    });
  };

  if (isLoading)
    content = (
      <div className="loading-wrapper">
        <CircularProgress size="3rem" />
      </div>
    );

  if (isError) content = <p>Something went wrong.</p>;

  if (isSuccess) {
    const { ids } = tags;
    content = (
      <div className={classes["tags"]}>
        {ids.map((tag) => (
          <CheckboxTag
            key={tag}
            onClick={() => handleTagOption(tag + "")}
            tagId={tag as string}
            isSelected={tagOptions.includes(tag + "")}
          />
        ))}
      </div>
    );
  }

  return content;
};

export default ArticleTagOptions;
