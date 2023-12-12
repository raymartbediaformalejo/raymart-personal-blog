import { Chip } from "@mui/material";

import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import { selectCategoryById } from "../../../../redux/categories/categories.api";

type EnhanceTableCategoryProps = {
  categoryId: string;
};
const EnhanceTableCategory = ({ categoryId }: EnhanceTableCategoryProps) => {
  const category = useAppSelector((state) =>
    selectCategoryById(state, categoryId)
  );
  let content;
  if (category) {
    content = <Chip label={category.name} size="small" />;
  } else {
    content = <span>Loading...</span>;
  }
  return content;
};

export default EnhanceTableCategory;
