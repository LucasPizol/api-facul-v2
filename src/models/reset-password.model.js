const env = require("../main/env");
const { awsService } = require("../services/aws.service");
const { bcryptService } = require("../services/bcrypt.service");
const { jwtService } = require("../services/jwt.service");
const { formatPhone } = require("../utils/format-phone");
const { User } = require("./user.model");

class ResetPassword {
  async new(phone) {
    const randomCodeOf6Digits = Math.floor(100000 + Math.random() * 900000);

    const formattedPhone = formatPhone(phone);

    const user = await User.findByPhone(formattedPhone);

    if (!user) return null;

    await awsService.sendSMS(
      `Hello, ${user.name}

You are receiving this message due to a request to reset your password.

Your code is: ${randomCodeOf6Digits}

If you didn't request this, please ignore this message.`,
      formattedPhone
    );

    const hashedCode = await bcryptService.hash(String(randomCodeOf6Digits));

    const token = jwtService.sign(
      { code: hashedCode, phone: formattedPhone, id: user.id },
      { expiresIn: "15m" },
      env.jwt.resetPasswordSecret
    );

    return { token };
  }

  async attempt(decodedToken, code, newPassword) {
    const { phone, code: hashedCode, id } = decodedToken;

    const user = await User.findByPhone(phone);

    if (!user) return false;
    if (user.id !== id) return false;

    const isValidCode = await bcryptService.compare(String(code), hashedCode);
    if (!isValidCode) return false;

    const newHashedPassword = await bcryptService.hash(newPassword);

    await User.updateById(user.id, { password: newHashedPassword });

    return true;
  }
}

module.exports = { ResetPassword: new ResetPassword() };
