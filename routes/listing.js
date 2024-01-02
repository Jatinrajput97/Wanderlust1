const express= require("express");
const router=  express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingController= require("../controllers/listing.js");

const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage });

//router.route
//is a combination of (Index route)get and (create route)post route;

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
   upload.single("listing[image]"),
  //  validateListing, 
 wrapAsync(listingController.createRoute));


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//is a combination of (show route)get and (update route)put route (delete route)delete;
router.route("/:id")
.get(  wrapAsync(listingController.showRoute))
.put( isLoggedIn, isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingController.updateRoute))
.delete( isLoggedIn,  wrapAsync(listingController.destroyRoute));

// edit route
router.get("/:id/edit", isLoggedIn,  wrapAsync(listingController.editRoute));

module.exports= router;