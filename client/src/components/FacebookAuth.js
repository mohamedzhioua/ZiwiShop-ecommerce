import React from 'react'
import FacebookLogin from 'react-facebook-login';

function FacebookAuth() {
    const responseFacebook = (response) => {
        console.log(response);
      }
  return (
    <FacebookLogin
    appId="696398112098618"
    autoLoad={true}
    fields="name,email,picture"
     callback={responseFacebook} />
      )
}

export default FacebookAuth