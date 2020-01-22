const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {addhouse, gethouses, deletehouse} = require('./user.controller')
const {addOrder}=require('../user/user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', gethouses)
// router.post('/',  requireAuth, addOrder)
router.post('/',addOrder)
// router.delete('/:id',  requireAuth, deletehouse)

module.exports = router