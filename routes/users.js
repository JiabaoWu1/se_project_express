const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", () => console.log("GET users by ID"));
router.post("/", createUser);
router.get("/:userId", getUser);
module.exports = router;
