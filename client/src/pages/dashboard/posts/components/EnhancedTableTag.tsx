import { Chip } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import { selectTagById } from "../../../../redux/tags/tags.api";
import classes from "../../../../styles/pages/dashboard/table/EnhanceTableTag.module.css";

type EnhancedTabelTagProps = {
  tagId: string;
};

const EnhancedTableTag = ({ tagId }: EnhancedTabelTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));
  let newName: string = "";
  let content;

  if (tag) {
    if (tag.name === "JavaScript") {
      newName = "JS";
    } else {
      newName = tag.name;
    }

    content = (
      <Chip
        className={`${classes["tag"]} ${classes[newName.toLowerCase()]}`}
        label={newName}
        size="small"
      />
    );
  } else {
    content = null;
  }
  return content;
};

export default EnhancedTableTag;
