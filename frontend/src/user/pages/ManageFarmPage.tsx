import {useEffect, useState} from "react"
import { useLocation } from "react-router-dom"
import FarmArea from "../components/MemberPage/Farm/ManageFarm/FarmArea.tsx";
import { apiClient } from "../../api/client.ts";
import { useFarmContext } from "../contexts/FarmContext.tsx";
//import ClickPopInputBox from "../../share/components/ManagePlant/ClickPopInputBok/clickPopInputBox"

type FarmBasicInfo = {
    farmName: string
    farmYear: number,
    farmSeasons: number[],
    farmManageUuid: string,
}

function ManageFarmPage () {
    // このページで持っておく情報
    // 時期による畑のuuidなどの情報
    const [farmBasicInfo,setFarmBasicInfo] = useState<FarmBasicInfo[]>([])
    // Contextに値を詰める
    const {setFarmName} = useFarmContext()
    // クエリパラメータから畑uuidを取得
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const farmId = params.get("farmUUID"); 
    // UUIDで登録されている名前・年度・季節一覧を取得
    useEffect(()=> {
           const handleManageFarms = async()=>{
        if (!farmId){
            return
        }
        try {
            const res = await apiClient.getManageFarms(farmId)
            setFarmBasicInfo(res)
            setFarmName(farmBasicInfo[0]?.farmName)
        } catch(err){
            console.log(err)
            throw new Error()  
        }
    }
    handleManageFarms()
    },[farmId])
 
    // 初期表示はyear,seasonが一番大きいやつで。今回はそこまでやらんでもいいか

    function getTargetFarmUuid(farms: FarmBasicInfo[]): string | null {
    if (farms.length === 0) return null;

    // 1. farmYear の最大値を求める
    const maxYear = Math.max(...farms.map(f => f.farmYear));

    // 2. farmYear が最大のものだけ抽出
    const candidates = farms.filter(f => f.farmYear === maxYear);

    if (candidates.length === 1) {
        return candidates[0].farmManageUuid;
    }

    // 3. 複数ある場合は farmSeasons の最大値で比較
    let best = candidates[0];
    let bestSeasonMax = Math.max(...best.farmSeasons);

    for (const farm of candidates.slice(1)) {
        const seasonMax = Math.max(...farm.farmSeasons);
        if (seasonMax > bestSeasonMax) {
        best = farm;
        bestSeasonMax = seasonMax;
        }
    }

    return best.farmManageUuid;
    }

    // 表示する時期の畑情報
    const targetManageUuid = getTargetFarmUuid(farmBasicInfo)

    // farmIdとfarmManageIdの存在確認
    const isBothUuid = farmId && targetManageUuid

    return(
        <>
        <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}
        >
            {farmBasicInfo[0]?.farmName ?? "読み込み中..."}
        </div>
        <div>
            {isBothUuid && (
            <FarmArea
            farmUuid={farmId}
            farmManageUuid={targetManageUuid}
            />
            )}
        </div>
        </>
    )
}

export default ManageFarmPage