const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello Hell");
});
app.use("", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log("We're on port 8080!");
});
