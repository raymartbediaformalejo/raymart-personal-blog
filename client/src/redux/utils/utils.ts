type TArrayToString = {
  arr?: string[];
};

type TToEmptyStringIfNullish = {
  item: string | number;
};

export const arrayToString = ({ arr }: TArrayToString) => {
  if (arr && arr.length > 1) {
    return arr.join(",");
  } else if (arr?.length === 1) {
    return arr[0];
  } else return "";
};

export const toEmptyStringIfNullish = ({ item }: TToEmptyStringIfNullish) => {
  return item ? item : "";
};
