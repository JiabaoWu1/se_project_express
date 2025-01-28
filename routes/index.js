const router = require("express").Router();
const userRouter = require("./users");
router.use("/user", userRouter);
module.exports = router;
