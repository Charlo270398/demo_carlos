const mongoose = require('mongoose');
  
const db = mongoose.connect(process.env.MONGO_DB_ENDPOINT, {useNewUrlParser: true, useUnifiedTopology: true});
const db_connection = mongoose.connection;

db_connection.on("connected", () => {
  console.log("DB connected");
});

db_connection.on("disconnected", () => {
  console.log("DB disconnected");
});

module.exports = {db_connection}