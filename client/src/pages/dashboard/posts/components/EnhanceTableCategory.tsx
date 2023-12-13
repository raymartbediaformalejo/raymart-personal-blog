import { Chip } from "@mui/material";

import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import { selectCategoryById } from "../../../../redux/categories/categories.api";
import classes from "../../../../styles/pages/dashboard/table/EnhanceTableCategory.module.css";

type EnhanceTableCategoryProps = {
  categoryId: string;
};
const EnhanceTableCategory = ({ categoryId }: EnhanceTableCategoryProps) => {
  const category = useAppSelector((state) =>
    selectCategoryById(state, categoryId)
  );
  let newName: string;
  let content;

  if (category) {
    if (category.name === "Today I learned(TIL)") {
      newName = "TIL";
    } else {
      newName = category.name;
    }
    content = (
      <Chip
        className={`${classes["category"]}  ${classes[newName.toLowerCase()]}`}
        label={newName}
        size="small"
      />
    );
  } else {
    content = <span>Loading...</span>;
  }
  return content;
};

export default EnhanceTableCategory;
