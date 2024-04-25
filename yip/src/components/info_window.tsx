import { Details } from "../containers/types/props/mapProps";

interface Prop{
    detail : Details
}

const InfoWindow = (prop: Prop) =>{
    return <div id="info-window" className="info-window">
        <p>{prop.detail.email}</p>
        <p>{prop.detail.lastName} {prop.detail?.firstName}</p>
        <p>{prop.detail.tel}</p>
    </div>
}

export default InfoWindow