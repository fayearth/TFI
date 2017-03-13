function($,tfi){
  "use strict";
  e.modules.sharingan = {
    tw: function(a,t){
      var n = a.data("permalink"), o = a.data("title");
      return a.attr("data-url", t.replace(/\?url=(.*)/,"?url="+encodeURIComponent(n)+"&via=t_arafansindo&related=t_arafansindo&text="+encodeURIComponent(o)))
    },
    fb: function(a,t){
      var n = a.data("permalink"), o = a.data("title"), i = e.env.postTMP[0].image, s = e.env.postTMP[0].snippet;
      return a.attr("data-url",t.replace(/p\[url\]=(.*)/,"p[url]="+encodeURIComponent(n)+"&p[title]="+encodeURIComponent(o)+"&p[images][0]="+encodeURIComponent(i)+"&p[summary]="+encodeURIComponent(s)+"&u="+encodeURIComponent(n)+"&t="+encodeURIComponent(o)))
    },
    pt: function(a,t){
      var n = a.data("permalink"), o = a.data("title"), i = e.env.postTMP[0].image;
      return a.attr("data-url",t.replace(/\?url=(.*)/,"?url="+encodeURIComponent(n)+"&media="+encodeURIComponent(i)+"&description="+encodeURIComponent(o)))
    },
    wa: function(a){
      var t = e.env.postTMP[0].permalink, n = e.env.postTMP[0].title.replace(/\&#8216;/g,"‘").replace(/\&#8217;/g,"’");
      return a.attr("href", a.attr("href").replace(/\?text=(.*)/, "?text=" + encodeURIComponent(n+" - "+t)))
    },
    wt: function(a,t,n){
      var o = e.env.postTMP[0].title.replace(/\&#8216;/g,"‘").replace(/\&#8217;/g,"’")+" "; o = o.substr(0,60);
      o = o.substr(0, Math.min(o.length, o.lastIndexOf(" ")));
      return a.attr("href","http://twitter.com/intent/tweet?text="+encodeURIComponent("Baca post keren @"+t+": "+o+" … "+n)+"&via=t_arafansindo")
    },
    ln: function(a){
      var t = e.env.postTMP[0].permalink, n = e.env.postTMP[0].title.replace(/\&#8216;/g,"‘").replace(/\&#8217;/g,"’");
      return a.attr("href", a.attr("href").replace(/\/text\/(.*)/, "/text/?" + encodeURIComponent(n+" - "+t)))
    },
    ml: function(a){
      var t = e.env.postTMP[0].permalink, n = e.env.postTMP[0].title.replace(/\&#8216;/g,"‘").replace(/\&#8217;/g,"’");
      return a.attr("href",a.attr("href").replace(/\?subject=(.*)/,"?subject="+n+"&body="+encodeURIComponent(t)))
    },
    ex: function(a,t){
      var n = a.data("permalink"), o = a.data("title");
      return a.attr("data-url",t.replace(/\url=(.*)/,"url="+encodeURIComponent(n)+"&title="+encodeURIComponent(o)))
    },
    gp: function(a,t){
      var n = a.data("permalink");
      return a.attr("data-url",t.replace(/\url=(.*)/,"url="+encodeURIComponent(n)))
    },
    img: function(a){
      var t, n, o, i = a.data("social-type"), s = e.env.postTMP[0].permalink;
      return "shareImage" === i && (t = a.attr("class"), n = a.parent().text(), o = a.parents(".separator").find("img").data("src"), a.addClass("popitup"), -1 !== t.indexOf("pinterest") ? (a.attr({"data-width":800,"data-height":680}), a.attr("data-url","https://www.pinterest.com/pin/create/button/?url="+encodeURIComponent(s)+"&media="+encodeURIComponent(o)+"&description="+encodeURIComponent(n))) : -1 !== t.indexOf("twitter") && (a.attr({"data-width":600,"data-height":500}), a.attr("data-url","http://twitter.com/intent/tweet?text="+encodeURIComponent('Lihat foto "'+n+'" disini '+s)+"&via=t_arafansindo&related=t_arafansindo"))), "twitterMention" === i && (t = a.data("social-id"), e.socials.shareWT(a,t,s))
    }
  }
}($,tfi)
