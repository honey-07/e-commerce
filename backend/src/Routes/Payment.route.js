const express = require('express');
const GetAllOrders = require('../Controllers/Payment/GetAllOrders.controller');
const GetCart = require('../Controllers/Payment/GetCart.controller');
const PatchCart = require('../Controllers/Payment/PatchCart.controller');
const PaypalCreateOrder = require('../Controllers/Payment/PaypalCreateOrder.controller');
const PaypalCaptureOrder = require('../Controllers/Payment/PaypalCaptureOrder.controller');
const VerifyUser = require('../Middlewares/verifyUser');
const Checkout = require('../Controllers/Payment/Checkout.controller');

const router = express.Router();

const protectedRoute = express.Router();

protectedRoute.use(VerifyUser);
// Protected Routes
protectedRoute.get('/orders', GetAllOrders);
protectedRoute.get('/cart', GetCart);
protectedRoute.put('/cart', PatchCart);
protectedRoute.post('/checkout', Checkout);
protectedRoute.post('/paypal/order', PaypalCreateOrder);
protectedRoute.post('/paypal/capture-order/:orderID', PaypalCaptureOrder);

router.use('/', protectedRoute);

module.exports = router;

