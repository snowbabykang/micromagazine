//选择图片
function picbackinfo(_t,picarr){
	var spec = _t.attr("data-spec"),
	type= _t.attr("data-type");
	if(spec){
		pic = picarr.picurl+"_"+spec+"x"+spec+".jpg";
	}else{
		pic = picarr.picurl;
	}
	if(type == "carousel"){
		//轮播图判断尺寸
		$("<img/>").attr("src", pic).load(function() {
			var twidth = this.width,
				theight = this.height,
				relratio = (twidth/theight).toFixed(2);
			_t.find("input.img_url").attr("value", pic).trigger('input');
			_t.find("input.img_relratio").attr("value", relratio).trigger('input');
		});	
	}else if(_t.attr("data-mark") == "magic"){
		_t.parent().prev("a").find("img").attr("src",pic);
		_t.parent().prev("a").prev().remove();
		_t.parents("td").addClass("hasimg");
	}else{
		if(spec){
			_t.find("img").attr({"src":picarr.picurl+"_180x180.jpg"});
		}else{
			_t.find("img").attr({"src":picarr.picurl});
		}
		_t.find("input").attr("value", pic).trigger('input');
	}
}
//选择连接
function selecturlback(_t,link,linkarr){
	var url = linkarr.url,title = linkarr.title;
	if(_t.attr("type") == "magic"){
		_t.parent().prev("a").attr("href",url);
	}else{
		_t.prev().prev("input").attr("value", title).trigger('input');
		_t.prev("input").attr("value", url).trigger('input');
	}
};



var overall_array = [],overall_obj = {},prdselected_ids = "";
var overall_html = "";  //选择表单使用
//选择分类
function select_classfiyback(_t,arr){
	overall_array = [];
	for(var i = 0; i < arr.length; i++){
		var newItem = {
    		"item_id":i + 1,
    		"item_classfiyid":arr[i].dataid,
            "item_link" : arr[i].classurl,
            "item_title" : arr[i].classname,
        };
		overall_array.push(newItem);
	};
	_t.prev().trigger("click");
};
//选择商品
function general_selprd(_t,prdids,arr){
	overall_array = [];
	for(var i = 0; i < arr.length; i++){
		var pic = arr[i].pic,
		pic = pic.replace(/80x80.jpg/, "400x400.jpg");
		var newItem = {
    		"item_prdid":arr[i].dataid,
    		"item_pic":pic,
            "item_title" : arr[i].title,
            "item_price" : arr[i].price,
        };
		overall_array.push(newItem);
	};
	
	prdselected_ids = prdids;
	_t.prev().trigger("click");
};
//选择表单
function getformbackinfo(_t,id,title,msg){
	_t.prev().val(title);
	_t.parent().next().attr("data-id",id);
	overall_html = msg;
	_t.parent().next().trigger("click");
};
//选择优惠券
function couponchoiceinfo(_t,arr){
	overall_obj = {};
	overall_obj = {
		"id":arr.id,
		"type" : "coupon",
		"name":arr.name,
		//"value":arr.value,
		"num":arr.num,
		//"time":arr.time,
    };
	_t.prev().trigger("click");
};
//选择提货卡
function delicardchoiceinfo(_t,arr){
	overall_obj = {};
	overall_obj = {
		"id":arr.id,
		"type" : "delicard",
		"name":arr.cardname,
		//"value":arr.cardval,
		"num":arr.cardnum,
	};
	_t.prev().trigger("click");
};
//选择店铺红包
function rpacketchoiceinfo(_t,arr){
	overall_obj = {};
	overall_obj = {
		"id":arr.id,
		"type" : "rpacket",
		"name":arr.rname,
		"num":arr.rnum,
		//"rbudget":arr.rbudget,
	};
	_t.prev().trigger("click");
};
//选择微杂志
function backmagazineinfo(_t,arr){
	overall_obj = {};
	overall_obj = {
		"id":arr.id,
		"type" : "mag",
		"name":arr.title,
		"url":arr.url,
	};
	_t.prev().trigger("click");
};

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
    	var e=document.getElementById("scrolldIV");
    	e.scrollTop = e.scrollHeight;
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
	$("input[type=radio]").live("click",function(){
		$(this).parent(".radiobox").addClass("active").siblings().removeClass("active");
	});
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
        modalheight = ($(window).height()-238)+"px";  
        $(".viewmodalsbox").height(modalheight);
    }
});


//加载正文
myApp.directive('maincon', function() {  
    return {  
        restrict: 'E',
        templateUrl: mag.templateurl,
        controller: 'mainCtr',
        replace:true,      
    }  
});
myApp.directive('actcon', function() {  
    return {  
        restrict: 'E',
        templateUrl: mag.act_url,
    }  
});
/*myApp.directive('prdthemecon', function() {  
	return {  
		restrict: 'E',
		replace:true,     
		templateUrl: mag.getprdtheme,
		 link: function($scope, element){
			 console.log("111");
			//选择商品主题
				$scope.selectprdtheme = function(field){
					$scope.showprdtheme = true;
					//选择主题
					$scope.confirmprdtheme = function(val,name){
						field.field_themetitle = name;
						field.field_prdtheme = val;
						$scope.showprdtheme = false;
						
						
						
					};
				};
				$scope.closeprdtheme = function(){
					$scope.showprdtheme = false;
				};
	    },
	}  
});*/
/* 封装的解码 过滤器   
 * 将数组中存储的encode解码预览
 * 视频模块内容使用
 * 富文本使用
 * 表单使用
 * */   
myApp.filter('decodeURI', ['$sce', function ($sce) {
	return function (text) {
		/*富文本编辑时传入的数据要判断是否转码了*/
		try {
		    myVal = decodeURIComponent(text);
		    return $sce.trustAsHtml(myVal);
		} catch (err) {
		    myVal = encodeURIComponent(text);
		    return $sce.trustAsHtml(decodeURIComponent(myVal));
		}
    };
}]);
myApp.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}]);
myApp.filter('setpuzzle', ['$sce', function ($sce) {
	return function (text) {
		var html = decodeURIComponent(text);
		var btns = '<div class="magic_btns"><span class="edit_magicurl selecturl" data-mark="backurl" type="magic" title="选择链接"></span><span class="edit_magicimg selectimage" data-mark="magic" title="选择图片"></span><span class="del_magic" title="删除"></span></div>';
		var table = "";
		$(html).find("tr").each(function(){
			var len = $(this).find("td.notempty").length;
			if(len > 0){
				$(this).find("td.notempty").append(btns);
			};
			var trcon = "<tr>"+$(this).html()+"</tr>";
			table += trcon;
		});
		return $sce.trustAsHtml(table);
	};
}]);
//slider滑动
myApp.directive('slider', function(){  
  return {
    restrict: 'A',
    link : function($scope,elem,attr){
    	$(elem).slider({
    		  range: "min",
    		  min: parseInt(attr.min),
    		  max: parseInt(attr.max),
    		  step:parseInt(attr.step),
    		  value:parseInt(attr.value),
    		  slide: function( event, ui ) {
    			  var type=attr.type;
    			  var _num=ui.value;
    			  dragvalue = _num+"px";
    			  $scope.$apply(function(){  
    				  if(attr.mark){
    					  $scope.$storage.form[attr.mark] = dragvalue;
    				  }else{
    					  $scope.field[type] = dragvalue;
    				  }
    			  });
    		  },
		});
    },
  }  
});
//颜色选择器
myApp.directive('colorpicker', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			var type = attr.type;
			$(elem).colorpicker({
				customClass: 'colorpicker-big',
				color:attr.color,
				sliders: {
	                saturation: {
	                    maxLeft: 130,
	                    maxTop: 130
	                },
	                hue: {
	                    maxTop: 130
	                },
	                alpha: {
	                    maxTop: 130
	                }
	            }
			}).on('changeColor.colorpicker', function(event){
				  $scope.$apply(function(){  
					  var r = event.color.toRGB().r,
						  g = event.color.toRGB().g,
						  b = event.color.toRGB().b,
						  a = event.color.toRGB().a;
					  var color = "rgba("+r+","+g+","+b+","+a+")";
					  if(attr.mark == "mag"){    //微杂志整体设置
						  $scope.$storage.form.bgcolor = color;
					  }else if(attr.mark == "act"){    //所有活动
						  $scope.$storage.form.styles[type] = color;
					  }else if(attr.mark == "wheel"){
						  $scope.field[type] = color;
						  //大转盘需要重新画盘
						  var colorarr = [$scope.field["field_bgcolor1"],$scope.field["field_bgcolor2"]];
						  wheelfunc.draw(colorarr,$scope.field["field_color"]);
						  /*modalheight = ($(window).height()-238)+"px";  
					        $(".viewmodalsbox").height(modalheight);*/
					  }else{     //模块颜色
						  $scope.field[type] = color;
					  };
					  modalheight = ($(window).height()-238)+"px";  
			          $(".viewmodalsbox").height(modalheight);
    			  });
			});
		},
	} 
});
//富文本添加自定义工具
myApp.directive('addtoueditor', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			$(elem).click(function(){
				var editor_html = $(elem).html();
				$scope.ueditor.execCommand("insertHtml",editor_html);
			});
		},
	} 
});
//输入框字数限制
myApp.directive('limitcount', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			InitLimit(elem, attr.count, true, function (c) {
			   //var target = elem[0].nodeName;
               if (c >= 0) {
                	$(elem).next().children().html(c).attr("style", "");
               }else {
                    var title = $.trim($(elem).val());
                    var copytitle = getByteVal(title, attr.count);
                    $(elem).val(copytitle).trigger('input');
                    $(elem).next().children().attr("style","color:#ff0000");
                }
            });
		},
	} 
});
//时间选择器（活动选择时间）
myApp.directive('acttime', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			$(elem).focus(function(){
				WdatePicker({
					skin:'whyGreen',
					dateFmt:'yyyy-MM-dd HH:mm:ss',
					minDate:'%y-%M-%d %H:%m:%s',
					readOnly:true,
					onpicked : function(e){
						$scope.$apply(function(){  
							$scope.$storage.form.rules[attr.mark] = e.cal.getNewDateStr();
						});
					},
				});
			});
		},
	} 
});
//时间选择器   倒计时
myApp.directive('wdatetime', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			$(elem).focus(function(){
				WdatePicker({
					skin:'whyGreen',
					dateFmt:'yyyy-MM-dd HH:mm:ss',
					minDate:'%y-%M-%d %H:%m:%s',
					readOnly:true,
					onpicked : function(e){
						$scope.$apply(function(){  
							var timestamp = $.myTime.DateToUnix(e.cal.getNewDateStr());
							$scope.field["field_rtime"] = e.cal.getNewDateStr();
	    					  $scope.field[attr.mark] = timestamp;
	    					  var dateTime = new Date();
	    					  var difference = dateTime.getTime() - mag.serverTime; //服务器与当前时间差
	    					 /* setInterval(function() {*/
	    					  		var endTime = new Date(parseInt(timestamp) * 1000); //结束时间
	    					  		var e_time = endTime.getTime();
	    					  		var nowTime = new Date(); //当前时间
	    					  		var nMS = endTime.getTime() - nowTime.getTime() + difference; //距离时间差
    					  			var myD = Math.floor(nMS / (1000 * 60 * 60 * 24));
    					  			var myH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
    					  			var myM = Math.floor(nMS / (1000 * 60)) % 60;
    					  			var myS = Math.floor(nMS / 1000) % 60;
    					  			$scope.field["field_days"] = myD;
    					  			$scope.field["field_hours"] = myH;
    					  			$scope.field["field_minutes"] = myM;
    					  			$scope.field["field_seconds"] = myS;
	    					 /* },100);*/
		    			});
					},
				});
			});
		},
	} 
});

//富文本选择模块
myApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when("", "/title");
    $stateProvider
       .state("title", {
           url:"/title",
           views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'title',
	        	},
           }
       })
       .state("content", {
    	   url:"/content",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'content'
	        	},
           }
       })
       .state("attention", {
    	   url:"/attention",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'attention'
	        	},
           }
       })
       .state("line", {
    	   url:"/line",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'line'
	        	},
           }
       })
       .state("readmore", {
    	   url:"/readmore",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'readmore'
	        	},
           }
       })
       .state("share", {
    	   url:"/share",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'share'
	        	},
           }
       })
       .state("pushother", {
    	   url:"/pushother",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'pushother'
	        	},
           }
       })
});


//活动验证focus
/*myApp.directive('autoFocusWhen', ['$log','$timeout', function($log, $timeout) {
    return {
        restrict: 'A',
        scope: {
            autoFocusWhen: '='
        },
        link: function(scope, element) {
        	console.log("1111");
            scope.$watch('autoFocusWhen', function(newValue) {
            	console.log(newValue);
                if (newValue) {
                   $timeout(function(){
                       element[0].focus();
                   })
                }
            });

            element.on('blur', function() {
                scope.$apply(function() {
                    scope.autoFocusWhen = false;
                })
            })
        }
    }
}]);*/

'use strict';
/*
 * angular服务
 * 1、默认普通模块的颜色数组，以后换主题可以直接改数组
 * 2、普通模块的一些方法
*/
myApp.service('ColorService', function ColorService() {
	var color = {
        	"bgcolor" : "#f8f7f5",   //整体模块的背景色
        	"title" :{
        		"stylecolor": "#ff5d5d",
                "bgcolor": "rgba(255,255,255,0)",
                "color": "#333333",
        	},
        	 "richtxt" : {
        		 "color":"#00BBEC",
        		 "bgcolor": "transparent",
    		},
    		'carousel': {
    			"bgcolor": "transparent",
    		},
    		'imglist': {
    			"bgcolor": "rgba(255,255,255,0)",
    		},
    		'btnlink': {
    			"bgcolor": "#ff5d5d",
                "color": "#fff",
                "bordercolor": "#ff5d5d",
    		},
    		'division' : {
    			"bordercolor": "#333",
    		},
    		'notice': {
    			"bgcolor": "#ff5d5d",
                "color": "#fff",
    		},
    		'contact': {
    			"bgcolor": "#ff5d5d",
                "color": "#fff",
                "phonecolor": "#fff",
    		},
    		'menu': {
    			"bgcolor": "#f0f0f0",
    			"color": "#777",
    			"bordercolor": "#dfdfdf",
    		},
    		'product': {
    			"bgcolor":"transparent",
    		},
    		'classfiy': {
    			"bgcolor":"#fff",
    			"color":"#333",
    			"bordercolor":"#ddd",
    		},
    		'time': {
    			"bgcolor": "#ff5d5d",
    			"color": "#fff",
    			"timebgcolor" : "#333",
    			"timefcolor": "#fff",
    		},
    		'qrcode': {
    			"bgcolor": "#fff",
    			"shadowcolor": "rgba(0,0,0,0.5)",
    		},
        };
	//上移下移模块   （轮播图使用）
	var swapItems = function(arr, index1, index2) {
		arr[index1] = arr.splice(index2, 1, arr[index1])[0];
		return arr;
	};
    return {
        color:color,
        //添加普通模块
        addfield : function(type,id){       
        	var newField = {};
    		switch(type){
    			case 'title':
    				newField = {
    		            "field_id" : id,
    		            "field_type" : type,
    		            "field_con" : "标题文字",
    		            "field_fz": "14px",
    		            "field_style": "zero",
    		            "field_stylecolor":color[type].stylecolor,
    		            "field_align": "center",
    		            "field_isbold": 'bold',
    		            "field_isindent": '0em',
    		            "field_bgcolor": color[type].bgcolor,
    		            "field_color": color[type].color,
    		            "field_pt": "8px",
    			        "field_pr": "5px",
    			        "field_pb": "8px",
    			        "field_pl": "5px",
    		            "field_mt": "0px",
    		            "field_mb": "8px",
    	        	};
    			  break;
    			case 'richtxt':
    				newField = {
    		            "field_id" : id,
    		            "field_type" : type,
    		            "field_richcon" : "",
    		            "field_color":color[type].color,
    		            "field_bgcolor": color[type].bgcolor,
    		            "field_pt": "0px",
    			        "field_pr": "0px",
    			        "field_pb": "0px",
    			        "field_pl": "0px",
    	        	};
    			  break;
    			case 'carousel':   //轮播图模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_bgcolor": color[type].bgcolor,
    					"field_showtitle" : "hidetitle",
    					"field_imgs": [
    		               {
    		            	   "img_id":1,
    		                   "img_url" : "http://img.midite.com/image_spaces/07/d3/56/33/1436933895901.jpg",
    		                   "img_link" : "",
    		                   "img_linktitle" : "",
    		                   "img_title" : "图片标题",
    		                   "img_relratio" : "1.78",
    		               },
    		               {
    		            	   "img_id":2,
    		            	   "img_url" : "http://img.midite.com/image_spaces/07/d3/56/33/1436933895901.jpg",
    		            	   "img_link" : "",
    		            	   "img_linktitle" : "",
    		            	   "img_title" : "图片标题",
    		            	   "img_relratio" : "1.78",
    		               },
    		             ],
    		             "field_pt": "0px",
    			         "field_pr": "0px",
    			         "field_pb": "0px",
    			         "field_pl": "0px",
    		             "field_mt": "0px",
    		             "field_mb": "0px",
    				};
    				break;
    			case 'imglist':   //图片列表模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_bgcolor": color[type].bgcolor,
    					"field_showtitle" : "hide",
    					"field_arrange" : "one",
    					"field_imgs": [
    		               {
    		            	   "img_id":1,
    		            	   "img_url" : "http://img.midite.com/image_spaces/07/d3/56/33/143693389572.jpg",
    		            	   "img_link" : "",
    		            	   "img_linktitle" : "",
    		            	   "img_title" : "图片标题",
    		               },
    	               ],
    	               "field_imgspace": "0px",
    	               "field_pt": "0px",
    	               "field_pr": "0px",
    	               "field_pb": "0px",
    	               "field_pl": "0px",
    	               "field_mt": "0px",
    	               "field_mb": "8px",
    				};
    				break;
    			case 'puzzle':         //拼图模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_puzzlecon" : "",
    					"field_pt": "0px",
    					"field_pr": "0px",
    					"field_pb": "0px",
    					"field_pl": "0px",
    					"field_mt": "0px",
    					"field_mb": "8px",
    				};
    				break;
    			case 'btnlink':         //连接按钮模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_con" : "连接按钮",
    					"field_fz": "14px",
    					"field_bgcolor":color[type].bgcolor,
    		            "field_color": color[type].color,
    		            "field_bordercolor": color[type].bordercolor,
    		            "field_isblock": "block",
    		            "field_align": "center",
    		            "field_pt": "4px",
    		            "field_pr": "12px",
    		            "field_pb": "4px",
    		            "field_pl": "12px",
    		            "field_mt": "5px",
    		            "field_mr": "5px",
    		            "field_mb": "5px",
    		            "field_ml": "5px",
    				};
    				break;
    			case 'division':         //分割模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_bordertype":"solid",
    					"field_borderwidth":"1px",
    					"field_bordercolor": color[type].bordercolor,
    					"field_blank":"20px",
    					"field_mt": "10px",
    		            "field_mr": "5px",
    		            "field_mb": "10px",
    		            "field_ml": "5px",
    				};
    				break;
    			case 'notice':         //公告模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_con" : "公告：自即日起本店...",
    					"field_fz": "12px",
    					"field_bgcolor": color[type].bgcolor,
    		            "field_color": color[type].color,
    		            "field_slide": "left",
    		            "field_pt": "4px",
    		            "field_pr": "12px",
    		            "field_pb": "4px",
    		            "field_pl": "12px",
    		            "field_mt": "0px",
    		            "field_mb": "0px",
    				};
    				break;
    			case 'contact':         //联系方式模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_fz" : "14px",
    					"field_modal" : "1",
    					"field_tel" : "400-123-45678",
    					"field_con" : "联系我们",
    					"field_bgcolor":color[type].bgcolor,
    		            "field_color": color[type].color,
    		            "field_phonefz" : "16px",
    		            "field_phonecolor":color[type].phonecolor,
    		            "field_pt": "8px",
    		            "field_pr": "8px",
    		            "field_pb": "8px",
    		            "field_pl": "8px",
    		            "field_mt": "0px",
    		            "field_mb": "8px",
    				};
    				break;
    			case 'menu':         //菜单模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_bgcolor": color[type].bgcolor,
    					"field_color":  color[type].color,
    					"field_bordercolor":  color[type].bordercolor,
    					"field_fz" : "12px",
    					"field_iconsize" : "20px",
    					"field_imgsize" : "20px",
    					"field_navs": [
    		               {
    		            	   "nav_id":1,
    		                   "nav_imgurl" : "",
    		                   "nav_link" : mag.home_link,
    		                   "nav_linktitle" : "首页",
    		                   "nav_title" : "首页",
    		               },
    		               {
    		            	   "nav_id":2,
    		            	   "nav_imgurl" : "",
    		            	   "nav_link" : mag.classify_link,
    		            	   "nav_linktitle" : "分类",
    		            	   "nav_title" : "分类",
    		               },
    		               {
    		            	   "nav_id":3,
    		            	   "nav_imgurl" : "",
    		            	   "nav_link" : mag.shopping_cat_link,
    		            	   "nav_linktitle" : "购物车",
    		            	   "nav_title" : "购物车",
    		               },
    		               {
    		            	   "nav_id":4,
    		            	   "nav_imgurl" : "",
    		            	   "nav_link" : mag.personal_link,
    		            	   "nav_linktitle" : "个人中心(订单页面)",
    		            	   "nav_title" : "个人中心",
    		               },
    		             ],
    					"field_pt": "8px",
    					"field_pb": "8px",
    				};
    				break;
    			case 'share':         //分享模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_style" : "default",
    					"field_shareimg" : IMAGEPATH+"/components/img/wxdiytools/share2.jpg",
    					"field_pl": "0px",
    					"field_pr": "0px",
    					"field_mt": "8px",
    					"field_mb": "8px",
    				};
    				break;
    			case 'product':         //商品模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_prdtheme" : "defaultskin",     //商品主题
    					"field_themetitle" : "默认主题",       //商品主题名
    					"field_bgcolor": color[type].bgcolor,
    					"field_showcart" : "nocart",
    					"field_makeup": 'mod-two-title',
    					"field_items" : "",
    					"field_prdids" : "",
    					"field_pt": "0px",
    					"field_pr": "0px",
    					"field_pb": "0px",
    					"field_pl": "0px",
    					"field_mt": "0px",
    					"field_mb": "8px",
    				};
    				break;
    			case 'classfiy':         //分类模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_bgcolor": color[type].bgcolor,
    					"field_color":color[type].color,
    					"field_bordercolor":color[type].bordercolor,
    					"field_fz":"12px",
    					"field_lineh":"38px",
    					"field_items": "",
    					"field_pr": "8px",
    					"field_pl": "8px",
    					"field_mt": "0px",
    					"field_mb": "8px",
    				};
    				break;
    			case 'time':         //倒计时模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_fz" : "14px",
    					"field_con" : "距离活动开始还有",
    					"field_bgcolor": color[type].bgcolor,
    					"field_color": color[type].color,
    					"field_size":"18px",
    					"field_timebgcolor" :color[type].timebgcolor,
    					"field_timefz" : "12px",
    					"field_timefcolor": color[type].timefcolor,
    					"field_time" : "",
    					"field_rtime" : "",
    					"field_pt": "8px",
    					"field_pr": "0px",
    					"field_pb": "8px",
    					"field_pl": "0px",
    					"field_mt": "0px",
    					"field_mb": "8px",
    				};
    				break;
    			case 'form':         //表单模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_formid" : "",
    					"field_formcon" : "",
    					"field_pt": "30px",
    					"field_pr": "10px",
    					"field_pb": "30px",
    					"field_pl": "10px",
    					"field_mt": "0px",
    					"field_mb": "0px",
    				};
    				break;
    			case 'video':         //视频模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_video" : "",
    					"field_mt": "0px",
    					"field_mb": "8px",
    				};
    				break;
    			case 'qrcode':         //分销二维码模块
    				newField = {
    					"field_id" : id,
    					"field_type" : type,
    					"field_bgcolor":color[type].bgcolor,
    					"field_isshadow": 0,
    					"field_shadowsize": "5px",
    					"field_shadowcolor": color[type].shadowcolor,
    					"field_pt": "10px",
    					"field_pb": "10px",
    					"field_mt": "0px",
    					"field_mb": "0px",
    				};
    				break;
    		};
        	return newField;
        },
      //添加轮播图片    //添加单图列表模块
    	addcarouselimg : function(field){
    		var lastOptionID = 0;
    		for(var i = 0; i < field.field_imgs.length; i++){
    			var id = field.field_imgs[i].img_id;
    			if(id > lastOptionID){
    				lastOptionID = id;
    			}
            };
            if(field.field_type == "carousel"){
            	var pic = "http://img.midite.com/image_spaces/07/d3/56/33/1436933895901.jpg";
            }else{
            	var pic = "http://img.midite.com/image_spaces/07/d3/56/33/143693389572.jpg";
            }
            var newImg = {
        		"img_id":lastOptionID + 1,
                "img_url" : pic,
                "img_link" : "",
                "img_linktitle" : "",
                "img_title" : "图片标题",
            };
            if(field.field_type == "carousel"){
            	newImg.img_relratio = "1.78";
            }
            field.field_imgs.push(newImg);
    	},
    	//删除轮播图图片    //删除单图列表图片
    	del_carousel : function(field,img){
    		var len = field.field_imgs.length;
    		if(field.field_type == "carousel"){
    			if(len <= 2){
    				mag.showtips("轮播图应保留2-5张图片");
            		return false;
            	}
            }else{
            	if(len <= 1){
            		mag.showtips("至少要保留一张图片");
            		return false;
            	}
            }
    		for(var i = 0; i < field.field_imgs.length; i++){
                if(field.field_imgs[i].img_id == img.img_id){
                    field.field_imgs.splice(i, 1);
                    break;
                }
            };
    	},
    	//添加菜单图片
    	addmenu_nav : function(field){
    		var lastOptionID = 0;
    		for(var i = 0; i < field.field_navs.length; i++){
    			var id = field.field_navs[i].nav_id;
    			if(id > lastOptionID){
    				lastOptionID = id;
    			}
            };
            var newNav = {
                "nav_id":lastOptionID + 1,
                "nav_imgurl" : "",
                "nav_link" : "",
                "nav_title" : "",
            };
            field.field_navs.push(newNav);
    	},
    	//删除菜单模块
    	del_nav : function(field,nav){
    		var len = field.field_navs.length;
    		if(len <= 2){
    			mag.showtips("菜单至少要有两项");
    			return false;
    		}else{
    			for(var i = 0; i < field.field_navs.length; i++){
    	            if(field.field_navs[i].nav_id == nav.nav_id){
    	                field.field_navs.splice(i, 1);
    	                break;
    	            }
    	        };
    		}
    	},
    	//菜单 是否展示图片大小设置
    	show_menusetimg : function(field){
    		var flag = 0;
    		for(var i = 0; i < field.field_navs.length; i++){
                if(field.field_navs[i].nav_imgurl){
                   flag ++;
                };
            };
            if(flag > 0){
            	return true;
            }else{
            	return false;
            }
    	},
    	//富文本模块定义
    	richConfig : {
    		//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars:[ ["fontsize", "|", "blockquote", "horizontal",  "|","inserttable","localimages",
                        "map","emotion","date","fullscreen", "|","source"],
                    [ "bold", "italic", "underline","strikethrough", "forecolor","backcolor","|", "justifyleft", "justifycenter", "justifyright", "|", 
                      "indent","|","rowspacingtop", "rowspacingbottom", "lineheight", "|", "insertorderedlist", "insertunorderedlist", 
                    "|", "imagenone", "imageleft", "imageright", "imagecenter","|","customstyle",
                  	"paragraph", "fontfamily","|", "removeformat", "link", "unlink"] ],
          	autoClearinitialContent:true,
          	allowDivTransToP:false,
          	autotypeset:{removeEmptyline:true},
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false,
            enableAutoSave: false,
            //默认的编辑区域高度
            initialFrameWidth:350,
            initialFrameHeight:450,
            autoFloatEnabled : false,   //让工具框不跟随滑动条滑动最后悬浮置顶的
            topOffset:0,
            zIndex:1060,
            autoHeightEnabled:false,//设置iframe编辑区高度
            labelMap:{'localimages':'选择微相册图片'},
            iframeUrlMap:{
                'localimages':MAINHOST+"/shangjia/commoncomponent/ueditorimg",
         	}
    	},
    	// 上移
    	upmove_modal : function(arr,$index){
    		if($index == 0) {
    			return;
    		}
    		swapItems(arr, $index, $index - 1);
    	},
    	// 下移
    	downmove_modal : function(arr,$index){
    		if($index == arr.length -1) {
    			return;
    		}
    		swapItems(arr, $index, $index + 1);
    	},
    };
});

'use strict';
/*
 * angular服务
 * 1、各个活动有3个数组，一个规则，一个样式，一个默认添加的模块
 * 2、所有活动id对应活动名的数组
 * 3、大转盘主题数组
 * 4、大转盘规则里面下拉使用的数组
 * 5、大转盘的一些方法包装在这
 * 
*/
myApp.service('ActivityService', function ActivityService() {
	
	var actname = {   //活动id对应的活动名
		"1" : "dazhuanpan",
		"3" : "goldegg",
		"4" : "tiger",
		"7" : "shaking",
	},
	//头部使用名字  
	actnamez = {
		"1" : "大转盘",
		"3" : "砸金蛋",
		"4" : "老虎机",
		"7" : "摇一摇",
	}, 
	//活动主题的名字与值的数组集合
	actthemename = {
		"1" : [       //大转盘主题名对应名字
			{
				 "name" : "神秘黑",
				 "value" : "black",
			},
			{
				 "name" : "冰雪蓝",
				 "value" : "white",
			},
			{
				 "name" : "激情红",
				 "value" : "red",
			},
			{
				 "name" : "柠檬黄",
				 "value" : "yellow",
			},
			{
				 "name" : "幽海蓝",
				 "value" : "blue",
			},
			{
				 "name" : "森林绿",
				 "value" : "green",
			},  
        ],
        "7" : [         //摇一摇主题名对应名字
	         {
	         	"name" : "高贵紫",
	         	"value" : "purple",
	         },
	         {
	         	"name" : "2016",
	         	"value" : "newred",
	         },
	     ],
	},
	
	//大转盘各个主题对应的数组，颜色，背景图（每个颜色的属性写的和原属性不一样，是因为如果是一样的话，改变就会一起改变，没有找到原因，写成不一样的就ok了）
	dzptheme = { 
		"black" :{
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/dzp/black.png",
				"bg_color": "#262626",
				"color_1": "#ffffff",
				"color_2": "#e20000",
				"share_img" : IMAGEPATH+"/micromagazine/img/dzp/share-zp.png",
			},
			"wheel" : {
                "theme": "black",
                "bgcolor1": "#718eeb",
                "bgcolor2": "#9fb4f5",
                "color": "#fff",
			}
		},
		"white" :{
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/dzp/white.png",
				"bg_color": "#ffffff",
				"color_1": "#333333",
				"color_2": "#e20000",
				"share_img" : IMAGEPATH+"/micromagazine/img/dzp/share-zp.png",
			},
			"wheel" : {
                "theme": "white",
                "bgcolor1": "#718eeb",
                "bgcolor2": "#9fb4f5",
                "color": "#fff",
			}
		},
		"red" :{
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/dzp/black.png",
				"bg_color": "#e5423e",
				"color_1": "#ffeeb9",
				"color_2": "#FFB149",
				"share_img" : IMAGEPATH+"/micromagazine/img/dzp/share-zp.png",
			},
			"wheel" : {
                "theme": "red",
                "bgcolor1": "#ff5959",
                "bgcolor2": "#ff7f7e",
                "color": "#fff",
			}
		},
		"yellow" :{
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/dzp/yellow.png",
				"bg_color": "#FBE43C",
				"color_1": "#bc5c00",
				"color_2": "#e20000",
				"share_img" : IMAGEPATH+"/micromagazine/img/dzp/share-zp.png",
			},
			"wheel" : {
                "theme": "yellow",
                "bgcolor1": "#EFD939",
                "bgcolor2": "#FBE43C",
                "color": "#bc5c00",
			}
		},
		"blue" :{
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/dzp/black.png",
				"bg_color": "#0a8af2",
				"color_1": "#ffffff",
				"color_2": "#CCFCFC",
				"share_img" : IMAGEPATH+"/micromagazine/img/dzp/share-zp.png",
			},
			"wheel" : {
                "theme": "blue",
                "bgcolor1": "#097AD6",
                "bgcolor2": "#0a8af2",
                "color": "#fff",
			}
		},
		"green" :{
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/dzp/green.png",
				"bg_color": "#06bf04",
				"color_1": "#ffffff",
				"color_2": "#FCFF94",
				"share_img" : IMAGEPATH+"/micromagazine/img/dzp/share-zp.png",
			},
			"wheel" : {
                "theme": "green",
                "bgcolor1": "#05A904",
                "bgcolor2": "#06bf04",
                "color": "#FCFF94",
			}
		},
	},
	//摇一摇主题
	shakingtheme = {
		"purple" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/purplebg.jpg",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/purple_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/purple_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/purple_shade.png",
				"bg_color": "#820fb7",  
				"color_1" : "#fff",            //还有多少次机会的背景色
				"color_2" : "#a20503",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/share_shake.jpg",
			},
		},
		"newred" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/newred_bg.gif",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/newred_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/newred_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/newred_shade.png",
				"bg_color": "#b6004f",  
				"color_1" : "#29a6f4",            //还有多少次机会的背景色
				"color_2" : "#fff",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/newred_share.jpg",
			},
		},
	},
	eggtheme = {
		"gold" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/egg/gold_bg.png",
				"bg_color": "#04e578",  
				"color_1" : "#fff",           
				"color_2" : "#FF6E06",         
				"share_img" : IMAGEPATH+"/micromagazine/img/egg/gold_eggshare.jpg",
				"egg_img" : IMAGEPATH+"/micromagazine/img/egg/gold_egg.png",        //金蛋
				"eggbreak_img" : IMAGEPATH+"/micromagazine/img/egg/gold_eggbreak.png",   //碎金蛋
				"egglight_img" : IMAGEPATH+"/micromagazine/img/egg/gold_light.png",   //金蛋打开的光
				"eggpeng_img" : IMAGEPATH+"/micromagazine/img/egg/gold_peng.png",   
				"eggprize_img" : IMAGEPATH+"/micromagazine/img/egg/gold_prize.png",   //中奖盒子
				"eggbrick_img" : IMAGEPATH+"/micromagazine/img/egg/gold_brick.png",   //砸金蛋的砖
				"eggwin_img" : IMAGEPATH+"/micromagazine/img/egg/eggwin.png",   //中奖的礼花
			},
		}	
	},
	tigertheme = {
			
	},
	//活动模块的设置 ，每个活动默认的模块。分为几个模块决定了用户可以再哪些地方添加其他模块
	activity = {
    	"1":[
     		{   //大转盘的轮盘样式
     			"field_id": 1,
                "field_type": actname["1"],
                "field_theme": "black",
                "field_bgcolor1": dzptheme["black"].wheel.bgcolor1,
                "field_bgcolor2": dzptheme["black"].wheel.bgcolor2,
                "field_color": dzptheme["black"].wheel.color,
     		},
     		{   //大转盘中奖纪录
     			"field_id": 2,
     			"field_type": actname["1"],
     			"field_prize":"0",
     		},
     		{	//大转盘说明
     			"field_id": 3,
     			"field_type": actname["1"],
     			"field_info" : "text",
     			"field_infoimg" : IMAGEPATH+"/micromagazine/img/dzp/wheelinfo.png",
     		},
 		 ],
      "7":[
           {   //摇一摇的样式
        	   "field_id": 1,
        	   "field_type": actname["7"],
        	   "field_theme": "purple",
        	   "field_handimg": shakingtheme["purple"].major.hand_img,
               "field_wheelimg": shakingtheme["purple"].major.wheel_img,
               "field_shadeimg": shakingtheme["purple"].major.shade_img,
               "field_bgcolor": shakingtheme["purple"].major.bg_color,
               "field_color1": shakingtheme["purple"].major.color_1,
               "field_color2": shakingtheme["purple"].major.color_2,
               "field_color3": shakingtheme["purple"].major.color_3,
           },
       ],
       "3":[
            {   //砸金蛋的样式
            	"field_id": 1,
            	"field_type": actname["3"],
            	"field_theme": "gold",
            	"field_color1": eggtheme["gold"].major.color_1,
            	"field_color2": eggtheme["gold"].major.color_2,
            },
            {   //砸金蛋中奖纪录
     			"field_id": 2,
     			"field_type": actname["3"],
     			"field_prize":"0",
     		},
            {	//砸金蛋说明
     			"field_id": 3,
     			"field_type": actname["3"],
     			"field_info" : "text",
     			"field_infoimg" : IMAGEPATH+"/micromagazine/img/dzp/wheelinfo.png",
     		},
        ],
     },
	//活动规则的设置（各种填写奖项等设置）
	rules = {
		 "1":{
	    	 "field_type": actname["1"],
	    	 "theme" : "black",     //活动主题色
	    	 "title" : "欢乐大转盘", //活动名称
	    	 "iscode" : false,      //是否使用积分抽奖
	    	 "code" : "",           //抽奖使用的积分数
	    	 "starttime" : "",      //活动开始时间
	    	 "endtime" : "",       //活动结束时间
	    	 "numtype" : "only",    //可参加次数类型（只能参加，每天能参加）only   day 
	    	 "num" : "1",           //可参加次数
		     "labeltag" : {         //标签
                 "id" : "",      
                 "name" : "",
		     },       
		     "themetxt" :"",        //活动主题内容
		     "describe" : "",       //活动描述
		     "commonshare" : "轻松中大奖，小伙伴们都来看看哦~~",    //普通分享
		     "awardshare" : "我中了#奖品#，小伙伴们也来玩啊！",     //中奖分享
		     "loseshare" : "轻松中大奖，小伙伴们都来看看哦~~",      //未中奖分享
		     "awardinfo" : "恭喜你中奖了!",                       //中奖提示文字
		     "loseinfo" : "真遗憾没中奖，要努力啊！",              //未中奖提示文字
		     "prize" : [            //活动奖项
		          {
		        	  "name" : "",  //奖项名称
		        	  "rate" : "",  //奖项概率
		        	  "num" : "",//奖项数目
		        	  "type" : "",  //奖品类型
		        	  "award" : "", //奖品
		          },
              ],
	     },
	},
	//活动整体样式设置
	styles = {
		"1" :{
			"field_type": actname["1"],
			"bgimg" : dzptheme["black"].major.bg_img,
            "bgcolor": dzptheme["black"].major.bg_color,
            "color1":  dzptheme["black"].major.color_1,
            "color2":  dzptheme["black"].major.color_2,
            "shareimg" : dzptheme["black"].major.share_img,
		},
		"7" :{
			"field_type": actname["7"],
			"bgimg" : shakingtheme["purple"].major.bg_img,
			"bgcolor": shakingtheme["purple"].major.bg_color,
			"shareimg" : shakingtheme["purple"].major.share_img,
		},
		"3" :{
			"field_type": actname["3"],
			"bgimg" : eggtheme["gold"].major.bg_img,
			"bgcolor": eggtheme["gold"].major.bg_color,
			"color1":  eggtheme["gold"].major.color_1,
            "color2":  eggtheme["gold"].major.color_2,
			"shareimg" : eggtheme["gold"].major.share_img,
			"eggimg" : eggtheme["gold"].major.egg_img,
			"breakimg" : eggtheme["gold"].major.eggbreak_img,
			"lightimg" : eggtheme["gold"].major.egglight_img,
			"pengimg" : eggtheme["gold"].major.eggpeng_img,
			"prizeimg" : eggtheme["gold"].major.eggprize_img,
			"brickimg" : eggtheme["gold"].major.eggbrick_img,
			"winimg" : eggtheme["gold"].major.eggwin_img,
		},
	};
    return {
    	actname:actname,     //各个活动初始化模块名称
    	actnamez:actnamez,     //各个活动初始化模块名称（中文名）
        activity:activity,   //各个活动初始化模块样式字段
        actthemename:actthemename,         //活动主题名字与值的数组集合
        getrules : function(kind_id){
        	var arr = {
        		'1' : {
        			"theme" : "black",     //活动主题色
        			"name" : "大转盘",
   	   	    	 	"title" : "欢乐大转盘", //活动名称
        		},
        		'7' : {
        			"theme" : "purple",     //活动主题色
        			"name" : "摇一摇",
   	   	    	 	"title" : "开心摇一摇", //活动名称
        		},
        		'3' : {
        			"theme" : "gold",     //活动主题色
        			"name" : "砸金蛋",
        			"title" : "疯狂砸金蛋", //活动名称
        		},
        	};
        	var rules = {
    			 "field_type": actname[kind_id],
	   	    	 "theme" : arr[kind_id].theme,     //活动主题色
	   	    	 "name" : arr[kind_id].name, //活动名 
	   	    	 "title" : arr[kind_id].title, //活动标题
	   	    	 "iscode" : false,      //是否使用积分抽奖
	   	    	 "code" : "",           //抽奖使用的积分数
	   	    	 "starttime" : "",      //活动开始时间
	   	    	 "endtime" : "",       //活动结束时间
	   	    	 "numtype" : "only",    //可参加次数类型（只能参加，每天能参加）only   day 
	   	    	 "num" : "1",           //可参加次数
	   		     "labeltag" : {         //标签
	                    "id" : "",      
	                    "name" : "",
	   		     },       
	   		     "themetxt" :"",        //活动主题内容
	   		     "describe" : "",       //活动描述
	   		     "commonshare" : "轻松中大奖，小伙伴们都来看看哦~~",    //普通分享
	   		     "awardshare" : "我中了#奖品#，小伙伴们也来玩啊！",     //中奖分享
	   		     "loseshare" : "轻松中大奖，小伙伴们都来看看哦~~",      //未中奖分享
	   		     "awardinfo" : "恭喜你中奖了!",                       //中奖提示文字
	   		     "loseinfo" : "真遗憾没中奖，要努力啊！",              //未中奖提示文字
	   		     "prize" : [            //活动奖项
	   		          {
	   		        	  "name" : "",  //奖项名称
	   		        	  "rate" : "",  //奖项概率
	   		        	  "num" : "",//奖项数目
	   		        	  "type" : "",  //奖品类型
	   		        	  "award" : "", //奖品
	   		          },
                 ],
        	};
        	return rules;
        },
        styles:styles,       //各个活动初始化背景各种样式字段
        getacttheme : function(kind_id){     //获取各个活动主题
        	var theme;
        	switch (kind_id){
        		case "1" : theme = dzptheme;break;
        		case "3" : theme = eggtheme;break;
        		case "4" : theme = tigertheme;break;
        		case "7" : theme = shakingtheme;break;
        	}
        	return theme;
        },
        //活动规则select下拉菜单用到的数组
        numtype_opt : [{value: "only",text: '只'},{value: "day",text: '每天'}],     //活动参与次数
		num_opt : ['1','2','3','4','5','6','7','8','9','10'],                       //活动参与次数
		prizetype_opt : [{value: "0",text: '实物奖品'},{value: "1",text: '优惠券'},{value: "2",text: '积分'},{value: "3",text: '提货卡'},
          {value: "4",text: '店铺红包'},{value: "5",text: '自定义'},{value: "6",text: '补签机会'}],     //活动奖品类型
        //删除奖项模块
        delprize : function(prize,index){ 
        	var len = prize.length;
        	if(len <= 1){
        		mag.showtips("至少要有一个奖项");
        		return false;
        	};
        	for(var i = 0; i < len; i++){
                if(i == index){
                	prize.splice(i, 1);
                    break;
                }
            };
        },
        //新增奖项模块
        addprize : function(prize){   
        	var arr = {
			  "name" : "",  //奖项名称
        	  "rate" : "",  //奖项概率
        	  "num" : "",//奖项数目
        	  "type" : "",  //奖品类型
        	  "award" : "", //奖品
        	};
        	prize.push(arr);
        },
       //大转盘切换主题
        changedzptheme : function(form,theme){
    		form.styles["bgimg"] = dzptheme[theme].major.bg_img;
    		form.styles["bgcolor"] = dzptheme[theme].major.bg_color;
    		form.styles["color1"] = dzptheme[theme].major.color_1;
    		form.styles["color2"] = dzptheme[theme].major.color_2;
    		form.rules.theme = theme;
    		for(var i = 0; i < form.form_fields.length; i++){
                if(form.form_fields[i].field_id == "1"){
                	form.form_fields[i]["field_theme"] = dzptheme[theme].wheel.theme;
            		form.form_fields[i]["field_bgcolor1"] = dzptheme[theme].wheel.bgcolor1;
            		form.form_fields[i]["field_bgcolor2"] = dzptheme[theme].wheel.bgcolor2;
            		form.form_fields[i]["field_color"] = dzptheme[theme].wheel.color;
                };
            };
            var colorarr = [dzptheme[theme].wheel.bgcolor1,dzptheme[theme].wheel.bgcolor2];
    		wheelfunc.draw(colorarr,dzptheme[theme].wheel.color);
    		var modalheight = ($(window).height()-238)+"px";  
            $(".viewmodalsbox").height(modalheight);
    	},
    	//摇一摇切换主题
    	changeshaketheme : function(form,theme){
    		form.styles["bgimg"] = shakingtheme[theme].major.bg_img;
    		form.styles["bgcolor"] = shakingtheme[theme].major.bg_color;
    		form.styles["shareimg"] = shakingtheme[theme].major.share_img;
    		form.rules.theme = theme;
    		for(var i = 0; i < form.form_fields.length; i++){
    			if(form.form_fields[i].field_id == "1"){
    				form.form_fields[i]["field_handimg"] = shakingtheme[theme].major.hand_img;
    	    		form.form_fields[i]["field_wheelimg"] = shakingtheme[theme].major.wheel_img;
    	    		form.form_fields[i]["field_shadeimg"] = shakingtheme[theme].major.shade_img;
    	    		form.form_fields[i]["field_bgcolor"] = shakingtheme[theme].major.bg_color;
    	    		form.form_fields[i]["field_color1"] = shakingtheme[theme].major.color_1;
    	    		form.form_fields[i]["field_color2"] = shakingtheme[theme].major.color_2;
    	    		form.form_fields[i]["field_color3"] = shakingtheme[theme].major.color_3;
    	    		form.form_fields[i]["field_theme"] = theme;
    			};
    		};
    		var modalheight = ($(window).height()-238)+"px";  
    		$(".viewmodalsbox").height(modalheight);
    	},
    };
});

'use strict';
/*
 * angular服务
 * 
 * 普通微杂志：保存微杂志的方法（包含各种判断）
 * 活动：规则判断保存
 * 
*/
myApp.service('SaveService', function SaveService() {
	//验证自定义微杂志
	var validatemagazine = function($scope,mark){
		var form = $scope.$storage.form,
		arr = form.form_fields;
		if(mark == 'mgz'){
			var share = form.share,
			shareimg = share.shareimg,
			sharetitle = share.sharetitle,
			sharecontent = share.sharecontent;
			if(arr.length <= 0){
				mag.showtips("请添加微杂志内容");
				$scope.clicklock = 0;
				return false;
			}else if(!sharetitle || !sharecontent){
				mag.showtips("请填写微杂志分享内容");
				$scope.showsetmagazine();
				$scope.clicklock = 0;
				return false;
			}else if(!shareimg){
				mag.showtips("请选择微杂志分享图片");
				$scope.showsetmagazine();
				$scope.clicklock = 0;
				return false;
			}
		};
		for(var i = 0; i < arr.length; i++){
            var type = arr[i].field_type,
            id = arr[i].field_id;
            switch (type){
               case "richtxt":
            		if(!arr[i].field_richcon){
            			mag.showtips("富文本内容不能为空");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "carousel":
            		var imgarr = arr[i].field_imgs;
            		var relratio = imgarr[0].img_relratio;
            		for(var j = 0; j < imgarr.length; j++){
        	            var rel = imgarr[j].img_relratio;
        	            if(relratio != rel){
        	            	var x = parseInt(j)+1;
        	            	mag.showtips("轮播图第"+x+"张尺寸不对，请重新选择图片");
        	            	$scope.showcurrentitem(type,id);
        	            	$scope.clicklock = 0;
        	            	return false;
        	            }
            		}
            		break;
            	case "puzzle":
            		if(!arr[i].field_puzzlecon){
            			mag.showtips("拼图内容不能为空");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "product":
            		if(arr[i].field_items.length <= 0){
            			mag.showtips("商品模块为空，请选择商品");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "classfiy":
            		if(arr[i].field_items.length <= 0){
            			mag.showtips("关联分类模块为空，请选择关联分类");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "time":
            		if(!arr[i].field_time){
            			mag.showtips("倒计时的时间不能为空");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "form":
            		if(!arr[i].field_formid){
            			mag.showtips("请选择表单");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "video":
            		if(!arr[i].field_url){
            			mag.showtips("请填写视频连接并生成");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            };
        };
		return true;
	},
	isRate = function(s) {           // 判断中奖率
        var dige = "^\\d+(\\.\\d+)?$";
        var re = new RegExp(dige);
        if (s.search(re) != -1) {
            return true;
        }
        else {
            return false;
        }
    },
    //微杂志，活动，提交成功后的操作（各种失败返回问题，统一成一个方法）
    savebackfunc = function(data,link,$scope){
    	if(data.code == 0){
			mag.showloadingtips(2,data.tip);
			$scope.clearsession();
			setTimeout(function(){mag.hideloadingtips();window.location.href = link;},1000);
		}else if(data.code == 1){    
			if(data.err_type == 2){     //保存失败
				mag.showloadingtips(3,data.tip);
				setTimeout(function(){mag.hideloadingtips();},2000);
			}else if(data.err_type == 1){  
				var type = data.type,tips = "",id=data.field_id;
				switch (type){
				case "act":
					tips = data.tip;
					break;
				case "content":
					tips = "请添加微杂志内容";
					break;
				case "setshare":
					tips = "请填写微杂志分享内容";
					break;
				case "richtxt":
					tips = "富文本内容不能为空";
					break;
				case "carousel":
					tips = "轮播图尺寸不对，请选择尺寸一样或者比例一样的图片";
					break;
				case "puzzle":
					tips = "拼图内容不能为空";
					break;
				case "product":
					tips = "商品模块为空，请选择商品";
					break;
				case "classfiy":
					tips = "关联分类模块为空，请选择关联分类";
					break;
				case "time":
					tips = "倒计时的时间不能为空";
					break;
				case "form":
					tips = "请选择表单";
					break;
				case "video":
					tips = "请填写视频连接并生成";
					break;
				};
				$scope.$apply(function () {
					if(type == "setshare" || type == "act"){
						$scope.showsetmagazine();
					}else if(type != "content"){
						$scope.showcurrentitem(type,id);
					};
				});
				mag.showtips(tips);
			};
		}
    	
    },
	//自定义微杂志的保存
	savecommonmag = function($scope){
		if(validatemagazine($scope,'mgz')){
			if(mag.isedit){
				var data = {"content":$scope.$storage.form,"id":mag.isedit};
			}else{
				var data = {"content":$scope.$storage.form};
			};
			$.ajax({
				type : "post",
				data : data,
				url : mag.savemagazine,
				beforeSend : function(){
					mag.showloadingtips(1,"保存中，请稍后...");
				},
				success : function(msg){
					$scope.clicklock = 0;
					var data = eval("("+msg+")"),
					link = mag.magazinelisturl;
					savebackfunc(data,link,$scope);
				}
			});	
    	};
	};
    return {
    	//预览微杂志
    	previewmagazine : function($scope){
    		if(validatemagazine($scope,'mgz')){
    			$("#previewmag").modal("show");
    		};
    	},
    	confirm_preview : function($scope,$timeout){
    		if(validatemagazine($scope,'mgz')){
    			if($scope.nick){
    				$.ajax({
                        type:"POST",
                        url : mag.previewUrl,
                        data:{"str":$scope.$storage.form,'nick':$scope.nick,"type":6,"mgzname":$scope.$storage.form.share.sharetitle},
                        success:function(msg){
                        	var data = eval("("+msg+")");
                        	$scope.$apply(function() {  
                                $scope.previewtip = true;
                                $scope.previewinfo = data.reason;
                                if(data.status==1){
                                	$scope.previewstatus = "red";
                                }else{
                                	$scope.previewstatus = "green";
                                };
                                $timeout(function(){$scope.previewtip = false;},2000);
                            });  
                        },
                    });
    			}else{
    				$scope.$apply(function() {  
                        $scope.previewtip = true;
                        $scope.previewinfo = "昵称不能为空";
                    	$scope.previewstatus = "red";
                    	$timeout(function(){$scope.previewtip = false;},2000);
                    });  
    				$("#wx_nick").focus();
    				return false;
    			}
    		};
    	},
        //保存微杂志，保存活动
        savemagazine : function($scope){
        	var savetype = $scope.$storage.form.type;
        	if(savetype == "magazine"){
        		savecommonmag($scope);
        	}else if(savetype !== "magazine"){
        		var rules = $scope.$storage.form.rules;
        		var patrn = /[`~!@#$%^&*()_+?:"{}\/;'[\]]/im,
        			jfpatrn = /^[0-9]*[1-9][0-9]*$/,
        			mountpatrn = /^[0-9]*[0-9][0-9]*$/;
        		if(!rules.title || patrn.test(rules.title)){
        			mag.showtips("活动标题不能为空且不能含有非法字符");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(rules.iscode == 'true' && (!rules.code || !jfpatrn.test(rules.code) || rules.code.length > 5)){
        			mag.showtips("积分值不能为空，必须是长度小于6的正整数");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.starttime){
        			mag.showtips("活动开始时间不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.endtime){
        			mag.showtips("活动结束时间不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(rules.starttime > rules.endtime){
        			mag.showtips("活动开始时间不能晚于结束时间");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.themetxt || patrn.test(rules.themetxt)){
        			mag.showtips("活动主题不能为空且不能含有非法字符");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.describe){
        			mag.showtips("活动描述不能为空且小于500字");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.commonshare){
        			mag.showtips("活动普通分享内容不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.awardshare){
        			mag.showtips("活动中奖分享内容不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.loseshare){
        			mag.showtips("活动未中奖分享内容不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.awardinfo){
        			mag.showtips("活动中奖提示文字不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.loseinfo){
        			mag.showtips("活动未中奖提示文字不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(rules.prize.length > 0){
        			var rates = 0;
        			for(var i = 0; i < rules.prize.length; i++){
                       var current = rules.prize[i];
                       rates =  parseFloat(rates) +  parseFloat(rules.prize[i].rate);
                       if(!current.name || patrn.test(current.name)){
                    	    mag.showtips("奖品"+(i+1)+"名不能为空且不能含有非法字符");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(!current.rate || current.rate < 0.01 || current.rate >= 100){
                    	    mag.showtips("奖品"+(i+1)+"中奖率不能为空应在0.01%-100%之间");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(!isRate(current.rate)){
                    	    mag.showtips("奖品"+(i+1)+"中奖率格式不对");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(rates.toFixed(2) > 100){
                    	    mag.showtips("中奖率之和应该小于100！");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(current.num.length > 100 || !mountpatrn.test(current.num)){
                    	    mag.showtips("奖品"+(i+1)+"数量必须是非负整数且长度小于100位");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(!current.type){
                    	    mag.showtips("奖品"+(i+1)+"请选择一种奖品类型");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(current.type == '1' || current.type == '3' || current.type == '4'){
                    	    var num = current.award.num,arr = {"1":"优惠券","3":"提货卡","4":"店铺红包"};
                    	    if(parseInt(num) < parseInt(current.num)){
                    	    	mag.showtips("奖品"+(i+1)+"选择的"+arr[current.type]+"数量不能小于奖品数量");
    	               			$scope.showsetmagazine();
    	               			$scope.clicklock = 0;
    	               			return false;
                    	    };
                       }else if(current.type == '2' || current.type == '6'){
                    	    var val = current.award.value,arr = {"2":"积分","6":"补签机会"};
	                   	    if(!jfpatrn.test(val)){
	                   	    	mag.showtips("奖品"+(i+1)+"填写的"+arr[current.type]+"数量必须是正整数");
	   	               			$scope.showsetmagazine();
	   	               			$scope.clicklock = 0;
	   	               			return false;
	                   	    };
                       }else if(current.type == '5'){
	                   	    var id = current.award.id;
	                   	    if(!id){
	                   	    	mag.showtips("奖品"+(i+1)+"请选择自定义的奖项");
	   	               			$scope.showsetmagazine();
	   	               			$scope.clicklock = 0;
	   	               			return false;
	                   	    };
	                   }
                    };
        		};
        		if(validatemagazine($scope,'act')){   //判断模块
        			if(mag.isedit){
        				var data = {"content":$scope.$storage.form,"act_kind":mag.act_type,"id":mag.isedit};
        			}else{
        				var data = {"content":$scope.$storage.form,"act_kind":mag.act_type};
        			};
	        		$.ajax({
	    				type : "post",
	    				data : data,
	    				url : mag.saveactivity,
	    				beforeSend : function(){
	    					mag.showloadingtips(1,"保存中，请稍后...");
	    				},
	    				success : function(msg){
	    					$scope.clicklock = 0;
	    					var data = eval("("+msg+")"),
	    					link = data.skip_link;
	    					savebackfunc(data,link,$scope);
	    				}
	    			});	
        		};
        	};
        },
        
    };
});

/* *
 * 各模块type名称
 * 
 * 标题模块  ：title
 * 富文本模块  ：richtxt
 * 轮播图模块  ：carousel
 * 图片集模块  ：imggroup
 * 拼图模块  ：puzzle
 * ....
 * 
 * */
myApp.controller('mainCtr', ['$scope', '$sessionStorage','$timeout','ColorService','ActivityService','SaveService',
 function ($scope, $sessionStorage,$timeout,ColorService,ActivityService,SaveService) {
	$scope.diyboxHeight = ($(window).height()-238)+"px";   //中间预览的高度
	
	$scope.color = ColorService.color;  //各个模块初始颜色服务...
	if(mag.isact){
		$scope.actname = ActivityService.actname;  //各个活动初始化模块名称
		$scope.actnamez = ActivityService.actnamez;  //各个活动初始化模块名称（中文名）头部导航用到
		$scope.act = ActivityService.activity;  //各个活动初始化模块样式字段
		$scope.rules = ActivityService.getrules(mag.act_type);  //各个活动初始化规则字段
		$scope.styles = ActivityService.styles;  //各个活动初始化背景各种样式字段
		$scope.actthemename = ActivityService.actthemename;  //各个活动主题名字与值的集合
		$scope.acttheme = ActivityService.getacttheme(mag.act_type);  //各个活动主题（主题重置颜色）
		
		$scope.act_name = $scope.actname[mag.act_type];   //预览部分用来判断当前模块是否可以删除
		$scope.act_themename = $scope.actthemename[mag.act_type];   //获取当前活动的主题名字与值
		
		//活动options用到的数组
		$scope.numtype_opt = ActivityService.numtype_opt;
		$scope.num_opt = ActivityService.num_opt;
		$scope.prizetype_opt = ActivityService.prizetype_opt;
	};
	if(mag.isedit){          //编辑模式下对数组进行赋值
		var id = 0;
		for(var i = 0; i < mag.data.content.form_fields.length; i++){
			var current = mag.data.content.form_fields[i];
            if(parseInt(current.field_id) >= parseInt(id)){
            	id = current.field_id;
            }else{
            	id = id;
            };
        };
		$scope.$storage = $sessionStorage.$default({
			showmagazineset : true,
			lastAddedID : parseInt(id),
			form : mag.data.content,
			magid : mag.isedit,
			isShow : "",
		});
		if($scope.$storage.magid != mag.isedit){    //同一个页面后退编辑其他微杂志时，重置sessionstorage的值
			$scope.$storage.showmagazineset = true;
			$scope.$storage.lastAddedID = parseInt(id);
			$scope.$storage.form = mag.data.content;
			$scope.$storage.magid = mag.isedit;
			$scope.$storage.isShow = "";
		};
	}else{                //创建微杂志
		if(mag.isact){   //如果是活动页面
			$scope.$storage = $sessionStorage.$default({
				showmagazineset : true,
				lastAddedID : $scope.act[mag.act_type].length,     //模块编号id
				form : {
					"type" : $scope.actname[mag.act_type],
					"paddingt" : "0px",
					"paddingr" : "0px",
					"paddingb" : "0px",
					"paddingl" : "0px",
					"styles" : $scope.styles[mag.act_type],
					"rules" : $scope.rules,
					"form_fields" :$scope.act[mag.act_type],
				},
				isShow : "",
			});
		}else{       //自定义微杂志
			$scope.$storage = $sessionStorage.$default({
				showmagazineset : true,
				lastAddedID : 0,     //模块编号id
				form : {
					"type":"magazine",
					"bgcolor" : $scope.color.bgcolor,
					"paddingt" : "0px",
					"paddingr" : "0px",
					"paddingb" : "0px",
					"paddingl" : "0px",
					"share" : {
						"shareimg":"",
						"sharetitle":"",
						"sharecontent":"",
					},
					"form_fields" :[],
				},
				isShow : "",
			});
		};
	};
	if($scope.$storage.form){    //同理编辑模式下的方法，要对富文本进行转码
		for(var i = 0; i < $scope.$storage.form.form_fields.length; i++){
			var current = $scope.$storage.form.form_fields[i];
            if(current.field_type == "richtxt"){
            	current.field_richcon = decodeURIComponent(current.field_richcon);
            };
        };
	};
	//点击列表时清除sessionstorage
	$scope.clearsession = function(){
		$scope.$storage.$reset();
	};
	/*清理ueditor的缓存*/
	window.onunload = function(){
		localStorage.removeItem("ueditor_preference");
	};
    //添加模块
    $scope.addNewField = function(type){
    	var len = 0;
		for(var i = 0; i < $scope.$storage.form.form_fields.length; i++){
            if($scope.$storage.form.form_fields[i].field_type == type){
                len ++;
            }
        };
    	if(len == 1){
    		if(type == "carousel" || type == "notice" || type == "contact" || type == "time" || type == "menu" || type == "share"  || type == "form" || type == "qrcode"){
    			mag.showtips("该模块只能添加一个");
    			return false;
    		}
    	};
		$scope.$storage.lastAddedID++;
		//展示当前编辑模块
		$scope.showcurrentitem(type,$scope.$storage.lastAddedID);
		//从服务你调取要添加的对象
		var newField = ColorService.addfield(type,$scope.$storage.lastAddedID);
        $scope.$storage.form.form_fields.push(newField);
        mag.scrollbottom();
	};
	//console.log($scope.$storage.form);
	//展示编辑当前模块
	$scope.showcurrentitem = function(type,id){
		$scope.$storage.isShow = type+id;
		$scope.$storage.showmagazineset = false;
	};
	//删除模块
	$scope.IsdeleteField = function ($event,field_id,field_type){
		$scope.clientX = ($event.clientX - 150)+ "px";
		$scope.clientY = ($event.clientY - 66) + "px";
		$scope.showdelmodal = true;
		$scope.del_id = field_id;
	};
	//取消删除
	$scope.cancledeleteField = function (){
		$scope.del_id = "";
		$scope.clientX = "0px";
		$scope.clientY = "auto";
		$scope.showdelmodal = false;
	};
	//确认删除
	$scope.deleteField = function (){
		var arr = $scope.$storage.form.form_fields;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].field_id == $scope.del_id){
				//删除后默认移到上面的编辑模块，否则移到下方模块，没有模块时展示整体设置
				if(i-1 >= 0){
					var previd = arr[i-1].field_id,
				    prevtype = arr[i-1].field_type;
				}else if(i+1 < arr.length){
					var nextid = arr[i+1].field_id,
				    nexttype = arr[i+1].field_type;
				};
				if(previd){
					$scope.showcurrentitem(prevtype,previd);
				}else if(nextid){
					$scope.showcurrentitem(nexttype,nextid);
				}else{
					$scope.showsetmagazine();
				};
				arr.splice(i, 1);
				$scope.clientX = "0px";
				$scope.clientY = "auto";
				$scope.showdelmodal = false;
				break;
			}
		};
    };
    //展示微杂志整体设置模块
    $scope.showsetmagazine = function(){
    	$scope.$storage.showmagazineset = true;
    	$scope.$storage.isShow = "";
    };
    /*可视区域内可排序*/
    $scope.sortableOptions = {
    	axis:"y",
	    stop: function(e, ui) {
	    	//console.log($scope.$storage.form.form_fields);
	    }
	};
	// 上移
	$scope.upmove_modal = function(arr,$index){
		ColorService.upmove_modal(arr,$index);
	};
	// 下移
	$scope.downmove_modal = function(arr,$index){
		ColorService.downmove_modal(arr,$index);
	};
	//重置颜色   	//重置图片
	$scope.resetcolor = function(mark,type,color){
		if(mark == "form"){
			$scope.$storage.form[type] = color;
		}else if(mark == "act"){
			$scope.$storage.form.styles[type] = color;
		}else{
			mark[type] = color;
			//大转盘需要重新画盘
			if(mark.field_type == "dazhuanpan"){
				var colorarr = [mark.field_bgcolor1,mark.field_bgcolor2];
				wheelfunc.draw(colorarr,mark.field_color);
			}
		}
	};
	/*标题模块  样式三时修改字体颜色*/
	$scope.changetitlecolor = function(field,color){
		field.field_color = color;
	};
	/* ****************** 轮播图模块    S ****************** */
	//添加轮播图片    //添加单图列表模块
	$scope.addcarouselimg = function(field){
		ColorService.addcarouselimg(field);
	};
	//删除轮播图图片    //删除单图列表图片
	$scope.del_carousel = function(field,img){
		ColorService.del_carousel(field,img);
	};
	/* ****************** 轮播图模块    E ****************** */
	
	//选择商品主题
	$scope.selectprdtheme = function(field){
		$scope.$broadcast('selectprdtheme');
		$scope.$on('confirmprdtheme', function(e, val,name) {
			field.field_themetitle = name;
			field.field_prdtheme = val;
			
		});
	};
	
	
	/* ****************** 菜单模块    S ****************** */
	//添加菜单图片
	$scope.addmenu_nav = function(field){
		ColorService.addmenu_nav(field);
	};
	//删除菜单模块
	$scope.del_nav = function(field,nav){
		ColorService.del_nav(field,nav);
	};
	//重置图标
	$scope.menu_restoreicon = function(nav){
		nav.nav_imgurl = "";
	};
	//菜单 是否展示图片大小设置
	$scope.show_menusetimg = function(field){
		return ColorService.show_menusetimg(field);
	};
	/* ****************** 菜单模块    E ****************** */
	
	//选择关联分类   //选择商品
	$scope.confirmitem = function(field){
		field.field_items = overall_array;
		if(field.field_type == "product"){
			field.field_prdids = prdselected_ids;
		};
		/*判断选择的商品时单数还是双数，使双列的商品好写对应样式（底边距）*/
		if(overall_array.length%2 == 0){
			field.field_class = "prd_odd";
		}else{
			field.field_class = "prd_even";
		}
	};
	
	/*富文本模块*/
	$scope.ready = function(editor){
		$scope.ueditor = editor;
	};
	$scope._simpleConfig = ColorService.richConfig;
	 
	//视频模块   生成视频html
	$scope.creat_videohtml = function($event,field){
		var url = field.field_url;
		var _t = $($event.target).parent().next(".info");;
		if(url){
			var videohtml = video.buildvideo(url,'320',_t);
			field.field_video = encodeURIComponent(videohtml);
		}else{
			_t.html("请输入连接");
			setTimeout(function(){_t.html("")},"3000");
			return false;
		}
	};
	//选择表单
	$scope.getforminfo = function($event,field){
		field.field_formid = $($event.target).attr("data-id");
		field.field_formcon = encodeURIComponent(overall_html);
	};
	
	//拼图
	$scope.creatpuzzleimgs = function($event,field){
		var current = $($event.target).prev().find(".magictable"),
		len1 = current.find("td.empty").length,
		len2 = current.find("td.notempty").length,
		len3 = current.find("td.notempty.hasimg").length;
		if(len1 > 0){
			mag.showtips("请将拼图布局完成，不能有空格区域");
			return false;
		}else if(len2 !== len3){
			mag.showtips("图片不能为空，请将图片选择完成");
			return false;
		};
		var html = '<table class="magictable">'+current.html()+'</table>';
		html = html.replace(/<div([\s\w=\">\<-]*[\W]*){4}(\/div>){1}/g, '');
		field.field_puzzlecon = encodeURIComponent(html);
	};
	
	
	//大转盘模块主题切换
	$scope.changedzptheme = function(form,theme){
		ActivityService.changedzptheme(form,theme);
	};
	//摇一摇模块主题切换
	$scope.changeshaketheme = function(form,theme){
		ActivityService.changeshaketheme(form,theme);
	};
	//删除奖项模块
	$scope.delprize = function(prize,index){
		ActivityService.delprize(prize,index);
	};
	//增加奖项模块
	$scope.addprize = function(prize){
		ActivityService.addprize(prize);
	};
	//不同活动奖品，下拉框的change事件
	$scope.changeprize = function(x){
		if(x.type == '2'){      //积分
			x.award = {"type" : "code","value" : ""};
		}else if(x.type == '6'){     //补签机会
			x.award = {"type" : "sign","value" : ""};
		}else{
			x.award = "";
		}
	};
	//活动奖品的各种类型生成的数据
	$scope.confirmprize = function(x){
		x.award = overall_obj;
	};
	//活动奖品的各种类型生成的数据
	$scope.confirmlabel = function($event,label){
		label.id = $($event.target).attr("key");
		label.name = $($event.target).attr("str");
	};
	
	//保存微杂志
	$scope.clicklock = 0;   //阻止连续点击保存
	$scope.savemagazine = function(){
		if ($scope.clicklock) return false; 
        $scope.clicklock = 1;
		var form = $scope.$storage.form;
		SaveService.savemagazine($scope);
	};
	//预览微杂志
	$scope.previewmagazine = function(){
		SaveService.previewmagazine($scope);
	};
	$scope.confirm_preview = function(){
		SaveService.confirm_preview($scope,$timeout);
	};
}]);
/*菜单切换，原本的锚点方式与router冲突，修改*/
myApp.controller('modalnavCtr', ['$scope' , '$rootScope',function ($scope, $rootScope) {
	$scope.navtype = 'txtmodals';
	$scope.showmodalnav = function(type){
		$scope.navtype = type;
	}
}]);
/*ui-sortable与track by 冲突，一个controller里面不能有两个数组里面都有相同数字，所以各加一个controller将之区分*/
myApp.controller('viewCtr', ['$scope', '$rootScope',function ($scope, $rootScope) {
	
}]);
myApp.controller('editCtr', ['$scope', '$rootScope',function ($scope, $rootScope) {
	
}]);
//商品主题模块
myApp.controller('productCtr', ['$scope', 'ProductService',function ($scope, ProductService) {
	$scope.showprdtheme = false;      //选择商品主题模块
	$scope.$on('selectprdtheme', function(e) {
		$scope.showprdtheme = true; 
		//点击才会加载商品主题数组
		if(!$scope.prdthemetitle){
			$scope.prdthemetitle = ProductService.prdthemetitle;    //商品主题的名字，值，图片的数组集合
		};
    });
	$scope.confirmprdtheme = function(val,name){
		$scope.showprdtheme = false;
		$scope.$emit('confirmprdtheme', val,name);
	};
	$scope.closeprdtheme = function(){
		$scope.showprdtheme = false;
	};
}]);

var video = {
	trim : function(str){ //删除左右两端的空格
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	/* qq连接匹配 */
	qq_handler : function(url,width,height){
		var qqvid = "";
		/* 正则匹配 */
		var regpage= /^http:\/\/v\.qq\.com\/(boke\/)?page\/[a-z0-9]\/[a-z0-9]\/[a-z0-9]\/([a-z0-9_=\-]+)/i;
		var regprev= /^http:\/\/v\.qq\.com\/prev\/[a-z0-9]\/([a-z0-9_=\-]+)\/([a-zA-Z0-9_=\-]+)/i;
		var regcover1= /^http:\/\/v\.qq\.com\/cover\/[a-z0-9]\/([a-z0-9_=\-]+)\/([a-zA-Z0-9_=\-]+)/i;
		var regcover2= /^http:\/\/v\.qq\.com\/cover\/[a-z0-9]\/[a-z0-9]+\.html[?]vid=([a-z0-9]+)/i;
		var arr;
		if(regpage.test(url)){
			arr=regpage.exec(url); 
		}else if(regprev.test(url)){
			arr=regprev.exec(url); 
		}else if(regcover1.test(url)){
			arr=regcover1.exec(url); 
		}else if(regcover2.test(url)){
			arr=regcover2.exec(url); 
		}else{
			arr = "";
		}
		if(arr){
			for(var i=0;i<arr.length;i++){ 
				qqvid = arr[arr.length-1];
			}
		}else{
			qqvid = "";
		}
		if(qqvid){
			var iframehtml = '<iframe class="videoiframe" scrolling="no" allowfullscreen src="http://v.qq.com/iframe/player.html?vid='
					+qqvid+'&amp;width='+width+'&height='+height+'&auto=0" data-url="'+url+'" width="'+width+'" height="'+height+'" frameborder="0"></iframe>';
		}else{
			var iframehtml = "";
		}
		return iframehtml;
	},
	/* 优酷连接匹配 */
	youku_handler : function(url,width,height){
		var ykvid = "";
		/* 支持连接 
	     * http://v.youku.com/v_show/id_XNjA3Mzk2Mzcy.html 
	     * */
		/* 正则匹配 */
		var reg= /^http:\/\/v\.youku\.com\/v_show\/id_([a-z0-9_=\-]+)\.html/i;
		if(reg.test(url)){
			var arr=reg.exec(url); 
			for(var i=0;i<arr.length;i++){ 
				ykvid = arr[arr.length-1];
			} 
		}else{
			ykvid = "";
		}
		if(ykvid){
			var iframehtml = '<iframe class="videoiframe" scrolling="no" data-url="'+url+'" allowfullscreen src="http://player.youku.com/embed/'+ykvid+'" width="'+width+'" height="'+height+'" frameborder="0"></iframe>';
		}else{
			var iframehtml = "";
		}
		return iframehtml;
	},
	/* 土豆连接匹配 */
	tudou_handler : function(url,width,height){
		var tdvid = "";
		/* 支持以下几种连接 
	     * http://www.tudou.com/listplay/r-0PgnIOkjI/5PDsh0JOdaE/             
			http://www.tudou.com/albumplay/Lqfme5hSolM/5PDsh0JOdaE.html
			http://www.tudou.com/listplay/3V9IMv8Z-5s/wtHJXAdqhBc.html 
			http://www.tudou.com/programs/view/lBdBqlt-PbY/
	     * */
		/* 正则匹配 */
		var reg= /^http:\/\/www\.tudou\.com\/(listplay|albumplay|programs)\/[a-z0-9_=\-]+\/([a-z0-9_=\-]+)/i;
		if(reg.test(url)){
			var arr=reg.exec(url); 
			for(var i=0;i<arr.length;i++){ 
				tdvid = arr[arr.length-1];
			} 
		}else{
			tdvid = "";
		}
		if(tdvid){
			var iframehtml = '<iframe class="videoiframe" scrolling="no" allowfullscreen src="http://www.tudou.com/programs/view/html5embed.action?code='
			+tdvid+'" width="'+width+'" height="'+height+'" data-url="'+url+'" frameborder="0"></iframe>';
		}else{
			var iframehtml = "";
		}
		return iframehtml;
	},
	buildvideo : function(url,width,_t){
		url = video.trim(url);
		var source = [],type="";
		source["qq"]="qq.com";
		source["youku"]="youku.com";
		source["tudou"]="tudou.com";
		var width = width,
		height = Math.ceil(3 * width / 4);
		if(!url){
			_t.html("请输入连接");
			setTimeout(function(){_t.html("")},"3000");
			return false;
		}else{
			for(var key in source){
				if(url.indexOf(source[key]) !== -1){
					type = key;
				}
			}
			if(type == ""){
				_t.html("请输入正确的连接");
				setTimeout(function(){_t.html("")},"3000");
				return false;
			}
			switch (type) {
				case 'qq':
		            htmlval = video.qq_handler(url,width,height);
		            break;
		        case 'youku':
		        	htmlval = video.youku_handler(url,width,height);
		            break;
		        case 'tudou':
		        	htmlval = video.tudou_handler(url,width,height);
		            break;
		        default:
		        	htmlval = "";
		            break;
	    	}
		}
		if(htmlval){
			return htmlval;
		}else{
			_t.html("不支持此视频或者视频连接错误");
			setTimeout(function(){_t.html("")},"3000");
			return false;
		}
	}
};

//拼图模块
/*重定位*/
function resizable_location(elem){
	var current = $(elem).prev();
	var min_x = current.find("tr").find("td").length,min_y = current.find("tr").length;
	current.find(".empty").each(function(){
		var y = $(this).data("y");
		if(y < min_y){
			min_y = y;
		}
	});
	current.find(".empty[data-y="+min_y+"]").each(function(){
		var x = $(this).data("x");
		if(x < min_x){
			min_x = x;
		}
	});
	if(min_x == "0"){min_x = "0px"}else{min_x += "00px"}
	if(min_y == "0"){min_y = "0px"}else{min_y += "00px"}
	var len = current.find(".empty").length;
	if(len == 0){
		$(elem).css({"width":"100px","height":"100px","top":"1px","left":"1px","z-index":"98"});
	}else{
		$(elem).css({"width":"100px","height":"100px","top":min_y,"left":min_x,"z-index":"100"});
	}
};
/*拼图拖拽开始*/
function resizestart(elem, event, ui){
	 var posx = ui.originalPosition.left;
	 var posy = ui.originalPosition.top;
	 if(posx == 0){posx == 0}else{ posx = posx/100;}
	 if(posy == 0){posy == 0}else{ posy = posy/100;}
	var width = 0,height = 0;
	$(elem).prev().find(".empty").each(function(){
		var x = $(this).data("x");
		var y = $(this).data("y");
		if(x == posx && y>= posy){
			height = y+1-posy;
		};
		if(x >= posx && y == posy){
			width = x+1-posx;
		};
	});
	$(elem).resizable('option', 'maxHeight', height*100);
	$(elem).resizable('option', 'maxWidth', width*100);
}
/*拼图拖拽结束*/
function resizestop(elem , event, ui){
	 var start_x = String(ui.originalPosition.left),
	 start_y = String(ui.originalPosition.top),
	 start_x = start_x.substr(0,1),
	 start_y = start_y.substr(0,1),
	width = $(elem).css("width"),
	height = $(elem).css("height"),
	width = width.substr(0,1),
	height = height.substr(0,1),
	len = width*height,
	end_x = parseInt(start_x)+parseInt(width) -1;
	end_y = parseInt(start_y)+parseInt(height) -1;
	var length = 0;
	$(elem).prev().find(".empty").each(function(){
		var x = $(this).data("x");
		var y = $(this).data("y");
		if( x >= start_x && x<=end_x && y >= start_y && y<=end_y){
			length += 1;
		};
	});
	if(length !== len){
		alert("所选区域覆盖了已选的区域，请重新选择");
		$(elem).css({"width":"100px","height":"100px"});
	}
}

//拼图
myApp.directive('resizable', function(){  
  return {
    restrict: 'A',
    link : function($scope,elem,attr){
    	var arr = $scope.$storage.form.form_fields;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].field_id == attr.count && arr[i].field_puzzlecon){
				resizable_location(elem);
			}
		};
    	$(elem).resizable({
    	    grid: 100,
    	    containment: ".magic_container",
    	    maxWidth: 400,
    	    maxHeight: 400, 
    	    minWidth: 100,
    	    minHeight: 100,
    	    cancel: ".notempty",
    	    start : function(event, ui){
    	    	resizestart(elem,event, ui)
    	    },
    	    stop : function(event, ui){
    	    	resizestop(elem,event, ui)
    	    },
    	});
    	/*确认选择拼图块*/
    	$(elem).dblclick(function(){
    		var reset_x,reset_y,
    		width = $(elem).css("width"),
    		height = $(elem).css("height"),
    		start_x = $(elem).css("left"),
    		start_y = $(elem).css("top"),
    		width = width.substr(0,1),
    		height = height.substr(0,1),
    		start_x = start_x.substr(0,1),
    		start_y = start_y.substr(0,1),
    		pixel_x = parseInt(width)*160,
    		pixel_y = parseInt(height)*160,
    		limitx = parseInt(width)+parseInt(start_x),
    		limity = parseInt(height)+parseInt(start_y),
    		len = $(elem).prev().find(".notempty").length;
    		if(len){len = len}else{len == "0";};
    		$(elem).prev().find(".empty").each(function(){
    			var x = $(this).data("x");
    			var y = $(this).data("y");
    			if(x < limitx && x >= start_x && y >= start_y && y < limity){
    				if(x == start_x && y == start_y){
    					var editbtns = "<div class='magic_btns'><span class='edit_magicurl selecturl' data-mark='backurl' type='magic' title='选择链接'></span>" +
    					"<span class='edit_magicimg selectimage' data-mark='magic' title='选择图片'>" +
    					"</span><span class='del_magic' title='删除'></span></div>";
    					$(this).attr({"rowspan":height,"colspan":width,"data-notempty":len}).addClass("notempty notempty_"+len+" rows_"+height+" cols_"+width).removeClass("empty")
    					.html("<span>最佳尺寸</br>"+pixel_x+"px*"+pixel_y+"px</span><a href='javascript:void(0);'><img src=''></a>"+editbtns);
    				}else{
    					$(this).remove();
    				}
    			};
    		});
    		resizable_location(elem);
    	});
    },
  }  
});
//删除拼图
$(".del_magic").live("click",function(){
	var td=this.parentNode.parentNode,tr=td.parentNode,
	cell = tr.rowIndex,row = td.cellIndex,
	editbox = $(this).parents(".notempty"),
	start_x = editbox.data("x"),start_y = editbox.data("y"),
	width = editbox.attr("colspan"),
	height = editbox.attr("rowspan"),
	limitx = parseInt(width)+start_x,
	limity = parseInt(height)+start_y,
	magic_currnt = $(".magic_container").find(".magictable");
	for(i = start_y;i < limity;i++){
		var html = "",matchtr = magic_currnt.find("tr:nth-child("+(i+1)+")"),beforelen = 0,notelen = 0;
		for(j = start_x;j < limitx;j++){
			html += "<td class='empty' data-x='"+j+"' data-y='"+i+"'></td>";
		}
		$(html).each(function(){
			var newx = $(this).attr("data-x"),newy = $(this).attr("data-y");
			magic_currnt.find("[data-y="+i+"]").each(function(){
				var x = $(this).data("x");
				if(x <= newx && $(this).hasClass("empty")){
					beforelen += 1;
				}
				if(x <= newx && $(this).hasClass("notempty")){
					notelen += 1;
				}
			});
			var len = matchtr.find(".empty[data-x="+newx+"][data-y="+newy+"]").length;
			if(len < 1){
				if(beforelen > notelen){
						matchtr.find("td:nth-child("+beforelen+")").after(html);
				}else if(beforelen < notelen){
					matchtr.find("td:nth-child("+notelen+")").after(html);
				}else{
					if(notelen+beforelen == 0){
						matchtr.prepend(html);
					}else{
						matchtr.find("td:nth-child("+(notelen+beforelen)+")").after(html);
					}
				}
			};
		});
	};
	var number = editbox.data("notempty");
	editbox.remove();
	magic_currnt.find(".notempty").each(function(){
		var num = $(this).attr("data-notempty");
		if(num > number){
			$(this).removeClass("notempty_"+num);
			num -= 1;
			$(this).attr("data-notempty",num).addClass("notempty_"+num);
		}
	});
	resizable_location("#resizable");
});

/*展示隐藏操作按钮*/
myApp.directive('magictable', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			$(elem).find(".notempty").live("hover",function(e){
				if(e.type == "mouseenter"){
					$(this).find(".magic_btns").addClass("show");
				}else{
					$(this).find(".magic_btns").removeClass("show");
				}
			});
			//阻止a标签的默认跳转
			$(elem).find(".notempty a").live("click",function(event){
			    event.preventDefault();
		    });
		},
	}  
});