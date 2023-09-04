import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import {
  CreateAppointment,
  GetAvailableSlots,
  GetAllAppointments,
  ApproveOrRejectAppointment,
  UpdateAppointment,
} from "./appointment.controller";

const AppointmentRouter = Router();

AppointmentRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  CreateAppointment
);

AppointmentRouter.get("/getAvailableSlots", GetAvailableSlots);

AppointmentRouter.get(
  "/getAppointments",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  GetAllAppointments
);

AppointmentRouter.put(
  "/approveReject/:appointmentId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  ApproveOrRejectAppointment
);

AppointmentRouter.put(
  "/update/:appointmentId",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  UpdateAppointment
);
export default AppointmentRouter;
