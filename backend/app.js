var express = require("express")

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:admin@localhost:5432/Todo");

const port = 3000

var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
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


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
