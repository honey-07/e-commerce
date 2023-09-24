const paypal = require('../../utils/paypal-api');
const PaypalCaptureOrder = async (req, res) => {
	const { orderID } = req.params;
	try {
		const capturedData = await paypal.capturePayment(orderID);
        res.json({
            message: 'Payment captured successfully',
            ...capturedData
        });
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
}

module.exports = PaypalCaptureOrder;