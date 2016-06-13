var RankedCollection = require("./rankedcollection.js");

/*
  A table keeps track of the rank of each house in in the n
*/
function Table(attributes){
  this.attributes = attributes;
  this.table = {};
  for(var i = 0; i < attributes.length; i++){
    this.table[attributes[i]] = {};
  }
}
Table.prototype.addHouse = function(houseName, studentArray){
  var self = this;
  studentArray.forEach(function(student){
    self.addPerson(houseName, student);
  });
}
Table.prototype.addPerson = function(houseName, student){
  for(var i = 0; i < this.attributes.length; i++){
    attr = this.attributes[i];
    if(this.table[attr][student.chars[attr]] == undefined){
      this.table[attr][student.chars[attr]] = new RankedCollection();
    }
    this.table[attr][student.chars[attr]].increment(houseName);
  }
}
Table.prototype.getRank = function(houseName, student){
  var rank = 0;
  for(var i = 0; i < this.attributes.length; i++){
    attr = this.attributes[i];
    if(this.table[attr][student.chars[attr]] == undefined){
      this.table[attr][student.chars[attr]] = new RankedCollection();
    }
    rank = (rank * 10) + this.table[attr][student.chars[attr]].getRank(houseName, student)
  }
  return rank;
}


module.exports = Table;
