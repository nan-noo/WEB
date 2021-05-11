var f = function(){
    console.log('A');
    console.log('B');
}

var arr = [f];
var obj = {
    func: f
}

arr[0]();
obj.func();