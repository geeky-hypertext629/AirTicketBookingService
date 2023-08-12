const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserRepository = require('../repository/user-repository');

const { JWT_KEY } = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');


class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name === 'SequelizeValidationError')
            {
                throw error;
            }
        //   console.log("Something went wronng in the service layer") ;
        //   throw new AppErrors('ServerError','Something went wrong in service',
        //   'Logical issue found',500);  
        throw error;
        } 
    }
    async signIn(email, plainPassword){
        try {
            // step -1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step -1 -> Comapare incoming plain password with stored encrypted password
            const passwordsMatch =  this.checkPassword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log("Passwords doesnt match");
                throw {error : "Incorrect Password"}
            }
            const newJWT = this.createToken({email:user.email,id : user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the Sign In Process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response)
            {
                throw {error : 'Invalid Token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user)
            {
                throw {error : 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the Auth Process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error
        }
    }

    verifyToken(token){
        try {
            const response  = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation",error);
            throw error
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;

        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in Service Layer");
            throw error;
        }
    }
}

module.exports = UserService;