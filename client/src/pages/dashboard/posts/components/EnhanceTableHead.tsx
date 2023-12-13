import React, { useState } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";

import { headCells } from "../utils/utils";
import classes from "../../../../styles/pages/dashboard/table/EnhancTableHeader.module.css";
import { TableSortLabel } from "@mui/material";
import { SetURLSearchParams } from "react-router-dom";
import { POST_QUERY_KEYS } from "../../../../utils/Constant";

import { TSortBy } from "../../../../types/types";

type EnhancedTableProps = {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  sort: string[];
  setSearchParams: SetURLSearchParams;
};

const EnhanceTableHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  setSearchParams,
}: EnhancedTableProps) => {
  const [sortBy, setSortBy] = useState<TSortBy>({
    sortBy: "",
    order: "asc",
  });

  const handleSort = (sortBy: string) => {
    setSortBy((prevSortBy) => {
      let updatedSortBy: TSortBy;

      if (prevSortBy.sortBy === sortBy) {
        updatedSortBy = {
          ...prevSortBy,
          order: prevSortBy.order === "asc" ? "desc" : "asc",
        };
      } else {
        updatedSortBy = { sortBy, order: "asc" };
      }

      prevSortBy.sortBy = sortBy;
      setSearchParams((prev) => {
        prev.set(
          POST_QUERY_KEYS.SORT,
          JSON.stringify([updatedSortBy.sortBy, updatedSortBy.order])
        );
        return prev;
      });

      return updatedSortBy;
    });
  };
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
            console.log("headCell: ", headCell);
            let tableCellContent;

            if (headCell.id === "createdAt" || headCell.id === "updatedAt") {
              tableCellContent = (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  <TableSortLabel
                    active={sortBy.sortBy === headCell.id}
                    direction={
                      sortBy.sortBy === headCell.id ? sortBy.order : "asc"
                    }
                    onClick={() => handleSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              );
            } else {
              tableCellContent = (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  {headCell.label}
                </TableCell>
              );
            }

            return tableCellContent;
          } else return <TableCell key={1} />;
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhanceTableHead;
