
const express = require('express')
const {loginController, registerController} = require('../controllers/userController')

// router object
const router = express.Router()
// POST || LOGIN

router.post('/login', loginController)

// POST || REGISTER USER
router.post('/register', registerController)

module.exports = router
