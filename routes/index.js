let express = require('express');
let router = express.Router();
let rando = require('random-words');
let jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/secret', (req, res) => {
  res.send({secret: process.env.SECRET})
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/word', (req, res) => {
  let token = req.query.token;
  try {
    jwt.verify(token, process.env.SECRET);
    let word = rando(1);
    res.send({word:word});
  } catch (err) {
    res.send({error: "invalid token", details: err})
  }
});


router.get('/words/:count', (req, res) => {
  let count = Number (req.params.count);
  let words = rando({exactly: count, join: ''});
  res.send({words:words});
});

router.get('/sentence', (req, res) => {
  min = (isNaN((Number(req.query.min)))) ? 1 : Number(req.query.min);
  max = (isNaN((Number(req.query.max)))) ? min+1 : Number(req.query.max);
  let sentence = rando({min: min, max: max, join: ' '});
  res.send({sentence: sentence});

});

router.get('/word', (req, res) => {
  res.send({word: 'Funny'});
});

router.post('/login', (req, res) => {
  let username =req.body.username;
  let password = req.body.password;
  //verify username and password
  if(username === 'heidi' && password === process.env.PASSWORD) {
    let token = jwt.sign(
        {username: username},
        process.env.SECRET, {
      expiresIn: '10 minutes'})
    res.send({token:token})
      } else {
    res.send({error: "Invalid login credentials"})
  }
  //create token
  //return token
})



module.exports = router;
