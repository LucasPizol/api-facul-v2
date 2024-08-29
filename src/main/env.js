require("dotenv").config();

const env = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    resetPasswordSecret: process.env.JWT_RESET_PASSWORD_KEY,
  },
  awsSdk: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  port: process.env.PORT,
};

const verifyEnv = () => {
  for (const key in env) {
    if (typeof env[key] === "object") {
      for (const subKey in env[key]) {
        if (!env[key][subKey]) {
          throw new Error(`Environment variable ${subKey} is missing`);
        }
      }
    }

    if (!env[key]) {
      throw new Error(`Environment variable ${key} is missing`);
    }
  }
};

verifyEnv();

module.exports = env;
