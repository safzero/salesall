
const urlProducts = 'http://ligafalm.eu:28100/products';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};


//Nueva transaction y relación con goal
const form = document.getElementById('form-add-product');

form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    console.log(formData);

    const dataRequest = {
        "name":formData.get('name'),
        "description":formData.get('description'),
        "code":formData.get('code')
        }

    axios.post(urlProducts,dataRequest,{headers})
    .then((respuesta) => {
        console.log(respuesta.data);
        window.location.assign('products.html');

    })
})