import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './route';


const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api/v1', router);
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,x-access-token, Content-Type, Accept');
  next();
});

server.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: ['This is the default route'],
  });
});
server.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Route Not Found',
  });
});

const PORT = process.env.PORT || 8080;
const app = server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
