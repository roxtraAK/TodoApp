var express = require("express")
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

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.none('INSERT INTO users(firstname, lastname, email, phonenumber, username, password) VALUES($1, $2, $3, $4, $5, $6)', [firstname, lastname, email, phonenumber, username, password])
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post("/auth", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  db.oneOrNone('SELECT username, password FROM users WHERE username = $1 AND password = $2', [username, password])
    .then((user) => {
      if (user) {
        res.status(200).json({ message: 'User found', user });
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
