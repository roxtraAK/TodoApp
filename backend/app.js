var express = require("express")
const path = require('path');
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:admin@localhost:5432/Todo");
var cors = require('cors')
const bodyParser = require('body-parser');
const crypto = require('crypto');

const port = 3000
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/users", (req, res) => {
  const {firstname, lastname, email, phonenumber, username, password } = req.body;

  const hashPassword = (password) =>  {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  const hashedPassword = hashPassword(password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.none('INSERT INTO users(firstname, lastname, email, phonenumber, username, password) VALUES($1, $2, $3, $4, $5, $6)', [firstname, lastname, email, phonenumber, username, hashedPassword])
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

const crypto = require('crypto');

app.get("/auth", (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  db.oneOrNone('SELECT username, password, firstname, lastname FROM users WHERE username = $1 AND password = $2', [username, password])
    .then((user) => {
      if (user) { 
        // Vergleichen des gehashten Passworts aus der Datenbank mit dem gehashten Passwort des Benutzers
        if (user.password === hashedPassword) {
          res.status(200).json({ message: 'User authenticated', user });
        } else {
          res.status(401).json({ message: 'Unauthorized' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('error searching for user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
