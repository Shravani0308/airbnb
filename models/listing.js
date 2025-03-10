const mongoose =require("mongoose");
const review = require("./review");
const Schema =mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    description:String,
    image: {
        filename:{
        
            type: String,
        default:"listingimage"},
        url:{type:String,
            default:
              "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/",
            set: (v) =>
              v === ""
                ? "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/"
                : v,
          }} ,
        
    // image: {  // ✅ Ensure this is NOT an ObjectId
    //     url: String,
    //     filename: String
    // },
    
    price:
        Number,
    
    location:
        String,
    

    country:
        String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
              ref:"Review",
        }
    ]
});

const Listing =mongoose.model("Listing", listingSchema);

module.exports= Listing;