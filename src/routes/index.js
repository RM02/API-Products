const express = require("express");
var router = express()

// controllers

var agenda_controller = require('../controllers/agenda');
var login_controller = require('../controllers/login');
var order_controller = require('../controllers/order');
var upload_controller = require('../controllers/upload');
var upload = require('../middleware/upload').upload;


// Agenda routes
router.get('/agenda', agenda_controller.get_list)
router.delete('/agenda/:id', agenda_controller.delete)
// router.put('/articles/<id>', agenda_controller.get_list)
router.post('/agenda/publish', agenda_controller.create)

// Order
router.get('/orders', order_controller.get)
router.post('/order/publish', order_controller.create)

router.post('/register', login_controller.register)
router.post('/login', login_controller.login)

// Users
router.get('/users', login_controller.get_users)
router.delete('/user', login_controller.delete_user)
router.put('/user/:id', login_controller.edit_user)


router.post('/upload', upload.single('file'), upload_controller.uploadFiles)
router.get('/static/:filename', upload_controller.staticFile)

module.exports = router;