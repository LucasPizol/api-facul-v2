const { UnauthorizedException } = require("../main/adapters/responses");
const env = require("../main/env");
const { jwtService } = require("../services/jwt.service");

const ensureResetPassword = (req, res, next) => {
  try {
    const conflict = new UnauthorizedException("Unauthorized").handle();

    const header = req.headers.authorization;
    if (!header) return res.status(401).json(conflict);

    const [, token] = header.split("Bearer ");

    if (!token) return res.status(401).json(conflict);

    const decodedToken = jwtService.decode(token, env.jwt.resetPasswordSecret);

    if (!decodedToken) return res.status(401).json(conflict);

    req.body = {
      ...req.body,
      decodedToken,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      body: error.message,
      type: "uncaught_exception",
    });
  }
};

module.exports = { ensureResetPassword };
