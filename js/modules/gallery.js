(function($,tfi){
  "use strict";
  var preview = function(url, $origin) {
    var self = this,
        offsetLeft = ($origin.offset().left + ($origin.outerWidth() / 2) - $(window).scrollLeft()) - ($(window).outerWidth() / 2),
        offsetTop = ($origin.offset().top + ($origin.outerHeight() / 2) - $(window).scrollTop()) - ($(window).outerHeight() / 2),
        $preview = $('<div class="galleryPreview"></div>'),
        $img = $('<img style="opacity:0" src="' + url + '" />');
    $preview.append($img),
    $img.on("load", function(func) {
      var scale = $origin.outerWidth() / $img.outerWidth();
      $img.css({
        transform: "translate(" + offsetLeft + "px," + offsetTop + "px) scale(" + scale + ")",
        opacity: 1
      });
      setTimeout(function() {
        $preview.addClass("galleryPreview-animated");
        $preview.trigger("tfi-ready")
      }, 5)
    }),
    this.render = function() {
      return $preview
    };
    return this
  };
  var loaded = function($cont){
    $cont.parent().addClass("isAttached");
    $cont.find("img").lazyload({
      skip_invisible:true,classes:"lazyLoaded",data_attribute:"src",effect:"fadeIn",threshold:200,load:function(){$cont.trigger("tfi-galleryImageShow")}
    });
    $cont.on("tfi-galleryImageShow", function(){
      tfi.loadModule("masonry", function(a) {
        tfi.modules.masonry($cont,"li")
      })
    });
    $cont.on("click", "a", function(func) {
      func.preventDefault();
      var $trigger = $(this),
          url = $trigger.attr("href").replace(/\/s[0-9]+(\/)?/,"/s0/"),
          previewInstance = new preview(url, $(this)),
          $previewInstance = previewInstance.render(),
          $loading = $('<div class="galleryLoading"><i class="u-spinner"></i></div>');
      $trigger.css({'pointer-events':'none'});
      $("body").append($previewInstance);$previewInstance.append($loading);
      $previewInstance.one("tfi-ready", function(func) {
        $loading.remove();
        $trigger.css({'opacity':'.1','pointer-events':''});
        $previewInstance.addClass("galleryPreview-open");
        $previewInstance.one("click", function() {
          $previewInstance.removeClass("galleryPreview-open");
          $previewInstance.one("transitionend webkitTransitionEnd", function() {
            $previewInstance.remove();
            $trigger.removeAttr('style')
          })
        })
      })
    })
  };
  tfi.modules.gallery = {
    init: function(){
      tfi.helpers.attachOnce(".post-gallery-grid", "gallery", loaded)
    }
  }
}($,tfi));$(tfi.modules.gallery.init);
