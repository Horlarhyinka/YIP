import { string } from "joi";
import mongoose from "mongoose";

interface UserSchema extends mongoose.Schema{
    firstName: string
    lastName: string
    email: string
    tel: string
    coord: {lng: number, lat: number}
}

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {type: String, required: true },
    lastName: {type: String, required: true},
    tel: {type: String, required: true},
    email: {type: String, required: true},
    coord: {
        lng: {type: Number, required: true},
        lat: {type: Number, required: true},
    }
})

export default mongoose.model("user", userSchema)