var express = require('express');
var router = express.Router();
const path = require('path');
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.post('/login', function(req,res){
    let username = req.body.username
    let password = req.body.password
    axios.post('https://platform-api.infiswift.tech/login', {username, password})
      .then((response => {
        res.json(response.data)
      }))
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})


module.exports = router;
