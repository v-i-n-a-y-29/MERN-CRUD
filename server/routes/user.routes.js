const {
    handleSignupUserController,
    handleSignInController,
    handleLogoutController,
    handleMeController,
} = require('../controller/user.controller')

const authMiddleWare = require('../middleware/auth.middleware')

const express = require('express')
const router = express.Router();

router.post('/user/create',handleSignupUserController)
router.post('/user/login',handleSignInController)
router.post('/user/logout',handleLogoutController)
router.get('/user/me', authMiddleWare, handleMeController)

module.exports=router