async function postData(obj) {
    try {
        const peticion = await fetch('http://localhost:2929/casas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
    } catch (error) {
        console.log(error);
    }
}
async function getData() {
    try {
        const peticion = await fetch('http://localhost:2929/casas');
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export { postData, getData };