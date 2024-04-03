var express = require("express")
const path = require('path');
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:admin@localhost:5432/Todo");
var cors = require('cors')
const bodyParser = require('body-parser');

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
    return res.status(400).json({ error: 'Benutzername und Passwort sind erforderlich' });
  }

  db.oneOrNone('SELECT user_id, username, password, firstname, lastname FROM users WHERE username = $1', [username])
    .then((user) => {
      if (user) {
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        if (hashedPassword === user.password) {
          delete user.password; 
          res.status(200).json({ authenticated: true, user });
        } else {
          res.status(200).json({ authenticated: false });
        }
      } else {
        res.status(404).json({ message: 'Benutzer nicht gefunden' });
      }
    })
    .catch((error) => {
      console.error('Fehler bei der Benutzersuche:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
    });
});

app.post('/users/:user_id/todos', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const { text } = req.body;

  if (!userId) {
      return res.status(404).json({ error: 'User not Found' });
  }
  if (!text) {
      return res.status(400).json({ error: 'Textfield should not be empty' });
  }

  db.none('INSERT INTO todos(user_id, todo) VALUES($1, $2)', [userId, text])
    .then(() => {
      res.status(201).json({ message: 'Neues ToDo hinzugefügt', todo: { text } });
    })
    .catch((error) => {
      console.error('Error adding todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.delete('/users/:user_id/todos', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const { text } = req.body;

  if (!userId) {
      return res.status(404).json({ error: 'User not Found' });
  }
  if (!text) {
      return res.status(400).json({ error: 'Textfield should not be empty' });
  }

  db.none('INSERT INTO todos(user_id, todo) VALUES($1, $2)', [userId, text])
    .then(() => {
      res.status(201).json({ message: 'Neues ToDo hinzugefügt', todo: { text } });
    })
    .catch((error) => {
      console.error('Error adding todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
