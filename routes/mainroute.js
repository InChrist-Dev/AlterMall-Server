const express = require('express');
const categoryRouter = require('./categoryRoute.js');
const userRouter = require('./userRoute.js');
const router = express.Router();

router.use('/category', categoryRouter);

router.use('/user', userRouter);

//Not Found
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;