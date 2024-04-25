import { Point, Coordinate } from "./mapProps"

export interface OverlayProp{
    type: string
    open: boolean
    point?: Point
}

export interface OverlayCompProp{toggleOverlay: Function, type: string, point?: Point, openAddBtn: Function, coord?: Coordinate, handleCreateNewPin: Function }