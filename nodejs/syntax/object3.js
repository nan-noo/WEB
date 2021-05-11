// var v1 = 'v1';
// // ... //
// var v2 = 'v2';

var obj = {
    v1: 'v1',
    v2: 'v2',
    f1: function(){ // 화살표 함수는 메소드 함수가 아닌 곳에 적합
        console.log(this.v1); // this가 가리키는 것은 함수 호출 방법에 따라 달라짐 
    },
    f2: function(){
        console.log(this.v2);
    }
}

obj.f1();
obj.f2();

// 기본적으로 this는 전역객체에 binding됨. 전역함수뿐만 아니라 내부함수, callback함수도 전역객체에 binding
// .bind()를 이용해서 this를 지정해 줄 수도 있지만, 화살표 함수 사용 권장
// 화살표 함수는 자신의 this가 없음. 대신 화살표 함수를 둘러싸는 lexical scope의 this가 사용됨 (바로 바깥 범위의 this를 찾음)
