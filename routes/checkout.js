var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.login) {
        console.log("User is logged in, fetch carts for checkout");
        req.cart.find({UserId: req.session.login})
        .populate('music')
        .exec((err, result) => {
            if(err) {
                res.send("Database error");
            } else {
                console.log(result);
                res.render('checkout', { data: JSON.stringify(result), login: req.session.login});
            }
        });
    } else {
        console.log(req.session.cart);
        res.render('checkout', { data: JSON.stringify(req.session.cart), login: req.session.login});
    }
    // res.render('checkout');
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    // res.send({msg: "Form submitted"});
    if(req.session.login) {
        req.cart.find({UserId: req.session.login})
        .populate('music')
        .exec((err, result) => {
            if(err) {
                res.send("Database error");
            } else {
                console.log(result);
                data = JSON.stringify(result);
                req.cart.deleteMany({UserId: req.session.login}).then(function() {
                    res.render('invoice', { info: JSON.stringify(req.body), data: data, login: req.session.login});
                })
            }
        });
    } else {
        var newUser = new req.user({
            UserId: req.body.username,
            PW: req.body.password,
          });
          newUser.save(function(err, result) {
            data = JSON.stringify(req.session.cart);
            req.session.cart = undefined;
            console.log(req.session.cart);
            res.render('invoice', { info: JSON.stringify(req.body), data: data, login: req.session.login});
          });
    }
});

module.exports = router;