const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const dropTable = `DROP TABLE IF EXISTS people`
connection.query(dropTable)

const createTable = `CREATE TABLE people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`
connection.query(createTable)

const insert = `INSERT INTO people(name) values('Renato'), ('Rodrigo'), ('Chinaglia'), ('Alicia s2')`
connection.query(insert)

connection.end()

app.get('/', (req, res) => {
  var message = '<h1>Full Cycle Rocks!</h1>'
  const connection = mysql.createConnection(config)
  connection.query('SELECT * FROM people', function (error, results, fields) {
    if (error) throw error;

    Object.keys(results).forEach(function(key) {
      var row = results[key];
      message = message + '<h2>' + row.name + '</h2>'
    });

    res.send(message)
  })
  connection.end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})