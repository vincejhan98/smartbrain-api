//curl http://169.254.169.254/latest/meta-data/public-ipv4
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'postgres',
    database : 'smartbrain'
  }
});


const app = express();

app.use( bodyParser.urlencoded( {
    extended: true
} ) );

app.use(bodyParser.json());
app.use(cors());


app.get('/', (request, response)=> {response.send('hello world')});

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt) });

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db)});

app.put('/image', (req, res) => { image.handleImage(req,res,db)});

app.post('/imageurl', (req, res) => { image.handleApiCall(req,res)});

//console.log(process.env);
//env variables for security and dynamic stuff

const PORT = process.env.PORT;
app.listen(PORT/*or 8081*/, ()=>{
    console.log('app is running on port ', PORT);
});
