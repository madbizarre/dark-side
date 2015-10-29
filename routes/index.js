"use strict";
var express = require('express');
var router = express.Router();
var transporter = require('../lib/nodemailer');

//transporter.sendMail({
//  from: 'Павлов Андрей <darkbizarre@yandex.ru>',
//  to: 'andrew-cool@bk.ru',
//  subject: `Заявка с сайта: ${req.hostname}`,
//  text: 'Test'
//}, function (err){
//  if (err) return next(err);
//  res.render('index', { title: 'Express' });
//});

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
