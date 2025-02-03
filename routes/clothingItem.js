const { createItem } = require("../controllers/clothingItem");

router.post("/", createItem);

module.exports = router;

const router = require("express").Router();

const {
  createClothingItem,
  getAllClothingItems,
  deleteClothingItem,
} = require("../controllers/clothingItem");

// Create //
router.post("/", createClothingItem);
// Read //
router.get("/", getAllClothingItems);
// Delete //
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
