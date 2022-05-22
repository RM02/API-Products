const express = require("express");
var router = express()

// controllers

var agenda_controller = require('../controllers/agenda');
var login_controller = require('../controllers/login');
var order_controller = require('../controllers/order');
var upload_controller = require('../controllers/upload');
var upload = require('../middleware/upload').upload;
var auth = require('../middleware/auth');

// Agenda routes
router.get('/agenda', auth, agenda_controller.get_list)
router.delete('/agenda/:id', auth, agenda_controller.delete)
router.post('/agenda/publish', auth, agenda_controller.create)

// Order
router.get('/orders', auth, order_controller.get)
router.post('/order/publish', auth, order_controller.create)

router.post('/register', login_controller.register)
router.post('/login', login_controller.login)

// Users
router.get('/users', auth, login_controller.get_users)
router.delete('/user', auth, login_controller.delete_user)
router.put('/user/:id', auth, login_controller.edit_user)


router.post('/upload', upload.single('file'), upload_controller.uploadFiles)
router.get('/static/:filename', auth, upload_controller.staticFile)

module.exports = router;