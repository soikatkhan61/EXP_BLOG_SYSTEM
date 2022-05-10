const router = require('express').Router()

const {isAuthenticated} = require('../middleware/authMiddleware')
const {
    createPostGetController,
    createPostPostController,
    singlePostGetController,
    categorySearchGetController,
    commentsPostController,
    searchGetController
} = require('../controllers/postController')

router.get('/create', isAuthenticated, createPostGetController)
router.post('/create', isAuthenticated, createPostPostController)

router.get('/:id', singlePostGetController)
router.get('/category/:cat_name', categorySearchGetController)

router.post('/comments/:post_id', commentsPostController)
router.post('/search', searchGetController)

module.exports = router