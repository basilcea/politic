/* eslint-disable no-plusplus */
/* eslint-disable func-names */
import pool from '../migrate';

const seed = async function (dbTable, dataArray) {
  const client = await pool.connect();
  try {
    const getTable = `SELECT table_name FROM information_schema.tables
    WHERE table_type='BASE TABLE'
    AND table_schema='public'
    AND table_catalog ='politico'`;
    const table = await client.query(getTable);
    for (let i = 0; i < table.rows.length; i++) {
      let columnName; let columnValue; let insert;
      const tableName = table.rows[i].table_name;
      if (tableName === dbTable) {
        for (let j = 0; j < dataArray.length; j++) {
          columnName = Object.keys(dataArray[0]);
          columnValue = Object.values(dataArray[j]);
          insert = `insert into ${tableName}(${columnName})
          values(${columnValue})`;
          await client.query(insert);
        }console.log('seeded');
      }
    }
    client.release();
  } catch (err) {
    console.log(err);
  }
};
export default seed;
