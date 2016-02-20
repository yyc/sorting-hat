var Random = require("random-js");
var rn = require("random-name");
var fs = require("fs")

var Student = require("../Student.js");

var rand = Random.engines.mt19937();
rand.seed(123);

describe("Generating Test Data", function(){
    it("Should generate a file", function(done){
        set = new Set();
        for(i = 0; i < 180; i++){
            set.add(generateRandomName());
        }
        names = Array.from(set.values());
        fs.open("tests/test.txt", "w+", function(err, file){
            names = names.join("\n");
            fs.write(file, names, 0, 0, done);
            
        })
    });
});

function generateRandomName(){
    string = rn.first();
    while((Random.bool())(rand)){
        string += " " + rn.middle();
    }
    string += " " + rn.last();
    return string;
    
}