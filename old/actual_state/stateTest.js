"use strict";

var houses = ["Verde", "Aether", "Nox", "Angstrom", "Sigvar", "Hydra"];
// var sortOrder = [ "(Q17_2) 8. Orientation Camp (4 to 7 July 2016) [Question: RSVP for USC FOP 2016 EventsOrientation Camp Fees: $60Orientation Week Fees: $70Bundle Price (Orientation Camp + Orientation Week): $90]",
//   "CampGender", "(Q3) 2. Sex", "Faculty"];
var sortOrder = ["(Q3) 2. Sex", "Faculty"];
var unsortedFile = "actual_state/4-8.txt";
//var sortedFile = "actual_state/Scholaris.csv"; //can leave blank
var resultsFile = "actual_state/results.tsv";

var Random = require("random-js");
var rn = require("random-name");
var fs = require("fs");
var should = require("should");

var sorter = require("../statesorter.js");
var Student = require("../Student.js");

var headers;

var sortedStudents = {};
var unsortedStudents = [];
houses.forEach(function(house){
  sortedStudents[house] = [];
});
describe("Reading Files", function(){
    it("Should open and read the files", function(done){
        var students = fs.readFileSync(unsortedFile).toString().trim().split("\r");
        headers = students.shift().split("	");
        students.forEach(function(str){
            var studentData = str.split("	");
            var chars = {};
            headers.map(function(header, index){
              chars[header] = studentData[index];
            });
            //reduceFaculty(chars);
            if(chars['Faculty'] == undefined){
//              console.log(chars);
            }
            chars['OWeekGender'] = chars['(Q17_3) 8. Orientation Week (19 to 22 July 2016) [Question: RSVP for USC FOP 2016 A1:AC152 Camp Fees: $60Orientation Week Fees: $70Bundle Price (Orientation Camp + Orientation Week): $90]'] + chars['(Q3) 2. Sex'];
            var student = new Student(chars['(Q1_1) 1. Name'],chars);
            if(chars['House'] != "#N/A" && chars['House'] != ""){
              // Student is already sorted
              console.log(chars['(Q1_1) 1. Name'], chars['House']);
              sortedStudents[chars['House']].push(student);
            } else{
              // Student is unsorted
              unsortedStudents.push(student)
            }
        });
          // console.log(sortedStudents);
        // if(sortedFile != ""){
        //   students = fs.readFileSync(sortedFile).toString().split("\n");
        // } else{
        //   students = [];
        // }
        // if(students.length > 1){
        //   headers = students.shift().split("	");
        //   houses.forEach(function(house)){
        //     sortedStudents[house] = [];
        //   });
        //   students.forEach(function(str){
        //       var studentData = str.split(";");
        //       var chars = {};
        //       headers.map(function(header, index){
        //         chars[header] = studentData[index];
        //       });
        //       var student = new Student(studentData[0],chars);
        //       houses[student.chars.house].push(student);
        //   });
        //
        // }
        done();
    });
});
describe("House Sorting", function(done){
    var sorting;
    var total = 0;
    it("should work", function(){
        sorting = sorter.sort(unsortedStudents
            , houses
            , sortOrder
            , 123,
            sortedStudents);
    });
    // describe("Every House", function(){
    //     it("Should have roughly the same number of people", function(){
    //         var min = sorting[0].members.length;
    //         var max = sorting[0].members.length;
    //         sorting.forEach(function(house){
    //             min = Math.min(min, house.members.length);
    //             max = Math.max(max, house.members.length);
    //             total += house.members.length;
    //         });
    //         (max - min).should.be.belowOrEqual(10);
    //     });
    //     it("Should have the same number of students", function(){
    //         total.should.equal(students.length);
    //     });
    //     it("Should have a balanced gender ratio", function(done){
    //         var total_m = 0;
    //         var total_f = 0;
    //         var gender_ratios = sorting.map(function(house){
    //             var m = 0;
    //             var f = 0;
    //             house.members.forEach(function(student){
    //                 if(student.chars['(Q3) 2. Sex'] == "Male"){
    //                     m++;
    //                 } else if(student.chars['(Q3) 2. Sex'] == "Female") {
    //                     f++;
    //                 }
    //             });
    //             total_m += m;
    //             total_f += f;
    //             console.log(house.name, m / f);
    //           return m / f;
    //         });
    //         var overall_ratio = total_m / total_f;
    //         console.log(total_m, total_f);
    //         gender_ratios.forEach(function(ratio){
    //             ratio.should.be.belowOrEqual(overall_ratio + 0.15);
    //             ratio.should.be.aboveOrEqual(overall_ratio - 0.15);
    //         });
    //         done();
    //     });
    //     it("Should have the same number of students", function(){
    //         total.should.equal(students.length);
    //     });
    // });
    it("Should write the results to a file", function(){
      // Remove faculty questions
      headers = headers.concat(facultyQuestions)
                         .filter(function (item, index, array) {
                             return array.indexOf(item) == array.lastIndexOf(item);
                         });
      headers.push("Faculty");
        fs.open(resultsFile, "w+", function(err, file){
            var names = houses.map(function(houseName){
                return sorting[houseName].map(function(student){
                    return headers.map(function(header){
                      return student.chars[header];
                    }).join('	');
                }).join("\n");
            }).join("\n");
            names = headers.join('	') + '\n' + names;
            fs.write(file, names, 0, 0, done);
        });
    });
});

var facultyQuestions = ['"(Q5_1) 5. Arts and Social Sciences [Question: Faculty (You may choose more than one, if applicable)]"',
'"(Q5_5) 5. School of Business [Question: Faculty (You may choose more than one, if applicable)]"',
'"(Q5_2) 5. Engineering [Question: Faculty (You may choose more than one, if applicable)]"',
'"(Q5_4) 5. Science [Question: Faculty (You may choose more than one, if applicable)]"',
'"(Q5_3) 5. Law [Question: Faculty (You may choose more than one, if applicable)]"',
'"(Q5_6) 5. School of Computing [Question: Faculty (You may choose more than one, if applicable)]"',
'"(Q5_7) 5. School of Design and Enviornment [Question: Faculty (You may choose more than one, if applicable)]"'];
function reduceFaculty(chars){
  for(var i = facultyQuestions.length - 1; i >= 0; i--){
    if(chars[facultyQuestions[i]] != '-'){
      chars['Faculty'] = chars[facultyQuestions[i]];
    }
    delete chars[facultyQuestions[i]];
  }
}
