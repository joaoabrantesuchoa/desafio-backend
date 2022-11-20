const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");

const url = config.bd_string;
const options = { useNewUrlParser: true };

mongoose.connect(url, options);

mongoose.connection.on("error", (err) => {
  console.log("Erro na conexão com o banco de dados: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Aplicação desconectada do banco de dados!");
});

mongoose.connection.on("connected", () => {
  console.log("Aplicação conectada ao banco de dados!");
});


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({ extended: true} ));
app.use(bodyParser.json());

const userRoute = require("./routes/users");

app.use(userRoute);

app.listen(3001);
module.exports = app;
