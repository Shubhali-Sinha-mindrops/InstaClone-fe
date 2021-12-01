const express = require("express");
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');

dotenv.config({path: './config/config.env'});
require('./db/conn'); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", require('./routes/authentication'));
app.use(require('./routes/user'));

app.use(require('./routes/common'));


const port = process.env.PORT;

const middleware = (req, res, next) => {
  console.log(`This is a middleware`);
  next();
};

app.get("/about", middleware, (req, res) => {
  res.send("This is the about page");
});

app.get("/contact", (req, res) => {
  res.send("This is the contact page");
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
