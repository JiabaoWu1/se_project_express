const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// protect routes
router.use(auth);
// protected routes:
// get user
router.get("/me", getCurrentUser);
// update user
router.patch("/me", updateCurrentUser);

module.exports = router;
