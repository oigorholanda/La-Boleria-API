import { db } from "../database/database.js";

export async function postOrder(req, res) {
   const { clientId, cakeId, quantity, totalPrice } = req.body;

   try {
    const clientExists = await db.query('SELECT id FROM clients WHERE "id" = $1', [clientId]);
    if (clientExists.rowCount !== 0) return res.sendStatus(404);

    const cakeExists = await db.query('SELECT id FROM cakes WHERE "id" = $1', [cakeId]);
    if (cakeExists.rowCount !== 0) return res.sendStatus(404);

    const createdAt = dayjs().format();

    await db.query('INSERT INTO orders ("clientid", "cakeid", "quantity", "totalprice", "createdat") VALUES ($1, $2, $3, $4, $5)', [clientId, cakeId, quantity, totalPrice, createdAt]);

    return res.sendStatus(201);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function getClients(req, res) {
    // const duplicateCake = await db.query('SELECT id FROM cakes WHERE "name" = $1', [name]);
    // if (duplicateCake.rowCount !== 0) return res.sendStatus(409);

   try {
      const data = await db.query(`SELECT * FROM clients`);
      res.status(201).send(data.rows);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

// query para retornar o nome das colunas da tabela
// db.query(`
//   SELECT column_name, data_type, character_maximum_length
//   FROM information_schema.columns
//   WHERE table_name = 'orders';
//   `);
