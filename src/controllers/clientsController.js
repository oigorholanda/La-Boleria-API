import { db } from "../database/database.js";

export async function postClient(req, res) {
   const { name, address, phone } = req.body;

   try {
      await db.query(
         `
      INSERT INTO clients (name, address, phone)
      VALUES ($1, $2, $3);
      `,
         [name, address, phone]
      );

      res.sendStatus(201);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function getClients(req, res) {
   try {
      const data = await db.query(`SELECT * FROM clients`);
      res.status(201).send(data.rows);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function getClientsById(req, res) {
   const { id } = req.params;

   try {
      const clientExists = await db.query('SELECT id FROM clients WHERE "id" = $1', [clientId]);
      if (clientExists.rowCount === 0) return res.status(404).send("Cliente não encontrado");

      const data = await db.query(`
      SELECT  o.id,
            o."createdAt",
            o.quantity, 
            o."totalPrice",
            o."isDelivered",
            c.name "cakeName"
      FROM clients cl 
      JOIN orders o ON o."clientid" = cl.id
      JOIN cakes c ON c.id = o."cakeId"
      WHERE cl.id = $1;
      `, [id]);

      res.status(200).send(data.rows);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}
