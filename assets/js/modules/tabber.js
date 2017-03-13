(function($,tfi){
  "use strict";
  var attach = function($this){
    var active = $this.find(".isShowing").index();
    var total = $this.find(".tabber-body-inner").length - 1;
    var opentab = function(tab){
      if (tab === active || tab < 0 || tab > total) {
        return
      }
      active = tab;
      var $previousTab = $this.find(".isShowing");
      var $currentTab = $this.find(".tabber-body-inner#tab_" + (tab + 1));
      $previousTab.removeClass("isShowing");
      $currentTab.addClass("isShowing");
      $this.trigger("tfi-tabberbodychanged", active)
    };
    $this.on("click", ".tabber-nav a", function(func) {
      func.preventDefault();
      var tab = $(this).parent().index();
      opentab(tab)
    });
    $this.on("tfi-tabberbodychanged", function(func, tab) {
      $this.find(".tabber-nav a.selected").removeClass("selected");
      $this.find(".tabber-nav li:nth-child(" + (tab + 1) + ") a").addClass("selected")
    });
    $(window).on("keydown.tfi-tabberkeydown", function(func) {
      if (func.keyCode === 37) {
        func.preventDefault();
        opentab(active - 1)
      }
      if (func.keyCode === 39) {
        func.preventDefault();
        opentab(active + 1)
      }
    });
    $this.trigger("tfi-tabberbodychanged", active);
  };

  tfi.modules.tabbers = function(){
    tfi.helpers.attachOnce(".tabber", "tabber", attach)
  }
  
}($,tfi));$(tfi.modules.tabbers);
