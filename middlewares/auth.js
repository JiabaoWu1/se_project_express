const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");

const token = authorization.replace("Bearer ", "");
let payload;
