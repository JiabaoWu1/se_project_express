const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/clothingItem", itemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
