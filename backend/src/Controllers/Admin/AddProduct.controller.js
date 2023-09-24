const Product = require("../../Models/Product");
const { deleteCache } = require("../../utils/Redis");

const AddProduct = async (req, res) => { 
    try {
        const { name, price, description, category,images,discounted_price,thumbnail } = req.body;
        const product = await Product.create({
            name,
            price,
            description,
            category,
            images,
            discounted_price,
            thumbnail
        });
        await deleteCache('products*');
        res.json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = AddProduct;