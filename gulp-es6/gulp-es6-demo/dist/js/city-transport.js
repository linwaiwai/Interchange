!function(t){function i(a){if(e[a])return e[a].exports;var s=e[a]={exports:{},id:a,loaded:!1};return t[a].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}var e={};i.m=t,i.c=e,i.p="",i(0)}({0:function(t,i,e){t.exports=e(9)},9:function(t,i){Zepto(function(t){ant.call("setTitle",{title:"同城货运"}),e.init()});var e=new Object({init:function(){ant.getSessionData({keys:["cityCode"]},function(t){if(!t.data.cityCode)return void toast({text:"未获取到当前城市",type:"exception"});showLoading();var i={pageId:"SAMECITYFREIGHT",cityCode:t.data.cityCode},e=jUrl+"/ep/index_info";$.axs(e,i,function(t){if(t.meta.success){var i="",e="";$.each(t.result.sendApps,function(t){var a="",s=this.tag.substring(0,this.tag.length-1);e=s.split(","),$.each(e,function(t){a+='<span style="">'+e[t]+"</span>"});var n=t+1;i+='<a _href="'+this.linkUrl+'" class="am-list-item" data-spmv="a106.b2098.c4581.'+n+'" style="height:.90rem"><div class="am-list-thumb choice_leftlogo"><img src="'+this.logo+'" alt=""></div><div class="am-list-content" style="padding-top:.06rem;"><div class="am-list-title list_lineheight"><span style="font-size:.16rem">'+this.name+'</span></div><span class="am-ft-gray  advertisementvals" style="font-size:.14rem;padding-top:0.04rem;padding-bottom:.01rem;overflow:hidden:text-overflow:ellipsis">'+this.slogan+'</span><div class="am-ft-orange bubble_font" style="height:.15rem;line-height:.15rem;">'+a+"</div></div>",this.markPrice?i+='<div class="am-ft-orange prisetag_right">'+this.markPrice+"元起</div>":i+='<div class="am-ft-orange prisetag_right"></div>',i+='<div class="am-list-arrow" style="padding-top:.19rem;padding-bottom::.11rem;"><span class="am-icon horizontal"><img src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/indicator_icon.png"/></span></div></a>',BizLog.call("info",{spmId:"a106.b2098.c6089",actionId:"exposure",params:{CompName:this.name}})}),$(".management_list").html(i),$(".management_list .am-list-item:nth-child(n)").css({"padding-bottom":"0.005rem","padding-top":"0"}),$(".management_list .am-list-item:first-child").css("padding-top","0.005rem"),$(".express_content").show(),hideLoading(),isAndroid&&$(".bubble_font span").css({border:"1px solid #ff8200","padding-top":"0.02rem","padding-bottom":"0.015rem",height:"auto","line-height":"1","font-size":".1rem"}),$(".management_list a").on("click",function(){var t=$(".management_list a").index(this)+1,i=$(this).attr("_href"),e="a106.b2121.c6089"+t;BizLog.call("info",{spmId:e,actionId:"clicked",params:{ToURL:i,CompName:$(this).find(".am-list-title").text()}}),ant.pushWindow({url:$(this).attr("_href")})})}})})}})}});