document.addEventListener("DOMContentLoaded", function (){

    const inputPacientName = document.getElementById('inputPacientName')
    const inputAnamnesis = document.getElementById('inputAnamnesis')
    const inputTherapy = document.getElementById('inputTherapy')
    const inputDisease = document.getElementById('inputDisease')
    const inputDescription = document.getElementById('inputDescription')
    // const form = document.getElementById('reportForm') // get the form element
    const btnSubmit = document.getElementById('btnSubmit')

    function validateForm() {
        const pacientId = inputPacientName.value.trim()
        const anamnesis = inputAnamnesis.value.trim()
        const therapy = inputTherapy.value.trim()
        const disease = inputDisease.value.trim()
        const description = inputDescription.value.trim()

        inputPacientName.style.border = ""
        inputAnamnesis.style.border = ""
        inputTherapy.style.border = ""
        inputDisease.style.border = ""
        inputDescription.style.border = ""

        if (!pacientId) {
            inputPacientName.style.border = "1px solid red"
            return false
        }

        if (!anamnesis) {
            inputAnamnesis.style.border = "1px solid red"
            return false
        }

        if (!therapy) {
            inputTherapy.style.border = "1px solid red"
            return false
        }

        if (!disease) {
            inputDisease.style.border = "1px solid red"
            return false
        }
        if (!description) {
            inputDescription.style.border = "1px solid red"
            return false
        }
        return true
    }

    async function onSave(event) { 
        event.preventDefault() 
        if (!validateForm()) {
            return
        }

        const pacient = inputPacientName.value
        const anamnesis = inputAnamnesis.value
        const therapy = inputTherapy.value
        const disease = inputDisease.value
        const description = inputDescription.value
        const pacientId = window.location.search.split("=")[1].trim();


        const model = new Report(0, pacientId, anamnesis, therapy, disease, description)

        console.log(model)
        const apiReport = new ApiReport()

        try {
            await apiReport.register(model)
            window.location.href = "report.list.html"
        } catch (error) {
            console.error("Error saving data:", error)
        }
    }

    btnSubmit.addEventListener("click", function (event) {
        event.preventDefault()
        onSave(event)  // add the event parameter here
    })

    // form.addEventListener("submit", onSave) // attach onSave to form submit event

    inputPacientName.addEventListener("input", validateForm)
    inputAnamnesis.addEventListener("input", validateForm)
    inputTherapy.addEventListener("input", validateForm)
    inputDisease.addEventListener("input", validateForm)
    inputDescription.addEventListener("input", validateForm)
})