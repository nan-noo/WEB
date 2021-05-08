import React, {Component} from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }
    this.InputFormHandler = this.InputFormHandler.bind(this)
  }

  InputFormHandler(e){
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    console.log('UpdateContent render');
    return (
      <article>
            <h2>Update</h2>
            <form action="/update_process" method="post"
              onSubmit={function(e){
                e.preventDefault();
                this.props.onSubmit(
                  this.state.id,
                  this.state.title, 
                  this.state.desc
                );
              }.bind(this)}
            >
              <input type="hidden" name="id" value={this.state.id}></input>
              <p>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="title" 
                  value={this.state.title}
                  onChange={this.InputFormHandler}
                ></input>
              </p>
              <p>
                <textarea 
                  onChange={this.InputFormHandler}
                  name="desc" 
                  placeholder="description" 
                  value={this.state.desc}>
                </textarea>
              </p>
              <p><input type="submit"></input></p>
            </form>
      </article>
    );
  }
}

export default UpdateContent;