const express = require('express')
const router = express.Router()
const { add, all, update, del} = require('../controllers/warehouseController')
// const authenticateToken = require('../middlewares/authenticateToken');
// const verifyAdmin = require('../middlewares/verifyAdmin');


router.post('/add', add);       
router.get('/all', all);
router.put('/update',update);
router.delete('/delete',del);

module.exports = router
