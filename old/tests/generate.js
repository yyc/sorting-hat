var Random = require("random-js");
var rn = require("random-name");
var fs = require("fs")
var XLSX = require("xlsx");
var should = require("should");

var Student = require("../Student.js");

var mt = Random.engines.mt19937();
mt.seed(123);
var numStudents = 180;

describe("Generating Test Data", function(){
    var names = [];
    var majors = [];
    var pMales = {};
    it("Should produce an array of names", function(){
        var set = new Set();
        for(i = 0; i < numStudents; i++){
            set.add(generateRandomName());
        }
        names = Array.from(set.values());
    });

    it("Should list majors and genders", function(){
        var distributions = XLSX.readFile("tests/studentRatio.xlsx");
        var worksheet = distributions.Sheets[distributions.SheetNames];
        var mi = 0;
        for(var i = 1; i < 39; i++){
            var majorName = worksheet['B'+i].v;
            var numStudents = worksheet['C' + i].v;
            var PMale = worksheet['D'+i].v;
            for(var j = 0; j < numStudents; j++){
                majors[mi++] = majorName;
            }
            pMales[majorName] = PMale;
        }
        Random.shuffle(mt, majors);
    });
    
    it("Should write everything to tests/test.txt", function(done){
        fs.open("tests/test.txt", "w+", function(err, file){
            names = names.map(function(val, index){
                var major = majors[index];
                //Generate gender based on the major's proportion
                var gender = (Random.bool(pMales[major]))(mt) ? "M": "F";
                console.log(val + ";" + major + ";" + gender);
                return val + ";" + major + ";" + gender;
            });
            names = names.join("\n");
            fs.write(file, names, 0, 0, done);
        });
    });
});

function generateRandomName(){
    string = rn.first();
    while((Random.bool())(mt)){
        string += " " + rn.middle();
    }
    string += " " + rn.last();
    return string;
    
}