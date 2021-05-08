import { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){ //render보다 먼저 실행, 조건에 따라 render 실행 여부 결정 -> 의미없는 render 방지
      console.log('TOC shouldComponentUpdate')
      if(this.props.data === newProps.data) return false;
      else return true;
    }
    render() {
      console.log('TOC render');
      var lists = [];
      var data = this.props.data;

      var i = 0;
      while(i < data.length){
        lists.push(
          <li key={data[i].id}>
              <a 
                href={"/content/"+data[i].id}
                //data-id={data[i].id}  // data-로 시작하는 속성은 e.target.dataset 에서 찾을 수 있음
                onClick={function(id, e){ //e는 계속 밀림 
                  e.preventDefault();
                  this.props.onChangePage(id); // 문자열이 매개변수로 들어감
                }.bind(this, data[i].id)} // 뒤에 인자 추가하면 매개변수로 들어감
              >{data[i].title}</a>
          </li>
        );
        i = i + 1;
      }

      return (
        <nav>
              <ul>
                  {lists}
              </ul>
        </nav>
      );
    }
}

export default TOC;