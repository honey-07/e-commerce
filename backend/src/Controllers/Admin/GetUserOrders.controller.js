const Order = require("../../Models/Order");
const User = require("../../Models/User");
const { getOrSetCache } = require("../../utils/Redis");

const GetUserOrder = async (req, res) => { 
    try { 
        const { userId } = req.params;
        const { sort, startingDate, endingDate, q = '', page = 1, limit = 10 } = req.query;
        const sortQuery = {};
        const skip = (page - 1) * limit;
        if (sort === 'Newest') sortQuery.createdAt = -1;
        if (sort === 'Oldest') sortQuery.createdAt = 1;
        if (sort === 'LowToHigh') sortQuery.total = 1;
        if (sort === 'HighToLow') sortQuery.total = -1;
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
        const resp = await getOrSetCache(
            `${userId}:orders?sort=${sort}&startingDate=${startingDate}&endDate=${endingDate}&q=${q}&page=${page}&limit=${limit}`,
            async () => {
        const user = await User.findById(userId);
                const orders = await Order.find({ user: userId }).populate('products.product').sort(sortQuery).limit(limit).skip(skip);
                const total = await Order.countDocuments({ user: userId });
                const totalPages = Math.ceil(total / limit);
                const minDate = (await Order.findOne({ user: userId }).sort({
                    createdAt: 1,
                })).createdAt;
                const maxDate = (await Order.findOne({ user: userId }).sort({
                    createdAt: -1,
                })).createdAt;
                return {
                    minDate,
                    maxDate,
                    total,
                    totalPages,
                    orders: orders.filter((order) => order.products.filter((product) => product.product.name.toLowerCase().includes(q?.toLowerCase())).length > 0),
                    user
                };
            },
        );

        return res.json(resp);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
}

module.exports = GetUserOrder;