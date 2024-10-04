import { Details } from "../containers/types/props/mapProps"
import { marker_path } from "./factory"


export function addMarker(position: any, title: string, map: any, maps: any, info: Details | undefined, isPointer: boolean = false){
    const marker = new maps.Marker({
        position, title, map, draggable: isPointer, clickable: true,
    })
    marker.setAnimation(isPointer?window.google.maps.Animation.BOUNCE:window.google.maps.Animation.BOUNCE)
    marker.set("id", info?._id)
    if(info && !isPointer){
        marker.setIcon({fillColor: "green", path: marker_path, strokeColor: "white", fillOpacity: 1})
    const infoWindow = new window.google.maps.InfoWindow()
    isPointer ? marker.setAnimation(window.google.maps.Animation.BOUNCE): marker.setAnimation(null)
    marker.setCursor("pointer")
    const infoContent = `<div class="info-window" > 
    <p class="email">email: ${info.email}</p>
    <p class="name">full name: ${info.firstName} ${info.lastName}</p>
    <p class="tel">telephone: ${info.tel}</p>
    </div>`
    infoWindow.setContent(infoContent)
    marker.addListener("click", (_: any)=>{
    infoWindow.open(map, marker)
    })
    }
    return marker
}
