document.addEventListener("DOMContentLoaded", function () {
  const tableAppointmentBody = document.getElementById('tableAppointmentBody');
//   const tableCompletedBody = document.getElementById('tableCompletedBody ');


  let allAppointments = new Map();

  async function loadData() {
      console.log("welcome to load the data");
      tableAppointmentBody.innerHTML = "";
      const apiAppointment = new ApiAppointment();
      const data = await apiAppointment.findAll();
      console.table(data);
    //   const activeAppointments = data.filter(appointment => appointment.active);

    // activeAppointments.forEach(appointment => {
    //     console.log("Appointment: ", appointment);
    //     allAppointments.set(appointment.id, appointment);

      data.forEach(appointment => {
          if(appointment.active === true)
          {
            return null
          }
           

          console.log("Appointment: ", appointment);
          allAppointments.set(appointment.id, appointment);

          const tableRow = `<tr>
              <td><input type="checkbox" class="statusChange" ${appointment.active ? 'checked' : ''}
              style="width: 25px; height: 25px;" data-appid="${appointment.id}"></td>
              <td>${appointment.id}</td>
              <td>${appointment.pacient.name}</td>
              <td>${appointment.appointmentType}</td>
              <td>${appointment.appointmentBookingType}</td>
            

            <td>
                  <a href="./appointment.print.html?appointmentId=${appointment.id}" class="btn btn-light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                  </a>
                  <a href="./appointment.update.html?appointmentId=${appointment.id}" class="btn btn-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                  </a>
                  <a href="./appointment.delete.html?appointmentId=${appointment.id}" class="btn btn-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                      </svg>
                  </a>
              </td>

            </tr>`;
            //  if (appointment.active) {
            //     // If appointment is active, add it to the active appointments table
            //     tableCompletedBody.innerHTML += tableRow;
            //   } 
            //   else {
            //     // Otherwise, add it to the main table
            //     tableAppointmentBody.innerHTML += tableRow;
            //   }

              tableAppointmentBody.innerHTML += tableRow;

        });
    }
    //  const activeAppointmentsJSON = JSON.stringify(activeAppointments);
    // const nextPageURL = `./anotherPage.html?activeAppointments=${encodeURIComponent(activeAppointmentsJSON)}`;

    // // Redirect to another page
    // window.location.href = nextPageURL;

    loadData();

tableAppointmentBody.addEventListener('click', async (event) => {
  if (event.target.classList.contains('statusChange')) {
      const checkbox = event.target;
      const appointmentId = checkbox.dataset.appid;
      const isActive = checkbox.checked;

      if (!appointmentId || isNaN(Number(appointmentId))) {
          console.error('Invalid appointmentId:', appointmentId);
          return;
      }

      const appointmentDetails = allAppointments.get(Number(appointmentId));
      if (!appointmentDetails) {
          console.error('Appointment details not found for ID:', appointmentId);
          return;
      }

      const updatedAppointment = {
          pacientId: appointmentDetails.pacient.id,
          appointmentType: appointmentDetails.appointmentType,
          appointmentBookingType: appointmentDetails.appointmentBookingType,
          active: isActive
      };
      console.log(updatedAppointment);
      window.location.reload() 

      const apiAppointment = new ApiAppointment();
      try {
          const result = await apiAppointment.modify(appointmentId, updatedAppointment);
          console.log('API result:', result);
      } catch (error) {
          console.error('Error updating status:', error);
      }
  }
});
});





