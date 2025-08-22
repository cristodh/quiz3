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
const btnBoardReset = document.getElementById("btnBoardReset") // Botón de reinicio del puntaje

//BOTONES
btnReniciar.addEventListener("click", function () { //boton de reinicio
    casillas.forEach((casilla) => casilla.textContent = "")
    contadorMovimientos = 0
    document.getElementById('msgGanador').textContent = ""
    puedeJugarX = true;
})

btnBoardReset.addEventListener("click", function () {
    puntajeX = 0; // Reinicia puntaje X
    puntajeO = 0; // Reinicia puntaje O
});

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
    if (casilla.textContent == "" && !validarGanador() && puedeJugarX) {  //condicional para evitar que se reemplace los O
        casilla.textContent = "X";
        contadorMovimientos++; //aqui se suma el movimiento despues de que la X juegue
        puedeJugarX = false
        validarGanador
        if (!validarGanador()) {
            if (contadorMovimientos < 9) { //si contador es menor a 9, sigue la cpu jugando
                setTimeout(movCirculo, 750); //retraso en la accion de la CPU
            } else {
                verificarEmpate(); //si contador es mayor a 9, se verifica si hay un empate
            }
            return;
        }
    }
}
function movCirculo() {  //funcion aleatoria para marcar el O
    validarGanador
    const vacias = casillas.filter((box) => box.textContent == '')
    const numAleatorio = [Math.floor(Math.random() * vacias.length)]
    vacias[numAleatorio].textContent = 'O';
    contadorMovimientos++; //aqui se suma al contador cuando el jugar "O" se acciona
    puedeJugarX = true
    if (!validarGanador()) { //si no hay un ganador (si es un false)
        if (contadorMovimientos >= 9) { //si el contaodr es 9 o mas verifica si hay empate
            verificarEmpate();
        }
    }
}
let puntajeX = 0
let puntajeO = 0
puntosX.textContent = puntajeX
function validarGanador() {
    const patronesGanadores = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //filas
        [0, 4, 8], [2, 4, 6], //diagonales
        [0, 3, 6], [1, 4, 7], [2, 5, 8] //columnas
    ]
    for (let index = 0; index < patronesGanadores.length; index++) {
        const [pos1, pos2, pos3] = patronesGanadores[index]
        if (casillas[pos1].textContent != "" &&
            casillas[pos1].textContent == casillas[pos2].textContent &&
            casillas[pos1].textContent == casillas[pos3].textContent) {

            if (casillas[pos1].textContent == 'X' && !puedeJugarX) {
                document.getElementById('msgGanador').textContent = `El ganador fue X`
                puntajeX++
                puntosX.textContent = puntajeX
                puedeJugarX = true
            }
            if (casillas[pos1].textContent == 'O' && puedeJugarX) {
                document.getElementById('msgGanador').textContent = `El ganador fue O`
                puntajeO++
                puntosO.textContent = puntajeO
                puedeJugarX = false
            }


            return true
        }
    }

}


function verificarEmpate() {
    if (contadorMovimientos === 9 && !validarGanador()) { //si el contador es mayor o igual a 9 y el validarGanador esta en false, tira alerta
        document.getElementById('msgGanador').textContent = `EMPATE!`
    }
}

movimientos()

