const express = require('express')
const {
    addTransection,
    getAllTransection,
    editTransection,
    deleteTransection,

} = require("../controllers/transectionControllers")
// router object
const router = express.Router()
//routes
// add transaction Post Method
router.post('/add-transection', addTransection)

// edit transaction Post Method
router.post('/edit-transection', editTransection)
// delet transaction post method
router.post('/delete-transection', deleteTransection)

// get transactions
router.post("/get-transection", getAllTransection)

module.exports = router;
