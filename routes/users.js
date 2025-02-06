const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
} = require("../controllers/users");

module.exports = router;
