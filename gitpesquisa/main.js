
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var listElement = document.querySelector('#app ul');


repos = JSON.parse(localStorage.getItem("allrepos")) || [];

function renderPage() {
    listElement.innerHTML = '';

    var todoText = inputElement.value;
    inputElement.value = '';


    var repoElelent = document.createElement('li');
    var repoText = document.createTextNode('Carregando!...');
    repoElelent.appendChild(repoText);
    listElement.appendChild(repoElelent);

    axios.get('https://api.github.com/users/'+ todoText+'/repos')
    .then(function(response) {
        listElement.innerHTML = '';
        repos = response.data;
        for (data of response.data){
            var repoElelent = document.createElement('li');
            var repoText = document.createTextNode(data.full_name);
            repoElelent.appendChild(repoText);
            listElement.appendChild(repoElelent);

        }
        saveToStorage();
        
    })
    .catch(function(error) {
        console.warn('Erro no sync');
        listElement.innerHTML = ''; 
        var repoElelent = document.createElement('li');
        var repoText = document.createTextNode('Erro ao encontrar usuário!...');
        repoElelent.appendChild(repoText);
        listElement.appendChild(repoElelent);
    });

}

buttonElement.onclick = renderPage;

function saveToStorage(){
    localStorage.setItem('allrepos', JSON.stringify(repos));  
}