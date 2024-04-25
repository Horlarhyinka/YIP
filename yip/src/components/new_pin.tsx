import { useRef } from "react"
import "../styles/new_pin.css"
import { RefObject } from "react"
import Joi from "joi"
import { Coordinate } from "../containers/types/props/mapProps"

const NewPin = (props: {handleCreateNewPin: Function, coord: Coordinate})=>{

    const firstNameRef = useRef() as RefObject<HTMLInputElement>
    const lastNameRef = useRef() as RefObject<HTMLInputElement>
    const emailRef = useRef() as RefObject<HTMLInputElement>
    const telRef = useRef() as RefObject<HTMLInputElement>

    const errorElemRef = useRef() as RefObject<HTMLDivElement>

    const validate = (obj: object)=>Joi.object({
        firstName: Joi.string().required().error(()=>Error("enter a valid first name")),
        lastName: Joi.string().required().error(()=>Error("enter a valid last name")),
        email: Joi.string().required().error(()=>Error("enter a valid email address")),
        tel: Joi.string().regex(/^\+?[1-9][0-9]{7,14}$/).error(()=>Error("enter a valid telephone"))
    }).validate(obj)

    function showError(msg: string){
        errorElemRef.current!.innerHTML = msg
        errorElemRef.current!.style.display = "inline-block"
        setTimeout(()=>{
            errorElemRef.current!.innerHTML =""
            errorElemRef.current!.style.display = "none"
        }, 5000)
    }

    function handleSubmit(e: any){
        e.preventDefault()
        const firstName = firstNameRef.current!.value
        const lastName = firstNameRef.current!.value
        const email = emailRef.current!.value
        const tel = telRef.current!.value

        const obj = {firstName, lastName, email, tel}

        const valRes = validate(obj)
        if(valRes.error){
            showError(valRes.error.message)
            return
        }
        props.handleCreateNewPin({...obj, coord: props.coord})
        
    }

    return <form action="" id="new-pin" className="new-pin">
        <div ref={errorElemRef} className="error"></div>
        <p>Add customer info to pin location</p>
        <label htmlFor="firstName" >first name</label>
        <input ref={firstNameRef} name="firstName" required />
        <label htmlFor="lastName" >last name</label>
        <input ref={lastNameRef} name="lastName" required />
        <label htmlFor="email" >email</label>
        <input ref={emailRef} name="email" required />
        <label htmlFor="tel" >Tel</label>
        <input ref={telRef} name="tel" required />
        <button onClick={(e)=>handleSubmit(e)} >pin location</button>
    </form>
}

export default NewPin