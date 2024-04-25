import "../styles/overlay.css"
import NewPin from "../components/new_pin"
import { shadowType } from "../utils/factory"
import AddBtn from "../components/add_btn"
import { OverlayCompProp } from "./types/props/overlay"

const Overlay = (props: OverlayCompProp)=>{
    
    return <div id="overlay" onClick={(e)=>props.toggleOverlay(e)} className="overlay">
        {
            props.type === shadowType.FORM?
                props.coord?<NewPin coord={props.coord} handleCreateNewPin={props.handleCreateNewPin}  />: <p>click map to pin location</p>:
            props.type === shadowType.BTN?
                props.point? <AddBtn point={props.point} openForm={props.openAddBtn} />: <p>click map to pin location</p>:
                <div></div>
            
        }
    </div>
}

export default Overlay