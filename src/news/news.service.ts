import constants from "../constant";
import News from "./news.model";

const save = async (news: any, session: any) => {
  if (session) {
    return await news.save({ session });
  } else {
    return await news.save();
  }
};

const findById = async (id: string) => {
  return await News.findById(id).populate("addedBy");
};

//get all news status active and sort by createdAt desc order and populate addedBy field in addedBy object contains user details from user details get organization details
const findAllActiveNews = async () => {
  return await News.find({ status: constants.WELLKNOWNSTATUS.ACTIVE })
    .sort({ createdAt: -1 })
    .populate({
      path: "addedBy",
      populate: {
        path: "organization",
      },
    });
};

//gell active related to added by user
const findAllActiveNewsByAddedUser = async (userId: string) => {
  return await News.find({
    status: constants.WELLKNOWNSTATUS.ACTIVE,
    addedBy: userId,
  })
    .populate({
      path: "addedBy",
      populate: {
        path: "organization",
      },
    })
    .sort({ createdAt: -1 });
};

export default {
  save,
  findById,
  findAllActiveNews,
  findAllActiveNewsByAddedUser,
};
