import Job from "./job.model";
import constants from "../constant";

const save = async (job: any, session: any) => {
  return await job.save({ session });
};

const findAllJobs = async () => {
  return await Job.find({
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  })
    .populate("organization")
    .populate("type", "-createdAt -updatedAt -status")
    .sort({ createdAt: -1 });
};

const findAllJobsByAddedBy = async (addedBy: string) => {
  return await Job.find({
    addedBy: addedBy,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  })
    .populate("organization", "-createdAt -updatedAt -status")
    .populate("type", "-createdAt -updatedAt -status")
    .sort({ createdAt: -1 });
};

export default { save, findAllJobs, findAllJobsByAddedBy };
