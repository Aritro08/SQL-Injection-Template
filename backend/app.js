const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userdb'
});

db.connect(err => {
  if(err) {
    console.log(err);
  } else {
    console.log('DB connected');
  }
});

// db.query('CREATE DATABASE UserDB', err => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('DB created');
//   }
// });

// db.query('CREATE TABLE user(username VARCHAR(100), password VARCHAR(100))', err => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Table created');
//   }
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.post('/sign-up', (req, res) => {
  let query = `INSERT INTO user VALUES ('${req.body.username}', '${req.body.password}')`;
  db.query(query, err => {
    if(err) {
      console.log(err);
    } else {
      console.log('User added');
      res.json({
        message: 'New user added'
      });
    }
  });
});

app.post('/login', (req, res) => {
  let query = `SELECT * from user WHERE username='${req.body.username}'`;
  db.query(query, (err, results) => {
    if(err) {
      console.log(err);
    } else {
      if(results[0].password == req.body.password) {
        console.log('Authenticated');
        res.json({
          message: 'Successful Login'
        });
      } else {
        console.log('Not authenticated');
        res.json({
          message: 'Wrong username or password'
        });
      }
    }
  });
});

module.exports = app;
