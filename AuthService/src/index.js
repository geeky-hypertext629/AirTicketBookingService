const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');

const apiRoutes = require('./routes/index.js');

const UserRepository = require('./repository/user-repository.js')

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api', apiRoutes)

    app.listen(PORT,async ()=>{
        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        
        console.log(`Server Started om PORT = ${PORT}`)
        // console.log(response);
    })
}

prepareAndStartServer();