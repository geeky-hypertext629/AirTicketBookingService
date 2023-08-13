const express = require('express');
const router = express.Router();

const {BookingController} = require('../../controllers/index')
// router.use('/')
router.post('/bookings',BookingController.create);



module.exports = router;