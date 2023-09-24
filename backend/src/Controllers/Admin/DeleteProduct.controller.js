const Product = require('../../Models/Product');
const { deleteCache } = require('../../utils/Redis');

const DeleteProduct = async (req, res) => {
	const { productId } = req.params;
	try {
        await Product.findOneAndUpdate({ _id: productId }, { isDeleted: true });
        await deleteCache('products*');
		res.json({ message: 'Product deleted successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


module.exports = DeleteProduct;