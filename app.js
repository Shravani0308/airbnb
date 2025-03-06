const express =require("express");
const app=express();
const mongoose =require("mongoose");
const Listing =require("../airbin/models/listing.js");
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");

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

app.get("/",(req,res)=>{
    res.send("hlo i am root");
});

//Index Route
app.get("/listings",async (req,res)=>{
   const allListings= await Listing.find({});
        res.render("listings/index.ejs",{allListings})
});

//new route
app.get("/listings/new", async (req,res)=>{
    res.render("listings/new.ejs")
   });

// show Route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    console.log(listing);

})
//create route
app.post("/listings",async(req,res)=>{
const newListing=new Listing(req.body.listing);
await newListing.save();
    res.redirect("/listings");
})

//Edit route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
});

//update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
  let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
   console.log(listing);
});

//delete router
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})


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
app.listen(8080,()=>{
    console.log("succcesfully connected");
})