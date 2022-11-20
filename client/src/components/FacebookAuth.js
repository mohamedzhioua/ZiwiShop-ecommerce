import React from 'react'
import FacebookLogin from 'react-facebook-login';

function FacebookAuth() {
    const responseFacebook = async (response) => {
        console.log(response);
      }
  return (
    <FacebookLogin
    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
    autoLoad={true}
    fields="name,email,picture"
    callback={(res) => responseFacebook(res)}
     
     />
      )
}

export default FacebookAuth