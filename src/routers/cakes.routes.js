import { Router } from "express";
import { getCakes, postCake } from "../controllers/cakesController.js";

const cakesRouter = Router();

cakesRouter.post('/cakes', postCake)
cakesRouter.get('/cakes', getCakes)

export default cakesRouter;