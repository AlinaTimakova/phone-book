import React from 'react'
import $ from "jquery";

class SearchContact extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '', // first_name вводимое пользователем
      typingTimeout: 0 // тайм-аут ввода
    }
    this.changeName = this.changeName.bind(this);
  }
  //вызывается при изменении инпута  
  //При вводе имени происходит задержка 2 секунды и поиск контакта по first_name
  changeName = (event) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      name: event.target.value,
      typingTimeout: setTimeout(function () {
          self.handleChange(self.state.name);
        }, 2000)
    });
}

  handleChange = () => {
    this.props.onChangeFName(this.state.name)    
}      

//рендеринг компонента
  render() {
    return (
      <form>
          <input type="text" id="myinput" 
              onChange={this.changeName} 
              placeholder="Введите имя"
            />
      </form>
    );
  }
}

export default SearchContact;
