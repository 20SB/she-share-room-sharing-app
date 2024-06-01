const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY,
});

module.exports.createOrder = async (req, res) => {
    try {
        // console.log("reaced here");zz
        // console.log("body", req.body);
        const amount = req.body.amount * 100;
        const options = {
            amount: amount,
            currency: "INR",
            receipt: "pramodinip745@gmail.com",
        };

        razorpayInstance.orders.create(options, (err, order) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    msg: "Payment Successfull",
                    order_id: order.id,
                    amount: amount,
                    key_id: RAZORPAY_ID_KEY,
                    booking_id: req.body.bookingId,
                    name: req.body.name,
                    email: req.body.email,
                });
            } else {
                res.status(400).send({ success: false, err, msg: "Something went wrong!" });
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};
