import { HTMLInputTypeAttribute } from "react";
import { Controller, Control, FieldPath } from "react-hook-form";

import { TLogin } from "../../types/types";
import Input from "./Input";

type LoginControllerInput = {
  control: Control<TLogin>;
  name: FieldPath<TLogin>;
  errorMessage?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
};

const LoginControllerInput = ({
  name,
  placeholder,
  type,
  control,
  errorMessage,
  autoComplete,
}: LoginControllerInput) => {
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
          autoComplete={autoComplete}
        />
      )}
    />
  );
};

export default LoginControllerInput;
