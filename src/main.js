import './style.css'
import _ from 'underscore'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

const miModulo = (() =>{
 'use strict'

let deck = [];
const tipos = ['C', 'D', 'H', 'S'], tiposEspeciales = ['A', 'J', 'Q', 'K'];

let puntoJugador = 0, puntoComputadora = 0;
// referefencias //
const botones = document.querySelectorAll('button');

const puntajeCartel = document.querySelectorAll('small');
const jugadorCartas = document.querySelector('#jugador-cartas');
const computadoraCartas = document.querySelector('#computadora-cartas');
const cartel = document.querySelector('.final');

function creaDeck() {
    for (let i = 2; i < 11; i++) { for (let tipo of tipos) { deck.push(i + tipo); } }
    for (let tipo of tipos) { for (let tipoe of tiposEspeciales) { deck.push(tipoe + tipo); } }
    deck = _.shuffle(deck);
}
const pedirCarta = () => {
    return (deck.length === 0) ? console.warn('No Mas cartas') : deck.pop(); 
}
const valorCarta = (carta, acu=0) => {
    let valor = carta.substring(0, carta.length - 1);
    isNaN(valor) ? ['J', 'Q', 'K'].includes(valor) ? valor = 10 : acu < 11 ? valor = 11 : valor = 1 :  valor = valor * 1;
    return valor;  
}
const contador = (punto, jugador) => {
    puntajeCartel[jugador].innerText = punto;
}

const publicarCarta = (carta, player = 0) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/images/${carta}.png`;
    imgCarta.classList.add('carta');
    player === 0 ? jugadorCartas.append(imgCarta) : computadoraCartas.append(imgCarta);
}

const computadoraJuega = () => {
   if(puntoJugador>21){
       let carta = pedirCarta(); puntoComputadora = puntoComputadora + valorCarta(carta, puntoComputadora);
       contador(puntoComputadora, 1);publicarCarta(carta,1);      
   }else{
         do{
             let carta = pedirCarta(); puntoComputadora = puntoComputadora + valorCarta(carta, puntoComputadora);
             contador(puntoComputadora, 1); publicarCarta(carta, 1);             
         } while (puntoComputadora < (puntoJugador+1) && puntoComputadora < 22);
    } 
    finalJuego();
}

const finalJuego = () =>{
    botones[2].disabled = true;
    if(puntoComputadora > puntoJugador && puntoComputadora < 22){
        cartel.innerText = "Gano la PC";
    } else if(puntoJugador > puntoComputadora && puntoJugador < 22){
        cartel.innerText = "Gano el jugador";
    } else if(puntoComputadora < puntoJugador && puntoJugador > 21){
        cartel.innerText = "Gano la PC";
    }else{
        cartel.innerText = "Gano el jugador"; 
    }
    cartel.classList.add('finalb');
}
const inicializarJuego = () =>{
    deck = []; puntoJugador = puntoComputadora = 0;
    contador(puntoJugador, 0); 
    contador(puntoComputadora, 1);
    computadoraCartas.innerHTML = ""; 
    jugadorCartas.innerHTML = "";
    botones[1].disabled = false;
    botones[2].disabled = false; 
    creaDeck();
    cartel.classList.remove('finalb');
}
  
 /* eventos de botones*/ 
/* boton de detener */
botones[2].addEventListener('click', () =>{botones[1].disabled = true; computadoraJuega();});
/* boton pedir nuevo juego */
botones[0].addEventListener('click',()=>{
     inicializarJuego();
});
/* boton pedir carta  */
botones[1].addEventListener('click', () => {
    let carta = pedirCarta(); puntoJugador = puntoJugador + valorCarta(carta, puntoJugador);
        contador(puntoJugador, 0);publicarCarta(carta);   
    if (puntoJugador > 21) { botones[1].disabled = true; console.log('El jugador se a pasado'); computadoraJuega(); } 
});
// arranque
//creaDeck();
       // enviar la funcion por referencia con el nombre que uno desee
     //return {inicio: inicializarJuego};
     // enviar directamente
   // return { miModulo };
})()