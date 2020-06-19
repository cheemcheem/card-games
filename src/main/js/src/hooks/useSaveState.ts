import React, {useEffect, useState} from "react";

export default function useSaveState<T>(defaultValue: T, key: string): [string, React.Dispatch<React.SetStateAction<T>>] {
  const [save, setSave] = useState(() =>
      localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : defaultValue
  );

  useEffect(() => localStorage.setItem(key, JSON.stringify(save)), [save, key]);

  return [save, setSave];
}