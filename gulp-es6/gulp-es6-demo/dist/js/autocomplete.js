!function(t){function i(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}var e={};i.m=t,i.c=e,i.p="",i(0)}([function(t,i,e){t.exports=e(4)},,,,function(t,i){Zepto(function(t){FastClick.attach(document.body),{init:function(){this.getSession(),this.bindConfirmEvent()},getSession:function(){var i=this;ant.getSessionData({keys:["autocomplete_address","autocomplete_cityName"]},function(e){i.cityName=e.data.autocomplete_cityName,i.address=e.data.autocomplete_address,t(".searchInput-class").val(i.address).focus(),i.initAMap(i.cityName),i.bindInputEvent()})},initAMap:function(t){var i=this;AMap.plugin("AMap.Autocomplete",function(){i.Autocomplete=new AMap.Autocomplete({city:t,citylimit:!0})})},bindInputEvent:function(){var i=this;t(".searchInput-class").unbind().bind("input",function(){if(51==t(this).val().length){var e=t(this).val().slice(0,50);t(this).val(e)}var n=t(this).val(),o="";i.Autocomplete.search(n,function(e,n){o="","complete"==e?(n.tips.forEach(function(t){console.log(t);var e=t.name,n=t.address;o+='<div class = "am-list-item" style="min-height:.42rem"><div class="am-list-thumb" style="margin-right:.06rem"><img style="width:.12rem;height:.14rem;" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/address-icon.png" alt="图标描述" /></div><div class="am-list-content"><div class="am-list-title" style="padding-top:.105rem;font-size:.16rem;color:#333" >'+e+'</div><div class="am-list-brief"  style="padding-bottom:.15rem;font-size:.14rem;line-height:1;color:#999">'+i.cityName+n+"</div></div></div>"}),t(".Autocomplete-content").html(o),t(".Autocomplete-content .am-list-item").unbind().bind("click",function(i){var e=t(this).find(".am-list-title").text();t(".searchInput-class").val(e),t("body").scrollTop(0)})):t(".Autocomplete-content").empty()})})},bindConfirmEvent:function(){t("#addressConfirm").unbind().bind("click",function(){t(".Autocomplete-content").empty();var i=t(".searchInput-class").val();ant.setSessionData({data:{autocomplete_address:i}}),ant.popWindow()})}}.init()})}]);