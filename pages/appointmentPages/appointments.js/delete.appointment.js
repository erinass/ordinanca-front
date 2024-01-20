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
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div class="col-md-6 px-0">
            <h1 class="display-4 fst-italic">Id: ${data.id} </h1>
              <h1 class="display-4 fst-italic">Pacient: ${data.pacient.name} </h1>
            </div>
          </div>
            <div class="row mb-2">
            <div class="col-md-3">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary">Appointment Type</strong>
                  <p class="card-text mb-auto">${data.appointmentType}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-success">Appointment Booking Type</strong>
                  <p class="mb-auto">${data.appointmentBookingType}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-danger">Completed</strong>
                  <p class="mb-auto">${data.active? 'Completed': 'Pending'}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>
            
        </div>
        <div class="col-md-12">
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>`;
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