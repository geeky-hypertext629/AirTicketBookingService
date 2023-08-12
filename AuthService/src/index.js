const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig.js');

const apiRoutes = require('./routes/index.js');
const db = require('./models/index');
// const { User, Role } = require('./models/index')


// const UserRepository = require('./repository/user-repository.js')

// const UserService = require('./services/user-service.js');



const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api', apiRoutes)

    app.listen(PORT, async () => {
        console.log(`Server Started om PORT = ${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({alter : true})
        }

        // const u1 = await User.findByPk(7);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        // const response = await u1.getRoles();
        // const response = u1.hasRole(r1);
        // console.log(response)

        // console.log(response);


    })
}

prepareAndStartServer();