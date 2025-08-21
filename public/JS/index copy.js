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

let puedeJugarX = true



// Creamos un arreglo que contenga todas esas referencias (variables)
const casillas = [casilla0, casilla1, casilla2, casilla3, casilla4, casilla5, casilla6, casilla7, casilla8];

function movimientos() {
    casillas.forEach((casilla) => {
        casilla.addEventListener("click", () => movimientoX(casilla))
    });
}
function movimientoX(casilla) {
    if (casilla.textContent == "" && !validarGanador() && puedeJugarX) {  //condicional para evitar que se reemplace los O
        casilla.textContent = "X"
        puedeJugarX = false
        validarGanador
        if (!validarGanador()) {
            setTimeout(movCirculo, 750); //retraso en la accion de la CPU
            return
        }
    }
}
function movCirculo() {  //funcion aleatoria para marcar el O
    validarGanador
    const vacias = casillas.filter((box) => box.textContent == '')
    const numAleatorio = [Math.floor(Math.random() * vacias.length)]
    vacias[numAleatorio].textContent = 'O'
    puedeJugarX=true
}
movimientos()

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
            alert("GANO!")
           
            return true
        }
    }

}

