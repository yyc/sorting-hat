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
    var randomHouse = Random.integer(0, numHouses - 1);

    mt.seed(randomSeed);
    Random.shuffle(mt, houseNames);
    //Randomize house names
    for(var i = 0; i < numHouses; i++){
        houses[i] = {
            name: houseNames[i],
            members: []
        };
    }
    //populate each categories entry with a starting house
    for(var i = 0; i < studentArray.length; i++){
        for(var j = 0; j < sortOrders.length; j++){
            let prop = studentArray[i].chars[sortOrders[j]];
            if(categories[prop] == undefined){
                categories[prop] = randomHouse(mt);
            }
        }
    }

    //Reseed, so additional categories don't affect later sorting
    mt.seed(randomSeed)
    mergeSort(studentArray, Student.sortFunction(sortOrders));
    for(i = 0; i < studentArray.length; i++){
        let prop = studentArray[i].chars[sortOrders[studentArray.length - 1]];
        if(categories[prop] == undefined){
            categories[prop] = randomHouse(mt);
        }
//        console.log(categories)
        var cat = studentArray[i].chars[sortOrders[0]];
  //      console.log(cat)
        houses[categories[cat]].members.push(studentArray[i]);
        categories[cat] = (categories[cat] + 1) % numHouses;
    }
    return houses;
}

function findNext(categories, sortOrders, chars){
    if(sortOrders.length == 1){
      return categories[chars[sortOrder[0]]]
    } else{
      return findNext(categories[chars[sortOrder[0]]], sortOrder.slice(1), chars)
    }
}
//Recursively set the empty space (lazily evaluated)
function setNext(categories, sortOrders, chars, val_fn){
  if(sortOrders.length == 1){
    if(categories[chars[sortOrder[0]]] == undefined){

    }
  } else{
    return findNext(categories[chars[sortOrder[0]]], sortOrder.slice(1), chars)
  }
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
