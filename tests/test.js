var Random = require("random-js");
var rn = require("random-name");
var XLSX = require("xlsx");
var fs = require("fs")

var Student = require("../Student.js");

var mt = Random.engines.mt19937();
mt.seed(123);

var numStudents = 180;


//describe("Check for equality", function())

function generateRandomName(){
    string = rn.first();
    while((Random.bool())(mt)){
        string += " " + rn.middle();
    }
    string += " " + rn.last();
    return string;
    
}