import { Controller, Control, FieldPath, FieldErrors } from "react-hook-form";
import Select from "react-select";
import { TPost } from "../../redux/posts/posts.type";
import { TOption } from "../../types/types";
import classes from "../../styles/component/select/PostSelectController.module.css";
type PostInputControllerProps = {
  control: Control<TPost>;
  name: FieldPath<{
    category: string;
    tag: string;
    status: string;
    visibility: string;
  }>;
  errors: FieldErrors<TPost>;
  options: TOption[];
  placeholder?: string;
  isMulti?: boolean;
};

const PostSelectController = ({
  name,
  placeholder,
  control,
  options,
  errors,
  isMulti = false,
}: PostInputControllerProps) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            // @ts-expect-error: Unreachable code error
            getOptionValue={({ id }) => id}
            isMulti={isMulti}
            options={options}
            placeholder={placeholder}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
      {Object.keys(errors).includes(name) && (
        <p className={classes["select-error"]}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default PostSelectController;
