import classes from "../styles/component/CheckBoxTag.module.css";

type CheckboxTagProps = {
  tag: string;
  tagCount: number;
};

const CheckboxTag = ({ tag, tagCount }: CheckboxTagProps) => {
  return (
    <>
      <input
        className={classes["tag-input"]}
        type="checkbox"
        id={`tag-${tag}`}
        value={tag}
      />
      <label className={classes["tag-checkbox"]} htmlFor={`tag-${tag}`}>
        <span className={classes["tag-name"]}>{tag}</span>
        <div className={classes["tag-count"]}>{tagCount}</div>
      </label>
    </>
  );
};

export default CheckboxTag;
