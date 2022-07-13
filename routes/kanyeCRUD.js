const express = require("express");
const router = express.Router();
const {
  getQuote,
  getAllQuotes,
  postQuotes,
  putQuotes,
  deleteQuotes,
} = require("../controllers/kanye");

router.get("/getQuote", getQuote);
router.get("/quotes", getAllQuotes);
router.post("/quotes", postQuotes);
router.put("/quotes", putQuotes);
router.delete("/quotes", deleteQuotes);

module.exports = router;
