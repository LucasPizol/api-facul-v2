const { UnauthorizedException } = require("../routes/responses");
const { jwtService } = require("../services/JWT");

const ensureAuthentication = (req, res, next) => {
  try {
    const conflict = new UnauthorizedException("Unauthorized").handle();

    const header = req.headers.authorization;
    if (!header) return res.status(401).json(conflict);

    const [, token] = header.split("Bearer ");

    if (!token) return res.status(401).json(conflict);

    const user = jwtService.decode(token);

    if (!user) return res.status(401).json(conflict);

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      body: error.message,
      type: "uncaught_exception",
    });
  }
};

module.exports = { ensureAuthentication };
