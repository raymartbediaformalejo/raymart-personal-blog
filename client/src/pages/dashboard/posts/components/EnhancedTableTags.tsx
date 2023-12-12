import React from "react";
import TableCell from "@mui/material/TableCell";
import EnhancedTableTag from "./EnhancedTableTag";

type EnhancedTableTagsProps = {
  tags: string[];
};
const EnhancedTableTags = ({ tags }: EnhancedTableTagsProps) => {
  return (
    <TableCell align="left">
      {tags.map((tagId) => (
        <EnhancedTableTag key={tagId} tagId={tagId} />
      ))}
    </TableCell>
  );
};

export default EnhancedTableTags;
