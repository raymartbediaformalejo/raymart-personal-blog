import TableCell from "@mui/material/TableCell";
import EnhanceTableCategory from "./EnhanceTableCategory";

type EnhanceTableCategoriesProps = {
  categories: string[];
};

const EnhanceTableCategories = ({
  categories,
}: EnhanceTableCategoriesProps) => {
  return (
    <TableCell align="left">
      {categories.map((categoryId) => (
        <EnhanceTableCategory key={categoryId} categoryId={categoryId} />
      ))}
    </TableCell>
  );
};

export default EnhanceTableCategories;
