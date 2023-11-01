import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_PRIVATE_KEY;

export const createJwtToken = async (data) => {
  const token = jwt.sign({ data: data }, secretKey, {
    algorithm: "HS256",
    expiresIn: 3600 * 24 * 7,
  });

  return token;
};

export const verifyJwtToken = async (token) => {
  const tokenVerified = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        throw new Error("session is over, login again");
      }

      if (err.message === "invalid signature") {
        throw new Error("Token provided is incorrect");
      }
    }

    return decoded;
  });

  return tokenVerified;
};
