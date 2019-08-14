import React from 'react'
import $ from "jquery";

class Contacts extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      error: null, // информация, есть ли ошибка
      isLoading: false, // флаг загрузки, когда true рендерится надпись "загрузка"
      data: [], // полученные данные
      /*  прокси - сервер https://cors-anywhere.herokuapp.com/ для обхода CORS  */
      url: "https://cors-anywhere.herokuapp.com/https://gorest.co.in/public-api/users/?first_name="
    };

  }
  getData(){
    const url = this.state.url;
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: url, 
      crossDomain: true,
      // установка header для авторизации 
      // пароль меняется каждые 15-20 минут
      beforeSend: function (xhr) {   
        xhr.setRequestHeader ('Authorization', "Bearer LkyyQTFjqRCgl4gSJtyQqlFBrVAU1u1OkJAP");
      },
      //при успешном выполнении запроса
      success: function(results){
        if(results._meta.code !== 200){
          console.log("Not Authorization");
          this.setState( {
            error: 1,
            isLoading: false
          });
        }
        else {
          this.setState({
            data: results.result,
            isLoading: false
          })
        }
      }.bind(this),

      error: function(status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const nextURL="https://cors-anywhere.herokuapp.com/https://gorest.co.in/public-api/users/?first_name="+nextProps.name;
    this.setState(
      {
        url: nextURL, //установка url с данными искомого контакта
        isLoading: true      
    },
      () => {this.getData()})
  }

  // автоматически вызывается React'ом после первоначальной отрисовки компонента
  componentDidMount(){ 
    this.setState({ isLoading: true }), // установка флага загрузки
    this.getData(); //получение данных
  }

  //рендеринг компонента
  renderContacts() {
    const {data, isLoading, error } = this.state
    if(error === null){ // если нет ошибок
      if (isLoading) {  // если данные загружаются, вывести "Загрузка..."       
        return (
          <tr>
            <td className="loading" colSpan="3">Загрузка...</td>   
          </tr>)
      } else {
        if(data.length === 0){ // если контакт не найден, вывести соответствующее сообщение 
          return (
            <tr>
              <td className="emptyResults" colSpan="3">Ничего не найдено! </td>   
            </tr>)
        }
        else{ // вывод данных контактов
          return data.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.phone}</td>
              </tr>
            )
          })
        }
      }
    }
    else{
      return (
      <tr>
        <td colSpan="3">ERROR CONNECTION...</td>
      </tr>)
    }
  }

  // рендеринг компонента
  render() {
      return (<div>
        <table>
        <thead>
          <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          { this.renderContacts() }                
        </tbody>
        </table>
        </div>
      );
  }
}
  export default Contacts;
