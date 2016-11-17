import React, {Component} from 'react';

export default class Header extends Component {

    constructor(props) {
        super(props);
        //Initial state of the app onLoa

    }



render() {
        return (
          <div className='navbar-header navbar navbar-lg' >
          <div>
            <a href="#" className="navbar-brand ">Recipe Manager</a>
          </div>
              <div className="navbar-form navbar-right">
                <Login />
      </div>
    </div>

        );
    }
}

export class Login extends Component {

    constructor(props) {
        super(props);
        //Initial state of the app onLoa

    }

    handleLoginEvent(event) {
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

    render() {
        return(
          <div className="form-group navbar-form ">
            <form>
              <input type="text"  name="username" ref='username' placeholder='Username'/>
              <input type="text" name="passwd" ref='passwd' placeholder='Password'/>
              <button
                className="btn btn-block btn-lg btn-primary"
                onClick={this.handleLoginEvent.bind(this)}>Logon</button>
              </form>
            </div>
          );
        }


}
