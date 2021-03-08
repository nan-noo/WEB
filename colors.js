var Color = {
    "setColorAll": function(tag, color){
        // var i = 0;
        // var list = document.querySelectorAll(tag);

        // while(i < list.length){
        //     list[i].style.color = color;
        //     i = i + 1;
        // }

        //using jquery
        $(tag).css('color', color);
    },
    "setColor": function(tag, color){
        // document.querySelector(tag).style.color = color;
        //using jquery
        $(tag).css('color', color);
    },
    "setBgColor": function(tag, color){
        // document.querySelector(tag).style.backgroundColor = color;
        //using jquery
        $(tag).css('backgroundColor', color);
    }
}

function nightDayHandler(self){
    if(self.value === 'night'){
        Color.setBgColor('body', 'black');
        Color.setColor('body', 'white');
        self.value = 'day';
        Color.setColorAll('a', 'powderblue');
    }
    else{
        Color.setBgColor('body', 'white');
        Color.setColor('body', 'black');
        self.value = 'night';
        Color.setColorAll('a', 'blue');
    }
}