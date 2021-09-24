const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("THE SERVER HAS STARTED");
});
