const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

db.select('*').from('users').then(data=>{
  console.log(data);
});

app.get('/', (req, res)=>{
  res.json(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/', (req, res) => { res.json(database.users) })

app.get('/profile/:id', (req, res)=>{ profile.handleProfile(req, res, db) })

app.put('/image', (req, res)=>{image.imageHandler(req, res, db)})

app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})
{/**
  bcrypt.hash(password, null, null, function(err, hash) {
      console.log(hash);
  });
  **/}

// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

app.listen(3000, ()=>{
  console.log('app is running on port 3000');
});
