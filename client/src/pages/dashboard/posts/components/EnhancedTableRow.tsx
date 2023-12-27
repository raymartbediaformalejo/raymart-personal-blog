import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import { selectPostById } from "../../../../redux/posts/posts.api";
import EnhanceTableCategories from "./EnhanceTableCategories";
import EnhancedTableTags from "./EnhancedTableTags";

import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import classes from "../../../../styles/pages/dashboard/table/EnhanceTableRow.module.css";
import { useNavigate } from "react-router-dom";
import PostDeleteModal from "../../../../components/ui/Modals/PostDeleteModal";

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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  let content;

  const handleEdit = (id: string) => {
    if (id) navigate(`/dashboard/articles/${id}`);
  };

  const handleViewLive = (id: string) => {
    if (id) navigate(`/articles/${id}`);
  };

  const handleOpen = (id: string) => {
    setSelected([id]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
          <Dropdown>
            <MenuButton>
              <MoreHorizIcon fontSize="small" />
            </MenuButton>
            <Menu className={classes["action-buttons"]}>
              <MenuItem
                className={classes["edit-button"]}
                onClick={() => handleViewLive(post._id)}
              >
                <LinkIcon fontSize="small" />
                <span>View live</span>
              </MenuItem>
              <MenuItem
                className={classes["edit-button"]}
                onClick={() => handleEdit(post._id)}
              >
                <EditIcon fontSize="small" />
                <span>Edit</span>
              </MenuItem>
              <MenuItem
                className={classes["delete-button"]}
                onClick={() => handleOpen(post._id)}
              >
                <DeleteIcon fontSize="small" />
                <span>Delete</span>
              </MenuItem>
            </Menu>
          </Dropdown>
        </TableCell>
      </TableRow>
    );
  } else {
    <p>Loading...</p>;
  }
  return (
    <>
      <PostDeleteModal
        open={open}
        onClose={handleClose}
        selectedItem={selected}
      />
      {content}
    </>
  );
};

export default EnhancedTableRow;
