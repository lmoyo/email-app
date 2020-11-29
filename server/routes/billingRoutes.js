const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post(
        '/api/stripe',
        requireLogin,
        async (req, res) => {

            if(!req.user){
                return res.status(401).send({ error: 'Login to add credits'});
            }
            // console.log(req.body);
            const charge = await stripe.charges.create({
                amount: 500, //needs to match amount on client
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            });
            
            // console.log(charge)

            //get current user model --> automatic from passport
            req.user.credits += 5;

            //use up to date model that was returned from the save request
            const user = await req.user.save();

            res.send(user);

        }
    );
}