import type React from "react";
import type { PopFurrowInfo } from "./InputPopFurrowInfo";

type FurrowInputProps = {
    field: keyof PopFurrowInfo;
    furrowInfo: PopFurrowInfo;
    setFurrowInfo: React.Dispatch<React.SetStateAction<PopFurrowInfo>>;
    placeHolder?: string;
}

function InputFurrowInfo ({ field, furrowInfo, setFurrowInfo,placeHolder }: FurrowInputProps) {
  return (
  <input
    name={field}
    value={furrowInfo[field]}
    onChange={(e) =>
      setFurrowInfo((prev) => ({ ...prev, [field]: e.target.value }))
    }
    placeholder={placeHolder}
  />
)
}

export default InputFurrowInfo