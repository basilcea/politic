import { Pool } from 'pg';
import dotenv from 'dotenv';
import redis from 'redis';
import { execFile } from 'child_process';
import nodemailer from 'nodemailer';

dotenv.config();

// if in development mode use redis file attached
if (process.env.NODE_ENV === 'development'){  
  execFile('redis/src/redis-server', (error, stdout) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

let mailConfig;
if (process.env.NODE_ENV === 'production') {
  mailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
} else {
  mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    requireTLS: true,
    secure: true,
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.TEST_PASSWORD,
    },
  };
}
export const mailer = nodemailer.createTransport(mailConfig);
// use ssl only in production mode
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_URL : process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production',
});

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database Connection Successful.');
  })
  .catch((error) => {
    console.log('Database Connection Failed.', error);
  });

// use redis from token blacklisting until token expires
export const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', () => {
  redisClient.LPUSH('token', 'null');
  console.log('Token blacklisting activated.');
});
redisClient.on('error', (error) => {
  console.log('Redis not connected.', error);
});


export default pool;
