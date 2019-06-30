var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var model = require('../models/model.js');
var Demo = model.Demo;
var ObjectId = require('mongodb').ObjectID

mongoose.connect('mongodb://localhost/express_demo');



/* GET home page. */
router.get('/', function(req, res, next) {
  // res.json(123)
  Demo.find((err, docs) => {
    res.json(docs)
  })
});


router.post('/', function(req, res, next) {
  
  var demo = new Demo({
      uid: req.body.uid,
      title: req.body.title,
  });

  demo.save(function(err, doc) {
      console.log(doc);
      res.redirect('/');
  });
  
});

// router.get('/del.html',function(req,res){
//   var id = req.body._id
//   Demo.deleteOne({_id:id},(err,docs)=>{
//     res.json(docs)
//   })
// })
router.get('/del.html', function(req, res, next) {
  var id = req.query.id;
  Demo.findOneAndDelete({"_id":ObjectId(id)}, function(err, docs) {
      
  });
  
});


router.post('/index.html',function(req,res){
console.log(req)
  var demo = {
    uid: req.body.uid,
    title: req.body.title,
};
Demo.findByIdAndUpdate({_id:req.body.id},{$set:demo},function(err,docs){
  res.json(docs)
});
})

module.exports = router;