import Category from "./category.model";

const save = async (category: any, session: any) => {
  if (session) {
    return await category.save({ session });
  } else {
    return await category.save();
  }
};

const findById = async (id: string) => {
  return await Category.findById(id);
};

export default { save, findById };
