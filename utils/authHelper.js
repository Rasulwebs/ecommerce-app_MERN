import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const seltRounds = 10;
    const hashedPAssword = await bcrypt.hash(password, seltRounds);
    return hashedPAssword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPAssword) => {
  return bcrypt.compare(password, hashedPAssword);
};
