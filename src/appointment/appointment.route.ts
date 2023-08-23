import { Router } from "express";
import { CreateAppointment } from "./appointment.controller";

const AppointmentRouter = Router();

AppointmentRouter.post("/create", CreateAppointment);

export default AppointmentRouter;
