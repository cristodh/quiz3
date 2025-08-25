import { postData,getData } from "./fetch.js";
// Referenciamos todos los ids del HTML usando document.getElement

const casilla0 = document.getElementById("casilla0");
const casilla1 = document.getElementById("casilla1");
const casilla2 = document.getElementById("casilla2");
const casilla3 = document.getElementById("casilla3");
const casilla4 = document.getElementById("casilla4");
const casilla5 = document.getElementById("casilla5");
const casilla6 = document.getElementById("casilla6");
const casilla7 = document.getElementById("casilla7");
const casilla8 = document.getElementById("casilla8");
const puntosX = document.getElementById("puntosX"); // Marcador para X
const puntosO = document.getElementById("puntosO"); // Marcador para O
const btnReniciar = document.getElementById("btnReiniciar") // Botón de reinicio partida
const btnBoardReset = document.getElementById("btnBoardReset") // Botón de reinicio del tablero
let turno

document.getElementById('jugador').textContent = localStorage.getItem('house') // Tomamos el valor del localStorage para darle el nombre al jugador
document.getElementById('computadora').textContent = localStorage.getItem('pcHouse') // Tomamos el valor del localStorage para darle el nombre a la computadora

const CASA_USUARIO = localStorage.getItem('house');
const CASA_PC = localStorage.getItem('pcHouse');


const musicaFondo = new Audio("../files/musicGame.mp3");
musicaFondo.loop = true; // Repetir indefinidamente
musicaFondo.volume = 0.1; // Volumen

const btnMusica = document.getElementById("btnMusica");



//BOTONES
btnReniciar.addEventListener("click", function () { //boton de reinicio
    casillas.forEach((casilla) => casilla.innerHTML = "")
    contadorMovimientos = 0
    document.getElementById('msgGanador').textContent = ""
    puedeJugarX = true;
})

btnBoardReset.addEventListener("click", function () {
    puntajeX = 0; // Reinicia puntaje X
    puntajeO = 0; // Reinicia puntaje O
    puntosX.textContent = puntajeX
    puntosO.textContent = puntajeO
    localStorage.setItem('conX', puntajeX);
    localStorage.setItem('conO', puntajeO);
});

btnMusica.addEventListener("click", () => {
    if (musicaFondo.paused) {
        musicaFondo.play();
        btnMusica.textContent = "🎵 Música: ON";
    } else {
        musicaFondo.pause();
        btnMusica.textContent = "🎵 Música: OFF";
    }
});

document.addEventListener("click", () => {
    if (musicaFondo.paused) {
        musicaFondo.play();
    }
}, { once: true });

let puedeJugarX = true;

let contadorMovimientos = 0;

// Creamos un arreglo que contenga todas esas referencias (variables)
const casillas = [casilla0, casilla1, casilla2, casilla3, casilla4, casilla5, casilla6, casilla7, casilla8];

function movimientos() {
    casillas.forEach((casilla) => {
        casilla.addEventListener("click", () => movimientoX(casilla))
    });
}
function movimientoX(casilla) {
    if (!casilla.querySelector("img") && !validarGanador() && puedeJugarX) {  //condicional para evitar que se reemplace los O
        const imagenX = document.createElement("img");
        imagenX.src = "../files/x.png";
        imagenX.alt = "X";
        imagenX.classList.add("ficha");
        imagenX.setAttribute("data-ficha", "X");
        casilla.appendChild(imagenX);
        turno = 'X';
        contadorMovimientos++; //aqui se suma el movimiento despues de que la X juegue
        puedeJugarX = false
        if (!validarGanador(turno)) {
            if (contadorMovimientos < 9) { //si contador es menor a 9, sigue la cpu jugando
                setTimeout(movCirculo, 750); //retraso en la accion de la CPU
            } else {
                verificarEmpate(); //si contador es mayor a 9, se verifica si hay un empate
            }
        }
    }
}
function movCirculo() {  //funcion aleatoria para marcar el O
    const vacias = casillas.filter((box) => !box.querySelector("img"))
    const numAleatorio = Math.floor(Math.random() * vacias.length)
    const imagenO = document.createElement("img");
    imagenO.src = "../files/O.png";
    imagenO.alt = "O";
    imagenO.classList.add("ficha");
    imagenO.setAttribute("data-ficha", "O");
    vacias[numAleatorio].appendChild(imagenO);
    contadorMovimientos++; //aqui se suma al contador cuando el jugar "O" se acciona
    puedeJugarX = true
    if (!validarGanador("O")) { //si no hay un ganador (si es un false)
        if (contadorMovimientos >= 9) { //si el contaodr es 9 o mas verifica si hay empate
            verificarEmpate();
        }
    }
}
let puntajeX = localStorage.getItem('conX') || 0
let puntajeO = localStorage.getItem("conO") || 0
puntosX.textContent = puntajeX
puntosO.textContent = puntajeO

function validarGanador(turno) {
    const patronesGanadores = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //filas
        [0, 4, 8], [2, 4, 6], //diagonales
        [0, 3, 6], [1, 4, 7], [2, 5, 8] //columnas
    ]
    for (let index = 0; index < patronesGanadores.length; index++) {
        const [pos1, pos2, pos3] = patronesGanadores[index]
        const ficha1 = casillas[pos1].querySelector("img")?.getAttribute("data-ficha");
        const ficha2 = casillas[pos2].querySelector("img")?.getAttribute("data-ficha");
        const ficha3 = casillas[pos3].querySelector("img")?.getAttribute("data-ficha");

        if (ficha1 && ficha1 === ficha2 && ficha1 === ficha3) {
            if (ficha1 === "X" && !puedeJugarX) {
                document.getElementById('msgGanador').textContent = `El ganador fue ${localStorage.getItem('house')}`
                puntajeX++
                puntosX.textContent = puntajeX
                const casaUsuario = {
                    nombre_casa: CASA_USUARIO,
                    puntos: puntajeX,
                    esUsuario: true
                }
                /*
                    Creamos un objeto para tener el nombre de la casa y los puntos
                    SE DEBE guardar en formato JSON, transformando con el JSON.stringify
                */
                localStorage.setItem('casa_usuario', JSON.stringify(casaUsuario));
                puedeJugarX = true
            }
            if (ficha1 === "O" && puedeJugarX) {
                document.getElementById('msgGanador').textContent = `El ganador fue ${localStorage.getItem('pcHouse')}`
                puntajeO++
                puntosO.textContent = puntajeO
                const casaPC = {
                    nombre_casa: CASA_PC,
                    puntos: puntajeO,
                    esUsuario: false
                }
                localStorage.setItem('casa_pc', JSON.stringify(casaPC));
                puedeJugarX = false
            }
            return true
        }
    }
    return false
}

function verificarEmpate() {
    if (contadorMovimientos === 9 && !validarGanador()) { //si el contador es mayor o igual a 9 y el validarGanador esta en false, tira alerta
        document.getElementById('msgGanador').textContent = `EMPATE!`
    }
}
const btnGuadarPuntaje = document.getElementById("btnGuadarPuntaje");

btnGuadarPuntaje.addEventListener("click", () => {
    const casa_usuario = JSON.parse(localStorage.getItem('casa_usuario'));
    const casa_pc = JSON.parse(localStorage.getItem('casa_pc'));
    if (casa_usuario) {
        postData(casa_usuario);
    }
    if (casa_pc) {
        postData(casa_pc);
    }
    window.location.href = "../pages/scoreboard.html";
});



movimientos()
