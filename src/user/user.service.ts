import User from "./user.model";

const save = async (user: any, session: any) => {
  return await user.save({ session });
};

const findByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};

const findById = async (id: string) => {
  return await User.findById(id).populate("organization");
};

export default { save, findByEmail, findById };
