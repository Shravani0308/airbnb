const mongoose =require("mongoose");
const Review = require("./review.js");
const review = require("./review.js");
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

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in :listing.reviews}})

    }
});

const Listing =mongoose.model("Listing", listingSchema);

module.exports= Listing;