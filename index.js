/* MYSQL CONNECTION STUFF */
const mysql = require('mysql');
const connection = mysql.createConnection({
  user: 'root',
  password: 'Thug1Life',
  database: 'todoapp',
  host: 'localhost'
});
connection.connect((err)=>err?console.log("****"+err):"");

const express = require('express');
const app = express();

/*MIDDLEWARE */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

/* ROUTES */
app.use( express.static('frontend') );

app.get('/tasks', (req,res) => {
  connection.query('SELECT * FROM tasks', (err, rows)=>{
    if (err) res.end('error in get route for tasks');
    else res.json(rows);
  });
});

app.get('/tasks/:id', (req,res) => {
  connection.query(`SELECT * FROM tasks WHERE id='${req.query.id}'`,
  (err, rows)=>{
    if (err) res.end('error in get route for tasks');
    else res.json(rows);
  });
});

app.post('/tasks/:desc/:uid/:status', (req, res) =>{
  connection.query( `INSERT INTO tasks (description, uid, status)
        VALUES ('${req.params.desc}', '${req.params.uid}', '${req.params.status}')`,
        (err, dbres)=>{
          if (err) res.end('error in posting task route');
          else res.json(dbres);
        });
});

app.put('/tasks/:id/:newStatus', (req,res)=>{
  connection.query(`UPDATE tasks SET status='${req.params.newStatus}'
          WHERE id='${req.params.id}'`,
    (err, dbres) =>{
      if (err) res.end('error putting new status into db');
      else res.json(dbres);
  });
});

app.delete('/tasks/:id', (req,res) =>{
  connection.query(`DELETE FROM tasks WHERE id='${req.params.id}'`,
  (err,dbres)=>{
    if (err) res.end('error deleting task from DB');
    else res.json(dbres);
  });
});



var port = 9991;
app.listen(port, ()=> console.log("Server listening at port "+port));
