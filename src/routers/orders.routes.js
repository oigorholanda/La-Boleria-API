import { Router } from "express";
import { getOrders, getOrdersById, postOrder, updateOrder } from "../controllers/ordersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { orderSchema } from "../schemas/orderSchema.js";

const ordersRouter = Router();

ordersRouter.post('/order', validateSchema(orderSchema), postOrder)
ordersRouter.get('/orders', getOrders)
ordersRouter.get('/orders/:id', getOrdersById)
ordersRouter.patch('/order/:id', updateOrder)

export default ordersRouter;