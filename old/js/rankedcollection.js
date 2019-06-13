function RankedCollection(){
  this.list = [];
}
RankedCollection.prototype.increment = function(name){
  var found = false;
  for(var i = 0; i < this.list.length; i++){
    if(name == this.list[i].name){
      this.list[i].value++;
      found = true;
      break;
    }
  }
  if(!found){
    this.list.push({
      name: name,
      value: 1
    })
  }
}
RankedCollection.prototype.getRank = function(name){
  listSort(this.list);
  for(i = 0; i < this.list.length; i++){
    if(this.list[i].name == name){
      return i;
    }
  }
  return this.list.push({
    name: name,
    value: 0
  }) - 1; // New index, which is at the end
}

function listSort(list){
  for(var j = 0; j < list.length - 1; j++){
    var swaps = 0;
    for(var i = j; i < list.length - 1; i++){
      if(list[i].value < list[i + 1].value){
        var temp = list[i];
        list[i] = list[i + 1];
        list[i + 1] = temp;
        swaps ++;
      }
    }
    if(swaps == 0){
      break;
    }
  }
}
module.exports = RankedCollection;
