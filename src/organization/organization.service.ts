import Organization from "./organization.model";

const save = async (org: any, session: any) => {
  return await org.save({ session });
};

const findById = async (id: string, session: any) => {
  if (session) {
    return await Organization.findById(id).session(session);
  } else {
    return await Organization.findById(id);
  }
};

export default { save, findById };
