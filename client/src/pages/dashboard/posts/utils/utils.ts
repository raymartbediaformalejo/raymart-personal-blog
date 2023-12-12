import { HeadCell } from "../../../../types/types";

export const headCells: readonly HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "tag",
    numeric: false,
    disablePadding: false,
    label: "Tag",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Date published",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Date updated",
  },
  {
    id: "visibility",
    numeric: false,
    disablePadding: false,
    label: "Visibility",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "featured",
    numeric: false,
    disablePadding: false,
    label: "Featured",
  },
  "",
];
