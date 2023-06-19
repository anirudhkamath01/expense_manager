const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const con = require("./db/connection.js");

app.use(require("./routes/route"));

con
  .then((db) => {
    if (!db) return process.exit(1);

    //listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port:http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server: ${err}`)
    );
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
