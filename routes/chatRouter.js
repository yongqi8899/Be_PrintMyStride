import { Router } from "express";
import { createChat } from "../controllers/Chats.js";

const chatRouter = Router();

chatRouter.post("/", createChat);

export default chatRouter;
