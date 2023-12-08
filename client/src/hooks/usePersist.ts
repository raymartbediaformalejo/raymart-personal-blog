// usePersist.ts
import { useState, useEffect, Dispatch, SetStateAction } from "react";

export type PersistHookReturnType = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

const usePersist = (): PersistHookReturnType => {
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") + "") || false
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
