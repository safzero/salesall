const urlTransactionsDelete = 'http://ligafalm.eu:28100/transactions/';
const urlTransactions='http://ligafalm.eu:28100/transactions?page=0&size=100';
const urlGoals='http://ligafalm.eu:28100/goals?page=0&size=100';

var borrarMilestoneId=0;
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

//Obtener goals para el select
axios.get(urlGoals,{headers})
.then((respuestaGoals)=> {
    let goals;
    goals=respuestaGoals.data;
    let templateSelect =`<select class="form-control form-control-user" id="goalId" name="goalId">`;
    goals.forEach(element => {
        templateSelect+=`<option value='${element.id}'>${element.name}</option>`;
    });
    templateSelect+=`</select>`;
    document.getElementById("totalGoals").innerHTML=templateSelect;

})

axios.get(urlTransactions,{headers})
.then((respuesta) => {
    let response=respuesta.data;
    let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Product code</th>
            <th>Total Sell</th>
            <th>Done</th>
            <th>Type</th>
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th>Product code</th>
            <th>Total Sell</th>
            <th>Done</th>
            <th>Type</th>
            <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    response.forEach(element => {
        
        filas += `<tr><td>${element.productCode}</td><td>${element.total}</td><td>${element.done}</td><td>${element.type}</td><td>
        <i onclick="previoBorrar(${element.id})" data-toggle='modal' data-target='#deleteModal' 
        class='fas fa-trash fa-sm fa-fw mr-2 text-gray-400'></i> <i onclick="visualizar(${element.id})" data-toggle='modal' data-target='#updateModal' 
        class='fas fa-pen fa-sm fa-fw mr-2 text-gray-400'></i></td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
})
.catch((error) => {
    console.log(error)
})

const form = document.getElementById('form-update-transaction');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    
    const dataRequest = {
        "id":parseInt(formData.get('id')),
        "productCode":formData.get('productCode'),
        "total":parseInt(formData.get('total')),
        "type":'SELL',
        "done":1,
        "goal":parseInt(formData.get('goalId'))
    }


    axios.put(urlTransactionsDelete+dataRequest.id,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('transactions.html')})
    .catch(error => console.log(error))

})

function visualizar (goalId)
{
    axios.get(urlTransactionsDelete+goalId,{headers})
    .then((respuesta) => {
        document.getElementById("id").value=respuesta.data.id;
        document.getElementById("goalId").value=respuesta.data.goal;
        document.getElementById("productCode").value=respuesta.data.productCode;
        document.getElementById("total").value=respuesta.data.total;
        document.getElementById("goalId").value=respuesta.data.goal;
    })
    .catch((error)=> {
        console.log(error);
    })
}

function previoBorrar(transactionId)
{
    borrarTransactionId=transactionId;
}

function borrar ()
{
    if (borrarTransactionId>0)
    {
        axios.delete (urlTransactionsDelete+borrarTransactionId,{headers})
        .then((respuesta) => {
            borrarGoalId=0;
            window.location.assign('transactions.html');
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else
    {
        console.log("No existen transactions");
    }
   
}


