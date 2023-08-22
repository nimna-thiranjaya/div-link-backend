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

const findAll = async (session: any) => {
  if (session) {
    return await Organization.find().sort({ createdAt: 1 }).session(session);
  } else {
    return await Organization.find().sort({ createdAt: 1 });
  }
};
export default { save, findById, findAll };
