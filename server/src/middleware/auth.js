const jwt = require("jsonwebtoken");
const sceretKey="abcdefghijk";
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authentication"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, sceretKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;