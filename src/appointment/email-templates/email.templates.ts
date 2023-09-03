export const newAppointmentAlertTemplate = (data: any) => {
  return `
        <div>
        <h1>Hi ${data.orgName},</h1>
        <p>You got new appointment</p>
        <p>Appointment Details:</p>
        <p>Date: ${data.appointmentDate}</p>
        <p>Time: ${data.appointmentTime}</p>
        </div>
    `;
};

export const appointmentApprovedTemplate = (data: any) => {
  return `
        <div>
        <h1>Hi ${data.userName},</h1>
        <p>Your appointment has been approved</p>
        <p>Appointment Details:</p>
        <p>Date: ${data.appointmentDate}</p>
        <p>Time: ${data.appointmentTime}</p>
        </div>
    `;
};

export const appointmentRejectedTemplate = (data: any) => {
  return `
            <div>
            <h1>Hi ${data.userName},</h1>
            <p>Your appointment has been rejected</p>
            <p>Appointment Details:</p>
            <p>Date: ${data.appointmentDate}</p>
            <p>Time: ${data.appointmentTime}</p>
            </div>
        `;
};
