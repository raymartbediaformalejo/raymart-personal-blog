import { Chip } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import { selectTagById } from "../../../../redux/tags/tags.api";

type EnhancedTabelTagProps = {
  tagId: string;
};

const EnhancedTableTag = ({ tagId }: EnhancedTabelTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));
  let content;

  if (tag) {
    content = <Chip label={tag.name} size="small" />;
  } else {
    content = null;
  }
  return content;
};

export default EnhancedTableTag;
