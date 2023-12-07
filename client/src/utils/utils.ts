import { POSTS_LIMIT } from "./Constant";

export const getPages = (total: number): string[] => {
  const totalPages = Math.ceil(total / POSTS_LIMIT);

  return Array.from({ length: totalPages }, (_, index) =>
    (index + 1).toString()
  );
};
