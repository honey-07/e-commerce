const express = require('express');
const VerifyUser = require('../../src/Middlewares/verifyUser');
const GetAllProducts = require('../Controllers/Product/GetAllProduct.controller');
const GetProduct = require('../Controllers/Product/GetProduct.controller');
const GetAllReviews = require('../Controllers/Product/GetAllReviews.controller');
const PostReview = require('../Controllers/Product/PostReview.controller');
const CanReview = require('../Controllers/Product/CanReview.controller');
const GetAllCategories = require('../Controllers/Product/GetAllCategories.controller');


const router = express.Router();
const protectedRoute = express.Router();
const unprotectedRoute = express.Router();
try {
    
    protectedRoute.use(VerifyUser);
    // Protected Routes
    protectedRoute.post('/:id/review', PostReview);
    protectedRoute.get('/:id/can-review',CanReview)
    // Unprotected Routes
    unprotectedRoute.get('/', GetAllProducts);
    unprotectedRoute.get('/categories',GetAllCategories);
    unprotectedRoute.get('/:id', GetProduct);
    unprotectedRoute.get('/:id/reviews', GetAllReviews);
    
    
    router.use('/', unprotectedRoute);
    router.use('/', protectedRoute);
}
catch (err) {
    console.log(err)
}



module.exports = router;

