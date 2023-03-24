import dayjs from "dayjs";
import { db } from "../database/database.js";

export async function postOrder(req, res) {
   const { clientId, cakeId, quantity, totalPrice } = req.body;

   try {
    const clientExists = await db.query('SELECT id FROM clients WHERE "id" = $1', [clientId]);
    if (clientExists.rowCount === 0) return res.status(404).send('Cliente não encontrado');

    const cakeExists = await db.query('SELECT id FROM cakes WHERE "id" = $1', [cakeId]);
    if (cakeExists.rowCount === 0) return res.status(404).send('Produto não encontrado');

    const createdAt = dayjs().format();

    await db.query('INSERT INTO orders ("clientid", "cakeid", "quantity", "totalprice", "createdat") VALUES ($1, $2, $3, $4, $5)', [clientId, cakeId, quantity, totalPrice, createdAt]);

    return res.sendStatus(201);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function getOrders(req, res) {
    const { date } = req.query;

    let query = `
    SELECT o.id, o."createdat", o.quantity, o."totalprice", o."isdelivered",
      json_build_object(
        'id', cl.id,
        'name', cl.name, 
        'address', cl.address, 
        'phone', cl.phone) AS client,
      json_build_object(
        'id', c.id,
        'name', c.name, 
        'price', c.price,
        'description', c.description, 
        'image', c.image
        ) AS cake
      FROM orders o
      INNER JOIN clients cl on o.clientid = cl.id
      INNER JOIN cakes c on o.cakeid = c.id
    `

   try {
    if (date) {
        const data = await db.query(`
          ${query}
          WHERE o."createdAt"::date = DATE($1)`,
          [date]
        );
        res.status(200).send(data.rows);
      } else {
        const data = await db.query(query);
        res.status(200).send(data.rows);
      }
      
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function getOrdersById(req, res) {
    const { id } = req.params;

    let query = `
    SELECT o.id, o."createdat", o.quantity, o."totalprice", o."isdelivered",
      json_build_object(
        'id', cl.id,
        'name', cl.name, 
        'address', cl.address, 
        'phone', cl.phone) AS client,
      json_build_object(
        'id', c.id,
        'name', c.name, 
        'price', c.price,
        'description', c.description, 
        'image', c.image
        ) AS cake
      FROM orders o
      INNER JOIN clients cl on o.clientid = cl.id
      INNER JOIN cakes c on o.cakeid = c.id
    `

   try {
    if (id) {
        const data = await db.query(`
          ${query}
          WHERE o.id = $1`,
          [id]
        );
        res.status(200).send(data.rows);
      } else {
        
        res.status(404).send('Informe o ID!');
      }
      
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function updateOrder(req, res) {
  const { id } = req.params;
  
  try {
    if (id) {
      const orderExists = await db.query('SELECT id FROM orders WHERE "id" = $1', [id]);
      if (orderExists.rowCount === 0) return res.status(404).send('Pedido não encontrado');

      await db.query(`UPDATE orders SET "isdelivered" = true WHERE id =$1`, [id]);
      
      res.status(204).send('Pedido entregue');

    } else {
      res.status(400).send('Informe o ID do pedido!');
    }
  } catch (error) {
     res.status(500).send(`Internal Server Error! ${error.message}`);
  }
}