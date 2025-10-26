import { CropsIDConfig } from "../../config/CropsIDConfig";

function CropsIcon (CropsID: number) {
    const CropsIconProps = {
        name: "",
        color: ""
    }
    switch (CropsID){
        case 1:
            CropsIconProps.name = CropsIDConfig.V_1.name
            CropsIconProps.color = CropsIDConfig.V_1.color
    }

}

export default CropsIcon;