var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.id);
  console.log(req.music);
  var login = req.session.login;
  console.log(login);
  req.music.find((err, result) => {
    if(err) {
      res.send("Database error");
    } else {
      res.render('main', { data: JSON.stringify(result), login: req.session.login});
    }
  });
});

router.get('/info/:musicid', function(req, res, next) {
  console.log(parseInt(req.params.musicid));
  req.music.find({MusicId: req.params.musicid}, (err, result) => {
    if(err) {
      res.send("Database error");
    } else {
      res.render('musicinfo', { data: JSON.stringify(result), login: req.session.login});
    }
  });
});

router.get('/invoice', function(req, res, next) {
  res.render('invoice');
});

router.get('/add', function(req, res, next) {
  var newMusic = new req.music({
    MusicId: 14,
    MusicName: "Goyang Dumang",
    Category: "Dangdut",
    Composer: "Okit",
    Description: "PUSPA",
    Price: 50,
    Published: "2015",
    NewArrival: true,
  });
  newMusic.save(function(err, result) {
    res.redirect('/');
  });
});

router.get('/checkusername/:id', function(req, res, next) {
  req.user.find({UserId: req.params.id}, (err,result) => {
    console.log(result.length)
    if (result.length != 0) {
      res.send({msg: true});
    } else {
      res.send({msg: false});
    }
  });
});

router.post('/search', function(req, res, next) {
  console.log(req.body);
  // let searchValue = req.body["search"].split(" ");
  // console.log(searchValue);
  req.music.find((err, result) => {
    if(err) {
      res.send("Database error");
    } else {
      console.log("Search");
      // res.redirect('/');
      res.render('main', { data: JSON.stringify(result), login: req.session.login, searchQuery: req.body["search"]});
    }
  });
});

router.get('/search', function(req, res, next) {
  res.redirect('/');
})


router.get('/:era', function(req, res, next) {
  console.log(req.session.id);
  console.log(req.music);
  var login = req.session.login;
  console.log(login);
  req.music.find((err, result) => {
    if(err) {
      res.send("Database error");
    } else {
      res.render('main', { data: JSON.stringify(result), login: req.session.login, category: req.params.era});
    }
  });
});

module.exports = router;
