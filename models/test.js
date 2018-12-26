const puppeteer = require('puppeteer');


module.exports = {
    testFunction: function () {

        (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.tracing.start({path: 'trace.json', categories: ['devtools.timeline']})

        await page.goto('https://pantip.com/forum/chalermkrung');

        var selectorPostTitle = '#show_topic_lists > .post-item > .post-item-title a'
        
        // ####### Get topic name by list. ####### //
        const topicList = await page.$$eval(selectorPostTitle, anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
        for(var i = 0; i<topicList.length; i++){
            var tmpText = topicList[i];
            tmpText = tmpText.replace('\n                  ','');
            topicList[i] = tmpText.replace('                  ','');
        }
        console.log(topicList)

        await page.tracing.stop();
        await browser.close();
        return topicList
        })();



    }
  };