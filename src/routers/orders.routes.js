import { Router } from "express";
import { getOrders, getOrdersById, postOrder } from "../controllers/ordersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { orderSchema } from "../schemas/orderSchema.js";

const ordersRouter = Router();

ordersRouter.post('/order', validateSchema(orderSchema), postOrder)
ordersRouter.get('/orders', getOrders)
ordersRouter.get('/orders/:id', getOrdersById)

export default ordersRouter;