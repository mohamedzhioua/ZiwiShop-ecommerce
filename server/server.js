const express = require ('express') ; 


//load env variables
require('dotenv').config()

 const app = express ()
 const PORT = 3000 || process.env.PORT 


// parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));









 app.listen(PORT, function () {
    console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
  });