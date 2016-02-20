var Random = require("random-js");
var rn = require("random-name");
var XLSX = require("xlsx");
var fs = require("fs");
var should = require("should");

var sorter = require("../sorter.js");
var Student = require("../Student.js");

var mt = Random.engines.mt19937();
mt.seed(123);

var students;
describe("Reading Files", function(){
    it("Should open and read the file", function(done){
        students = fs.readFileSync("tests/test.txt").toString().split("\n");
        students = students.map(function(str){
            var studentData = str.split(";");
            var student = new Student(studentData[0], {
                Major: studentData[1], 
                Gender: studentData[2]});
            return student;
        });
        done();
    });
});
describe("Sorting Students", function(done){
    var sorting;
    var total = 0;
    it("Sorting", function(){
        sorting = sorter.sort(students
            , ["Ursaia", "Nocturna", "Ianthe", "Triton", "Ankaa", "Saren"]
            , ["Major", "Gender"]
            , 123);
    });
    it("Should have roughly the same number of people per house", function(){
        var min = sorting[0].members.length;
        var max = sorting[0].members.length;
        sorting.forEach(function(house){
            min = Math.min(min, house.members.length);
            max = Math.max(max, house.members.length);
            total += house.members.length;
        });
        (max - min).should.be.belowOrEqual(10);
    });
    it("Should have the same number of students", function(){
        total.should.equal(students.length);
    });
    it("Should write the results to a file", function(){
        fs.open("tests/results.csv", "w+", function(err, file){
            names = sorting.map(function(house, index){
                strAry = house.members.map(function(student){
                    return `${house.name},${student.name},${student.chars.Major},${student.chars.Gender}`;
                });
                strAry.unshift(house.name);
                return strAry.join("\n");
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