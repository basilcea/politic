
import express from 'express';
import bodyParser from 'body-parser';
import router from './route';


const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api/v1', router);
server.get('/', function(req,res){
  res.status(200)
  res.json('This is the default route')
  })
server.all('*', function(req,res){
  res.status(404)
  res.json({ status:404, title:"Not Found", Msg: 'Route Not Found'})
  })

const PORT = process.env.PORT || 3000;
const app = server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});


export default app;



