const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addHouse, getHouses, deleteHouse,getHouse, updateHouse} = require('./house.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getHouses)
router.get('/reserved', getHouse)
router.get('/:id', getHouse)
router.put('/:id', requireAuth, updateHouse)
router.post('/',  requireAuth, addHouse)
router.delete('/:id',  requireAuth, deleteHouse)

module.exports = router