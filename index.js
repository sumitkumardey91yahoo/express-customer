
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 5000;

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
  
  
  app.get('/customer', (req, res) => {
    con.query('SELECT * FROM customer', (err, rows, fields) => {
      if(!err) {
        res.send(rows);
      } else {
        res.json({status: 'error'});
      }
    });
  });
  
  
  app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
  });