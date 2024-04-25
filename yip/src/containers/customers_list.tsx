import { CustomersListProp } from "./types/props/customersListProp";
import "../styles/customers_list.css"
import CustomerCard from "../components/customer_card";
import { getDistance } from "../utils/locator";

function CustomersList(props: CustomersListProp){

    return <div className="customers-list">
{
    props.details.map(d=><CustomerCard zoomInto={props.zoomInto} key={d._id} handleDelete={props.handleDeleteDetail} details={d} distance={getDistance(d.coord, props.reference)}  />)
}
    </div>
}

export default CustomersList