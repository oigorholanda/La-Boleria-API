import { Router } from "express";
import { getClients, postClient } from "../controllers/clientsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/clientsSchema.js";

const clientsRouter = Router();

clientsRouter.post('/clients', validateSchema(clientSchema), postClient)
clientsRouter.get('/clients', getClients)
clientsRouter.get('/clients/:id/orders',)

export default clientsRouter;