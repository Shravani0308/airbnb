const Joi = require('joi');
const Listing = require('./models/listing.js');
const Review =require("./models/review.js")

module.exports.listingSchema =Joi.object({
    listing:Joi.object().required({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null)
    }).required(),
});

module.exports.reviewSchema =Joi.object({
    review:Joi.object({
       rating:Joi. number().required().min(1).max(5),
       comment:Joi.string().required()
    }).required()
});