const { ResetPassword } = require("../models/reset-password.model");
const {
  BadRequestException,
  Success,
  UnauthorizedException,
} = require("../routes/responses");

class ResetPasswordController {
  async resetPassword(req) {
    try {
      const { phone } = req.body;

      if (!phone) throw new BadRequestException("Phone is required");

      const result = await ResetPassword.new(phone);

      if (!result) throw new BadRequestException("Cannot send SMS");

      return new Success(result);
    } catch (error) {
      return error;
    }
  }

  async attempt(req) {
    try {
      const { code, password, decodedToken } = req.body;
      if (!code || !password)
        throw new BadRequestException("Code and password are required");

      if (!decodedToken) throw new UnauthorizedException("Unauthorized");

      const result = await ResetPassword.attempt(decodedToken, code, password);

      if (!result) throw new UnauthorizedException("Invalid code");

      return new Success("Password updated");
    } catch (error) {
      return error;
    }
  }
}

module.exports = { ResetPasswordController: new ResetPasswordController() };
