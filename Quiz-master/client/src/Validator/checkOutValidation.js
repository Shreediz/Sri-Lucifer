const Validator = require('validator');
const isEmpty =require('./isEmpty');

module.exports = function checkOutValidation(data)
{
    let errors={};
    data.checkOutTime=!isEmpty(data.checkOutTime)?data.checkOutTime:'';
    data.reasonForEarly=!isEmpty(data.reasonForEarly)?data.reasonForEarly:'';
    if(Validator.isEmpty(data.reasonForEarly))
    errors.reasonForEarly="Error in Providing the Check In time";
    if(Validator.isEmpty(data.reasonForEarly))
    errors.reasonForEarly="Please enter your Reason for being late!";
    return {
        errors,
        isValid:isEmpty(errors)
    }
}