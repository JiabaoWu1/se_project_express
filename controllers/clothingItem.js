const ClothingItem = require("../models/clothingItem");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  SERVER_ERROR,
} = require("../utils/errors");

const createClothingItem = (req, res) => {
  console.log(req);

  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Error creating item" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error from item" });
    });
};

const getAllClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({ message: "Error from getItems" });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(userId)) {
        res
          .status(FORBIDDEN)
          .send({ message: "Not authorized to delete card" });
      } else {
        ClothingItem.deleteOne(item)
          .then(() =>
            res.status(OK).send({ message: "Item deleted successfully" })
          )
          .catch((err) => {
            console.error(err);
            return res
              .status(SERVER_ERROR)
              .send({ message: "Error from server" });
          });
      }
    })
    .catch((err) => {
      // console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Error deleting item" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Invalid Id" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from deleteClothingItem" });
    });
};

const likeItem = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((updatedItems) => res.status(OK).send(updatedItems))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Invalid Id" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error from likeItem" });
    });
};

const dislikeItem = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((updatedItems) => res.status(OK).send(updatedItems))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Invalid Id" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from deleteItem" });
    });
};
module.exports = {
  createClothingItem,
  getAllClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
