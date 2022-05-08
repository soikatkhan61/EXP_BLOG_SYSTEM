const router = require('express').Router()

const {isAuthenticated} = require('../middleware/authMiddleware')
const {
    createPostGetController,
    createPostPostController,
    singlePostGetController,
    categorySearchGetController
} = require('../controllers/postController')

router.get('/create', isAuthenticated, createPostGetController)
router.post('/create', isAuthenticated, createPostPostController)

router.get('/:id', singlePostGetController)
router.get('/category/:cat_name', categorySearchGetController)

module.exports = router