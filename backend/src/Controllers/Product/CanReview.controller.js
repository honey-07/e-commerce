const Order = require('../../Models/Order');
const Review = require('../../Models/Review');
const User = require('../../Models/User');

const CanReview = async (req, res) => {
	const { id } = req.params;
	const user = req.user;
	const { _id: userId } = await User.findOne({
		email: user.email,
	});

	const order = await Order.findOne({
		user: userId,
		products: {
			$elemMatch: {
				product: id,
			},
		},
	}).limit(1);

	const review = await Review.findOne({
		user: userId,
		product: id,
	}).limit(1);

	const canReview = Boolean(order?.status);
	res.json({
		canReview,
		review,
	});
};


module.exports = CanReview;