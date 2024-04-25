import { Router } from "express";
import { createUser, deleteUser, getUsers } from "./controller";
const router = Router()

router.get("/", getUsers)
router.post("/", createUser)
router.delete("/:id", deleteUser)

export default router