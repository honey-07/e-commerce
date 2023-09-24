const { model, Schema } = require('mongoose');

const productSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	images: [
		{
			url: String,
			alt: String,
		},
    ],
    thumbnail: String,
	category: String,
	discounted_price: Number,
	isDeleted: {
		type: Boolean,
		default: false,
	}
},{timestamps:true});

const Product = model('Product', productSchema);
module.exports = Product;