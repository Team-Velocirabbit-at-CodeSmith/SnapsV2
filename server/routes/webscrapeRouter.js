const express = require('express');
const router = express.Router()

const puppeteerController = require('../controllers/puppeteerController');

router.post('/', puppeteerController.webscrape, (req, res)=>{
    res.status(200).json(res.locals.webscrape);
})

module.exports = router;