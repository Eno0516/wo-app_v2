import { type CellInfo } from "../CreateCell";


type CellInputProps = {
  field: keyof CellInfo;
  cellInfo: CellInfo;
  setCellInfo: React.Dispatch<React.SetStateAction<CellInfo>>;
  placeHolder?:string
};

function InputCellInfo ({ field, cellInfo, setCellInfo,placeHolder }: CellInputProps) {
  return (
  <input
    name={field}
    value={cellInfo[field]}
    onChange={(e) =>
      setCellInfo((prev) => ({ ...prev, [field]: e.target.value }))
    }
    placeholder={placeHolder}
  />
)
}

export default InputCellInfo