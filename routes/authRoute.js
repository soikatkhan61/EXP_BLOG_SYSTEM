const router = require('express').Router()

const {isUnAuthenticated} = require('../middleware/authMiddleware')
const {
    loginGetController,
    loginPostController,
    registerGetController,
    registerPostController,
    logoutController
} = require('../controllers/authController')

router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login',isUnAuthenticated,loginPostController)

router.get('/register',isUnAuthenticated,registerGetController)
router.post('/register',isUnAuthenticated,registerPostController)


router.get('/logout',logoutController)


module.exports = router