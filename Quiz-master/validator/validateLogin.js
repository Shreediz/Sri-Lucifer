const Validator = require('validator');
const isEmpty =require('./isEmpty');

module.exports = function validateLogin(data)
{
    let errors={};
    data.email=!isEmpty(data.email)?data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';
    if(!Validator.isEmail(data.email))
    errors.email="Please enter a valid email!";
    if(Validator.isEmpty(data.password))
    errors.password="Please enter your password!";
    return {
        errors,
        isValid:isEmpty(errors)
    }
}