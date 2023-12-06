import { useAppSelector } from "../redux/hooks/useAppSelector";
import { selectTagById } from "../redux/tags/tags.api";
import classes from "../styles/component/CheckBoxTag.module.css";

type CheckboxTagProps = {
  tagId: string;
};

const CheckboxTag = ({ tagId }: CheckboxTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));
  let content;
  if (tag?.tagCount) {
    content = (
      <>
        <input
          className={classes["tag-input"]}
          type="checkbox"
          id={`tag-${tag?.name}`}
          value={tag?.name}
        />
        <label className={classes["tag-checkbox"]} htmlFor={`tag-${tag}`}>
          <span className={classes["tag-name"]}>{tag?.name}</span>
          <div className={classes["tag-count"]}>{tag?.tagCount}</div>
        </label>
      </>
    );
  } else content = null;

  return content;
};

export default CheckboxTag;
