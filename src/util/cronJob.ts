import schedule from "node-schedule";

//cron job helper fun
export const cronJob = (cronTime: string, callback: () => void) => {
  schedule.scheduleJob(cronTime, callback);
};

//send appointment reminders daily at 6 am
const sendAppointmentReminders = () => {
  cronJob("0 6 * * *", () => {
    console.log("Cron job executed daily at 6 am:", new Date());
  });
};

export { sendAppointmentReminders };
