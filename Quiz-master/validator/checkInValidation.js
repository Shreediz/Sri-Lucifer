const Validator = require('validator');
const isEmpty =require('./isEmpty');

module.exports = function checkInValidation(data)
{
    let errors={};
    data.checkInTime=!isEmpty(data.checkInTime)?data.checkInTime:'';
    data.reasonForLate=!isEmpty(data.reasonForLate)?data.reasonForLate:'';
    if(Validator.isEmpty(data.reasonForLate))
    errors.email="Error in Providing the Check In time";
    if(Validator.isEmpty(data.password))
    errors.password="Please enter your Reason for being late!";
    return {
        errors,
        isValid:isEmpty(errors)
    }
}