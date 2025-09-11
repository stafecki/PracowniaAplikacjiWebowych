function add(a, b){
    return a + b;
}

function maxInList(list) {
    if (list.length == 0) {
        return;
    }
    max = list[0];
    for (element of list) {
        if (element > max) {
            max = element;
        }
    }
    return max;
}

function count(arr){
    counter = 0
    for(element of arr){
        counter++;
    }
    return counter;
}


const readline = require('node:readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let list = []
function fillListOfNumbers(){
    rl.question('Wpisuj elementy tablicy, wpisz \'exit\' by wyjsc: ', element => {
        if(element.toLowerCase() == 'exit'){
            console.log('Lista: ' + list)
            console.log('Liczba elementow tablicy: ' + count(list));
            console.log('Największa liczba: ' + maxInList(list));
            rl.close();
        }
        else{
            list.push(parseInt(element));
            fillListOfNumbers();
        }
    })
}
const x = 67
const y = 41

console.log("Suma z " + x + " i " + y + " : " + add(x, y))
fillListOfNumbers();