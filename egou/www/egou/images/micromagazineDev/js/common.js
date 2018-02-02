;
//拼图选择图片
$(".magic_btns .edit_magicimg").live("click",function(){
	$(this).selectPic({
		host : mag.HOST,
		backdatainfo:function(_t,arr){
			_t.parent().prev("a").find("img").attr("src",arr.url);
			_t.parent().prev("a").prev().remove();
			_t.parents("td").addClass("hasimg");
		}
	});
});
//拼图选择连接
$(".magic_btns .edit_magicurl").live("click",function(){
	$(this).selectLink({
		host : mag.HOST,
		backdatainfo:function(_t,arr){
			_t.parent().prev("a").attr("href",arr.url);
		}
	});
}); 

new labelConp({action:'show',callback:function(_this,choosedLabel){  
	var str='';
	var key='';
	for(var i in choosedLabel){ 
		str+=str?(","+choosedLabel[i]['text']):choosedLabel[i]['text'];
		key+=key?(";"+choosedLabel[i]['id']):choosedLabel[i]['id'];
	}
	_this.next().attr({"str" : str,"key" : key}).trigger("click");
	//setTimeOut(function(){_this.next().trigger("click")},"1000");
	_this.attr("choosed_label",key);
}});
/*日期与时间戳转换*/
(function($) {
    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)  
             */
            CurTime: function(){
                return Date.parse(new Date())/1000;
            },
            /**              
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式              
             * @return <int>        unix时间戳(秒)              
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                        )).getTime() / 1000;
            },
            /**              
             * 时间戳转换日期              
             * @param <int> unixTime    待时间戳(秒)              
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)              
             * @param <int>  timeZone   时区              
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (time.getUTCMonth()+1) + "-";
                ymdhis += time.getUTCDate();
                if (isFull === true)
                {
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
            }
        }
    });
})(jQuery);

//滑动到底部
mag.scrollbottom = function(){
	setTimeout(function(){
    	/*var e=document.getElementById("scrolldIV");
    	e.scrollTop = e.scrollHeight;*/
		var container = $('#scrolldIV');
    	container.animate({
			scrollTop: container.offsetHeight
		});
    },1);
};
//保存提示
mag.showloadingtips = function(type,tip){
	if(type == 1){
		$(".loading_tips").find("i").attr("class","ui-loading-bright");
		$(".ui-loading-bright").css("display","block");
	}else{
	    if(type == 2){
	    	$(".loading_tips").find("i").attr("class","icon_success");
		}else if(type == 3){
			$(".loading_tips").find("i").attr("class","icon_failed");
		}
		$(".ui-loading-bright").hide();
	}
	$(".loading_tips").addClass("show").find("div").html(tip);
};
mag.hideloadingtips = function(){
	$(".loading_tips").removeClass("show");
};
//警告提示，简单模仿alert
mag.showtips = function(tip,type){
	if(!type){type = 3;}
	mag.showloadingtips(type,tip);
	setTimeout(function(){mag.hideloadingtips();},2000);
};

$(function() {
	//单选按钮切换
	/*$("input[type=radio]").live("click",function(){
		$(this).parent(".radiobox").addClass("active").siblings().removeClass("active");
	});*/
	//switch切换
	$(".switch_box input").live("change",function(){
		var oninfo = $(this).find(".switch_info").attr("data-oninfo"),
		offinfo = $(this).find(".switch_info").attr("data-offinfo"),
		current = $(this).parent(".switch_box");
		if(!$(this).prop("checked")){
			current.removeClass("on").addClass("off");
			current.find(".switch_info").html(offinfo);
		}else{
			current.removeClass("off").addClass("on");
			current.find(".switch_info").html(oninfo);
		}
	});
	$(".switch_box").live("hover",function(e){
		var oninfo = $(this).find(".switch_info").attr("data-oninfo"),
		offinfo = $(this).find(".switch_info").attr("data-offinfo");
		var current = $(this).find(".switch_info");
		if($(this).hasClass("on")){
			if(e.type == "mouseenter"){
				current.html(offinfo);
			}else{
				current.html(oninfo);
			}
		}else{
			if(e.type == "mouseenter"){
				current.html(oninfo);
			}else{
				current.html(offinfo);
			}
		}
	});
	//左侧模块切换样式
	$(".accordion-toggle").click(function(){
		var parent = $(this).attr("data-parent");
		if($(this).parent().next().hasClass("in")){
			$(this).find("i").removeClass("icon_downarrow").addClass("icon_rightarrow");
		}else{
			$(".accordion-toggle[data-parent="+parent+"]").find("i").removeClass("icon_downarrow").addClass("icon_rightarrow");
			$(this).find("i").removeClass("icon_rightarrow").addClass("icon_downarrow");
			
		}
	});
	var modalheight;
    $(window).bind('load', function () {
        resetWin();
    });
    $(window).bind('resize', function () {
        resetWin();
    });
    function resetWin() {
        modalheight = ($(window).height()-218)+"px";  
        $(".viewmodalsbox").height(modalheight);
    }
});

