import TableCell from "@mui/material/TableCell";
import EnhanceTableCategory from "./EnhanceTableCategory";
import classes from "../../../../styles/pages/dashboard/table/EnhanceTableCategories.module.css";

type EnhanceTableCategoriesProps = {
  categories: string[];
};

const EnhanceTableCategories = ({
  categories,
}: EnhanceTableCategoriesProps) => {
  return (
    <TableCell align="left">
      <div className={classes["categories"]}>
        {categories.map((categoryId) => (
          <EnhanceTableCategory key={categoryId} categoryId={categoryId} />
        ))}
      </div>
    </TableCell>
  );
};

export default EnhanceTableCategories;
