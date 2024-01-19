class ApiAppointment{
    url = 'http://localhost:8080/api/appointment';

    async findAll() {
        const response = await fetch(this.url); 
        console.log(response)
        return await response.json();
    }

    async findById(appointmentId) {
        const response = await fetch(this.url + "/" + appointmentId); 
        return await response.json();
    }
    
    async deleteById(appointmentId) {
        const response = await fetch(this.url + "/" + appointmentId, {
            method: 'DELETE'
        });
        return await response.text();
    }

    async register(appointment) {
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.text();
    }

    async modify(appointmentId, appointment) {
        const response = await fetch(this.url + '/' + appointmentId, {
            method: 'PUT',
            body: JSON.stringify(appointment),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.text();
    }

    async changeStatus(appointmentId, appointment) {
      const response = await fetch(this.url + '/' + appointmentId, {
        method: 'PATCH',
        body: JSON.stringify(appointment),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.text();
    }
    


    // async changeStatus(appointmentId, appointment) {
    //     try {
    //         const response = await fetch(this.url + '/' + appointmentId, {
    //             method: 'PATCH',
    //             body: JSON.stringify(appointment),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error in changeStatus:', error);
    //         throw error; // You may want to handle or log the error appropriately
    //     }
    // }
    
}