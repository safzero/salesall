const urlMilestonesDelete = 'http://ligafalm.eu:28100/milestones/';
const urlMilestones='http://ligafalm.eu:28100/milestones?page=0&size=100';
var borrarMilestoneId=0;
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

axios.get(urlMilestones,{headers})
.then((respuesta) => {
    let response=respuesta.data;
    let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Progress</th>
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Name</th>
        <th>Start</th>
        <th>End</th>
        <th>Progress</th>
        <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    response.forEach(element => {
        let fechaI=new Date(element.start).toDateString();
        let fechaF = new Date(element.end).toDateString();
        filas += `<tr><td>${element.name}</td><td>${fechaI}</td><td>${fechaF}</td><td>${element.progress}</td><td>
        <i onclick="previoBorrar(${element.id})" data-toggle='modal' data-target='#deleteModal' 
        class='fas fa-trash fa-sm fa-fw mr-2 text-gray-400'></i> <i onclick="visualizar(${element.id})" data-toggle='modal' data-target='#updateModal' 
        class='fas fa-pen fa-sm fa-fw mr-2 text-gray-400'></i><i onclick="goals(${element.id})" class='fas fa-bullseye fa-sm fa-fw mr-2 text-gray-400'></i></td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
})
.catch((error) => {
    console.log(error)
})

const form = document.getElementById('form-update-milestone');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    
    const dataRequest = {
        "id":formData.get('id'),
        "name":formData.get('name'),
        "start":formData.get('start'),
        "end":formData.get('end')
    }

    console.log(dataRequest);

    axios.put(urlMilestonesDelete+dataRequest.id,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('milestones.html')})
    .catch(error => console.log(error))

})

function visualizar (milestoneId)
{
    axios.get(urlMilestonesDelete+milestoneId,{headers})
    .then((respuesta) => {
        document.getElementById("id").value=respuesta.data.id;
        document.getElementById("name").value=respuesta.data.name;
        document.getElementById("start").value=respuesta.data.start;
        document.getElementById("end").value=respuesta.data.end;
    })
    .catch((error)=> {
        console.log(error);
    })
}

function previoBorrar(milestonesId)
{
    borrarMilestoneId=milestonesId;
}

function borrar ()
{
    if (borrarMilestoneId>0)
    {
        axios.delete (urlMilestonesDelete+borrarMilestoneId,{headers})
        .then((respuesta) => {
            let response = respuesta.data;
            console.log(response);
            borrarMilestoneId=0;
            window.location.assign('milestones.html');
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else
    {
        console.log("No existe milestone");
    }
   
}

function goals(milestoneId)
{
    window.location.assign('goals-milestone.html?milestoneId='+milestoneId);
}
