//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let arrayTweets = [];



//Event listeners
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        //'arrayTweets' se convierte en un arreglo si el local storage esta vacio
        arrayTweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}



//Funciones
function agregarTweet(evnt){
    evnt.preventDefault();

    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecute el siguiente codigo
    }


    const tweetObj = {
        id: Date.now(),

        //El valor es igual a -> tweet: tweet, pero como es igual solo es necesario colocarlo 1 vez
        tweet
    }
    //Agregando al arreglo de tweets el Obj
    arrayTweets = [...arrayTweets, tweetObj];

    //Una vez agregado el tweet en el array, creamos el HTML 
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}


//Mostrar mensajes de error
function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar dentro de HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//Muestra un listado de los tweets
function crearHTML(){

    //Limpiando HTML
    limpiarHTML();

    if(arrayTweets.length >  0){
        arrayTweets.forEach(t => {

            //Agregando btn para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Agregar funcion al btn para eliminar tweet
            btnEliminar.onclick = () => {
                borrarTweet(t.id);
            }

            //Crear HTML
            const li = document.createElement('li');

            //Agregando texto al li creado
            li.textContent = t.tweet;

            //Asignar btn al li
            li.appendChild(btnEliminar);
            
            //Insertando dentro del HTML
            listaTweets.appendChild(li);
        });
    }

    sicronizarStorage();
}

//Agregar los tweets actuales al local storage
function sicronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(arrayTweets));
}


//Elimina un tweet
function borrarTweet(id){
    arrayTweets = arrayTweets.filter(t => t.id != id);
    crearHTML();
}
//Limpiando HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}