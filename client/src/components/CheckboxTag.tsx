import { useAppSelector } from "../redux/hooks/useAppSelector";
import { selectTagById } from "../redux/tags/tags.api";
import classes from "../styles/component/CheckBoxTag.module.css";

type CheckboxTagProps = {
  tagId: string;
  isSelected: boolean;
  onClick: () => void;
};

const CheckboxTag = ({ tagId, isSelected, onClick }: CheckboxTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));
  const tagClass = `${classes["tag-checkbox"]} ${
    isSelected ? classes["selected"] : ""
  }`;
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
        <label onClick={onClick} className={tagClass} htmlFor={`tag-${tag}`}>
          <span className={classes["tag-name"]}>{tag?.name}</span>
          <span className={classes["tag-count"]}>{tag?.tagCount}</span>
        </label>
      </>
    );
  } else content = null;

  return content;
};

export default CheckboxTag;
