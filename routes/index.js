const router = require("express").Router();
const userRouter = require("./users");

router.use("/items", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
