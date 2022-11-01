const urlGoals='http://ligafalm.eu:28100/goals';
const urlTransactions = 'http://ligafalm.eu:28100/transactions';
const urlProducts = 'http://ligafalm.eu:28100/products';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

//Obtener products para asignar a transaction
axios.get(urlProducts+"/?page=0&size=100",{headers})
.then((respuestaProducts)=>{
    let producfts=respuestaProducts.data;
    let templateProducts=`<select class="form-control form-control-user" id="productCode" name="productCode">`;
    producfts.forEach(element=> {
        templateProducts+=`<option value='${element.code}'>${element.name}</option>`;
    });
    templateProducts+=`</select>`;
    document.getElementById("selectorProduct").innerHTML=templateProducts;
})

//Obtener goals para asignar a transaction
axios.get(urlGoals+"/?page=0&size=100",{headers})
.then((respuestaGoals)=>{
    let goals=respuestaGoals.data;
    let templateGoals=`<select class="form-control form-control-user" id="goalId" name="goalId">`;
    goals.forEach(element=> {
        templateGoals+=`<option value='${element.id}'>${element.name}</option>`;
    });
    templateGoals+=`</select>`;
    document.getElementById("selectorGoal").innerHTML=templateGoals;
})


//Nueva transaction y relación con goal
const form = document.getElementById('form-add-transaction');

form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    console.log(formData);

    const dataRequest = {
        "productCode":formData.get('productCode'),
        "total":parseInt(formData.get('total')),
        "type":'SELL',
        "done":1,
        "goal":parseInt(formData.get('goalId'))
        }

    axios.post(urlTransactions,dataRequest,{headers})
    .then((respuesta) => {
        console.log(respuesta.data);
        window.location.assign('goals.html');

    })
})