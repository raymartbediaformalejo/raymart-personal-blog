import { HTMLInputTypeAttribute } from "react";
import { Controller, Control, FieldPath } from "react-hook-form";

import { TLogin } from "../../types/types";
import Input from "./Input";

type LoginControllerInputProps = {
  control: Control<TLogin>;
  name: FieldPath<TLogin>;
  errorMessage?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

const LoginControllerInput = ({
  name,
  placeholder,
  type,
  control,
  errorMessage,
}: LoginControllerInputProps) => {
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

export default LoginControllerInput;
