import { Router } from "express";
import { postOrder } from "../controllers/ordersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { orderSchema } from "../schemas/orderSchema.js";

const ordersRouter = Router();

ordersRouter.post('/order', validateSchema(orderSchema), postOrder)
ordersRouter.get('/orders',)
ordersRouter.get('/orders/:id',)

export default ordersRouter;