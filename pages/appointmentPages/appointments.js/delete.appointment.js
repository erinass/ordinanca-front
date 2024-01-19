document.addEventListener("DOMContentLoaded", function () {
    const appointment = document.getElementById('appointment');
    const btnDeleteAppointment = document.getElementById('btnDeleteAppointment');

    
    async function loadData(){
        console.log(window.location.search);
        const appointemtId = window.location.search.split("=")[1].trim();
        const apiAppointment = new ApiAppointment();

        const data = await apiAppointment.findById(appointemtId);

        console.log(data);

        if(!data.status || data.status === 200){
            appointment.innerHTML =  `
            <p><b>Id: </b> <i>${data.id}</i></p>
            <p><b>Status: </b> <i>${data.active}</i></p>
            <p><b>Appoint type: </b> <i>${data.appointmentType}</i></p>
            <p><b>Appointment booking type: </b> <i>${data.appointmentBookingType}</i></p>`
            btnDeleteAppointment.style.display='block';
            
         } else
        alert(data.message)


}

loadData(); 

async function deleteData(){
    const apiAppointment = new ApiAppointment();
    const appointmentId = window.location.search.split("=")[1].trim();
    if(appointmentId){
        if(confirm("Are you sure that you want to delete this appointment: "+appointmentId)){
            const response = await apiAppointment.deleteById(appointmentId);
            if(!response){
                window.location.href ="appointment.list.html";
            }
        }
    }

}

btnDeleteAppointment.addEventListener('click',function (){
    deleteData();
})


});