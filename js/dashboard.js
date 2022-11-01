const urlGoals='http://ligafalm.eu:28100/goals?page=0&size=100';
const urlTransactions='http://ligafalm.eu:28100/transactions?page=0&size=100';
const urlProducts='http://ligafalm.eu:28100/products?page=0&size=100';
const urlMilestones='http://ligafalm.eu:28100/milestones?page=0&size=100';

const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

getMilestones();
getGoals();
getProducts();
getTransactions();

function getMilestones(){
    axios.get(urlMilestones,{headers})
    .then((respuesta)=>{
        document.getElementById("totalMilestones").innerHTML=respuesta.data.length;
    })
}

function getGoals(){
    axios.get(urlGoals,{headers})
    .then((respuesta)=>{
        document.getElementById("totalGoals").innerHTML=respuesta.data.length;
    })
}

function getProducts(){
    axios.get(urlProducts,{headers})
    .then((respuesta)=>{
        document.getElementById("totalProducts").innerHTML=respuesta.data.length;
    })
}

function getTransactions(){
    axios.get(urlTransactions,{headers})
    .then((respuesta)=>{
        document.getElementById("totalTransactions").innerHTML=respuesta.data.length;
    })
}