"use strict";
var Random = require("random-js");

var Student = require("./Student.js");

var mt = Random.engines.mt19937();

/**
   * Sorts an array of Student objects 
   * @param {Array} studentArray - The array of Student objects
   * @param {Array} houseNames - The array of House Names
   * @param {Array} sortOrders - The properties to sort by, in order of priority
   * @param {integer} randomSeed - The random seed to be provided for the random number generator
    */
function sort(studentArray, houseNames, sortOrders, randomSeed){
    var numHouses = houseNames.length;
    var houses = Array(numHouses);
    var categories = {};

    mt.seed(randomSeed);
    Random.shuffle(mt, houseNames);
    for(var i = 0; i < numHouses; i++){
        houses[i] = {
            name: houseNames[i],
            members: []
        };
    }
    for(var i = 0; i < studentArray.length; i++){
        let cat = studentArray[i].chars[sortOrders[0]];
        if(categories[cat] == undefined){
            categories[cat] = (Random.integer(0, numHouses - 1))(mt);
        }
    }
    studentArray.sort(Student.sortFunction(sortOrders));
    for(i = 0; i < studentArray.length; i++){
        let cat = studentArray[i].chars[sortOrders[0]];
        houses[categories[cat]].members.push(studentArray[i]);
        categories[cat] = (categories[cat] + 1) % numHouses;
    }
    return houses;
}

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
