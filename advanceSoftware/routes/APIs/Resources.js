const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'advance'
});

connection.connect();

app.use(bodyParser.json());

// CREATE operation
app.post('/', (req, res) => {
  const { user_id, material_name, quantity, availability_status } = req.body;
  const sql = `INSERT INTO resource_sharing (user_id, material_name, quantity, availability_status) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [user_id, material_name, quantity, availability_status], (err, result) => {
    if (err) {
      console.error('Error inserting resource:', err);
      res.status(500).send('Error inserting resource');
    } else {
      console.log('Resource inserted successfully');c
      res.status(201).send('Resource inserted successfully');
    }
  });
});

// READ operation
app.get('/:resource_id', (req, res) => {
  const resourceId = req.params.resource_id;
  const sql = `SELECT * FROM resource_sharing WHERE resource_id = ?`;
  connection.query(sql, [resourceId], (err, result) => {
    if (err) {
      console.error('Error retrieving resource:', err);
      res.status(500).send('Error retrieving resource');
    } else {
      if (result.length === 0) {
        res.status(404).send('Resource not found');
      } else {
        res.json(result[0]);
      }
    }
  });
});

// UPDATE operation
app.put('/:resource_id', (req, res) => {
  const resourceId = req.params.resource_id;
  const { user_id, material_name, quantity, availability_status } = req.body;
  const sql = `UPDATE resource_sharing SET user_id = ?, material_name = ?, quantity = ?, availability_status = ? WHERE resource_id = ?`;
  connection.query(sql, [user_id, material_name, quantity, availability_status, resourceId], (err, result) => {
    if (err) {
      console.error('Error updating resource:', err);
      res.status(500).send('Error updating resource');
    } else {
      console.log('Resource updated successfully');
      res.status(200).send('Resource updated successfully');
    }
  });
});

// DELETE operation
app.delete('/:resource_id', (req, res) => {
  const resourceId = req.params.resource_id;
  const sql = `DELETE FROM resource_sharing WHERE resource_id = ?`;
  connection.query(sql, [resourceId], (err, result) => {
    if (err) {
      console.error('Error deleting resource:', err);
      res.status(500).send('Error deleting resource');
    } else {
      console.log('Resource deleted successfully');
      res.status(200).send('Resource deleted successfully');
    }
  });
});

module.exports = app;