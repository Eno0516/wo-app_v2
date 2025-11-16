import { type PopFarmInfo } from "./InputPopFarmInfo";


type FarmInputProps = {
  field: keyof PopFarmInfo;
  farmInfo: PopFarmInfo;
  setFarmInfo: React.Dispatch<React.SetStateAction<PopFarmInfo>>;
  placeHolder?:string
};

function InputFarmInfo ({ field, farmInfo, setFarmInfo,placeHolder }: FarmInputProps) {
  return (
  <input
    name={field}
    value={farmInfo[field]}
    onChange={(e) =>
      setFarmInfo((prev) => ({ ...prev, [field]: e.target.value }))
    }
    placeholder={placeHolder}
  />
)
}

export default InputFarmInfo