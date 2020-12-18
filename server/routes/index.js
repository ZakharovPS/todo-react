var express = require('express');
var router = express.Router();
const mysql = require('mysql2')

const jsonParser = express.json()

let SELECT_TODOS = "select id, name, description, status from todolist"
let SELECT_TODO = "select id, name, description, status from todolist where id=?"
let CHANGE_STATUS = "update todolist set status=? where id=?"
let REMOVE_TODO = "delete from todolist where id=?"
let INSERT_TODO = "insert into todolist (name, description) values (?, ?)"
let UPDATE_TODO = "update todolist set name=?, description=? where id=?"


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todoajax",
})

router.get('/getAll', (req, res) => {
  connection.query(SELECT_TODOS,
    (err, results) => {
      if (err)
        return res.send(err)
      else
        return res.json({ data: results })
    })
})

router.get('/get/:id', jsonParser, (req, res) => {
  connection.query(SELECT_TODO, [req.params.id],
    (err, results) => {
      if (err)
        return res.json(err)
      if (results != '')
        return res.json({ data: results })
      else
        return res.status(404).json("No record found for id");
    })
})

router.put('/updateStatus/:id', jsonParser, (req, res) => {
  connection.query(CHANGE_STATUS, [req.body.status, req.params.id],
    (err, results) => {
      if (err)
        return res.send(err)
      else
        return res.send(results)
    })
})

router.put('/update/:id', jsonParser, (req, res) => {
  connection.query(UPDATE_TODO, [req.body.name, req.body.description, req.params.id],
    (err, results) => {
      if (err)
        return res.send(err)
      else
        return res.send(results)
    })
})

router.delete('/delete/:id', (req, res) => {
  connection.query(REMOVE_TODO, [req.params.id],
    (err, results) => {
      if (err)
        return res.send(err)
      else
        return res.send(results)
    })
})

router.post('/add', jsonParser, (req, res) => {
  connection.query(INSERT_TODO, [req.body.name, req.body.description],
    (err, results) => {
      if (err)
        return res.send(err)
      else
        return res.send(results);
    })
})

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
