import React from 'react'

function Signup() {
  return (
    
    <div class="signup">
    <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
       <h1>Inscription <i class="fa-solid fa-user"></i></h1>
       <form class="form-group" >
          
          <input type="text" class="form-control" placeholder="username" />
          <input type="email" class="form-control" placeholder="Email" />
          <input type="password" class="form-control" placeholder="Password" />
          <p>Already have an account? <a href="/">Sign in here</a>
          </p>
       </form>
    </div>
 </div>

   )
}

export default Signup