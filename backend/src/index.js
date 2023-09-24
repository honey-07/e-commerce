const express = require('express');
const app = express();
const connectMongoose = require('./utils/connectMongoose');
const cors = require('cors');
const VerifyUser = require('./Middlewares/verifyUser');
const paypal = require('./utils/paypal-api');
// Connect to MongoDB
connectMongoose();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const AuthRouter = require('./Routes/Auth.route');
const ProductRouter = require('./Routes/Product.route');
const PaymentRouter = require('./Routes/Payment.route');
const AdminRouter = require('./Routes/Admin.route');

// Route middleware
app.use('/auth', AuthRouter);
app.use('/products',ProductRouter)
app.use('/payment', PaymentRouter);
app.use('/admin', AdminRouter);

app.get('/ping', (req, res) => {
	res.json({
		message: 'Pong 🔥 🔥 ',
	});
});



const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} 🔥 🔥 🔥 `);
});
