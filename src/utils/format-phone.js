const formatPhone = (phone) => {
  const phoneWithoutChars = phone.replace(/\D/g, "");

  if (phoneWithoutChars.length === 13) return "+" + phoneWithoutChars;

  if (phoneWithoutChars.length === 11) return "+55" + phoneWithoutChars;

  if (phoneWithoutChars.length === 10)
    return (
      "+55" +
      phoneWithoutChars.substring(0, 2) +
      "9" +
      phoneWithoutChars.substring(2)
    );

  throw new Error("Invalid phone number");
};

module.exports = { formatPhone };
