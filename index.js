
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "Mis9NTyhhq",
  password: "frgqlcHzGH",
  database: "Mis9NTyhhq",
  port: 3306
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// })

con.connect(function(err) {
    if (err) throw err;
    console.log("done")
  });

  app.set('port', process.env.port || port); // set express to use this port
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json()); // parse form data client
  app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
  app.use(fileUpload()); // configure fileupload

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  
  
  app.get('/customer', (req, res) => {
    con.query('SELECT * FROM customer', (err, rows, fields) => {
      if(!err) {
        res.send(rows);
      } else {
        res.json({status: 'error'});
      }
    });
  });
    app.get('/', (req, res) => {
      res.send("ok");
  });
  
  app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
  });
