import { HTMLInputTypeAttribute } from "react";
import { Controller, Control, FieldPath } from "react-hook-form";
import Input from "./Input";
import { TPost } from "../../redux/posts/posts.type";

type PostControllerInputProps = {
  control: Control<TPost>;
  name: FieldPath<TPost>;
  errorMessage?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};
const PostControllerInput = ({
  name,
  placeholder,
  type,
  control,
  errorMessage,
}: PostControllerInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          placeholder={placeholder}
          type={type}
          value={field.value as string | undefined}
          onChange={(value) => field.onChange(value)}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};

export default PostControllerInput;
