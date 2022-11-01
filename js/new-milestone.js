const urlMilestones='http://ligafalm.eu:28100/milestones';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

const form = document.getElementById('form-add-milestone');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    console.log([...formData]);
    console.log(formData.get('name'));
    
    const dataRequest = {
        "name":formData.get('name'),
        "start":formData.get('start'),
        "end":formData.get('end')
    }

    console.log(dataRequest);

    axios.post(urlMilestones,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('milestones.html')})
    .catch(error => console.log(error))

})