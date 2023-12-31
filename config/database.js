// Database Connector
const mongoose = require("mongoose");

const dbConnection = () => {
  // Database Connect
  const URI = process.env.DB_URI;
  mongoose
    .connect(URI)
    .then((conn) => {
      console.log(`Database Connected:${conn.connection.host}`);
    })
    // .catch((err) => {
    //   console.error(`Database Error: ${err}`);
    //   process.exit(1);
    // });
    
};

module.exports = dbConnection;
