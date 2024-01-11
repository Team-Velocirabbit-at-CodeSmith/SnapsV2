const puppeteer = require('puppeteer');
    /* here trying to pass along the result of the scraped information now back to frontend */


// const thisLink = 'https://www.newyorker.com/magazine/2024/01/15/has-school-become-optional'
// const thatLink = 'https://en.wikipedia.org/wiki/Goat'
// const hardLink = 'https://www.nytimes.com/live/2024/01/10/world/israel-hamas-war-gaza-news'
//from front end write a new fetch request to get that new text to then put in the chat gbt request
//need to send result to frontend by adding a new aspect to locals by grabbing the req.params.url in backend
const puppeteerController = {};

puppeteerController.webscrape = async(req, res, next) => {
    try{
        //initiate the browser
        console.log("inside puppeteer controller!");
        
        const browser = await puppeteer.launch({headless: 'new'});

        //create a new page with the puppeteer default browser context
        const page = await browser.newPage();
        
        //go to target website
        await page.goto(req.body.url);

        //get the node for title and extract the text
        const titleNode = await page.$('title');
        const title = await page.evaluate(el => el.innerText, titleNode);

    

        //if article tag can be found, use that, else use body tag

        const articleNode = await page.$('body');
        const article = await page.evaluate(el => el.innerText, articleNode);
        // console.log(title)
        // console.log(article)

        res.locals.webscrape = article;
        //get the whole page's HTML content
        // const content = await page.content();
        // console.log(content);

        //finally, closes the puppeteer browser and all its pages
        await browser.close();
        return next();
    }catch(err){
        console.log(err)
        const error = {
            log: 'Express error handler caught error in puppeteerController.webscrape',
            status: 500,
            message: { err: 'An error occured in puppet controller' },
          }
          return next(error);
    }

}

    //can right click a dom element in inspect and it will give you the query selector when as an option for copying!
    // #main-content > article > div.ArticlePageContentBackGround-cNiFNN.kbAoLA.article-body__content > div.LightboxWrapper-dxsWBV.hhylRt > div > div.ArticlePageChunks-fLyCVG.lmuXQm > div:nth-child(1) > div > div > div
    //.body__inner-container
    //#bodyContent
    //worst comes to worst, extracting all text from body tags might work
    // #bodyContent
//body > div.mw-page-container > div > div.mw-content-container
//wikapedia takes #bodyContent to access the element with text 
    //new yorker takes the 'article' tag
// webScraper(hardLink);
//going to create http beginning concatonated wiht inputted url
module.exports = puppeteerController;