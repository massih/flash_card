import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';

class LoginPage extends Component {


  constructor(props, context) {
    super(props, context);
  }

  responseGoogle = (response) => {
    console.log(response);
  };


  render() {
    return (
    <div>
      <p> Welcome to FlashCard</p>
      <GoogleLogin
      clientId="383126329613-45ulgk9ffgg2ru39nv9qk8o8gvchc3gt.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    </div>
    // ,
    //   document.getElementById('googleButton')
    //
      );
  }

}

export default LoginPage;