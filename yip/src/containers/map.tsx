
import React, { useEffect, useState } from 'react';
import { MapProps } from './types/props/mapProps';
import GoogleMap from "google-map-react";
import { addMarker } from '../utils/marker';

import "../styles/map.css"


const apiKey = import.meta.env.VITE_APP_MAP_API_KEY

const MapContainer = (props: MapProps)=>{
  let [mapRef, setMapRef] = useState<any>()
  let [mapsRef, setMapsRef] = useState<any>()
  let [markers, setMarkers] = useState<any[]>([])
      useEffect(()=>{
        if(mapRef && mapsRef){
          for(let marker of markers){
            marker.setMap(null)
          }
        setMarkers(props.details.map((d, _)=>{
          return addMarker(d.coord, `${d.firstName} ${d.lastName}`, mapRef, mapsRef, d, false)
        }))
        }
      },[mapRef, mapsRef, props.details])

      return <div id='map' className="map">
  {/* {props.overlay?.open && <Overlay open={props.overlay.open} type={props.overlay.type} />} */}

      {props.center?<GoogleMap
      yesIWantToUseGoogleMapApiInternals
          center={props.center}
          zoom={props.zoom}
          key={apiKey}
          onGoogleApiLoaded={async({map, maps})=>{
            mapRef =map
            const pointer = addMarker(props.reference, "your reference", map, maps, undefined, true)
            pointer.addListener("dragend", (e: any)=>{
              props.setReference({lat: e.latLng.lat(),lng: e.latLng.lng(),})
            })
            setMapRef(map)
            setMapsRef(maps)
          }}
          bootstrapURLKeys={{
            id: "API key 1",
            key: apiKey,
          }}
          options={
            {
            mapTypeControl: true,
            streetViewControl: true,
            mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'custom-map'],
        },
            mapId: "MY_MAP",
            
          }}
          
          onClick={(e)=>{
            if( e.event.target.__src__)return
            props.handleMapClicked(e)
          }}
        >
        </GoogleMap>:
        <p>loading map....</p>
        }

      </div>
}

export default React.memo(MapContainer)