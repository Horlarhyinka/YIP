import { Point } from "../containers/types/props/mapProps";
import { Icon } from '@iconify/react';
import "../styles/add_btn.css"

const AddBtn = (props: {point: Point, openForm: Function})=><div style={{position: "absolute", top: `${props.point.y}px`, left: `${props.point.x}px`}} onClick={()=>{props.openForm()}} className="add-btn">
{/* <Icon className="icn" icon="gridicons:add-outline" /> */}
<Icon className="icn" icon="teenyicons:pin-outline" />
<span>mark location</span>
</div>

export default AddBtn