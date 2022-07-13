const express = require("express");
const router = require("./routes");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.get("/", async (req, res) => {
  res.status(200).json({
    status: "SELAMAT DATANG",
  });
});

app.listen(PORT, () => console.log(`Listening to ${PORT}`));
