import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
  connectionString: process.env.postgresURL
});

client
  .connect()
  .then(() => {
    console.log('Connection Successful.');
  })
  .catch((error) => {
    console.log('Connection Not Successful.', error);
  });

export default client;