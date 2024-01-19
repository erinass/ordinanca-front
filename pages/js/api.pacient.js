class ApiPacienti{
    url = 'http://localhost:8080/api/pacient';

    async findAll() {
        const response = await fetch(this.url); 
        return await response.json();
    }

    async findById(pacientId) {
        const response = await fetch(this.url + "/" + pacientId); 
        return await response.json();
    }
    
    async deleteById(pacientId) {
        const response = await fetch(this.url + "/" + pacientId, {
            method: 'DELETE'
        });
        return await response.text();
    }

    async register(pacient) {
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(pacient),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.text();
    }

    async modify(pacientId, pacient) {
        const response = await fetch(this.url + '/' + pacientId, {
            method: 'PUT',
            body: JSON.stringify(pacient),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.text();
    }



}