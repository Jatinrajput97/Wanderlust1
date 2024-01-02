const express= require("express");
const router=  express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema, reviewSchema}= require("../schema.js");
const Listing = require("../models/listing.js");
const reviewController=require("../controllers/review.js");
const Review= require("../models/review.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

const validateReview=(req, res, next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
  }

//post route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));
 
//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports= router;