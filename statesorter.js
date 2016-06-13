"use strict";
var Random = require("random-js");

var Student = require("./Student.js");
var Table = require("./table.js");

/**
   * Sorts an array of Student objects
   * @param {Array} studentArray - The array of Student objects
   * @param {Array} houseNames - The array of House Names
   * @param {Array} sortOrders - The properties to sort by, in order of priority
   * @param {Integer} randomSeed - A 32-bit integer random seed
   * @param {Object} existingSort - If there is an existing sort, an object with
    keys corresponding to house names and Student Array values
    */
function sort(studentArray, houseNames, sortOrders, randomSeed, existingSort){
    if(existingSort == undefined){
      existingSort = {};
    }
    var numHouses = houseNames.length;
    var houses = Array(numHouses);
    var categories = {};
    var table = new Table(sortOrders);
    //Randomize house names
    mt.seed(randomSeed);
    Random.shuffle(mt, houseNames);
    // Add in people from the existing sort
    houseNames.forEach(function(houseName){
      if(existingSort[houseName] != undefined){
        table.addHouse(houseName, existingSort[houseName]);
      } else{
        existingSort[houseName] = [];
      }
    });
    //Reseed, so additional categories don't affect later sorting
    mt.seed(randomSeed)
    mergeSort(studentArray, Student.sortFunction(sortOrders));

    var houseIndex = 0;

    // Iterate until all students are sorted
    while(studentArray.length > 0){
      let houseName = houseNames[houseIndex];
      let student = extractMax(table, studentArray, houseName);
      existingSort[houseName].push(student);
      table.addPerson(houseName, student);
      houseIndex = (houseIndex + 1) % numHouses;
    }
    return houses;
}

// Extracts and returns the student in studentArray with the greatest table
// rank with respect to the specified house
function extractMax(table, studentArray, houseName){
  var currentRank = table.getRank(houseName, studentArray[0]);
  var newRank = 0;
  for(var i = 0; i < studentArray.length - 1; i++){
    newRank = table.getRank(houseName, studentArray[i + 1]);
    if(currentRank > newRank){
      let temp = studentArray[i];
      studentArray[i] = studentArray[i + 1];
      studentArray[i + 1] = temp;
    } else{
      currentRank = newRank;
    }
  }
  return studentArray.pop();
}


/*  Implemetation of Stable Mergesort
    @param {Array} ary - The array of items to sort
    @param {Array} compareOption - (Optional) The compare


    */

// Enable optional parameters when Node supports it
//function mergeSort(ary, compareFunction=function(a, b){ return a - b;}, start = 0, end = -1, ary2 = []){
function mergeSort(ary, compareFunction, start, end, ary2){
    //For now, implement optional parameters manually
    compareFunction = compareFunction || function(a, b){ return a - b;};
    start = start || 0;
    if(end == undefined || end == -1){
        end = ary.length - 1;
    }
    if(ary2 == undefined){
        ary2 = [];
    }
    if(start >= end){
        return;
    } else{
        let mid = (start>>1) + (end>>1);
        for(let i = start; i <= end; i++){
            ary2[i] = ary[i];
        }
        mergeSort(ary2, compareFunction, start, mid, ary);
        mergeSort(ary2, compareFunction, mid + 1, end, ary);
        let i = start;
        let left = start;
        let right = mid + 1;
        while(left <= mid || right <= end){
            if(left > mid){
                ary[i++] = ary2[right++];
            } else if(right > end){
                ary[i++] = ary2[left++];
            }
            else if(compareFunction(ary2[left], ary2[right]) <= 0){
                ary[i++] = ary2[left++];
            } else{
                ary[i++] = ary2[right++];
            }
        }
        return;
    }
}

module.exports.sort = sort;
module.exports.mergeSort=  mergeSort;
