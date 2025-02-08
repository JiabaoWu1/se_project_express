const router = require("express").Router(); // import the express package
const userRouter = require("./users"); // import the users router
const itemRouter = require("./clothingItem");
const { NOT_FOUND } = require("../utils/errors"); // import the error message
const { login, createUser } = require("../controllers/users"); // import the login and createUser functions

// authentication routes
router.post("/signin", login);
router.post("/signup", createUser);

// allows to register handlers for different routes
router.use("/users", userRouter); // register users router
router.use("/items", itemRouter); // item router

// middleware to handle an unknown route
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
