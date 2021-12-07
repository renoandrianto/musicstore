var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if((req.query.action) && (req.query.action == "Logout")) {
    req.session.destroy((err) => {
      if(err) {
        console.log("Logout error :(");
      }
    });
    res.render('loggedout');
  } else {
    console.log("Login page")
    res.render('login', { title: 'COMP3322', login: req.session.login });
  }
});

router.post('/', 
  (req,res, next) => {
    console.log("Submit login")
    console.log(req.body)
    console.log(req.user)
    // console.log(req.body.username)
    if (req.session.login) {
      console.log("Already logged on");
      next();
      // res.redirect('/');
    } else {
      req.user.findOne({UserId: req.body.username, PW: req.body.password}, (err,result) => {
        console.log("login find result: ",result)
        if (!result) {
          res.render('accountnotexist');
        } else {
          req.session.login = req.body.username;
          console.log(req.session.login);
          // res.redirect('/');
          next();
        }
      });
    }
  }, 
  (req,res) => {
    console.log("Check cart")
    console.log(req.session.cart);
    if(req.session.cart) {
      console.log("There may be something in the cart..");
      transferCart(req, res);
    } else {
      console.log("Nothing in the cart");
      res.redirect('/');
    }
  }
);

module.exports = router; 

// function transferCart(req, res) {
//   let sessionCarts = req.session.cart;
//   req.session.cart = undefined;
//   // console.log(sessionCarts);
//   for(let sessionCart of sessionCarts) {
//     // console.log(sessionCart)
//     req.cart.find({MusicId: sessionCart.MusicId, UserId:req.session.login})
//     .then(function(doc) {
//         console.log(doc);
//         if(doc.length == 0) {
//           console.log("Item transfered from session to account cart");
//             var newCart = new req.cart({
//                 MusicId: sessionCart.MusicId,
//                 UserId: req.session.login,
//                 Quantity: parseInt(sessionCart.Quantity),
//             });
//             newCart.save(function(err, result) {
//                 if(err) {
//                   res.send(err);
//                 } else {
//                   console.log("Item transfered from session to account cart");
//                 }
//             });
//         } else {
//             console.log("Updated account cart qty with session cart");
//             req.cart.findOneAndUpdate({UserId:req.session.login, MusicId: sessionCart.MusicId}, {Quantity: doc[0].Quantity + parseInt(sessionCart.Quantity)}, (err) => {
//               if(err) {
//                   console.log(err);
//               }
//               else {
//                   console.log("Updated account cart qty with session cart");
//               }
//           });      
//         }
//     })
//   }
//   console.log("End of loop");
//   res.redirect('/');
// }

async function transferCart(req, res) {
  let sessionCarts = req.session.cart;
  req.session.cart = undefined;
  for(let sessionCart of sessionCarts) {
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    await req.cart.findOneAndUpdate({UserId:req.session.login, MusicId: sessionCart.MusicId}, {$inc: {Quantity: parseInt(sessionCart.Quantity)}}, options);
    console.log("Item added!");
  }
  console.log("End of loop");
  res.redirect('/');
}