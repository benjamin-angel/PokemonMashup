const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
 


require("dotenv").config();

const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.options('*', cors());
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});
app.use('/', express.static('public'));
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })
// app.get("/", (req, res) => {
//   res.sendFile('./public/index.html', {root: __dirname});
// });

app.use("/api/v1", api);

module.exports = app;
