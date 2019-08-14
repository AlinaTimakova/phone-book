import React from 'react';
import ReactDOM from 'react-dom';
import Contacts from './contacts'
import SearchContact from './search'


class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {first_name: ''};
        this.FirstNameChange = this.FirstNameChange.bind(this);
    }
    FirstNameChange(value){
        this.setState({first_name: value});
    } 
    render(){
        return (
            <div>
                <SearchContact  
                    first_name={this.state.first_name} 
                    onChangeFName={this.FirstNameChange}  
                ></SearchContact>
                <Contacts name={this.state.first_name}></Contacts>
            </div>)
    }
}

ReactDOM.render(<Book />, document.getElementById("root"));


