const Listing =require("../models/listing");
const Review =require("../models/review");


module.exports.CreateReview =async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
   newReview.author=req.user._id;
   console.log(newReview);
    listing.reviews.push(newReview);
   
   await newReview.save();
   await listing.save();
   req.flash("success","New Review Created");
   //console.log("new review saved");
   //res.send("good it is sent")
   res.redirect(`/listings/${listing._id}`);
   }

   module.exports.destroyReview=async (req, res) => {
              let { id, reviewId } = req.params;
              id = id.trim();
              reviewId = reviewId.trim();
              await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });   
              await  Review.findByIdAndDelete(reviewId);
              req.flash("success","Review Deleted!");
      res.redirect(`/listings/${id}`);
          };