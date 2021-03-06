"use strict";
let Random = require("random-js");
let rn = require("random-name");
let XLSX = require("xlsx");
let fs = require("fs");
let should = require("should");

let sorter = require("../statesorter.js");
let Student = require("../Student.js");

let mt = Random.engines.mt19937();
mt.seed(123);

let students;
describe("Reading Files", function() {
  it("Should open and read the file", function(done) {
    students = fs
      .readFileSync("tests/test.txt")
      .toString()
      .split("\n");
    students = students.map(function(str) {
      let studentData = str.split(";");
      let student = new Student(studentData[0], {
        Major: studentData[1],
        Gender: studentData[2]
      });
      return student;
    });
    done();
  });
});
describe("House Sorting", function(done) {
  let sorting;
  let total = 0;
  it("should work", function() {
    sorting = sorter.sort(
      students,
      ["Ursaia", "Nocturna", "Ianthe", "Triton", "Ankaa", "Saren"],
      ["Major", "Gender"],
      //            , ["Gender", "Major"]
      123
    );
  });
  describe("Every House", function() {
    it("Should have roughly the same number of people", function() {
      let houseNumbers = Object.values(sorting).map(house => house.length);
      let min = Math.min(...houseNumbers);
      let max = Math.max(...houseNumbers);
      (max - min).should.be.belowOrEqual(10);
    });
    it("Should have the same number of students", function() {
      total.should.equal(students.length);
    });
    it("Should have a balanced gender ratio", function(done) {
      let total_m = 0;
      let total_f = 0;
      let gender_numbers = Object.values(sorting).map(house => {
        let m = house.filter(student => student.chars.Gender == "M").length;
        let f = house.filter(student => student.chars.Gender == "F").length;
        total_m += m;
        total_f += f;
        return [m, f];
      });

      let gender_ratios = gender_numbers.map(([m, f]) => m / f);

      let overall_ratio = total_m / total_f;

      console.log(total_m, total_f);
      gender_ratios.forEach(function(ratio) {
        ratio.should.be.belowOrEqual(overall_ratio + 0.15);
        ratio.should.be.aboveOrEqual(overall_ratio - 0.15);
      });
      done();
    });
    it("Should have the same number of students", function() {
      total.should.equal(students.length);
    });
  });
  it("Should write the results to a file", function() {
    fs.open("tests/results.csv", "w+", function(err, file) {
      let names = Object.values(sorting).map(function(house, index) {
        let strAry = house.members.map(function(student) {
          return `${
            house.name
          },${student.name},${student.chars.Major},${student.chars.Gender}`;
        });
        return strAry.join("\n");
      });
      names = names.join("\n");
      fs.write(file, names, 0, 0, done);
    });
  });
});
describe("Mergesort", function() {
  it("should sort numbers correctly", function() {
    let ary = Random.dice(20, 20)(mt);
    sorter.mergeSort(ary);
    for (let i = 1; i < ary.length; i++) {
      ary[i].should.be.aboveOrEqual(ary[i - 1]);
    }
  });
  let ary;
  let studentArray;
  it("should sort students correctly", function() {
    ary = Random.dice(20, 20)(mt);
    let i = 0;
    studentArray = ary.map(function(val) {
      return new Student("a", {
        order: val,
        hidden: i++
      });
    });
    sorter.mergeSort(studentArray, Student.sortFunction(["order"]));
    for (let i = 1; i < studentArray.length; i++) {
      studentArray[i].chars.order.should.be.aboveOrEqual(
        studentArray[i - 1].chars.order
      );
    }
  });
  it("should sort students stably", function() {
    for (let i = 1; i < studentArray.length; i++) {
      if (studentArray[i].chars.order == studentArray[i - 1].chars.order) {
        studentArray[i].chars.hidden.should.be.aboveOrEqual(
          studentArray[i].chars.hidden
        );
      }
    }
  });
});

function generateRandomName() {
  string = rn.first();
  while (Random.bool()(mt)) {
    string += " " + rn.middle();
  }
  string += " " + rn.last();
  return string;
}
