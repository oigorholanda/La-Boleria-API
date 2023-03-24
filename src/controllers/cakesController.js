import { db } from "../database/database.js";

export async function postCake(req, res) {
   const { name, price, image, description } = req.body;

   try {
      const duplicateCake = await db.query('SELECT id FROM cakes WHERE "name" = $1', [name]);
      if (duplicateCake.rowCount !== 0) return res.status(409).send('Nome já cadastrado, por favor escolha outro');

      await db.query(`
      INSERT INTO cakes (name, price, image, description)
      VALUES ($1, $2, $3, $4);
      `, [name, price, image, description]
      );

      res.sendStatus(201);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

export async function getCakes(req, res) {
   try {
      const data = await db.query(`SELECT * FROM cakes`);
      res.status(201).send(data.rows);
   } catch (error) {
      res.status(500).send(`Internal Server Error! ${error.message}`);
   }
}

// query para retornar o nome das colunas da tabela
// db.query(`
//       SELECT column_name, data_type, character_maximum_length
//       FROM information_schema.columns
//       WHERE table_name = 'cakes'
//       `);
