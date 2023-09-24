const Cart = require('../../Models/Cart');
const Product = require('../../Models/Product');
const User = require('../../Models/User');

const GetCart = async (req, res) => {
	const { _id: userId } = await User.findOne({
		email: req.user.email,
	});
	const cart = await Cart.findOne({ userId }).populate('cartItems._id');
	res.json({
		cart: {
			...cart?._doc,
			cartItems: cart?.cartItems
				? await Promise.all(
						cart?.cartItems?.map(async (item) => {
							const productId = item._id;
							const product = await Product.findById(productId);
							return {
								...item?._doc,
								...product?._doc,
							};
						}),
				  )
				: [],
				totalItems:cart?.totalItems || 0,
			
		},
	});
};

module.exports = GetCart;
