var Random = require("random-js");
var fs = require("fs")

var Student = require("../Student.js");

var rand = Random.engines.mt19937();

describe("Generating Test Data", function(){
    it("Should generate a file", function(done){
        set = new Set();
        for(i = 0; i < 180, i++){
            generateRando
        }
        fs.open("test.txt", "w+", function(err, file){
            fs.write(file, "hihi", 0, 0, done);
            
        })
    });
});

function generateRandomName(){
    
}