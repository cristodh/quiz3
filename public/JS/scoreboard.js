import { postData,getData } from "./fetch.js";

const casas = document.getElementById('casas')


async function cargarCasas() {
    const listaCasas = await getData();
    listaCasas.forEach((casa)=>{
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        const tdPuntos = document.createElement('td')
        td.textContent = `${casa.nombre_casa}`
        tdPuntos.textContent = `${casa.puntos}`
        
        tr.appendChild(td)
        tr.appendChild(tdPuntos)
        casas.appendChild(tr)
    }) 
}

cargarCasas()
