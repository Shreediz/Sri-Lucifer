const Validator = require('validator');
const isEmpty =require('./isEmpty');

module.exports = function checkInValidation(data)
{
    let errors={};
    data.reasonForLate=!isEmpty(data.reasonForLate)?data.reasonForLate:'';
    if(Validator.isEmpty(data.reasonForLate))
    errors.reasonForLate="Please enter your Reason for being late!";
    return {
        errors,
        isValid:isEmpty(errors)
    }
}