/*大转盘画盘****************S*/
var wheelfunc = {
	winfo : mag.winfo,
	draw : function(wcolor,wfcolor) {
		var wwidth = (typeof($getWindowWidth) != 'undefined') ? $getWindowWidth() : 320;
		var	wheel = document.getElementById("wheel"),
			outerR = (wwidth >= 640 ? 640 : (wwidth <= 320 ? 320 : wwidth)) * 0.76; //转盘宽度
		
		var cont = $(".wheel_cont");
		$(wheel).css({
			"height": outerR + "px",
			"width": outerR + "px"
		});
		cont.height(outerR);
		cont.width(outerR);
		
		var pc = $(wheel).attr('chart');
		pc = pc.replace(/'/g, "\"");
		pc = wheelfunc.pieChart(wheel, pc,wcolor,wfcolor);
		$(wheel).html(pc);
	},
	pieChart : function(el,cd,wcolor,wfcolor) {
	    var tilt = 0,
			width = $(el).width(),
			height = $(el).height(),
			cx = (width / 2),
			cy = (height / 2),
			r = width/2,
			colors = wcolor,
			labels = wheelfunc.winfo,
			num = labels.length, //总扇叶数
			angles = 2 * Math.PI / num;
		
	    var lx = cd.lx, ly = cd.ly,
			wwidth = (typeof($getWindowWidth) != 'undefined') ? $getWindowWidth() : 320,
			fs = wwidth >= 600 ? "18px" : "3.5vw", //font size
			fw = 9 - num/2, //
			lh = wwidth >= 400 ? 26 : 14, //lineHeight
			fc = wfcolor || "#fff";
		if(wwidth === 320){
			fs = "12px", //font size
			lh = 16; //lineHeight
		}

	    var svgns = "http://www.w3.org/2000/svg";    
	    var chart = document.createElementNS(svgns, "svg:svg");
	    chart.setAttribute("width", width);
	    chart.setAttribute("height", height);
	    chart.setAttribute("viewBox", "0 0 " + width + " " + height);


	    startangle = tilt;
	    for (var i = 0; i < num; i++) {
	        var endangle = startangle + angles,
				halfangle = startangle + (angles / 2),
				words = labels[i].split(""),
				wlen = words.length,
				wpre = parseInt(wlen/fw);

	        var x1 = cx + r * Math.sin(startangle);
	        var y1 = cy - r * Math.cos(startangle);
	        var x2 = cx + r * Math.sin(endangle); 
	        var y2 = cy - r * Math.cos(endangle);
	        var degrees = halfangle * (180 / Math.PI);
	        
	        var offset = (degrees > 180) ? (r + 30 + (labels[i].length*9)) : r + 30; 
	        var lx = cx + (r*(0.74 + 0.02*wpre)) * Math.sin(halfangle);
	        var ly = cy - (r*(0.74 + 0.02*wpre)) * Math.cos(halfangle);

	        var big = 0;
	        if (endangle - startangle > Math.PI) big = 1;
	        var path = document.createElementNS(svgns, "path");
	        var d = "M " + cx + "," + cy +  // Start at circle center
	            " L " + x1 + "," + y1 +     // Draw line to (x1,y1)
	            " A " + r + "," + r +       // Draw an arc of radius r
	            " 0 " + big + " 1 " +       // Arc details...
	            x2 + "," + y2 +             // Arc goes to to (x2,y2)
	            " Z";                       // Close path back to (cx,cy)

	        // Now set attributes on the <svg:path> element
	        path.setAttribute("d", d);              // Set this path
			var colorsL = colors.length,
				j = (i > colorsL - 1) ? i % colorsL : i;
		
	        path.setAttribute("fill", colors[j]);   // Set wedge color
	        chart.appendChild(path);                // Add wedge to chart

	        var label = document.createElementNS(svgns, "text");
	        label.setAttribute("text-anchor", "middle");
	        label.setAttribute("x", lx);
	        label.setAttribute("y", ly);
	        label.setAttribute("font-family", "微软雅黑");
	        label.setAttribute("font-size", fs);
			label.setAttribute("fill", fc);
			label.setAttribute("transform","rotate("+360+(2*i+1)/num*180+" "+lx+" "+ly+")");

			

			var LINE_HEIGHT = lh;
			var line = "";
			for (var n = 0; n < wlen; n++) {
				var testLine = line + words[n] + "";
				if (testLine.length > fw){
					var svgTSpan = document.createElementNS(svgns, 'tspan');
					svgTSpan.setAttributeNS(null, 'x', lx);
					svgTSpan.setAttributeNS(null, 'y', ly);
					var tSpanTextNode = document.createTextNode(line);
					svgTSpan.appendChild(tSpanTextNode);
					label.appendChild(svgTSpan);
					line = words[n] + "";
					ly += LINE_HEIGHT;
				}
				else {
					line = testLine;
				}
			}
			var svgTSpan = document.createElementNS(svgns,  'tspan');
			svgTSpan.setAttributeNS(null, 'x', lx);
			svgTSpan.setAttributeNS(null, 'y', ly);
			var tSpanTextNode = document.createTextNode(line);
			svgTSpan.appendChild(tSpanTextNode);
			label.appendChild(svgTSpan);
	        
			chart.appendChild(label); 
	        startangle = endangle;
	    }
	    return chart;
	}
};
if(mag.act_kind == '1'){
	var wcolor = [mag.wheelmodel.field_bgcolor1,mag.wheelmodel.field_bgcolor2],
	wfcolor = mag.wheelmodel.field_color;
	wheelfunc.draw(wcolor,wfcolor);
};

/*大转盘画盘****************E*************/


//大转盘模块
if(mag.act_kind == '1'){
	//更多中奖人列表
	$(".j_arrow").bind("click", function(){
		My.showLoad("正在跳转...");
		window.location.href = winnerslist_url;
	});
	//加载中奖人的列表
	$(document).ready(function(){
		winningLoad(true);
	});
	var oldeg = 0;
	function rotate(_deg, callback){
		var deg = _deg + 3600 + oldeg;
		$(".j_wheel").css("-webkit-transform","rotate(" + deg + "deg)");
		$(".j_wheel").css("-moz-transform","rotate(" + deg + "deg)");
		$(".j_wheel").css("-o-transform","rotate(" + deg + "deg)");
		$(".j_wheel").css("transform","rotate(" + deg + "deg)");
		oldeg += 3600;
		setTimeout(callback, 2600);
	}
	
	var user_type= '{/literal}{$user_type}{literal}';
	var user_nick = '{/literal}{$user_nick}{literal}';
	
	var _btn = $("#startbtn");
	Act.init({
		playUrl: mag.HOST+"/index.php/act/normal/turntablelottery?sid="+Act.seller_id, //触发访问路径
	    beforePlay: function(){ //触发抽奖
	        _btn.addClass("active"); //添加指针按下样式
			_btn.html("<span>正在抽奖</span>");
	    },
	    hasAward: function(json){ //如果中奖了 json是获奖返回的信息
	        var a = 90 - json.angle; //角度
			rotate(a, callback);
			function callback() {
				_btn.removeClass("active");
				_btn.html("<span>开始抽奖</span>");
				popAward(json);
			}
	    },
	    noAward: function(json){ //如果没中奖了 json是获奖返回的信息
	        var a = 90 - json.angle; //角度
			rotate(a, callback);
			function callback() {
				_btn.removeClass("active");
				_btn.html("<span>开始抽奖</span>");
				Act.showNoAward(json.count); //未中奖提示，自定义运行
			}
	    }, 
	    afterPlay: function(){ //判断结束后
	        _btn.removeClass("active");
			_btn.html("<span>开始抽奖</span>");
	    }
	});
	
	_btn.bind("click",Act.startplay); //绑定开始事件
	$(".j_award_close, .j_playAgain").bind("click", Act.playAgain);
};

//砸金蛋模块 
if(mag.act_kind == '3'){
	//更多中奖人列表
	$(".j_arrow").bind("click", function(){
		My.showLoad("正在跳转..."); 
		window.location.href = winnerslist_url;
	});
	//加载中奖人的列表
	$(document).ready(function(){
		winningLoad(true);
	}); 
	
};
//摇一摇模块
if(mag.act_kind == '7'){
	var audioShack = document.getElementById('audioShack'), 
	audioSuccess = document.getElementById('audioSuccess');
	Act.init({
	    playUrl: mag.HOST+"/index.php/act/normal/simplelottery?sid="+Act.seller_id, //触发访问路径
	    beforePlay: function(){ //触发抽奖
    		audioShack.play();//摇奖声音
    		$(".shaking_body").addClass("shakeing");
    		setTimeout(function(){$(".shaking_body").removeClass("shakeing");},'1000');
	    },
	    hasAward: function(json){ //如果中奖了 json是获奖返回的信息
	        audioSuccess.play(); //中奖音乐
	        json.type--; //原始程序抛出的奖品类型没统一
	        popAward(json);
	    }, 
	    noAward: function(json){ //如果没中奖了 json是获奖返回的信息
	       Act.showNoAward(json.count);
	    }
	});

	//摇一摇程序
	var SHAKE_THRESHOLD = navigator.userAgent.indexOf('iPhone') > -1 ? 2000 : 900;
	var last_update = 0;
	var x = y = z = last_x = last_y = last_z = 0;
	function deviceMotionHandler(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();
		if((curTime - last_update) > 100){
			var diffTime = parseInt(curTime -last_update);
			last_update = curTime;
			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			if (speed > SHAKE_THRESHOLD) {
				Act.startplay(); //触发是否中奖
			}
			last_x = x;
			last_y = y;
			last_z = z;
		}
	}
	if (window.DeviceMotionEvent){
		window.addEventListener('devicemotion', deviceMotionHandler, false);
	}else{
		My.errorTip("对不起您的手机不支持摇一摇，你可以点击抽奖");
	}

	$("#J_sstart").bind('click', Act.startplay);
};
