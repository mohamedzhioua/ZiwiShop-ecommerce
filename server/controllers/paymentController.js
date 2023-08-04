const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  //  ---------------------------------------- //getstripeapikey//--------------------------- //

  getstripeapikey: async (req, res) => {
    try {
      res.status(200).json(process.env.STRIPE_API_KEY);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //paymentProcess//--------------------------- //
  paymentProcess: async (req, res) => {
     try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.totalPrice,
        currency: "USD",
        metadata: {
          company: "ZiwiShop",
        },
        automatic_payment_methods: { enabled: true },
      });
      res.status(200).json(paymentIntent.client_secret);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
