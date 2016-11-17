import React, {Component} from 'react';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.handleLoginEvent = this.handleLoginEvent.bind(this);

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

  handleRegisterEvent(event) {
    //Onbutton click
    if (event.type === "click" ) {
      //Get the values from the textboxes
      var name = this.refs.username.value.trim();
      var passwd = this.refs.passwd.value.trim();
      //Stop the normal form sending action (page reload, POST, etc)
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      //Verify the user with given info
      this.props.addUserFunc(name, passwd);
    }
  }



  // render() {
  //         return (
  //           <div className='navbar-header navbar navbar-lg' >
  //           <div>
  //             <a href="#" className="navbar-brand ">Recipe Manager</a>
  //           </div>
  //               <div className="navbar-form navbar-right">
  //                 <Login />
  //       </div>
  //     </div>
  //
  //         );
  //     }

  render() {

    if(!this.props.hasUser){
      return (
        <div className="header">
          <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Recipe Manager</a>
            </div>
            <form className="navbar-form navbar-right" action="#" role="login">
              <div className="form-group">
                <div className="input-group form-control">
                  <input type="text" name="username" ref='username' placeholder='Username'/>
                  <input type="text" name="passwd" ref='passwd' placeholder='Password'/>
                  <span className="input-group-btn">

                    <button className="btn btn-block btn-lg btn-primary" onClick={this.handleLoginEvent.bind(this)}>Logon</button>
                    <button className="btn btn-block btn-lg btn-primary" onClick={this.handleRegisterEvent.bind(this)}>Register</button>
                  </span>
                </div>
              </div>
            </form>
          </nav>
        </div>
      );
    }else{
      return (
        <div className="header">
          <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Recipe Manager</a>
            </div>
            <p className="navbar-text navbar-right">Welcome {this.props.sessionKey}</p>
          </nav>
        </div>
      );
    }
  }
}
