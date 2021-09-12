const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '6102075b',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

  // DB queries
  // SELECT * from candidates
  db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  });

  // GET a single candidate with the id = 1
  db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
      if (err) {
          console.log(err);
      }
      console.log(row);
  });

  // Delete a candidate
  db.query(`DELETE FROM candidates WHERE id = ?`, 1 , (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
  })

  // Create a candidate
  const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
  VALUES (?,?,?,?)`;
  const params = [1,'RONALD', 'FIRBANK', 1];

  db.query(sql, params, (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});