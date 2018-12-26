const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.tracing.start({path: 'trace.json', categories: ['devtools.timeline']})

  await page.goto('https://pantip.com/forum/lumpini');

  var topicObject = []
  var topicItem = {
      'title' : '',
      'href' : '',
      'comment' : ''
  }





// ####### Get topic list. ####### //
const topicList = await page.$$eval('#show_topic_lists .post-item .post-item-title a', anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
//await page.$eval('#show_topic_lists .post-item .post-item-title a', elanchor => el.innerText)
//Remove spacing character in title
for(var i = 0; i<topicList.length; i++){
    var tmpText = topicList[i];
    tmpText = tmpText.replace('\n                  ','');
    topicList[i] = tmpText.replace('                  ','');
}
// ####### End Get topic list. ####### //
console.log(topicList)


// ####### Get topic link. ####### //
const topicLink = await page.$$eval('#show_topic_lists .post-item .post-item-title a' , anchors => { return anchors.map(anchor => anchor.getAttribute("href")).slice(0,10) } )




// ####### Get topic comment. ####### //
const topicComment = await page.$eval('#show_topic_lists .post-item div.post-item-by div', 
    (element) => {
        return element.innerHTML
    }
    
    )
    console.log(topicComment)



//const topicComment = await page.$$eval('#show_topic_lists .post-item div.post-item-by div', divs => { return divs.map(div => div.getAttribute("title")).slice(0,10) } )
//console.log(topicComment)


//Remove spacing character in title
//console.log(topicComment)

for(var i = 0; i<topicComment.length; i++){
    var tmpText = topicComment[i];
    //tmpText = tmpText.replace('\n                  ','');
    //topicComment[i] = tmpText.replace('                  ','');
}


// ####### End Get topic comment. ####### //


// Serialize 
for(var a = 0; a<topicList.length; a++){

    //topicItem['title'] = topicList[a]
    //topicItem['href'] = topicLink[a]
    /*
    console.log('========== Check ============')
    console.log(topicItem['title'])
    console.log('========== Check ============')
    */
    //console.log(topicList[a])
    //console.log(topicItem['title'])
    topicItem = {
        'title' : topicList[a],
        'href' : topicList[a],
        'comment' : ''
    }

    //topicObject[a] = topicItem;
    //array_push(topicObject,topicItem)
    topicObject.push(topicItem);
    //console.log(topicObject[a])
    //topicObject[i]['title'] = topicList[i]
    //topicObject[i]['href'] = topicLink[i]
    //console.dir(topicObject)
}
//console.log(topicObject)




//console.log(topicList)
console.log('----------------- ;)')
//console.log(topicLink)
//console.dir(topicObject)
//console.log(topicObject[7]);
await page.tracing.stop();


  await browser.close();
})();