const express =require("express");
const app=express();
const mongoose =require("mongoose");
const Listing =require("../airbin/models/listing.js");
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync =require("./utils/wrapAsync.js");
const ExpressError =require("./utils/ExpressError.js")
const cors = require("cors");
const {listingShema, reviewSchema}=require("./schema.js");
const { error } = require("console");
const Review =require("./models/review.js")


const MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust';
main()
.then(()=>{
    console.log("connected to DB")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("views engine ","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hlo i am root");
});

//Index Route
app.get("/listings",wrapAsync(async (req,res)=>{
   const allListings= await Listing.find({});
        res.render("listings/index.ejs",{allListings})
}));

//new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
   });

   const validateListing =(req,res,next)=>{
    let (error) =  listingSchema.valid(req.body);

     if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
     } else{
        next();
     }
   }

   const validateReview =(req,res,next)=>{
    let (error) =  reviewSchema.valid(req.body);

     if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
     } else{
        next();
     }
   }

// show Route
app.get("/listings/:id",wrapAsync(async (req,res,)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    console.log(listing);

}));
//create route
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
  
        const newListing=new Listing(req.body.listing);
        
        await newListing.save();
        res.redirect("/listings");
}));




//Edit route
app.get("/listings/:id/edit",wrapAsync( async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
}));

//update route
app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id}=req.params;
  let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
   console.log(listing);
}));

//delete router
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

//review
//post  route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
 let listing= await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);

 listing.reviews.push(newReview);

await newReview.save();
await listing.save();

//console.log("new review saved");
//res.send("good it is sent")
res.redirect(`/listings/${listing._id}`);
}));

// app.get("/testListing",async (req,res)=>{
//    let sampleListings = new Listing({
//       title:"My New villa",
//       description:"By the beach",
//       image:"https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?t=st=1738305169~exp=1738308769~hmac=66458cd7c4f7ec3f809f227c65170fcb8069e46802245eb3c7186c1eefd9f88c&w=900",
//       price:1200,
//       location:"Calangute,Goa",
//       country:"India"
//    });
//     await sampleListings.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{

   let {statusCode =500,message="Something went wrong!"}=err;
   res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("succcesfully connected");
})