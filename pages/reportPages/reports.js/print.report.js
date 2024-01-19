document.addEventListener("DOMContentLoaded", function () {
    const report = document.getElementById('report');

    async function loadData(){
        console.log(window.location.search);
        const reportId = window.location.search.split("=")[1].trim();
        const apiReport = new ApiReport();

        const data = await apiReport.findById(reportId);

        console.log(data);

        if(!data.status || data.status === 200)
            report.innerHTML =  `
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div class="col-md-6 px-0">
              <h1 class="display-4 fst-italic">Pacient: ${data.pacient.name} </h1>
            </div>
          </div>
            <div class="row mb-2">
            <div class="col-md-3">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary">Anamnesis</strong>
                  <p class="card-text mb-auto">${data.anamnesis}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-success">Disease</strong>
                  <p class="mb-auto">${data.disease}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-danger">Therapy</strong>
                  <p class="mb-auto">${data.therapy}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>
            
        </div>
        <div class="col-md-12">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text">Description</strong>
                  <p class="mb-auto">${data.description}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
        
                </div>
              </div>
            </div>`;
    else
        alert(data.message)


}

loadData(); 

    });