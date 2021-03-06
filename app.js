const express = require("express");
const cors = require("cors");
const routerAPI = require("./routes/");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const whitelist = ["https://wallet-alkemy.vercel.app", "http://localhost:3001"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Access Denied"));
    }
  },
};

app.use(cors(options));
app.use(express.json());

routerAPI(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
