import User from "./user.model";

const save = async (user: any, session: any) => {
  return await user.save({ session });
};

const findByEmail = async (email: string, session: any) => {
  if (session) {
    return await User.findOne({ email: email }).session(session);
  } else {
    return await User.findOne({ email: email });
  }
};

export default { save, findByEmail };
