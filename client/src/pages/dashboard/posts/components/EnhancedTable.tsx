import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { SetURLSearchParams } from "react-router-dom";

import EnhanceTableHead from "./EnhanceTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableRow from "./EnhancedTableRow";
import { TPostResponse } from "../../../../redux/posts/posts.type";
import classes from "../../../../styles/pages/dashboard/table/EnhanceTable.module.css";
import { POST_QUERY_KEYS } from "../../../../utils/Constant";
import { TSortBy } from "../../../../types/types";

type EnhancedTableProps = {
  query: string | null;
  rows: TPostResponse[];
  sort: TSortBy;
  rowsPerPage: number;
  totalPosts: number;
  page: number;
  setSearchParams: SetURLSearchParams;
};

const EnhancedTable = ({
  query,
  rows,
  totalPosts,
  sort,
  page,
  rowsPerPage,
  setSearchParams,
}: EnhancedTableProps) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    console.log("newPage: ", newPage);
    console.log("page: ", page);

    setSearchParams((prev) => {
      prev.set(POST_QUERY_KEYS.PAGE, `${newPage + 1}`);
      return prev;
    });
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set(POST_QUERY_KEYS.LIMIT, e.target.value);
      prev.set(POST_QUERY_KEYS.PAGE, "1");
      return prev;
    });
    // setRowsPerPage(parseInt(e.target.value, 10));
    // setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }} className={classes["all-posts"]}>
      <Paper
        sx={{ width: "100%", mb: 2 }}
        className={classes["all-posts-table-wrapper"]}
      >
        <EnhancedTableToolbar
          query={query}
          numSelected={selected.length}
          setSearchParams={setSearchParams}
        />
        <TableContainer>
          <Table
            className={classes["all-posts-table"]}
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhanceTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              sort={sort}
              setSearchParams={setSearchParams}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <EnhancedTableRow
                    key={row._id}
                    rowId={row._id}
                    onClick={() => handleClick(row._id)}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes["table-pagination"]}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPosts}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
