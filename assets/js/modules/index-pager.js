(function($,tfi){
  "use strict";
  var $wrapper = null,
      btnNext = ".pager.pager-next",
      btnPrev = ".pager.pager-prev",
      wrapperSelector = '#Blog1',
      beaconSelector = ".page-beacon",
      maxPost = 20,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  var getNewLocation = function(path){
    var newPathname = path.replace("+","%2B");
    return window.location.pathname+ "?updated-max=" +newPathname
  };
  var getFeeds = function(){
    var strSection,substrSection,nameSection;
    if (baseUrl.indexOf("?q=") != -1 || baseUrl.indexOf(".html") != -1) {
        return
    };
    strSection = baseUrl.indexOf("/search/label/") + 14;
    if (strSection != 13) {
      substrSection = getLabel();
      nameSection = "feeds/posts/summary/-/" + substrSection + "?alt=json-in-script&max-results=99999";
    } else {
      nameSection = "feeds/posts/summary?alt=json-in-script&max-results=99999";
    };
    return nameSection
  };
  var getLabel = function(){
    var strLabel,strLabelReg,nameLabel;
    strLabel = baseUrl.indexOf("/search/label/") + 14;
      strLabelReg = baseUrl.indexOf("?");
      nameLabel = (strLabelReg == -1) ? baseUrl.substring(strLabel) : baseUrl.substring(strLabel, strLabelReg);
    return nameLabel
  };
  var btnNextShow = function(param){
    var idx;
    $.get(param, function(func) {
      idx = $(func).find(btnPrev);
      idx.length && $(btnNext).attr("href",param).addClass('shown')
    });
  };
  var maxPosts = function(){
    var regEx = /\max-results=/, regEx2 = /\T-Ara|\T-ara|\Terbaru/,
        totalPost = baseUrl.match(regEx) !== null ? baseUrl.split(regEx)[1] : maxPost,
        perLabel = baseUrl.match(regEx2) !== null ? totalPost-4 : totalPost;
    return perLabel
  };
  var getNextLink = function(beacon){
    var beaconData = beacon.data("beacon"),
        datePath = beaconData.split(/\?updated-max=/)[1],
        namePath = getNewLocation(datePath);
    btnNextShow(namePath)
  };
  var getPrevLink = function(btnzPrev){
    var dfr = $.Deferred();
    $.ajax({
      type: 'GET',
      url: tfi.env.data.homepageUrl + getFeeds(),
      dataType: 'jsonp',
      success: dfr.resolve,
      error: dfr.reject
    });
    dfr.promise().done(function(response) {
      var getUrl = location.href,
          strUrl = getUrl.indexOf("/search/label/") != -1,
          substrUrl = strUrl ? getUrl.substr(getUrl.indexOf("/search/label/") + 14, getUrl.length) : "";
      substrUrl = substrUrl.indexOf("?") != -1 ? substrUrl.substr(0, substrUrl.indexOf("?")) : substrUrl;
      var pathUrl = strUrl ? "search/label/" + substrUrl + "?updated-max=" : "search?updated-max=",
          feedEntry = response.feed.entry.length,
          entryLength = Math.ceil(feedEntry / maxPosts()-1);
      if (entryLength == 0) {
        return
      }
      var selector,pathPack = [""];
      strUrl ? pathPack.push("search/label/" + substrUrl) : pathPack.push("?max-results=" + maxPosts());console.log(pathPack);
      selector = 1;
      for (var count = 2; count <= entryLength; count++) {
        var chosenFeed = (count - 1) * maxPosts() - 1,
            datePublish = response.feed.entry[chosenFeed].published.$t,
            dateUrl = datePublish.substring(0, 19) + datePublish.substring(23, 29);
		dateUrl = dateUrl.replace(/\+/,"%2B");
        if (getUrl.indexOf(dateUrl) == -1) {
          selector = count
        }
        pathPack.push(pathUrl + dateUrl);
      };      
      btnzPrev.attr("href","/"+pathPack[selector]).addClass("shown")
    })
  };
  var getNextPage = function(){
    $wrapper.find(beaconSelector).each(function(){
      var $this = $(this);
      tfi.helpers.attachOnce($this, 'page-beacon', function () {
        getNextLink($this);
      })
    })
  };
  var getPrevPage = function(){
    var $this = $wrapper.find(btnPrev);
    if($this.length>0){
      getPrevLink($this)
    }
  };

  tfi.modules.indexpager = {
    init: function(){
      $wrapper = $(wrapperSelector);
      tfi.helpers.attachOnce($wrapper, 'index-pager', function () {
        getNextPage();getPrevPage()
      })
    } 
  }
})($,tfi);$(tfi.modules.indexpager.init);
