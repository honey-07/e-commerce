const Product = require("../../Models/Product");
const { deleteCache } = require("../../utils/Redis");

const UpdateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, description, category,images,discounted_price,thumbnail } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.images = images;
        product.thumbnail = thumbnail;
        product.discounted_price = discounted_price;
        await deleteCache('product*');
        await product.save();
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = UpdateProduct;