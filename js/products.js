const urlProductsDelete = 'http://ligafalm.eu:28100/products/';
const urlProducts='http://ligafalm.eu:28100/products?page=0&size=100';

var borrarProductId=0;
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};



axios.get(urlProducts,{headers})
.then((respuesta) => {
    let response=respuesta.data;
    let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Code</th>
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Code</th>
            <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    response.forEach(element => {
        
        filas += `<tr><td>${element.name}</td><td>${element.description}</td><td>${element.code}</td><td>
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

const form = document.getElementById('form-update-product');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    
    const dataRequest = {
        "id":parseInt(formData.get('id')),
        "name":formData.get('name'),
        "description":formData.get('description'),
        "code":formData.get('code')
    }


    axios.put(urlProductsDelete+dataRequest.id,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('products.html')})
    .catch(error => console.log(error))

})

function visualizar (productId)
{
    axios.get(urlProductsDelete+productId,{headers})
    .then((respuesta) => {
        document.getElementById("id").value=respuesta.data.id;
        document.getElementById("name").value=respuesta.data.name;
        document.getElementById("description").value=respuesta.data.description;
        document.getElementById("code").value=respuesta.data.code;
    })
    .catch((error)=> {
        console.log(error);
    })
}

function previoBorrar(productId)
{
    borrarProductId=productId;
}

function borrar ()
{
    if (borrarProductId>0)
    {
        axios.delete (urlProductsDelete+borrarProductId,{headers})
        .then((respuesta) => {
            borrarProductId=0;
            window.location.assign('products.html');
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else
    {
        console.log("No existen products");
    }
   
}


