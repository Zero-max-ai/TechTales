import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const isValidPassword = bcrypt.compareSync(password, hashedPassword);
  return isValidPassword;
};

export const parseCookie = (bearer: string) => {
  const equal = bearer.indexOf("=");
  const semi = bearer.indexOf(";");
  const userToken = bearer.substring(equal + 1, semi);
  return userToken;
};