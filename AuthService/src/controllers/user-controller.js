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
        return res.status(error.statusCode).json({
            message : error.message,
            data : {},
            success : false,
            err : error.explanation,
        })
    }
}

const signIn = async (req,res)=>{
    try {
        const response  = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            succes : true,
            data : response,
            err : {},
            message : "SignIn Success"
        });
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

const isAuthenticated = async (req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response= userService.verifyToken(token);
        return res.status(200).json({
            succes : true,
            err :{},
            data : response,
            message : "User is authenticated and token is valid"
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

const isAdmin = async (req,res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);

        // const response= userService.verifyToken(token);
        return res.status(200).json({
            succes : true,
            err :{},
            data : response,
            message : "Successfully fetched whether user is Admin or Not"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Successfully fetched whether user is admin or not",
            data : {},
            success : false,
            err : error,
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin 
}