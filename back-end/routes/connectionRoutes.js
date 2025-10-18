import express from "express"
import { protect } from "../middleware/authentication.js"
import { acceptConnectionRequest, getUserConnections, sendConnectionRequest } from "../controller/connectionControler.js"
const connectionRouter=express.Router()
connectionRouter.post("/send",protect,sendConnectionRequest)
connectionRouter.get("/connections",protect,getUserConnections)
connectionRouter.post("/accept",protect,acceptConnectionRequest)
export default connectionRouter