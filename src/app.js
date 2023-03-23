import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cakesRouter from "./routers/cakes.routes.js";
import clientsRouter from "./routers/clients.routes.js";
import ordersRouter from "./routers/orders.routes.js";
dotenv.config();

// servidor
const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use([cakesRouter, clientsRouter, ordersRouter])

// porta e listen
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
