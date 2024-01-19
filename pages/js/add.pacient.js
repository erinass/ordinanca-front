document.addEventListener("DOMContentLoaded", function () {

    const inputName = document.getElementById('inputName');
    const inputAge = document.getElementById('inputAge');
    const inputCity = document.getElementById('inputCity');
    const inputEmail = document.getElementById('inputEmail');
    const btnSave = document.getElementById('btnSave');

    function validateForm() {
        const name = inputName.value.trim();
        const age = inputAge.value.trim();
        const city = inputCity.value.trim();
        const email = inputEmail.value.trim();

        
        inputName.style.border = "";
        inputAge.style.border = "";
        inputCity.style.border = "";
        inputEmail.style.border = "";

        if (!name) {
            inputName.style.border = "1px solid red";
            return false;
        }

        if (!age || isNaN(age)) {
            inputAge.style.border = "1px solid red";
            return false;
        }

        if (!city) {
            inputCity.style.border = "1px solid red";
            return false;
        }

        if (!email || !isValidEmail(email)) {
            inputEmail.style.border = "1px solid red";
            return false;
        }
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function onSave() {
        if (!validateForm()) {
            return;
        }

        const name = inputName.value;
        const age = inputAge.value;
        const city = inputCity.value;
        const email = inputEmail.value;

        
        const model = new Pacienti(0, name, age, city, email);

        console.log(model);
        const apiPacienti = new ApiPacienti();

        try {
            await apiPacienti.register(model);
            
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Error saving data:", error);
        
        }
    }

    btnSave.addEventListener("click", function (event) {
        event.preventDefault();
        onSave();
    });

    
    inputName.addEventListener("input", validateForm);
    inputAge.addEventListener("input", validateForm);
    inputCity.addEventListener("input", validateForm);
    inputEmail.addEventListener("input", validateForm);
});
