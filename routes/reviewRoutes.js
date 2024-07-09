const express = require('express')
const router = express.Router()
const { add, all, del, update} = require('../controllers/reviewController')
// const authenticateToken = require('../middlewares/authenticateToken');
// const verifyAdmin = require('../middlewares/verifyAdmin');


router.post('/add', add);
router.get('/all', all);
router.delete('/del', del);
router.put('/update',update);

module.exports = router
