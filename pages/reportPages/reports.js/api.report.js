class ApiReport{
    url = 'http://localhost:8080/api/reports';
    async findAll() {
        const response = await fetch(this.url); 
        return await response.json();
    }

    async findById(reportId) {
        const response = await fetch(this.url + "/" + reportId); 
        return await response.json();
    }
    
    async deleteById(reportId) {
        const response = await fetch(this.url + "/" + reportId, {
            method: 'DELETE'
        });
        return await response.text();
    }

    async register(report) {
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.text();
    }

    async modify(reportId, report) {
        const response = await fetch(this.url + '/' + reportId, {
            method: 'PUT',
            body: JSON.stringify(report),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.text();
    }



}
