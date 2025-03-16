const  express =require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });


const listingController =require("../controllers/listing.js")


router
.route("/")
.get(wrapAsync(listingController.index))
 .post(isLoggedIn,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.createListing));



//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put( isLoggedIn,isOwner,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.upadateListing))
.delete(isLoggedIn,wrapAsync(listingController.destroyListing));



   
   
   
   
   //Edit route
   router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync( listingController.renderEditForm));
   
   
  
   module.exports=router;
   