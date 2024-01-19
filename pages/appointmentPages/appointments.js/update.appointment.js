document.addEventListener("DOMContentLoaded", function () {

    const inputPacientName = document.getElementById('inputPacientName');
    const inputAppointmentType = document.getElementById('inputAppointmentType');
    const inputAppointmentBookingType = document.getElementById('inputAppointmentBookingType');
    const isActive = document.getElementById('isActive');
    const btnSave = document.getElementById('btnSave');

    function validateForm() {
        const pacientName = inputPacientName.value.trim();
        const appointmentType = inputAppointmentType.value.trim();
        const appointmentBookingType = inputAppointmentBookingType.value.trim();
        const active = isActive.value.trim();

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

        if (!isActive) {
            isActive.style.border = "1px solid red";
            return false;
        }
        return true;
    }

    async function onSave() {
        if (!validateForm()) {
            return;
        }

        const pacientName = inputPacientName.value;
        const appointmentType = inputAppointmentType.value;
        const appointmentBookingType = inputAppointmentBookingType.value;
        const isActive = isActive.value;


        const appointemtId = window.location.search.split("=")[1]?.trim();
        const model = new Appointment(appointemtId || 0, pacientName, appointmentType, appointmentBookingType, isActive);

        console.log(model);
        const apiAppointment = new ApiAppointment();

        if (appointemtId) {
            
            await apiAppointment.modify(appointemtId, model);
        } else {
            
            await apiAppointment.register(model);
        }

        window.location.href = "/../appointment.list.html";
    }
    btnSave.addEventListener("click", function (event) {
        event.preventDefault();
        onSave();
    });

    // inputPacientName.addEventListener("input", validateForm);
    inputAppointmentType.addEventListener("input", validateForm);
    inputAppointmentBookingType.addEventListener("input", validateForm);
    isActive.addEventListener("input", validateForm);

    const loadData = async () => {
        const appointemtId = window.location.search.split("=")[1].trim();
        const apiAppointment = new ApiAppointment();
        const result = await apiAppointment.findById(appointemtId);
        console.log(result);

        if (result && result.id) {
            console.log(result);
            // inputPacientName.value = result.pacient.name;
            inputAppointmentType.value = result.appointmentType;
            inputAppointmentBookingType.value = result.appointmentBookingType;
            isActive.value = result.active;
        }
    }

    loadData();

});
