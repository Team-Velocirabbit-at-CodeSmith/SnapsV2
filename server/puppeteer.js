const puppeteer = require('puppeteer');
console.log("entering")

const thisLink = 'https://www.newyorker.com/magazine/2024/01/15/has-school-become-optional'
const thatLink = 'https://en.wikipedia.org/wiki/Goat'
const hardLink = 'https://www.nytimes.com/live/2024/01/10/world/israel-hamas-war-gaza-news'
const webScraping = async(link) => {
    //initiate the browser
    const browser = await puppeteer.launch({headless: 'new'});

    //create a new page with the puppeteer default browser context
    const page = await browser.newPage();
    
    //go to target website
    await page.goto(link);

    //get the node for title and extract the text
    const titleNode = await page.$('title');
    const title = await page.evaluate(el => el.innerText, titleNode);

    console.log(title)

    //if article tag can be found, use that, else use body tag

    const articleNode = await page.$('body');

    //wikapedia takes #bodyContent to access the element with text 
    //new yorker takes the 'article' tag
    const article = await page.evaluate(el => el.innerText, articleNode);

    //can right click a dom element in inspect and it will give you the query selector when as an option for copying!
    // #main-content > article > div.ArticlePageContentBackGround-cNiFNN.kbAoLA.article-body__content > div.LightboxWrapper-dxsWBV.hhylRt > div > div.ArticlePageChunks-fLyCVG.lmuXQm > div:nth-child(1) > div > div > div
    //.body__inner-container
    //#bodyContent
    //worst comes to worst, extracting all text from body tags might work
    console.log(article)
    //get the whole page's HTML content
    // const content = await page.content();

    // console.log(content);

    //finally, closes the puppeteer browser and all its pages
    await browser.close()

//
// #bodyContent
//body > div.mw-page-container > div > div.mw-content-container
}
webScraping(hardLink);
//going to create http beginning concatonated wiht inputted url