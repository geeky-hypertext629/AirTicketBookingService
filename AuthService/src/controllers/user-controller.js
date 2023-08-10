const UserService = require('../services/user-service');


const userService = new UserService();

const create = async (req,res)=>{
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password,
        })
        return res.status(201).json({
            message :   'Successfully created a new user' ,
            err : {},
            data : response,
            success : true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Something went wrong in controller",
            data : {},
            success : false,
            err : error,
        })
    }
}

module.exports = {
    create
}