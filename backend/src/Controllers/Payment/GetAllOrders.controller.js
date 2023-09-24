const Order = require('../../Models/Order');
const User = require('../../Models/User');
const { getOrSetCache } = require('../../utils/Redis');

const GetAllOrders = async (req, res) => {
	try {
		const { sort, startingDate, endingDate, q = '',page=1,limit=10 } = req.query;

		const sortQuery = {};
		
		const skip = (page - 1) * limit;

		if (sort === 'Newest') sortQuery.createdAt = -1;
		if (sort === 'Oldest') sortQuery.createdAt = 1;
		if (sort === 'LowToHigh') sortQuery.total = 1;
		if (sort === 'HighToLow') sortQuery.total = -1;
		console.log(startingDate, endingDate,sortQuery)
		const filterQuery = {};
		if (startingDate && !endingDate)
			filterQuery.createdAt = { $gte: new Date(Number(startingDate)) };
		if (!startingDate && endingDate)
			filterQuery.createdAt = { $lte: new Date(Number(endingDate)) };

		if (startingDate && endingDate) {
			filterQuery.createdAt = {
				$gte: new Date(Number(startingDate)),
				$lte: new Date(Number(endingDate)),
			};
		}

		const user = req.user;
		
		const resp = await getOrSetCache(
			`${user.id}:orders?sort=${sort}&startingDate=${startingDate}&endDate=${endingDate}&q=${q}&page=${page}&limit=${limit}`,
			async () => {
				const orders = await Order.find({ user: user.id, ...filterQuery })
					.populate('products.product')
					.sort(sortQuery).limit(limit).skip(skip);
				const total = await Order.countDocuments({ user: user.id, ...filterQuery });
				const totalPages = Math.ceil(total / limit);
				const minDate = (await Order.findOne({ user: user.id }).sort({
					createdAt: 1,
				})).createdAt;
				const maxDate = (await Order.findOne({ user: user.id }).sort({
					createdAt: -1,
				})).createdAt;
				return {
					minDate,
					maxDate,
					total,
					totalPages,
					orders: orders.filter((order) => order.products.filter((product) => product.product.name.toLowerCase().includes(q?.toLowerCase())).length > 0),
				};
			},
		);
		res.json(resp);
	
		return;
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
		return;
	}
};

module.exports = GetAllOrders;
