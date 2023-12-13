import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../../redux/posts/posts.api";
import EnhanceTableCategories from "./EnhanceTableCategories";
import EnhancedTableTags from "./EnhancedTableTags";
import { Button, Chip } from "@mui/material";

import classes from "../../../../styles/pages/dashboard/table/EnhanceTableRow.module.css";

type EnhancedTableRowProps = {
  rowId: string;
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
  isItemSelected: boolean;
  labelId: string;
};
const EnhancedTableRow = ({
  rowId,
  onClick,
  isItemSelected,
  labelId,
}: EnhancedTableRowProps) => {
  const post = useAppSelector((state) => selectPostById(state, rowId));
  let content;

  if (post) {
    content = (
      <TableRow
        hover
        onClick={onClick}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={rowId}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
        className={classes["row"]}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {post.title}
        </TableCell>
        <EnhanceTableCategories categories={post.category} />
        <EnhancedTableTags tags={post.tag} />
        <TableCell align="left">
          {post.createdAt.toLocaleDateString("en-PH", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          })}
        </TableCell>
        <TableCell align="left">
          {post.updatedAt.toLocaleDateString("en-PH", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          })}
        </TableCell>
        <TableCell align="right">{post.visibility}</TableCell>
        <TableCell align="right">{post.status}</TableCell>
        <TableCell align="right">{post.featured ? "YES" : "NO"}</TableCell>
        <TableCell align="right">
          <div onClick={() => console.log("keme eme")}>
            <Button variant="outlined" size="medium">
              Edit
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  } else {
    <p>Loading...</p>;
  }
  return content;
};

export default EnhancedTableRow;
