const express = require("express");
const router = express.Router();
const kanyeCRUD = require("./kanyeCRUD");

router.use("/api/v1", kanyeCRUD);

module.exports = router;
