import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";

import { headCells } from "../utils/utils";
import classes from "../../../../styles/pages/dashboard/table/EnhancTableHeader.module.css";

type EnhancedTableProps = {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
};
const EnhanceTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead
      className={classes["header"]}
      sx={{ backgroundColor: "hsl(225 10% 8% / 0.33)" }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          if (typeof headCell === "object") {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
              >
                {headCell.label}
              </TableCell>
            );
          } else return <TableCell key={1} />;
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhanceTableHead;
