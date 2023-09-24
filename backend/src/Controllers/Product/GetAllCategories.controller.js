const Product = require('../../Models/Product');
const { getOrSetCache } = require('../../utils/Redis');

const GetAllCategories = async (req, res) => {
	try {
		const resp = await getOrSetCache('categories', async () => {
			const categories = await Product.find().distinct('category');
			return {
				categories,
			};
		});
		res.json(resp);
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = GetAllCategories;
