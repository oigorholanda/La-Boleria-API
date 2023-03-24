import { db } from "../database/database.js";

export async function postClient(req, res) {
   const { name, address, phone } = req.body;

   try {
      await db.query(`
      INSERT INTO clients (name, address, phone)
      VALUES ($1, $2, $3);
      `, [name, address, phone]
      );

      res.sendStatus(201);
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
