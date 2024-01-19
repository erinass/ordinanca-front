document.addEventListener("DOMContentLoaded", function () {

    const inputPacientName = document.getElementById('inputPacientName');
    const inputAnamnesis = document.getElementById('inputAnamnesis');
    const inputTherapy = document.getElementById('inputTherapy');
    const inputDisease = document.getElementById('inputDisease');
    const inputDescription = document.getElementById('inputDescription');
    const btnSave = document.getElementById('btnSave');
    const btnCancel = document.getElementById('btnCancel');

    function validateForm() {
        const pacientName = inputPacientName.value.trim();
        const anamnesis = inputAnamnesis.value.trim();
        const therapy = inputTherapy.value.trim();
        const disease = inputDisease.value.trim();
        const description = inputDescription.value.trim();

        if (!pacientName) {
            inputPacientName.style.border = "1px solid red";
            return false;
        }

        if (!anamnesis || isNaN(age)) {
            inputAnamnesis.style.border = "1px solid red";
            return false;
        }

        if (!therapy) {
            inputTherapy.style.border = "1px solid red";
            return false;
        }

        if (!disease) {
            inputDisease.style.border = "1px solid red";
            return false;
        } if (!description) {
            inputDescription.style.border = "1px solid red";
            return false;
        }
        return true;
    }

    async function onSave() {
        if (!validateForm()) {
            return;
        }

        const pacientName = inputPacientName.value;
        const anamnesis = inputAnamnesis.value;
        const therapy = inputTherapy.value;
        const disease = inputDisease.value;
        const description = inputDescription.value;


        const reportId = window.location.search.split("=")[1]?.trim();
        const model = new Report(reportId || 0, pacientName, anamnesis, therapy, disease, description);

        console.log(model);
        const apiReport = new ApiReport();

        if (reportId) {
            
            await apiReport.modify(reportId, model);
        } else {
            
            await apiReport.register(model);
        }

        window.location.href = "/pages/index.html";
    }
    btnSave.addEventListener("click", function (event) {
        event.preventDefault();
        onSave();
    });

    // inputPacientName.addEventListener("input", validateForm);
    inputAnamnesis.addEventListener("input", validateForm);
    inputTherapy.addEventListener("input", validateForm);
    inputDisease.addEventListener("input", validateForm);
    inputDescription.addEventListener("input", validateForm);

    const loadData = async () => {
        const reportId = window.location.search.split("=")[1].trim();
        const apiReport = new ApiReport();
        const result = await apiReport.findById(reportId);

        if (result && result.id) {
            console.log(result);
            // inputPacientName.value = result.pacientName;
            inputAnamnesis.value = result.anamnesis;
            inputTherapy.value = result.therapy;
            inputDisease.value = result.disease;
            inputDescription.value = result.description;
        }
    }

    loadData();

});
