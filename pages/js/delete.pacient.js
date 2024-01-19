document.addEventListener("DOMContentLoaded", function () {
    
    const pacient = document.getElementById('pacient');
    const btnDeletePacient = document.getElementById('btnDeletePacient');

    async function loadData(){
        console.log(window.location.search);
        const pacientId = window.location.search.split("=")[1].trim();
        const apiPacienti = new ApiPacienti();

        const data = await apiPacienti.findById(pacientId);

        console.log(data);

        if(!data.status || data.status === 200){
            pacient.innerHTML =  `
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <div class="col-md-6 px-0">
                <h1 class="display-4 fst-italic">Name: ${data.name} </h1>
                <p class="lead my-3">Age: ${data.age}</p>
                <p class="lead my-3">City: ${data.city}</p>
                <p class="lead my-3">Email: ${data.email}</p>
              </div>
            </div>`;
            data.reports.forEach(report => {
                const tableRow = document.createElement("tr");
                tableRow.innerHTML = `
                      <td>${report.id}</td>
                      <td>${report.pacientName}</td>
                      <td>${report.anamnesis}</td>
                      <td>${report.therapy}</td>
                      <td>${report.disease}</td>
                      <td>${report.description}</td>
                      <td>
                          <a class="btn btn-light" href="report.print.html?reportId=${report.id}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
                                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>  
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>  
                              </svg>
                          </a>
                          <a class="btn btn-warning" href="report.update.html?reportId=${report.id}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>  
                                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>  
                              </svg>
                          </a>
                          <a class="btn btn-danger" href="report.delete.html?reportId=${report.id}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>  
                              </svg>
                          </a>
                      </td>
                      `;
                      tableReportBody.appendChild(tableRow);
                    });
        btnDeletePacient.style.display='block';
        } else
            alert(data.message)
    }
    loadData();

    async function deleteData(){
        const apiPacienti = new ApiPacienti();
        const pacientId = window.location.search.split("=")[1].trim();
        if(pacientId){
            if(confirm("Are you sure that you want to delete this pacient: "+pacientId)){
                const response = await apiPacienti.deleteById(pacientId);
                if(!response){
                    window.location.href ="../index.html";
                }
            }
        }

    }

    btnDeletePacient.addEventListener('click',function (){
        deleteData();
    })


    });