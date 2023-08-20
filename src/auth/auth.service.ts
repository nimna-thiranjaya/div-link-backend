import Auth from "./auth.model";

const save = async (auth: any, session: any) => {
  return await auth.save({ session });
};

const findById = async (id: string, session: any) => {
  if (session) {
    return await Auth.findById(id).session(session);
  } else {
    return await Auth.findById(id);
  }
};

export default { save, findById };
