type TArrayToString = {
  arr?: string[];
};

type TToEmptyStringIfNullish = {
  item: string | number;
};

type TOptionSelectFormat = {
  options: string[];
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

export const optionSelectFormat = ({ options }: TOptionSelectFormat) => {
  return [...new Set(options)].map((option) => ({
    value: option.toLowerCase().split(" ").join("-"),
    label: option,
  }));
};
