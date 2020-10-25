// main
const express = require("express");
const db = require("./db");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3500;
// third party
const cookieParser = require("cookie-parser");
const cors = require("cors");
// custom
const { handleToken } = require("./middlewares");

db.connect().then((response) => {
  if (response.connection) {
    const { name, host } = response.connection;
    console.log(`connected to Mongo Atlas Host: ${host}`);
    console.log(`connected to Database: ${name}`);
    app.listen(port);
    console.log(`Using Port : ${port}`);

    if (process.env.NODE_ENV === "development") {
      app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    }
    app.use(express.json());
    app.use(cookieParser());

    app.use(handleToken);
    app.use(routes);
  } else {
    console.log(`Error connecting to database`);
    console.log(`ERROR CODE: ${response.code}`);
  }
});
