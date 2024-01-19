document.addEventListener("DOMContentLoaded", function () {
    const appointment = document.getElementById('appointment');

    async function loadData(){
        console.log(window.location.search);
        const appointemtId = window.location.search.split("=")[1].trim();
        const apiAppointment = new ApiAppointment();

        const data = await apiAppointment.findById(appointemtId);

        console.log(data);

        if(!data.status || data.status === 200)
            appointment.innerHTML =  `
            <p><b>Id: </b> <i>${data.id}</i></p>
            <p><b>Status: </b> <i>${data.active}</i></p>
            <p><b>Pacient name: </b> <i>${data.pacientName}</i></p>
            <p><b>Appoint type: </b> <i>${data.appointmentType}</i></p>
            <p><b>Appointment booking type: </b> <i>${data.appointmentBookingType}</i></p>`;
    else
        alert(data.message)


}

loadData(); 

    });