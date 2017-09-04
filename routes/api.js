var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note;

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  console.log("note....")

  var query = {raw: true}
  if(req.session.user && req.session) {
     query.where = {
       uid: req.session.user.id
     }
  }
  Note.findAll(query).then(function(notes) {
    console.log(notes)
    res.send({status:0,data:notes})
  }).catch(function() {
    res.send({status: 1,errorMsg: '数据库出错了'})
  })
});
router.post('/notes/add',function(req, res, next) {

  if(!req.session.user || !req.session) {
    return res.send({status: 1,errorMsg: '请先登录'})
  }
  if(!req.body.note) {
    return res.send({status: 2,errorMsg:'内容不能为空'})
  }
  var note=req.body.note;
  var uid = req.session.user.id;
  Note.create({text:note,uid: uid}).then(function() {
    console.log(arguments)
    res.send({status: 0})
  }).catch(function() {
    res.send({status: 1,errorMsg: '数据库出错了'})
  })
});

router.post('/notes/edit',function(req, res, next) {

  if(!req.session.user || !req.session) {
    return res.send({status: 1,errorMsg: '请先登录'})
  }
  var uid = req.session.user.id;
  Note.update({text: req.body.note}, {where:{id:req.body.id,uid: uid}}).then(function() {
    console.log(arguments);
    res.send({status: 0})
  }).catch(function(e) {
    res.send({status: 1,errorMsg: '数据库出错了'})
  })
});

router.post('/notes/delete',function(req, res, next) {

  if(!req.session.user) {
    return res.send({status: 1,errorMsg: '请先登录'})
  }
  var uid = req.session.user.id;
  Note.destroy({where:{id:req.body.id, uid:uid}}).then(function() {
    res.send({status: 0})
  }).catch(function(e) {
    res.send({status: 1,errorMsg: '数据库出错了'})
  })
});

router.post('/notes/clear',function(req, res, next) {

  if(!req.session.user) {
    return res.send({status: 1,errorMsg: '请先登录'})
  }
  var uid = req.session.user.id;
  Note.drop().then(function() {
    res.send({status: 0})
  }).catch(function(e) {
    res.send({status: 1,errorMsg: '数据库出错了'})
  })
});


module.exports = router;
