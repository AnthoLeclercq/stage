const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware pour parser les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const connectWithRetry = () => {
  db = mysql.createConnection({
    host: 'mysql',
    user: 'user',
    password: 'user',
    database: 'game'
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to MySQL');
    }
  });
};

connectWithRetry();

// Route POST pour gérer le formulaire
app.post('/process_form', (req, res) => {
  const pseudo = req.body.pseudo;
  
  // Insertion dans la base de données
  const sql = 'INSERT INTO player (pseudo) VALUES (?)';
  db.query(sql, [pseudo], (err, result) => {
      if (err)
          throw err;
    res.send('Pseudo enregistré : ' + pseudo);
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
