import React, {Component} from 'react';


export default class Header extends Component {

  constructor(props){
    super(props);
    //Initial state of the app onLoa

  }


  render(){
    if(this.props.hasUser){
      return(


        <div className="header">

          <nav className="nav navbar-header">
            <a className="navbar-brand">Recipe Manager</a>
            <a className="nav-link active" href="#">Pantry</a>
            <a className="nav-link" href="#">Settings</a>
          </nav>
      </div>
      );
    }else{
      return(
        <div className="header">

          <nav className="nav navbar-header">
            <a className="navbar-brand">Recipe Manager</a>
            <Login userAuthFunc={this.props.userAuthFunc} />
          </nav>
      </div>



    );
    }
  }
}



export class Login  extends Component {

  constructor(props){
    super(props);
    //Initial state of the app onLoa

  }

  handleLoginEvent(event){
    //Onbutton click or enter key press
    if (event.type === "click" || (event.keyCode && event.keyCode === 13)) {
      //Get the values from the textboxes
      var name = this.refs.username.value.trim();
      var passwd = this.refs.passwd.value.trim();
      //Stop the normal form sending action (page reload, POST, etc)
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      //Verify the user with given info
      this.props.userAuthFunc(name, passwd);
    }
  }


render(){
  return(
    <div className="login navbar-header navbar navbar-inverse navbar-embossed navbar-lg">
      <form>
        <input type="text" className='form-control box' name="username" ref='username' placeholder='Username'/>
        <input type="text" className='form-control box' name="passwd" ref='passwd' placeholder='Password'/>
        <button
          className="btn btn-block btn-lg btn-primary"
          onClick={this.handleLoginEvent.bind(this)}>Logon</button>
        </form>
      </div>
    );
  }

}
