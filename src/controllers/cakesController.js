import { db } from "../database/database.js";

export async function postCake(req, res) {
    const {name, price, image, description} = req.body

    try {
      const data = await db.query(`
      INSERT INTO cakes (name, price, image, description)
      VALUES ($1, $2, $3, $4);
      `, [name, price, image, description])
      res.status(201).send(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error'); 
    }
}
export async function getCakes(req, res) {
    const {name, price, image, description} = req.body

    try {
      const data = await db.query(`SELECT * FROM cakes`)
      res.status(201).send(data.rows)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error'); 
    }
}

// query para saber o nome das colunas da tabela
// db.query(`
//       SELECT column_name, data_type, character_maximum_length 
//       FROM information_schema.columns 
//       WHERE table_name = 'cakes'
//       `);