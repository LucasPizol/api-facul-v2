const jwt = require("jsonwebtoken");
const env = require("../main/env");

class JWTService {
  sign(payload, options, secret = env.jwt.secret) {
    return jwt.sign(payload, secret, options);
  }

  decode(token, secret = env.jwt.secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = {
  jwtService: new JWTService(),
};
