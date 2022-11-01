const urlGoalsDelete = 'http://ligafalm.eu:28100/goals/';
const urlGoals='http://ligafalm.eu:28100/goals?page=0&size=100';
const urlUsers = 'http://ligafalm.eu:28100/users';

var borrarGoalId=0;
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

axios.get(urlGoals,{headers})
.then((respuesta) => {
    let response=respuesta.data;
    let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Assigned to</th>
            <th>Progress</th>
            <th>Nº transactions</th>
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Assigned to</th>
        <th>Progress</th>
        <th>Nº transactions</th>
        <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    response.forEach(element => {
        filas += `<tr><td>${element.name}</td><td>${element.description}</td><td>${element.assignedTo}</td><td>${element.progress}</td><td>${element.transactions.length}</td><td>
        <i onclick="previoBorrar(${element.id})" data-toggle='modal' data-target='#deleteModal' 
        class='fas fa-trash fa-sm fa-fw mr-2 text-gray-400'></i> <i onclick="visualizar(${element.id})" data-toggle='modal' data-target='#updateModal' 
        class='fas fa-pen fa-sm fa-fw mr-2 text-gray-400'></i><i onclick="transactions(${element.id})" class='fas fa-euro-sign fa-sm fa-fw mr-2 text-gray-400'></i></td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
})
.catch((error) => {
    console.log(error)
})

//Obtener usuarios para el select
axios.get(urlUsers,{headers})
.then((respuestaUsuarios)=> {
    let users;
    users=respuestaUsuarios.data;
    let templateSelect =`<select class="form-control form-control-user" id="assignedTo" name="assignedTo">`;
    users.forEach(element => {
        templateSelect+=`<option value='${element.username}'>${element.username}</option>`;
    });
    templateSelect+=`</select>`;
    document.getElementById("selectorUsuario").innerHTML=templateSelect;

})

const form = document.getElementById('form-update-goal');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    
    const dataRequest = {
        "id":formData.get('id'),
        "name":formData.get('name'),
        "description":formData.get('description'),
        "assignedTo":formData.get('assignedTo')
    }

    axios.put(urlGoalsDelete+dataRequest.id,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('goals.html')})
    .catch(error => console.log(error))

})


function visualizar (goalId)
{
    axios.get(urlGoalsDelete+goalId,{headers})
    .then((respuesta) => {
        document.getElementById("id").value=respuesta.data.id;
        document.getElementById("name").value=respuesta.data.name;
        document.getElementById("description").value=respuesta.data.description; 
        document.getElementById("assignedTo").value=respuesta.data.assignedTo;

    })
    .catch((error)=> {
        console.log(error);
    })
}

function previoBorrar(goalId)
{
    borrarGoalId=goalId;
}

function borrar ()
{
    if (borrarGoalId>0)
    {
        axios.delete(urlGoalsDelete+borrarGoalId,{headers})
        .then((respuesta) => {
            let response = respuesta.data;
            console.log(response);
            borrarGoalId=0;
            window.location.assign('goals.html');
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else
    {
        console.log("No existen goals con ese identificador.");
    }
   
}

function transactions (goalId)
{
    window.location.assign('goals-transactions.html?goalId='+goalId);

}
