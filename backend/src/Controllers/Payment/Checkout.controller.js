const Order = require("../../Models/Order");
const User = require("../../Models/User");
const { deleteCache } = require("../../utils/Redis");


const Checkout =  async (req, res) => {
	const { products, shippingInfo, paymentMode, total } = req.body;
	const user = req.user;
	const { _id: userId } = await User.findOne({
		email: user.email,
	});

	const order = {
		user: userId,
		products: products.map((product) => ({
			product: product._id,
			qty: product.qty,
		})),
		total,
		address: shippingInfo,
		paymentMode,
	};

	const newOrder = new Order(order);
	await newOrder.save();

	await deleteCache(`${userId}:orders*`);
	res.json({
		message: 'Order placed successfully',
		order: newOrder,
	});
}

module.exports = Checkout;