const express = require('express')
const router = express.Router()
const { add, all, update, del} = require('../controllers/inventoryController')
// const authenticateToken = require('../middlewares/authenticateToken');
const verifyAdmin = require('../middlewares/verifyAdmin');


router.post('/add',verifyAdmin, add);       
router.get('/all',verifyAdmin, all);
router.put('/update',verifyAdmin, update);
router.delete('/delete',verifyAdmin, del);

module.exports = router
