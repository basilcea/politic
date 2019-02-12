import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE : process.env.DATABASE_URL,
  ssl: false,
});

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Connection Successful.');
  })
  .catch((error) => {
    console.log('Connection Not Successful.', error);
  });


export default pool;
