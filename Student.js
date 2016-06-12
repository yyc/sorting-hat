function Student(_name, _chars){
    this.name = _name;
    this.chars = _chars;
}

module.exports = Student;

Student.sortFunction = function(attr){
    return function(a, b){
        for(i = 0; i < attr.length; i++){
            if(a.chars[attr[i]] < b.chars[attr[i]]){
                return -1;
            } else if(a.chars[attr[i]] > b.chars[attr[i]]){
                return 1;
            }
        }
        return 0;
    }
}
Student.prototype.getW
