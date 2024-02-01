
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

valoresIniciales();

function asignarTextoElemento(elemento,texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function valoresIniciales() {
    asignarTextoElemento('h1','Juego de número secreto');
    asignarTextoElemento('p',`Ingrese un número entre 1 a ${numeroMaximo}`); 
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya se sorteamos todos los numeros
    if(listaNumerosSorteados.length == 3){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
        document.getElementById('valorUsuario').setAttribute('disabled','true');
        document.getElementById('recargar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled','true');
    } else{
        //Si el número generado está en la lista
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function verificarValor() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(numeroUsuario > numeroSecreto){
            asignarTextoElemento('p','El numero secreto es menor');
        }else{
            asignarTextoElemento('p','El numero secreto es mayor');
        }
        intentos++;
        limpiarInput();
    }   
    return;
}

function limpiarInput() {
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego() {
    //Limpiar la caja
    limpiarInput();
    //Indicar mensaje de intervalo de números
    valoresIniciales();
    //Deshabilitar el botón de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

let refresh = document.getElementById('recargar');
refresh.addEventListener('click', _ => {
    location.reload();
})
