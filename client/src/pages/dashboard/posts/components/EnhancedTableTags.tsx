import TableCell from "@mui/material/TableCell";
import classes from "../../../../styles/pages/dashboard/table/EnhanceTableTags.module.css";
import EnhancedTableTag from "./EnhancedTableTag";

type EnhancedTableTagsProps = {
  tags: string[];
};
const EnhancedTableTags = ({ tags }: EnhancedTableTagsProps) => {
  return (
    <TableCell align="left">
      <div className={classes["tags"]}>
        {tags.map((tagId) => (
          <EnhancedTableTag key={tagId} tagId={tagId} />
        ))}
      </div>
    </TableCell>
  );
};

export default EnhancedTableTags;
