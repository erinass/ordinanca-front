document.addEventListener("DOMContentLoaded", function () {

    const inputName = document.getElementById('inputName');
    const inputAge = document.getElementById('inputAge');
    const inputCity = document.getElementById('inputCity');
    const inputEmail = document.getElementById('inputEmail');
    const btnSave = document.getElementById('btnSave');
    const btnCancel = document.getElementById('btnCancel');

    function validateForm() {
        const name = inputName.value.trim();
        const age = inputAge.value.trim();
        const city = inputCity.value.trim();
        const email = inputEmail.value.trim();

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

        const pacientId = window.location.search.split("=")[1]?.trim();
        const model = new Pacienti(pacientId || 0, name, age, city, email);

        console.log(model);
        const apiPacienti = new ApiPacienti();

        if (pacientId) {
            
            await apiPacienti.modify(pacientId, model);
        } else {
            
            await apiPacienti.register(model);
        }

        window.location.href = "/pages/index.html";
    }
    btnSave.addEventListener("click", function (event) {
        event.preventDefault();
        onSave();
    });

    inputName.addEventListener("input", validateForm);
    inputAge.addEventListener("input", validateForm);
    inputCity.addEventListener("input", validateForm);
    inputEmail.addEventListener("input", validateForm);

    const loadData = async () => {
        const pacientId = window.location.search.split("=")[1].trim();
        const apiPacienti = new ApiPacienti();
        const result = await apiPacienti.findById(pacientId);

        if (result && result.id) {
            console.log(result);
            inputName.value = result.name;
            inputAge.value = result.age;
            inputCity.value = result.city;
            inputEmail.value = result.email;
        }
    }

    loadData();

});
