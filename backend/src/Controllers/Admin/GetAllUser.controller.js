const Order = require('../../Models/Order');
const User = require('../../Models/User');

const GetAllUser = async (req, res) => {
	try {
		const {name=''} = req.query;
		const users = await User.find({}).select('-password');
		if (!users) return res.status(404).json({ user: [] });

		res.json({
			user: (
				await Promise.all(
					users.map(async (user) => {
						if (!user.name.includes(name)) {
							
							return null;
						};
						const allOrders = await Order.find({ user: user._id }).populate(
							'products.product',
						);
						let totalProducts = 0;
						if (allOrders?.length > 0) {
							allOrders?.forEach((order) => {
								totalProducts += order.products.reduce(
									(acc, item) => acc + item.qty,
									0,
								);
							});
						}
						return {
							...user?._doc,
							totalOrders: allOrders.length,
							totalProducts,
						};
					}),
				)
			).filter(v=>v).sort((a, b) => b.totalProducts - a.totalProducts),
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = GetAllUser;
