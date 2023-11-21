const express = require('express');
const route = require('./route.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json()); // Untuk JSON
app.use(bodyParser.urlencoded({ extended: true })); // Untuk formulir

app.use(route);

app.listen(port, () => {
  console.log(`server running perfectly at port ${port}`);
});
