var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Shopping cart");
    if(req.session.login) {
        console.log("User is logged in, fetch carts");
        req.cart.find({UserId: req.session.login})
        .populate('music')
        .exec((err, result) => {
            if(err) {
                res.send("Database error");
            } else {
                console.log(result);
                res.render('shoppingcart', { data: JSON.stringify(result), login: req.session.login});
            }
        });
    } else {
        // let data = res.session.cart;
        console.log(req.session.cart);
        res.render('shoppingcart', { data: JSON.stringify(req.session.cart), login: req.session.login});
    }
    // res.render('shoppingcart', { login: req.session.login });
});

router.post('/', async function(req, res, next) {
    console.log(req.body.quantity);
    console.log(req.body.musicid);
    console.log(req.session.login);
    const login = req.session.login;
    if(login) {
        // req.cart.find({MusicId: req.body.musicid, UserId:req.session.login})
        // .then(function(doc) {
        //     console.log(doc);
        //     if(doc.length == 0) {
        //         var newCart = new req.cart({
        //             MusicId: req.body.musicid,
        //             UserId: req.session.login,
        //             Quantity: parseInt(req.body.quantity),
        //         });
        //         newCart.save(function(err, result) {
        //             if(err) {res.send(err)}
        //             else {res.redirect('/cart');}
        //         });
        //     } else {
        //         req.cart.findOneAndUpdate({MusicId: req.body.musicid, UserId:req.session.login}, {Quantity: doc[0].Quantity + parseInt(req.body.quantity)}, (err) => {
        //             if(err) {
        //                 console.log(err);
        //             }
        //             else {
        //                 console.log("UPDATED");
        //                 res.redirect('/cart');
        //             }
        //         })          
        //     }
        // })
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await req.cart.findOneAndUpdate({UserId:req.session.login, MusicId: req.body.musicid}, {$inc: {Quantity: parseInt(req.body.quantity)}}, options);
        console.log("Item added!");
        res.redirect('/cart');
    } else {
        console.log(req.session.id);
        if(!req.session.cart) {
            console.log("cart undefined");
            req.session.cart = [];
        }
        req.music.findOne({MusicId: req.body.musicid})
        .then(function(doc) {
            let objIdx = req.session.cart.findIndex(e => e.MusicId == req.body.musicid);
            // console.log("Index: "+objIdx);
            if(objIdx == -1) {
                req.session.cart.push({MusicId: req.body.musicid,
                SessionId: req.session.id,
                Quantity: parseInt(req.body.quantity),
                MusicName: doc.MusicName,
                Price: doc.Price,
                CartId: req.session.cart.length,
                });
            } else {
                req.session.cart[objIdx].Quantity += parseInt(req.body.quantity);
            }
            console.log(req.session.cart);
            res.redirect('/cart');
        }); 
    }
});

router.get('/total', function(req,res) {
    if(req.session.login) {
        req.cart.find({UserId: req.session.login}, (err, doc) => {
            if(err) {return err}
            else {res.send({msg: doc})}
        });
    }
    else{
        if(!req.session.cart) {
            res.send({msg: []})
        }
        else {
            res.send({msg: req.session.cart})
        }
    }
});

router.delete('/:id', function(req, res) {
    if(req.session.login) {
        req.cart.findByIdAndDelete(req.params.id, function(err) {
            if(err) {
              console.log(err);
            } else {
              console.log("Delete success");
              res.send((err === null) ? {msg: ''} : {msg: err});
            }
          });
    } else {
        console.log(req.params.id);
        console.log(req.session.cart);
        req.session.cart = req.session.cart.filter( query => query.CartId != req.params.id);
        console.log(req.session.cart);
        res.send({msg: ''});
    }
    
});

module.exports = router;