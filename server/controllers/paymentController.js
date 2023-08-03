const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  //  ---------------------------------------- //getstripeapikey//--------------------------- //

  getstripeapikey: async (req, res) => {
    try {
      res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //paymentProcess//--------------------------- //
  paymentProcess: async (req, res) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "ZiwiShop",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
