const { UnauthorizedException, ForbiddenException } = require("../routes/responses");

const ensureAuthorization = (req, res, next) => {
  try {
    const { user } = req;

    if (!user)
      return res
        .status(401)
        .json(new UnauthorizedException("Unauthorized").handle());

    if (user.role !== 1) {
      return res
        .status(401)
        .json(
          new ForbiddenException(
            "You're not authorized to access this route"
          ).handle()
        );
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      body: error.message,
      type: "uncaught_exception",
    });
  }
};

module.exports = { ensureAuthorization };
