const { authRouter } = require("./auth.routes");
const { resetPasswordRouter } = require("./reset-password.routes");
const { userRouter } = require("./user.routes");

module.exports = {
  authRouter,
  userRouter,
  resetPasswordRouter,
};
