const { Client } = require('pg')
const Config = require("./config");

const client = new Client({
  user: Config.db.DB_USER,
  host: Config.db.DB_HOST,
  database: Config.db.DB_NAME,
  password: Config.db.DB_PASS,
  port: Config.db.DB_PORT,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client;
