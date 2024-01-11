const express = require('express');
const router = express.Router()

const puppeteerController = require('../controllers/puppeteerController');

router.post('/', puppeteerController.webscrape, (req, res)=>{
    console.log('the res.locals.webscrape passed to webscarpe router: ' + res.locals.webscrape);
    res.status(200).json(res.locals.webscrape);
})

module.exports = router;