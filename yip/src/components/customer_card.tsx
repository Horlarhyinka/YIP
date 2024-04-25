import { Details } from "../containers/types/props/mapProps";
import { Icon } from "@iconify/react/dist/iconify.js";


const CustomerCard = (prop: {details: Details, distance: number, handleDelete: Function, zoomInto: Function})=>{
    return <div onClick={(e: any)=>{
        if(e.target.id === "del-icn")return
        prop.zoomInto(prop.details.coord)
        }} className="customer-card">
        <Icon id="del-icn" onClick={()=>{prop.handleDelete(prop.details._id)}} className="icn" icon="iwwa:delete" />
        <p className="name">{prop.details.lastName} {prop.details.firstName}</p>
        <p className="email">{prop.details.email}</p>
        <p className="tel">{prop.details.tel}</p>
        <span>{Math.round(prop.distance)}km away from reference</span>
    </div>
}

export default CustomerCard