import schedule from "node-schedule";

//cron job helper function
export const cronJob = (cronTime: string, callback: () => void) => {
  schedule.scheduleJob(cronTime, callback);
};

//cron job to send appointment reminders daily at 6 am
const sendAppointmentReminders = () => {
  const job = schedule.scheduleJob("0 6 * * *", function () {
    console.log("Cron job executed daily at 6 am:", new Date());
  });
};

export { sendAppointmentReminders };
