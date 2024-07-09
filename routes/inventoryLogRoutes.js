const express = require('express')
const router = express.Router()
const { add, all, update, del} = require('../controllers/inventoryLogController')
// const authenticateToken = require('../middlewares/authenticateToken');
const verifyAdmin = require('../middlewares/verifyAdmin');


router.post('/add', add);       
router.get('/all', all);
router.put('/update', update);
router.delete('/delete',verifyAdmin, del);

module.exports = router
