import { Router } from "express";
import { getCakes, postCake } from "../controllers/cakesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { cakeSchema } from "../schemas/cakeSchema.js";

const cakesRouter = Router();

cakesRouter.post('/cakes', validateSchema(cakeSchema), postCake)
cakesRouter.get('/cakes', getCakes)

export default cakesRouter;