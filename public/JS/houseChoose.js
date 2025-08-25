const HOUSES = ['Griffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

document.getElementById('gryffindor').addEventListener('click', function () {
    localStorage.setItem('house', 'Griffindor');
    let pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    while (pcHouse === 'Griffindor') {
        pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    }
    /*
        El random va a funcionar en cada ciclo, hasta que ese aleatorio sea distinito
        a la casa seleccionada por el jugadorcito
    */
    localStorage.setItem('pcHouse', pcHouse);
    window.location.href = '/pages/index.html';
});

document.getElementById('hufflepuff').addEventListener('click', function () {
    localStorage.setItem('house', 'Hufflepuff');
    let pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    while (pcHouse === 'Hufflepuff') {
        pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    }
    localStorage.setItem('pcHouse', pcHouse)
    window.location.href = '/pages/index.html';
});

document.getElementById('ravenclaw').addEventListener('click', function () {
    localStorage.setItem('house', 'Ravenclaw');
    let pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    while (pcHouse === 'Ravenclaw') {
        pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    }
    localStorage.setItem('pcHouse', pcHouse)
    window.location.href = '/pages/index.html';
});

document.getElementById('slytherin').addEventListener('click', function () {
    localStorage.setItem('house', 'Slytherin');
    let pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    while (pcHouse === 'Slytherin') {
        pcHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
    }
    localStorage.setItem('pcHouse', pcHouse)
    window.location.href = '/pages/index.html';
});
