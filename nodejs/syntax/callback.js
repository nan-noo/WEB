var a = function(){
    console.log('B');
};

function slowfunc(callback){
    console.log('A');
    callback();
}

slowfunc(a); //AB