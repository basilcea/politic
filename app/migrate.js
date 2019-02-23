import { Pool } from 'pg';
import dotenv from 'dotenv';
import redis from 'redis';
import { execFile } from 'child_process';
import mailgun from 'mailgun-js'

dotenv.config();

execFile('redis/redis-server.exe',(error,stdout)=>{
  if(error){
    throw error
  }
  console.log(stdout)
})

export const mailer = new mailgun({
  apiKey: process.env.API_KEY,
  domain: process.env.EMAIL_DOMAIN
  
})
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE : process.env.DATABASE_URL,
  ssl: false,
});

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database Connection Successful.');
  })
  .catch((error) => {
    console.log('Database Connection Failed.', error);
  });

export const redisClient = redis.createClient()
redisClient.on('connect',()=>{
  console.log('Token blacklisting activated.')
});
redisClient.on('error', (error)=>{
  console.log('Redis not connected.', error)
});



export default pool;
