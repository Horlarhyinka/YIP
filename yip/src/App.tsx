import { RefObject, useEffect, useRef, useState } from 'react'
import './App.css'
import MapContainer from "./containers/map"
import {OverlayProp } from './containers/types/props/overlay'
import { shadowType } from './utils/factory'
import Overlay from './containers/overlay'
import { Coordinate, Details, Point } from './containers/types/props/mapProps'
import CustomersList from './containers/customers_list'
import axios, { AxiosResponse } from "axios"

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

const App = ()=>{

const [center, setCenter]= useState<Coordinate>()

const [reference, setReference] = useState<Coordinate>()

const [zoom, setZoom] = useState<number>(2)

const [overlay, setOverlay] = useState<OverlayProp>({type: "", open: false})

const [details, setDetails] = useState<Details[]>([])

const errorElem = useRef() as RefObject<HTMLDivElement>

function showError(msg: string){
  errorElem.current!.innerHTML = msg
  errorElem.current!.style.display = "inline-block"
  setTimeout(()=>{
    errorElem.current!.style.display = "none"
  }, 5000)
}

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const coord = {lat: position.coords.latitude, lng: position.coords.longitude}
      setCenter(coord)
      setReference(coord)
      getDetails()
      .then((res)=>{
        if(res.status.toString().startsWith("2")){
          setDetails(res.data)
        }else{
          showError(res.data.message)
        }
      })
    },(err)=>{
      showError(err.message)
    })
  },[])

  const [coordClicked, setCoordClicked] = useState<Coordinate>()

  async function getDetails(){
    return axios.get(apiBaseUrl + "/users")

  }

  async function postDetails(obj: object){
    return axios.post(apiBaseUrl + "/users", obj)
  }

  async function deleteDetail(id: string | number){
    return axios.delete(apiBaseUrl + "/users/" + id)
  }


  function handleMapClicked(e: Coordinate & Point){
    setCoordClicked({lng: e.lng, lat: e.lat})
    showAddBtn(e)
  }

  function toggleOverlay(e: any){
    if(e.target.id === 'overlay'){
    setOverlay({...overlay, open: !overlay.open})
    }
  }

  function openAddMarkerForm(){
    setOverlay({open: true, type: shadowType.FORM})
  }

  function showAddBtn(point: Point){
    setOverlay({open: true, type: shadowType.BTN, point})

  }

  async function handlePinLocation(obj: Details){
    toggleOverlay({target: {id: "overlay"}, type: ""})
    try{
      const res = await postDetails({...obj, _id: undefined})
      if(res.status !== 201){
        showError(res.data.message)
      }else{
      const data = res.data
      setDetails([...details, data])
      }
    }catch(err: any){
      showError(err.message || "error occured")
    }
  }

  async function handleDeleteDetail(id: string | number){
    deleteDetail(id)
    .then((res: AxiosResponse)=>{
      if(res.status.toString().startsWith("2")){
    setDetails(details.filter(d=>d._id.toString() !== id.toString()))
      }else{
        showError(res.data.message || "failed to delete location")
      }
    })
    .catch((err: any)=>{
      showError(err.message || "error occured")
    })
  }

  function zoomInto(coord: Coordinate){
    setCenter(coord)
    setZoom(15)
  }
  
    return <div className="app">
      <div ref={errorElem} className='error' >Errors will show here</div>
      <div className="map-wrapper">
        {overlay?.open && <Overlay coord={coordClicked} toggleOverlay={toggleOverlay} type={overlay.type} openAddBtn={openAddMarkerForm} handleCreateNewPin={handlePinLocation} point={overlay.point} />}
       {center && reference &&  <MapContainer setReference={setReference} details={details} zoom={zoom} center={center} reference={reference} handleDeleteDetail={handleDeleteDetail} handleMapClicked={handleMapClicked} />}
      </div>
      {reference && <CustomersList zoomInto={zoomInto} handleDeleteDetail={handleDeleteDetail} details={details} reference={reference!} />}
    </div>
}

export default App