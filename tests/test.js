"use strict";
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
    describe("Every House", function(){
        it("Should have roughly the same number of people", function(){
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
        it("Should have a balanced gender ratio", function(done){
            var total_m = 0;
            var total_f = 0;
            var gender_ratios = sorting.map(function(house){
                var m = 0;
                var f = 0;
                house.members.forEach(function(student){
                    if(student.chars.Gender == "M"){
                        m++;
                    } else if(student.chars.Gender == "F") {
                        f++;
                    }
                });
                total_m += m;
                total_f += f;
                console.log(house.name, m / f);
                return m / f;
            });
            var overall_ratio = total_m / total_f;
            console.log(total_m, total_f);
            gender_ratios.forEach(function(ratio){
                ratio.should.be.belowOrEqual(overall_ratio + 0.15);
                ratio.should.be.aboveOrEqual(overall_ratio - 0.15);
            });
            done();
        });
        it("Should have the same number of students", function(){
            total.should.equal(students.length);
        });
    });
    it("Should write the results to a file", function(){
        fs.open("tests/results.csv", "w+", function(err, file){
            names = sorting.map(function(house, index){
                strAry = house.members.map(function(student){
                    return `${house.name},${student.name},${student.chars.Major},${student.chars.Gender}`;
                });
                return strAry.join("\n");
            });
            names = names.join("\n");
            fs.write(file, names, 0, 0, done);
        });
    });
});
describe("Mergesort", function(){
    it("should sort correctly", function(){
        var ary = (Random.dice(20, 20))(mt);
        sorter.mergeSort(ary);
        for(let i = 1; i < ary.length; i++){
            ary[i].should.be.aboveOrEqual(ary[i - 1]);
        }
    });
    var ary;
    var studentArray;
    it("should sort correctly", function(){
        ary = (Random.dice(20, 20))(mt);
        var i = 0;
        console.log(ary);
        studentArray = ary.map(function(val){
            return new Student("a", {
                order: val,
                hidden: i++
                });
        });
        sorter.mergeSort(studentArray, Student.sortFunction(["order"]));
        console.log(studentArray);
        for(let i = 1; i < studentArray.length; i++){
            studentArray[i].chars.order.should.be.aboveOrEqual(studentArray[i -1].chars.order);
        }
    });
    it("should sort stably", function(){
        for(let i = 1; i < studentArray.length; i++){
            if(studentArray[i].chars.order == studentArray[i - 1].chars.order){
                studentArray[i].chars.hidden.should.be.aboveOrEqual(studentArray[i].chars.hidden);
            }
        }
        
    })
});


function generateRandomName(){
    string = rn.first();
    while((Random.bool())(mt)){
        string += " " + rn.middle();
    }
    string += " " + rn.last();
    return string;
   
}
