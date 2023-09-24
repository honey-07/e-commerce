const paypal = require('../../utils/paypal-api');


const PaypalCreateOrder = async (req, res) => {
	try {
		const order = await paypal.createOrder(req.user.id);
		res.json(order);
	} catch (err) {
		res.status(500).send(err.message);
	}
}


module.exports = PaypalCreateOrder;