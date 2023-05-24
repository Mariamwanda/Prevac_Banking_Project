
const dom = require('browserify')
let formInteret = dom.document.getElementById('taux');
console.log(formInteret)
function findInteret(){
    fetch('http://localhost:3000/api/configurations')
    .then(response => {
        return response.json();
    })
    .then(donne => {
        donne.data;
        console.log(donne.data)
    })   
}
console.log(findInteret());