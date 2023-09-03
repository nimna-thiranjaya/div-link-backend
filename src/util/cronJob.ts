import schedule from "node-schedule";
import { sendEmail } from "./emailServer";

//cron job helper fun
export const cronJob = (cronTime: string, callback: () => void) => {
  schedule.scheduleJob(cronTime, callback);
};

//send appointment reminders daily at 6 am
const sendAppointmentReminders = () => {
  cronJob("0 6 * * *", () => {
    console.log("Cron job executed daily at 6 am:", async () => {
      await sendEmail(
        "lavanpasindu123@gmail.com",
        "Appointment Reminder",
        `<h1>Appointment Reminder last</h1>`,
        null
      );
    });
  });
};

export { sendAppointmentReminders };
