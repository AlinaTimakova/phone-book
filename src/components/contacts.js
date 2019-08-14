import React from 'react'

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
    const bearer = 'Bearer GOoM5CZ16G2N4mS1-Z8C4kNeKRxtEQ2PdObh';
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'}
      }).then(response=> {  
          console.log(url);
          if (response.status !== 200) {
            if(response.status===404){
              console.log("Not Authorization");
              return;
            }
            console.log(response);  
            console.log('Not. Status Code: ' +  response.status); 
              this.setState( {
                error: 1,
                isLoading: false
              }); 
            return;  
          }
          // Examine the text in the response  
          response.json().then(response=>{
            console.log(response); 
            this.setState({
              data: response.result,
              isLoading: false
            }) 
        })
      }).catch(error => this.setState({ isLoading: false }));
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
