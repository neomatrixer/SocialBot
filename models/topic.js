const puppeteer = require('puppeteer');


module.exports = {
    getTopicList: function () {

        (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.tracing.start({path: 'trace.json', categories: ['devtools.timeline']})

        await page.goto('https://pantip.com/forum/chalermkrung');

        var topicObject = []
        var topicItem = {
            'title' : '',
            'href' : '',
            'comment' : ''
        }

        

        var selectorPostTitle = '#show_topic_lists > .post-item > .post-item-title a'
        var selectorPostLink = '#show_topic_lists > .post-item > .post-item-title a'
        var selectorPostTime = '#show_topic_lists > .post-item > .post-item-by > .timestamp > .timeago'
        var selectorPostByItem = '#show_topic_lists .post-item div.post-item-by'
        var totalList = 10
        var itemByArray = [];

        var topicObject = []
        var topicItem = {
            'title' : '',
            'href' : '',
            'comment' : '',
            'vote' : '',
            'time' : ''
        }


        // ####### Get topic name by list. ####### //
        const topicList = await page.$$eval(selectorPostTitle, anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
        for(var i = 0; i<topicList.length; i++){
            var tmpText = topicList[i];
            tmpText = tmpText.replace('\n                  ','');
            topicList[i] = tmpText.replace('                  ','');
        }

        // ####### Get topic link by list. ####### //
        const topicLink = await page.$$eval(selectorPostLink, anchors => { return anchors.map(anchor => anchor.getAttribute("href")).slice(0, 10) })

        // ####### Get topic time by list. ####### //
        const topicTime = await page.$$eval(selectorPostTime, abbrs => { return abbrs.map(abbr => abbr.getAttribute("data-utime")).slice(0, 10) })

        // ####### Get topic by list. ####### //
        const postByItem = await page.$$eval(selectorPostByItem, divs => { return divs.map(div => div.textContent).slice(0, 10) })

        for(var i=0;i<postByItem.length;i++){
        var tmpText = postByItem[i];
        tmpText = tmpText.replace(' ','');
        tmpText = tmpText.replace(' -  ',',');
        tmpText = tmpText.replace(' \n                                      ',',');  
        tmpText = tmpText.replace(' \n                                                        ',',');  
        tmpText = tmpText.replace(' \n                                  ','');
        tmpText = tmpText.replace('                  ','');
        tmpText = tmpText.replace('              ','');   
        var array = tmpText.split(",");
        itemByArray.push(array)                           
        }



        // ####### Serialize 
        for(var a = 0; a<topicList.length; a++){
        if (itemByArray[a][3] == null){
            var vote = 0;
        }else{
            var vote = Number(itemByArray[a][3])
        }

        if(itemByArray[a][2] == ''){
            var comment = 0;
        }else{
            var comment = Number(itemByArray[a][2])
        }

        topicItem = {
            'title' : topicList[a],
            'href' : topicLink[a],
            'comment' : comment,
            'vote' : vote,
            'time' : topicTime[a]
        } 

        topicObject.push(topicItem);
        
        console.log('bbbbb');
        return 'aaaa';
        console.log('cccccc')
        }


        //console.log(topicObject)
        //return 'a';

        await page.tracing.stop();
        await browser.close();
        })();



    }
  };