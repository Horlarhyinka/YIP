import Joi  from "joi";

class Validator{
    validateNewCustomerPayload(obj: Object){
        return Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            tel: Joi.string().required(),
            coord: Joi.object({lng: Joi.number().required(), lat: Joi.number().required()}).required()
        }).validate(obj)
    }
}

const validator = new Validator()

export default Object.freeze(validator)