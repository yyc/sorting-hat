var Random = require("random-js");

var Student = require("./Student.js");

var rand = Random.engines.mt19937();

rand.seed(123);

function sort(studentArray, numHouses){
    houses = [];
    for(i = 0; i < numHouses; i++){
        houses[i] = [];
    }
    
}