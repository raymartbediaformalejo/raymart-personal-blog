type TArrayToString = {
  arr?: string[];
};

export const arrayToString = ({ arr }: TArrayToString) => {
  if (arr && arr.length > 1) {
    return arr.join(",");
  } else return arr;
};
