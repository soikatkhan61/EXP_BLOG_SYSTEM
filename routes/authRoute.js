const router = require('express').Router()

const {isUnAuthenticated,isAuthenticated} = require('../middleware/authMiddleware')
const {
    loginGetController,
    loginPostController,
    registerGetController,
    registerPostController,
    logoutController,
    createProfileGetController,
    createProfilePostController
} = require('../controllers/authController')

router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login',isUnAuthenticated,loginPostController)

router.get('/register',isUnAuthenticated,registerGetController)
router.post('/register',isUnAuthenticated,registerPostController)

router.get('/create_profile',isAuthenticated,createProfileGetController)
router.post('/create_profile',isAuthenticated,createProfilePostController)


router.get('/logout',logoutController)


module.exports = router