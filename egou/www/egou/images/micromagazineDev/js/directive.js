;//加载正文
myApp.directive('maincon', function() {  
    return {  
        restrict: 'E',
        templateUrl: mag.templateurl,
        controller: 'mainCtr',
        replace:true,      
    }  
});

//选择图片
myApp.directive('selectimage', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectPic({
					host : mag.HOST,
					backdatainfo:function(_t,arr){
						var spec = _t.attr("data-spec"),
						type= _t.attr("data-type");
						if(spec){
							pic = arr.url+"_"+spec+"x"+spec+".jpg";
						}else{
							pic = arr.url;
						}
						if(type == "menu"){
							$scope.field.is_imgsize = 1;
						};
						if(type == "iconmenu"){
							$scope.item.is_localimg = 0;
						};
						if(type == "title_sub" || type == "pic_sticker"){
							$scope.field.is_localimg = 0;
						};
						if(type == "carousel"){
							//轮播图判断尺寸
							$("<img/>").attr("src", pic).load(function() {
								var twidth = this.width,
									theight = this.height,
									relratio = (twidth/theight).toFixed(2);
								$scope.$apply(function () {
									$scope.img.img_url = pic;
								     $scope.img.img_relratio = relratio;
								});
							});	
						}else{
							ngModel.$setViewValue(pic);
						}
					}
				});
			});
		},
	}  
});
//清空图片 
myApp.directive('clearimg', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				ngModel.$setViewValue("");
			});
		},
	}  
});
//选择连接
myApp.directive('selecturl', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectLink({
					host : mag.HOST,
					backdatainfo:function(_t,arr){
						var url = arr.url,title = encodeURIComponent(arr.title);
						ngModel.$setViewValue(encodeURIComponent(url));
						$scope.$apply(function () {
							if(attr.type == "menu"){
								$scope.nav.nav_linktitle = title;
							}else if(attr.type == "btnlink"){
								$scope.field.linkname = title;
							}else if(attr.type == "item"){
								$scope.item.linktitle = title;
							}else{  
								$scope.img.img_linktitle = title;
							}
						});
					}
				});
			});
		},
	}  
});
//选择分类
myApp.directive('getitem', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectClassfiy({
					host :  mag.HOST,
					backdatainfo:function(_t,arr){
						var overall_array = []; 
						var title = "";
						for(var i = 0;i<arr.length;i++){
							var newItem = {
					    		"item_id":i + 1,
					    		"item_classfiyid":arr[i].id,
					            "item_link" : arr[i].url,
					            "item_title" : arr[i].title,
					        };
							overall_array.push(newItem);
						}
						ngModel.$setViewValue(overall_array);
					}
				});
			});
		},
	}  
});
//商品模块选择商品
myApp.directive('selprdbygroup', function(){  
return {
  restrict: 'A',
  require: 'ngModel',
  link : function($scope,elem,attr, ngModel){
  	elem.live("click",function(){
  		$(this).selectPrds({
  			host :  mag.HOST,
  			backdatainfo:function(_t,arr){
  				//console.log(arr);
  				var overall_array = [];
  				var ids = "";
  				for(var i = 0; i < arr.length; i++){
  					ids += arr[i].dataid+",";
  					//修改价格前缀
  					if(!_t.attr("data-prev")){
  						price = "￥"+arr[i].price;
  					}else{
  						price = arr[i].price
  					};
  					var newItem = {
  			    		"item_prdid":arr[i].dataid,
  			    		"item_pic": arr[i].pic + "_400x400.jpg",
  			            "item_title" : encodeURIComponent(arr[i].title),
  			            "item_price" : price,
  			        };
  					overall_array.push(newItem);
  				};
  				ngModel.$setViewValue(ids);
  				$scope.$apply(function () {
				     $scope.field.field_items = overall_array;
				     if(overall_array.length%2 == 0){
				    	 $scope.field.field_class = "prd_odd";
					 }else{
						$scope.field.field_class = "prd_even";
					 }
				});
  			}
  		});
  	});
  },
}  
});
//表单模块选择表单
myApp.directive('getformlist', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectForm({
					host : mag.HOST,
					backdatainfo:function(_t,arr,msg){
						ngModel.$setViewValue(arr.title);
						$scope.$apply(function () {
							$scope.field.field_formid = arr.id;
							$scope.field.field_filename = arr.filename;
							$scope.field.field_formcon = encodeURIComponent(msg);
						});
					}
				});
			});
		},
	}  
});
//tab选中商品
myApp.directive('selectnavprd', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectPrds({
					host : mag.HOST,
					backdatainfo:function(_t,arr){
						var ids = "";
						for(var i = 0; i < arr.length; i++){
							ids += arr[i].dataid+",";
						};
						ngModel.$setViewValue(ids);
						$scope.$apply(function () {
							$scope.item.content = arr;
						});
					}
				});
			});
		},
	}  
});
//tab选中微杂志
myApp.directive('selectnavmag', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectLink({
					host : mag.HOST,
					magnum : 0,
					diymag : 1,  //自定义微杂志
					allTabs : ["magazine"],  
					backdatainfo:function(_t,arr,type){
						var ids="";
						for(var i = 0;i<arr.length;i++){
							ids += arr[i].id+",";
							arr[i].title = encodeURIComponent(arr[i].title);
						}
						ngModel.$setViewValue(ids);
						$scope.$apply(function () {
						     $scope.item.content = arr;
						});
					}
				});
			});
		},
	}  
});
//tab选中普通图文素材
myApp.directive('selectnavimgtxt', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectImgTxt({
					host : mag.HOST,
					num : 0,
					allTabs : ["single","double"],
					backdatainfo:function(_t,arr,msg){
						var ids="",newarr = [];
						for(var i = 0;i<arr.length;i++){
							ids += arr[i].id+",";
							if(arr[i].type == 2){
								var obj = {"img" : arr[i]['info']['cover'],"title" : encodeURIComponent(arr[i]['info']['title']),
										"subtitle" : encodeURIComponent(arr[i]['info']['paper']),"url" : arr[i]['info']['url']};
								newarr.push(obj);
							}else if(arr[i].type == 3){
								for(var j = 0;j<arr[i]['info'].length;j++){
									var current = arr[i]['info'][j];
									var obj = {"img" : current['pic'],"title" :  encodeURIComponent(current['title']),"subtitle" : "","url" :  current['url']};
									newarr.push(obj);
								}
							}
						};
						ngModel.$setViewValue(ids);
						$scope.$apply(function () {
						     $scope.item.content = newarr;
						});
					}
				});
			});
		},
	}  
});
/***********活动模块*********/
//选择优惠券
myApp.directive('couponchoice', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectCoupon({
					host : mag.HOST,
					scenestate : 'act',
					backdatainfo:function(_t,arr){
						var overall_obj = {
							"id":arr.id,
							"type" : "coupon",
							"name":arr.title,
							"num":arr.num,
					    };
						ngModel.$setViewValue(overall_obj);
					}
				});
			});
		},
	}  
});
//选择功能卡
myApp.directive('delicardchoice', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectFunCard({
					host : mag.HOST,
					backdatainfo:function(_t,arr){
						var overall_obj = {
							"id":arr.id,
							"type" : "delicard",
							"name":arr.title,
							"num":arr.num,
						};
						ngModel.$setViewValue(overall_obj);
					}
				});
			});
		},
	}  
});
//选择礼金
myApp.directive('delishoprpacketchoice', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectRedPacket({
					host :  mag.HOST,
					backdatainfo:function(_t,arr){
						var overall_obj = {
							"id":arr.id,
							"type" : "rpacket",
							"name":arr.title,
							"num":arr.num,
						};
						ngModel.$setViewValue(overall_obj);
					}
				});
			});
		},
	}  
});
//选择微杂志
myApp.directive('selectmagurl', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			elem.live("click",function(){
				$(this).selectLink({
					host : mag.HOST,
					magnum : 1,
					allTabs : ["magazine"],  
					backdatainfo:function(_t,arr){
						var overall_obj = {
							"id":arr[0].id,
							"type" : "mag",
							"name":arr[0].title,
							"url":arr[0].url,
						};
						ngModel.$setViewValue(overall_obj);
					}
				});
			});
		},
	}  
});
//选择标签
myApp.directive('choicelabel', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr, ngModel){
			new labelConp({action:'show',callback:function(_this,choosedLabel){  
				var str='';
				var key='';
				for(var i in choosedLabel){ 
					str+=str?(","+choosedLabel[i]['text']):choosedLabel[i]['text'];
					key+=key?(";"+choosedLabel[i]['id']):choosedLabel[i]['id'];
				}
				var obj = {"id" : key,"name" : str};
				ngModel.$setViewValue(obj);
				_this.attr("choosed_label",key);
			}});
		},
	}  
});
/************菜单模块  E*************/

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
		    myVal = text ? decodeURIComponent(text) : '';
		    return $sce.trustAsHtml(myVal);
		} catch (err) {
		    myVal = text ? encodeURIComponent(text) : '';
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
		var btns = '<div class="magic_btns"><span class="edit_magicurl selectpuzzleurl" data-mark="backurl" type="magic" title="选择链接"></span><span class="edit_magicimg selectpuzzleimage" data-mark="magic" title="选择图片"></span><span class="del_magic" title="删除"></span></div>';
		var table = "";
		$(html).find("tr").each(function(){
			var len = $(this).find("td.notempty").length;
			if(len > 0){
				var isbtns = $(this).find("td.notempty").find(".magic_btns");
				if(isbtns.length > 0){
					$(this).find("td.notempty").find(".magic_btns").remove();
				};
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
    require: 'ngModel',
    link : function($scope,elem,attr,ngModel){
    	$(elem).slider({
    		  range: "min",
    		  min: parseInt(attr.min),
    		  max: parseInt(attr.max),
    		  step:parseInt(attr.step),
    		  value:parseInt(attr.value),
    		  slide: function( event, ui ) {
    			  var type=attr.type;
    			  var _num=ui.value;
    			  if(attr.rel == 'percent'){
    				  dragvalue = _num+"%";
    			  }else{
    				  dragvalue = _num+"px";
    			  }
    			  $scope.$apply(function(){  
    				  ngModel.$setViewValue(dragvalue);
    			  });
    		  },
		});
    },
  }  
});
//encodeURI 处理特殊字符
myApp.directive('encodeuri', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr,ngModel){
			$(elem).live("blur",function(){
				var val = $(this).val();
				val = encodeURIComponent(val);
				ngModel.$setViewValue(val);
			})
		},
	}  
});
//颜色选择器
myApp.directive('colorpicker', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr,ngModel){
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
				 var r = event.color.toRGB().r,
					  g = event.color.toRGB().g,
					  b = event.color.toRGB().b,
					  a = event.color.toRGB().a;
				 var color = "rgba("+r+","+g+","+b+","+a+")";
				  $scope.$apply(function(){  
					  ngModel.$setViewValue(color);
					  if(attr.mark == "wheel"){
						  //大转盘需要重新画盘
						  var colorarr = [$scope.field["field_bgcolor1"],$scope.field["field_bgcolor2"]];
						  wheelfunc.draw(colorarr,$scope.field["field_color"]);
					  };
					  /*modalheight = ($(window).height()-218)+"px";  
			          $(".viewmodalsbox").height(modalheight);*/
    			  });
			});
		},
	} 
});
//重置颜色
myApp.directive('resetcolor', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr,ngModel){
			elem.live("click",function(){
				var color = $(this).attr("color");
				$scope.$apply(function(){ 
					ngModel.$setViewValue(color);
					if(attr.mark == "wheel"){
						  //大转盘需要重新画盘
						  var colorarr = [$scope.field["field_bgcolor1"],$scope.field["field_bgcolor2"]];
						  wheelfunc.draw(colorarr,$scope.field["field_color"]);
					};
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
				var currentid = $scope.field.field_id;
				$scope.ueditor["ueditor_"+currentid].execCommand("insertHtml",editor_html);
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
                    $(elem).next().children().html("0").attr("style","color:#ff0000");
                }
            });
		},
	} 
});
//时间选择器（活动选择时间）
myApp.directive('acttime', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr,ngModel){
			$(elem).focus(function(){
				WdatePicker({
					skin:'whyGreen',
					dateFmt:'yyyy-MM-dd HH:mm:ss',
					minDate:'%y-%M-%d %H:%m:%s',
					readOnly:true,
					onpicked : function(e){
						$scope.$apply(function(){  
							ngModel.$setViewValue(e.cal.getNewDateStr());
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
//设计模块商品模块 滑动选择示例商品个数
myApp.directive('sliderprd', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function($scope,elem,attr,ngModel){
			$(elem).slider({
				range: "min",
				min: parseInt(attr.min),
				max: parseInt(attr.max),
				step:parseInt(attr.step),
				value:parseInt(attr.value),
				slide: function( event, ui ) {
					var _num=ui.value;
					var arr = [];
					for(var i = 1; i <= _num;i++){
						var data = JSON.parse(attr.dataval);
						arr.push(data);
					}
					$scope.$apply(function(){  
						$scope.field.field_items = arr;
						ngModel.$setViewValue(arr.length);
					});
				},
			});
		},
	}  
});
if(mag.themetype == 'config'){
	//选择商品图
	myApp.directive('setsampleprdimg', function(){  
		return {
			restrict: 'A',
			require: 'ngModel',
			link : function($scope,elem,attr,ngModel){
				$(elem).click(function(){
					var img = attr.img;
					$scope.$apply(function(){  
						ngModel.$setViewValue(img);
					});
				});
			},
		}  
	});
};
