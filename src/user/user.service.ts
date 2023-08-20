const save = async (user: any, session: any) => {
  return await user.save({ session });
};

export default { save };
