const connectMongoose = require('../utils/connectMongoose');
const dotenv = require('dotenv');
const fs = require('fs/promises');
const cliProgress = require('cli-progress');
const { setTimeout } = require('timers/promises');

const { faker } = require('@faker-js/faker');

dotenv.config();

/**
 * {
	name: String,
	description: String,
	price: Number,
	image: [
		{
			url: String,
			alt: String,
		},
	],
	thumnail: string,
	category: String,
	seller: String,
	description: String,
	discounted_price: Number,
}
 */

const Product = require('../Models/Product');
const User = require('../Models/User');
const Review = require('../Models/Review');
const { hash } = require('../utils/Encryption');
const Order = require('../Models/Order');

const addProduct = async () => {
	const jsonFiles = await fs.readdir('./src/dummy/products');
	const bar = new cliProgress.SingleBar(
		{
			format:
				'Adding Products |' +
				'{bar}' +
				'| {percentage}% || {value}/{total} Chunks || Speed: {speed} Chunks/sec',
		},
		cliProgress.Presets.shades_classic,
	);
	bar.start(jsonFiles.length, 0);
	for (let i = 0; i < jsonFiles.length; i++) {
		const file = jsonFiles[i];
		const data = await fs.readFile('./src/dummy/products/' + file, 'utf-8');
		const product = JSON.parse(data);
		await Product.insertMany(product.filter(v => v).map((p) => ({ ...p, name: p?.title, discounted_price: p?.discounted_price || Math.floor(Math.random() * p?.price) })));
		bar.update(i);
	}
};

const addNewUsers = async () => {
	const bar = new cliProgress.SingleBar(
		{
			format:
				'Adding Users |' +
				'{bar}' +
				'| {percentage}% || {value}/{total} Chunks || Speed: {speed} Chunks/sec',
		},
		cliProgress.Presets.shades_classic,
	);
	const users = [];
	bar.start(1000, 0);
	for (let i = 1; i <= 1000; i++) {
		bar.update(i);
		const user = await getNewUser();
		users.push(user);
	}
	bar.stop();
	await User.insertMany(users);
	console.log('Users added');
};

const addOrders = async () => {
	const userId = '64d0a543af79374730dba625';

	const allproducts = await Product.find();
	const bar = new cliProgress.SingleBar(
		{
			format:
				'Adding Orders |' +
				'{bar}' +
				'| {percentage}% || {value}/{total} Chunks || Speed: {speed} Chunks/sec',
		},
		cliProgress.Presets.shades_classic,
	);
	const orders = [];
	bar.start(1000, 0);
	for (let i = 0; i < 1000; i++) {
		const randomProducts = [];
		const randomProductsCount = Math.floor(Math.random() * 10) + 1;
		let total = 0;
		for (let j = 0; j < randomProductsCount; j++) {
			const randomProduct = allproducts[Math.floor(Math.random() * allproducts.length)];
			const product = {
				product: randomProduct._id,
				qty: Math.floor(Math.random() * 10) + 1,
			}
			total += product.qty * randomProduct.price;
			randomProducts.push(product);
		};
		const order = {
			user: userId,
			products: randomProducts,
			total,
			createdAt: faker.date.past(),
			paymentMode: 'POD',
			status: 'delivered',
			address: {
				city: 'Mumbai',
				state: 'Maharashtra',
				pincode: '400001',
				address: 'Some address',
				country: 'India',
				phone: '1234567890',
				name: 'Some name',
			},
		}
		orders.push(order);
	}
	await Order.insertMany(orders);
	bar.stop();

}

const getNewUser = async () => {
	const user = {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: await hash(faker.internet.password()),
		role: 'user',
	};
	return user;
};

const getNewReview = async (userId, productId) => {
	const allReviews = await fs.readFile('./src/dummy/reviews.json', 'utf-8');
	const reviews = JSON.parse(allReviews);
	const index = Math.floor(Math.random() * reviews.length);
	const review = {
		user: userId,
		product: productId,
		rating: reviews[index].rating,
		title: reviews[index].title,
		description: reviews[index].description,
		createdAt: faker.date.past(),
	};
	return review;
};

const createNewReviews = async () => {
	const bar = new cliProgress.SingleBar(
		{
			format:
				'Adding Reviews |' +
				'{bar}' +
				'| {percentage}% || {value}/{total} Chunks || Speed: {speed} Chunks/sec',
		},
		cliProgress.Presets.shades_classic,
	);
	const reviews = [];
	const users = await User.find({ role: 'user' });
	const products = await Product.find({});
	bar.start(products.length * 5, 0);
	for (let i = 0; i < products.length; i++) {
		for (let j = 0; j < 5; j++) {
			const product = products[i];
			const user = users[Math.floor(Math.random() * users.length)];
			const review = await getNewReview(user._id, product._id);
			reviews.push(review);
			bar.update(i);
		}
	}
	bar.stop();
	await Review.insertMany(reviews);
};

(async () => {
	await connectMongoose();
	await setTimeout(100);
	await addPttttttttttttttttttroduct();
	await setTimeout(100);
	await addNewUsers();
	await setTimeout(100);
	await createNewReviews();
	// await addOrders();
	for (let i = 1; i <= 4; i++) {
		await createNewReviews();
		await setTimeout(100);
	}
	console.log('Reviews added');
	process.exit(0);
})();
