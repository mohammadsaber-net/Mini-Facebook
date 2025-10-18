import express from "express"
import { protect } from "../middleware/authentication.js"
import { addUserStory, getStory } from "../controller/storyController.js"
const storyRouter=express.Router()
storyRouter.post("/create",protect,addUserStory)
storyRouter.post("/create",protect,getStory)
export default storyRouter