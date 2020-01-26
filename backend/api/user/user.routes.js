
const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id',  requireAuth, updateUser)
router.delete('/:id',  requireAuth, requireAdmin, deleteUser)

module.exports = router

// const express = require('express')
// // const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// // const {addhouse, gethouses, deletehouse} = require('./user.controller')
// const {addOrder,turlak}=require('../user/user.controller')
// const router = express.Router()

// // middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', gethouses)
// router.post('/',  requireAuth, addOrder)
// router.delete('/:id',  requireAuth, deletehouse)

// module.exports = router
