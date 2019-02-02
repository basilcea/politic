import express from 'express';
import bodyParser from 'body-parser';
import router from './route';

const server = express();

server.use(express.json())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api/v1', router);
<<<<<<< HEAD

<<<<<<< HEAD
const PORT = 3000;
=======
server.get('/', function(req,res){
  res.status(200)
  res.json('This is the default route')
  })
server.all('*', function(req,res){
  res.status(404)
  res.json({ status:404, title:"Not Found", Msg: 'Route Not Found'})
  })

const PORT = process.env.PORT || 3000;
>>>>>>> 2ffd4e67b9b936273f22bf5cc07d345319d155cc
=======
const PORT = process.env.PORT || 3000;
>>>>>>> ch-host-on-heroku-163393885
const app = server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
