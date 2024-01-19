document.addEventListener("DOMContentLoaded", function () {

    const inputPacientName = document.getElementById('inputPacientName');
    const inputAppointmentType = document.getElementById('inputAppointmentType');
    const inputAppointmentBookingType = document.getElementById('inputAppointmentBookingType');
    const isActive = document.getElementById('chbActive');
    const btnSave = document.getElementById('btnSave');

    function validateForm() {
        const pacientName = inputPacientName.value.trim();
        const appointmentType = inputAppointmentType.value.trim();
        const appointmentBookingType = inputAppointmentBookingType.value.trim();
        // const active = isActive.checked

        
        inputPacientName.style.border = "";
        inputAppointmentType.style.border = "";
        inputAppointmentBookingType.style.border = "";
        // isActive.style.border = "";

        if (!pacientName) {
            inputPacientName.style.border = "1px solid red";
            return false;
        }

        if (!appointmentType) {
            inputAppointmentType.style.border = "1px solid red";
            return false;
        }

        if (!appointmentBookingType) {
            inputAppointmentBookingType.style.border = "1px solid red";
            return false;
        }
        // if (!active) {
        //     isActive.style.border = "1px solid red";
        //     return false;
        // }

       
        return true;
    }
    async function onSave() {
        console.log('Before validation');
        if (!validateForm()) {
            console.log('Validation failed');
            return;
        }
    
        console.log('Before data extraction');
        const pacientName = inputPacientName.value
        const appointmentType = inputAppointmentType.value;
        const appointmentBookingType = inputAppointmentBookingType.value;
        const isActiveValue = isActive.checked;  // Corrected line
    
        // console.log(pacientName,appointmentType,appointmentBookingType, isActiveValue);
        console.log('Before model creation');
        const model = new Appointment(0, pacientName, appointmentType, appointmentBookingType, isActiveValue);
    
        console.log('Before API call');
        const apiAppointment = new ApiAppointment();
    
        try {
            console.log('Before registration');
            await apiAppointment.register(model);
            console.log('After registration');
    
            // Redirect only if the registration is successful
            window.location.href = "./appointment.list.html";
        } catch (error) {
            console.error("Error saving data:", error);
            // Handle error (e.g., display an error message to the user)
        }
    }
    
    btnSave.addEventListener("click", function (event) {
        event.preventDefault();
        onSave();
    });
    
    
    
    btnSave.addEventListener("click", function (event) {
        event.preventDefault();
        onSave();
    });

    
    inputPacientName.addEventListener("input", validateForm);
    inputAppointmentType.addEventListener("input", validateForm);
    inputAppointmentBookingType.addEventListener("input", validateForm);
    isActive.addEventListener("input", validateForm);
});
