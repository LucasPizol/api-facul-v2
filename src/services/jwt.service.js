require("dotenv").config();
const jwt = require("jsonwebtoken");

class JWTService {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
  }

  decode(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = {
  jwtService: new JWTService(),
};
