import { MapState } from "../states/mapState"

export interface MapProps{
    handleMapClicked: Function
    center: Coordinate
    zoom: number
    reference: Coordinate
    details: Details[]
    setReference: Function
    handleDeleteDetail: Function
}

export interface Coordinate{
    lng: number
    lat: number
}

export interface Details{
    firstName: string
    lastName: string
    email: string
    tel: string
    coord: Coordinate
    _id: string | number
}

export interface Point{
    x: number
    y: number
}