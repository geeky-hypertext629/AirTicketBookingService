const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');

const apiRoutes = require('./routes/index.js');

// const UserRepository = require('./repository/user-repository.js')

// const UserService = require('./services/user-service.js');



const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api', apiRoutes)

    app.listen(PORT, async ()=>{
        console.log(`Server Started om PORT = ${PORT}`);

        // await createUser();
        // const service = new UserService();
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjkxNjkwMDI3LCJleHAiOjE2OTE2OTM2Mjd9.ffUjytA-LcGYTBHt-rT5Vl5RI5hyOsy82OsElJ9OSnI'
        // const response = service.verifyToken(token);
        // console.log(response);

     })
}

prepareAndStartServer();