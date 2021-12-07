var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'COMP3322' });
});

router.post('/', (req,res) => {
  console.log("Submit register");
  console.log(req.body)
  console.log(req.user)
  req.user.find({UserId: req.body.username}, (err,result) => {
    console.log(result)
    if (result.length != 0) {
      res.render('accountexisted'), {login: req.session.login };
    } else {
      var newUser = new req.user({
        UserId: req.body.username,
        PW: req.body.password,
      });
      newUser.save(function(err, result) {
        res.render('accountcreated', {})
      });
    }
  });
  
  // console.log(req.body.username)
});

module.exports = router;