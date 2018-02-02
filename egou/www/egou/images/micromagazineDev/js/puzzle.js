;//拼图模块
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
		$(elem).css({"width":"100px","height":"100px","top":"0px","left":"0px","z-index":"98"});
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
function getpuzzlestyle(arr,id){
	var puzzlestyle = "";
	for(var i = 0; i < arr.length; i++){
		if(arr[i].field_id == id){
			puzzlestyle = arr[i].field_style;
		};
	};
	return puzzlestyle;
}
var imageMenuData = [];
//拼图
myApp.directive('resizable', function(){  
  return {
    restrict: 'A',
    link : function($scope,elem,attr){
		var puzzlestyle = "";
    	var arr = $scope.$storage.form.form_fields;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].field_id == attr.count){
				puzzlestyle = arr[i].field_style;
				var len = $(".mag_puzzle"+arr[i].field_id).find(".magictable").find("tr").length;
				if(arr[i].field_puzzlecon && puzzlestyle == len){
					resizable_location(elem);
				};
			};
		};
		$(elem).smartMenu(imageMenuData, {
			beforeShow : function(){
				//需要先行计算可扩展范围
				//计算不对，
				var top = $(elem).css("top"),
					left = $(elem).css("left");
					top = top ? top : '0';
					left = left ? left : '0';
					puzzlestyle = getpuzzlestyle($scope.$storage.form.form_fields,attr.count);
				var y = top.substr(0,1),
					x = left.substr(0,1),
					lastcol = puzzlestyle - x,     //剩余列
					lastrow = puzzlestyle - y;     //剩余行
				var col_len = $(elem).prev().find("td.empty[data-x='"+x+"'][data-y='"+y+"']").parent("tr").find("td.empty").length;
				lastcol = col_len;
				var obj = {},arr = [];
				for(var i = 1 ; i <= lastrow ; i ++){
					for(var j = 1 ; j <= lastcol ; j ++){
						var obj = {
							text: i+"行"+j+"列",
							attr : {"datai" : i,"dataj" : j},
							func: function(attr) {
								attr = attr.substring(0,attr.length-1);
								var arr = [];
								attr=attr.split(","); //字符分割 
								var newarr = [];
								for (i=0;i<attr.length ;i++ ) { 
									attr[i]=attr[i].split(":");
									newarr[attr[i][0]] = attr[i][1];
								} 
								var width = parseInt(newarr.dataj)*100;
								var height = parseInt(newarr.datai)*100;
								$(elem).css({"width":width+"px","height":height+"px"});
								$(elem).trigger("dblclick");
							}
						};
						arr.push(obj);
					}
				}
				$.smartMenu.remove();
				imageMenuData.length = 0;
				imageMenuData.push(arr);
			},
		});
    	$(elem).resizable({
    	    grid: 100,
    	    containment: ".magic_container",
    	    maxWidth: parseInt(puzzlestyle)*100,
    	    maxHeight: parseInt(puzzlestyle)*100, 
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
    		puzzlestyle = getpuzzlestyle($scope.$storage.form.form_fields,attr.count);
    		var widthval = puzzlestyle == 3 ? 240 : 180;
    		var reset_x,reset_y,
    		width = $(elem).css("width"),
    		height = $(elem).css("height"),
    		start_x = $(elem).css("left"),
    		start_y = $(elem).css("top"),
    		width = width.substr(0,1),
    		height = height.substr(0,1),
    		start_x = start_x.substr(0,1),
    		start_y = start_y.substr(0,1),
    		pixel_x = parseInt(width)*widthval,
    		pixel_y = parseInt(height)*widthval,
    		limitx = parseInt(width)+parseInt(start_x),
    		limity = parseInt(height)+parseInt(start_y),
    		len = $(elem).prev().find(".notempty").length;
    		if(len){len = len}else{len == "0";};
    		$(elem).prev().find(".empty").each(function(){
    			var x = $(this).data("x");
    			var y = $(this).data("y");
    			if(x < limitx && x >= start_x && y >= start_y && y < limity){
    				if(x == start_x && y == start_y){
    					var editbtns = "<div class='magic_btns'><span class='edit_magicurl selectpuzzleurl' data-mark='backurl' type='magic' title='选择链接'></span>" +
    					"<span class='edit_magicimg selectpuzzleimage' data-mark='magic' title='选择图片'>" +
    					"</span><span class='del_magic' title='删除'></span></div>";
    					$(this).attr({"rowspan":height,"colspan":width,"data-notempty":len}).addClass("notempty notempty_"+len+" rows_"+height+" cols_"+width).removeClass("empty")
    					.html("<span class='bettersize'>最佳尺寸</br>"+pixel_x+"px*"+pixel_y+"px</span><a href='javascript:void(0);'><img src=''></a>"+editbtns);
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
	var editbox = $(this).parents(".notempty"),
	start_x = editbox.data("x"),start_y = editbox.data("y"),
	width = editbox.attr("colspan"),
	height = editbox.attr("rowspan"),
	limitx = parseInt(width)+start_x,
	limity = parseInt(height)+start_y,
	magic_currnt = $(this).parents(".magic_container").find(".magictable");
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
	resizable_location(magic_currnt.next(".resizable"));
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