const User = require("../models/user");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  //hash the password
  bycrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))

    .then((user) => {
      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      };
      res.send(userWithoutPassword);
    })
    .catch((err) => {
      console.error("User creation error", err);
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ messaege: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Email already exists" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK).send(user))

    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK).send({ token });
    })
    .catch((error) => {
      console.error(error);
      console.log(error.name);
      return res.status(UNAUTH_ERROR).send({ message: error.message });
    });
};

module.exports = { getUsers, createUser, getUser, login };
