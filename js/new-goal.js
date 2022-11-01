const urlGoals='http://ligafalm.eu:28100/goals';
const urlUsers = 'http://ligafalm.eu:28100/users';
const urlMilestones = 'http://ligafalm.eu:28100/milestones';
const urlGoalsUser = 'http://ligafalm.eu:28100/goals/user/';
const urlGoalMilestoneRel = 'http://ligafalm.eu:28100/goals/milestone/';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

//Obtener milestones para asignar a goal
axios.get(urlMilestones+"/?page=0&size=100",{headers})
.then((respuestaMilestones)=>{
    let milestones=respuestaMilestones.data;
    let templateMilestones=`<select class="form-control form-control-user" id="assignedMilestone" name="assignedMilestone">`;
    milestones.forEach(element=> {
        templateMilestones+=`<option value='${element.id}'>${element.name}</option>`;
    });
    templateMilestones+=`</select>`;
    document.getElementById("selectorMilestones").innerHTML=templateMilestones;
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



//Nuevo goal y relación con milestone
const form = document.getElementById('form-add-goal');

form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    console.log(formData);

    const dataRequest = {
        "name":formData.get('name'),
        "description":formData.get('description'),
        "assignedTo":formData.get('assignedTo')
        }

    //Obtengo goals del milestone seleccionado
    let milestoneAsignado=formData.get('assignedMilestone');
    let urlTest=urlMilestones+'/'+milestoneAsignado+'/goals';
    var goalsIdMilestone=[];
    axios.get(urlTest,{headers})
    .then((response)=>{
        response.data.goals.forEach(dataGoal => {
            goalsIdMilestone.push(dataGoal.id);
        });
    })

    axios.post(urlGoals,dataRequest,{headers})
    .then((respuesta) => {

        //Obtengo goals del usuario para obtener el último creado
        axios.get(urlGoalsUser+formData.get('assignedTo'))
        .then((respuestaUsuarios)=>{
            let goalsUser=respuestaUsuarios.data;
            let idLastGoal = goalsUser[goalsUser.length-1].id;
            goalsIdMilestone.push(idLastGoal);

            const dataRelRequest ={
                "idMilestone":formData.get('assignedMilestone'),
                "goals":goalsIdMilestone
            };
            
            axios.put(urlGoalMilestoneRel+formData.get('assignedMilestone'),dataRelRequest,{headers})
            .then ((respuesta)=>{
                console.log("Add rel" + respuesta.data);
            })
        })

        window.location.assign('milestones.html');
    })
})