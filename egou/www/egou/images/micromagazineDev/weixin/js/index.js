/*弹层*/
function showTips(a){
	var alertText = $(".alert_tips").html(a).show();    
	setTimeout(function(){
		alertText.hide();  
	}, 2000)
} 
//如果有倒计时模块
if(mag.istime){
	var dateTime = new Date(),
	difference = dateTime.getTime() - mag.serverTime; //服务器与当前时间差
	var t1=null;  
	t1 = setInterval(function() {
		$(".endtime").each(function() {
			var obj = $(this);
			var endTime = new Date(parseInt(obj.attr('rel')) * 1000); //结束时间
			var e_time = endTime.getTime();
			var nowTime = new Date(); //当前时间
			var nMS = endTime.getTime() - nowTime.getTime() + difference; //距离时间差
			if(nMS>0){
				var myD = Math.floor(nMS / (1000 * 60 * 60 * 24)),
				myH = Math.floor(nMS / (1000 * 60 * 60)) % 24,
				myM = Math.floor(nMS / (1000 * 60)) % 60,
				myS = Math.floor(nMS / 1000) % 60,
				html = "<span>"+myD+"</span>天<span>"+myH+"</span>时<span>"+myM+"</span>分<span>"+myS+"</span>秒";
				obj.html(html);
			}else{
				obj.html("<span>00</span>天<span>00</span>时<span>00</span>分<span>00</span>秒");
				var t2 = clearInterval(t1);  
			};
		});
	},100);
};
//如果有分享模块
if(mag.isshare){
	$(".share-btn span.btn,.share-img").click(function(){
		$(".share-cover").show();
	});
	$(".share-cover").click(function(){
		$(".share-cover").hide();
	}) 
};
//如果有tab切换模块
if(mag.isnavtab){
	var tab = new fz.Scroll('.ui-tab', {
	    role: 'tab',
	    interval: 3000,
	});
};

//如果有菜单模块  或者商品模块有加入购物车操作
if(mag.isstore && mag.store_state !== 1 && mag.store_state !== 3){
	$(".cart_nav").hide();
}
if(mag.ismenu || mag.shopping_show || (mag.isstore && (mag.store_state == 0 || mag.store_state == 2))) {
	if(mag.isstore){
		var data = {sid : mag.sid,"carttype" : "2",storeid : mag.storeid};
	}else{
		var data = {sid : mag.sid,"carttype" : "3"};
	}
	$.ajax({
		type: "POST",
		data: data,
		url: mag.HOST + "/index.php/weixin/order/shoppingprdnum",
		success: function(msg) {
			var result = JSON.parse(msg),
				num = parseInt(result.msg.num);
			if(num > 0) {
				if (mag.ismenu) $(".menu_cartnum").show().html(num);
				else if (mag.shopping_show || mag.isstore) {
					$(".cart_nav").show();
					$('.cnum').html(num);
				}
			}
		}
	});
}
//如果有公告模块
if(mag.isnotice){
	var pleft = $("#magnotice1").css("padding-left"),
		pright = $("#magnotice1").css("padding-right");
		pleft = pleft.substring(0,pleft.length-2);
		pright = pright.substring(0,pright.length-2);
	var noticewidth1  = $("#magnotice1").width()-pleft-pright,
		noticewidth2  = $("#magnotice2").width();
	var s,s2,s3,timer;
	function init(){
		s = $("#magnotice1");
		s2 = $("#magnotice2");
		s3 = $("#magnotice3");
		if(noticewidth2 >= noticewidth1){  //如果公告大于等于外框宽度
			s3.html(s2.html());
		}else{
			var count = Math.ceil(noticewidth1/noticewidth2);
			var html = "";
			for(var i = 0 ;i < count ; i++){
				html+= s2.html() + '<span style="display:inline-block;padding-right:20px;"></span>';
			}
			s3.html(html);
		};
		timer=setInterval(notice_mar,30);
	}
	function notice_mar(){
		if(s2[0].offsetWidth <= s.scroll()[0].scrollLeft){
			s.scroll()[0].scrollLeft -= s2[0].offsetWidth;
		}else{
			s.scroll()[0].scrollLeft ++;
		}
	}
	window.onload=init;
};
//如果有视频模块
if(mag.isvideo){
	$(window).bind('load', function () {
	    resetvideo();
    });
    function resetvideo() {
		var _t = $(".videoiframe");
		var padding = $("#magazine_con").css("padding-left");
		padding = padding.substr(0,padding.length-2);
		var width = document.getElementById("magazine_con").offsetWidth-padding*2,
		height = Math.ceil(3 * width / 4);
		_t.attr({"width":width,"height":height});
    };
};
//如果有拼图模块
if(mag.ispuzzle){
	if(mag.is_system == '2'){
		var len = $("body").find(".magictable").length;
		if(len > 0 ){
			$(".magictable").find("tr").each(function(){
				var len = $(this).find("td").length;
				if(!len){
					$(this).html("<td></td><td></td><td></td><td></td>");
				}
			});
		}
	};	
}
//如果有表单模块
if(mag.isform){
	;(function($) {
		$.fn.openDialog = function(){
			this.removeClass("dialog--close").addClass("dialog--open");
			$("body>.wrap").removeClass("closeTools").addClass("openTools");
			return false; 
		}
		$.fn.closeDialog = function(){
			this.removeClass("dialog--open").addClass("dialog--close").removeClass("dialog--close");
			$("body>.wrap").removeClass("openTools").addClass("closeTools");
			return false;
		}
	})(Zepto);
	$(".dialog__overlay,.Jdialogclose,.Jdialogaction").click(function(){
		$("#formdialog").closeDialog(); 
	});
	//文本框限制长度 移动端使用
	function InitLimit(txt, limit, isbyte, cb) {
		txt.on('input',function(){
			var str = txt.val();
			var charLen;
			var byteLen = 0;
			if (isbyte) {
				for (var i = 0; i < str.length; i++) {
					if (str.charCodeAt(i) > 255) {
						byteLen += 2
					} else {
						byteLen++
					}
				}
				charLen = Math.floor((limit - byteLen) / 2);
			} else {
				byteLen = str.length;
				charLen = limit - byteLen
			}
			cb(charLen);
		});
	};
	//该函数用于输出框，当输入值大于指定的最大值的时候，返回当长度等于Max的值
	function getByteVal(val, max) {
		var returnValue = '';
		var byteValLen = 0;
		for (var i = 0; i < val.length; i++) {
			if (val[i].match(/[^\x00-\xff]/ig) != null) byteValLen += 2;
			else byteValLen += 1;
			if (byteValLen > max) break;
			returnValue += val[i]
		}
		return returnValue
	};
	var len = $("#wxform").find("textarea").length;
	if(len > 0){
		$("textarea").each(function(){
			var elem = $(this);
			count = $(this).attr("count");
			count = count *2;
			if(count){
				InitLimit(elem, count, true, function (c) {
					if (c >= 0) {
						$(elem).next().children().html(c).attr("style", "");
					}else {
						var title = $.trim($(elem).val());
						var copytitle = getByteVal(title, count);
						$(elem).val(copytitle).trigger('input');
						$(elem).next().children().attr("style","color:#ff0000");
					}
				});
			};
		});
	};
	//时间判断
	$(".formtime").each(function(){
		$(this).blur(function(){
			var ismax = $(this).attr("maxtime"),
			ismin = $(this).attr("mintime");
			time = $(this).val();
			if(ismax){
				ismaxval = ismax.replace(/-/g,"/");
				ismaxval = Date.parse(ismaxval);
			};
			if(ismin){
				isminval = ismin.replace(/-/g,"/");
				isminval = Date.parse(isminval);
			};
			time = time.replace("T"," ").replace(/-/g,"/");
			time = Date.parse(time);
			if(ismax && time && !ismin){
				if(time > ismaxval){
					alert("请选择不晚于"+ismax+"的时间");
					$(this).val("");
				}
			};
			if(ismin && time && !ismax){   
				if(time < isminval){
					alert("请选择不早于"+ismin+"的时间");
					$(this).val("");
				}
			};
			if(ismin && ismax && time){
				if(time > ismaxval || time < isminval){
					alert("请选择"+ismin+"到"+ismax+"之间的时间");
					$(this).val("");
				}
			}
		});
	});
	//商品与图片点击trigger
	$(".formprdlist,.formimgpic,.checkboxpic .imgpic,.radiopic .imgpic,.checkboxprd .mod-col-list,.radioprd .mod-col-list").bind('click',function(){	
		var label = $(this).parent('label');
		if(mag.is_system == '2'){
			label.trigger("click");
		}else{
			label.find("input").trigger("change");
		};
	});
	//保存表单
	var formExist=$("#wxform");
	if(formExist.length>0){  
		var ajaxUrl=formExist.attr("action");
		$("#wxform").formValidate({
			submit:"#savewxform",
			backfunc : function(){
				//旧表单的选项都是没有规则的，需要另做判断
				var isAllNull=1;
				var checklen = $('.control-group.checkbox').length;
				var radiolen = $('.control-group.radio').length;
				if(checklen > 0 || radiolen > 0){
					$('.control-group.checkbox,.control-group.radio').each(function(e){
						var isNull=$(this).find(".controls input:checked").val();
						if(!isNull){
							alert("选项不能为空");
							isAllNull=0;
							return false;
						}
					});
				};
				if(isAllNull){
					$("#savewxform").removeClass("disabled");  
					var txtOld = $("#savewxform").html();
					$("#savewxform").html("提交处理中...");
					$.ajax({
						type: "POST",
						url: ajaxUrl,
						data: $('#wxform').serialize(),
						success: function (res) { 
							$("#savewxform").html(txtOld);
							var fmData=JSON.parse(res);
							if(fmData.status==1){
								if(fmData.succtip==""){
									$(".dialog-txt").html(fmData.msg);
								}else{
									$(".dialog-txt").html(fmData.succtip);
								}
							}else{
								$(".dialog-txt").html("<span class='red-font'>"+fmData.msg+"</span>");
							} 			
							if(fmData.url=="" || fmData.url==null){//链接为空时
								var formbtn = fmData.successbtn ? fmData.successbtn : "返回店铺首页";
								$(".Jdialogaction").html(formbtn).attr("href",mag.shopIndex);
							}else{
								var formbtn = fmData.successbtn ? fmData.successbtn : "点我去看看";
								$(".Jdialogaction").html(formbtn).attr("href",fmData.url);//进入自定义链接
							}
							
							$("#formdialog").openDialog();
						},      
						error: function(data) {
							alert("失败");
						}
					});
				};
			}
		});
	};
};
//如果是分类页面
if(mag.iscate || mag.viewtype == 2 || mag.viewtype == 1 ){
	if(mag.viewtype == 1){
		var getprdlisturl = mag.indexprdurl;
	}else{
		var getprdlisturl = mag.data_url;
	};
	var lock = 0;
	; (function(a) {
		a.fn.scrollPagination = function(b) {
			var c = {
				nop: 10,
				offset: 0,
				error: "加载完毕!",
				delay: 0,
				scroll: true
			};
			if (b) {
				a.extend(c, b)
			}
			return this.each(function() {
				$this = a(this);
				$settings = c;
				var f = $settings.offset;
				var d = false;
				if ($settings.scroll == true) {
					$initmessage = "更多.."
				} else {
					$initmessage = "更多"
				}
				
				if (!lock) { //a("#noload").val() != "1"
					if (a(".prd_items li").length <= 4) {
						var info = "";
					} else {
						var info =  $initmessage;
					}
					if(a(".loading-bar").length <= 0){
						$this.append('<div class="loading-bar">'+info+'</div>');
					};
				}
				function e() {
					a.post(getprdlisturl, {
						action: "scrollpagination",
						number: $settings.nop,
						offset: f,
						value_str: mag.value_str,
						view_path: mag.view_path,
						field: mag.catepage_field
					},
					function(g) {
						var json = eval('(' + g + ')');
						if (json.productlist == "") {
							if(mag.viewtype == 1){
								var html = "<p>暂时没有商品</p>"
							}else{
								var html = '<p>没有相关分类的商品</p><a href="javascript:history.go(-1)">返回分类</a>';
							}
							$this.find(".loading-bar").addClass('nodata').html(html).show().unbind("click");
						} else {
							f = f + $settings.nop;
							if (!lock) {
								$this.find(".prd_items").append(json.productlist);
								if (!json.next) { //没有更多了
									lock = 1; 
								}
								if (lock) {
									$this.find(".loading-bar").html("没有更多了").hide(1000);
								}
								if (a(".prd_items li").length <= 4) {
								} else {
									$this.find(".loading-bar").html($initmessage)
								}
								d = false
							}
						}
					})
				}
				e(); 
				if ($settings.scroll == true) {
					a(window).scroll(function() {
						if (a(window).scrollTop() + a(window).height() > $this.height() && !d) {
							d = true;
							if (!lock) {
								$this.find(".loading-bar").html("正在加载中...");
								setTimeout(function() {
									e(); 
								}, $settings.delay);
							}
						}
					})
				}
				$this.find(".loading-bar").click(function() {
					if (!lock) {
						if (d == false) {
							d = true;
							e();
						}
					} else {
						$this.find(".loading-bar").html("")
					}
				})
			})
		}
	})($);
	(function(){
		$('.catepage_items').scrollPagination({
			nop     : 6, 
			offset  : 10, 
			error   : '加载完毕!', 
			delay   : 0, 
			scroll  : true 
		});
	})();
};
/*关注引导js*/
if(mag.subscribe == 0 || mag.viewtype == 1){
	var followLayer=$(".followUsO.mod-follow"),
		fixbody=$("html,body"),
		gz_close=$(".gz_close");
	gz_close.click(function(){
		followLayer.removeClass("show").addClass("out");
		//fixbody.removeClass("fixbody");
	});
	function showFollowTip(){
		followLayer.removeClass("out").addClass("show").show();
		//fixbody.addClass("fixbody");
	};	
	$(".j_follow").click(function(){
		showFollowTip();
	});
};
/* 如果有搜索模块 */
if(mag.issearchprd){
	$(".searchprdbox").searchBar({
		sid: mag.sid,
		//uid: '', 
		onsearch: function(text){
			$.ajax({
				type: "POST",
				data:{"sid" : mag.sid,"type":2,"title":text},
				url: mag.HOST+"/index.php/weixin/shop/searchnote",
				success: function(msg) {
					location.href = mag.searchprdurl+"&title=" + text;
				}
			});
		},
		getTagsData: {
			his: function(plug, callback) {
				$.ajax({
					type: "POST",
					data:{"sid" : mag.sid,"type":1},
					url: mag.HOST+"/index.php/weixin/shop/searchnote",
					success: function(msg) {
						callback(JSON.parse(msg).result);
					}
				});
			}
		},
		onhisClear:function(){
			if (confirm('确定清除历史搜索记录？')) {
				$.ajax({
					type: "POST",
					data:{"sid" : mag.sid},
					url: mag.HOST+"/index.php/weixin/shop/delhistory",
					success: function(msg) {
						var data = JSON.parse(msg);
						if(data.code == 1){
							showTips("删除失败");
						}
					}
				});
			}
		}
	});
};

/* 如果有门店模块 */
if(mag.isstore) {
	var cartUrl = mag.YWKHOST + '/index.php/storeweixin/shop/show?sid=' + mag.sid + '&store_id=' + mag.storeid + '&key=shopCartOperate',
		menuUrl = mag.YWKHOST + '/index.php/storeweixin/shop/show?key=classifyInfo&sid=' + mag.sid + '&store_id=' + mag.storeid,
		prdListUrl = mag.YWKHOST + '/index.php/storeweixin/shop/show?key=storePrdList&sid=' + mag.sid,
		prdurl = mag.YWKHOST + '/index.php/storeweixin/shop/show?sid=' + mag.sid + '&store_id=' + mag.storeid + '&key=ShowPrd:',
		//cartNumUrl = mag.YWKHOST + '/index.php/storeweixin/shop/show?key=shopCartCount&sid=' + mag.sid,
		$prdList = $('.prd_items'),
		$cartNum = mag.ismenu ? $(".menu_cartnum") : $('.cnum'),
		prdLoadData = {
			page: 1, cats_id: '', sid: mag.sid, store_id: mag.storeid,
		},
		listInited = false;
	
    function getListDom(data) {
        return data.map(function(e) {
			return ('<li replaceid="' + e.prd_id + '"' + (e.prd_info.approve_status == 'unsale' ? ' class="prd_unsale" is_unsale="unsale"' : '') + '>' +
				'<a href="' + prdurl + e.prd_id + '">' + 
					'<div class="pic">' +
						'<img src="' + e.prd_info.pic_url + '_400x400.jpg">' +
					'</div>' +
					'<div class="prdinfo">' +
						'<div class="title">' + e.prd_info.title + '</div>' +
						'<div class="price">' +
							'<span class="fl nowprice">￥' + e.prd_info.price + '</span>' +
							'<div class="morearea '+ (mag.store_state == 0 || mag.store_state == 2 ? 'diybuy' : 'notdiybuy')+'" prdid="' + e.prd_id + '"><span class="havecart cartfont"><i class="icon_addcart"></i></span></div>' +
							'<div style="clear:both"></div>' +
						'</div>' +
					'</div>' +
				'</a>' +
			'</li>');
        }).join('');
    }
	//滚动加载
    function loadPrdList(id) {
        prdLoadData.cats_id = id;
        if(!listInited) $prdList.scrollLoad({
            inData: prdLoadData,
            dataUrl: prdListUrl,
			loadnone : $('.list-none'),
            renderData: function(data) {
                data = data.data;
                if(data && !!data.count && data.count > 0) {
                    $prdList.append(getListDom(data.list));
                    if(data.page >= data.page_count) $prdList.scrollLoad('loadEnd');
                }
                else return false;
            }
        }), listInited = true;
        else $prdList.scrollLoad('loadList', prdLoadData);
    }
	loadPrdList();
	
	//menu 分类加载
	var $menu = $('#menu_bottom');	
    $(document).on('click', '.j_menu_open', function() {
        $(this).menu({
            menuUrl: menuUrl,
            dom: $('.menu-cont'), 
			onSelect : function (data) { loadPrdList(data.cid) },
            onOpen: function(dom) { $menu.openTools(); },
            onClose: function(dom) { $menu.closeTools(); },
        }).menu('open');
    }).on('click', '.close-menu', $menu.closeTools.bind($menu));
	
	//购买
    function addCart(info) {
        $.ajax({
            type: "POST",
            url: cartUrl,
            data: {
                prd_id: info.prdid, sku_id: info.skuid,
                num_value: info.buynum == 0 ? 1 : info.buynum,
            },
            success: function(msg) {
                $.loadEnd();
                var data = JSON.parse(msg);
                if(data.errcode) showTips(data.errmsg);
                else {
                    data = data.data;
                    showTips("已加入购物车");
					!mag.ismenu && $(".cart_nav").show();
                    $cartNum.show().text(data.seller).animate("add");
                }
            },
        });
    }
	$(document).on('click', '.diybuy', function(e) {
        $.stopEvent(e);
        $(this).selectSku({
			needOpen: true,
            btns: {type: "diy", onClick: function(data) { addCart(data);},},
        });
    }).on('click', '.notdiybuy', function(e) {
        $.stopEvent(e);
        if(mag.store_state == 1){
         showTips("暂停接单，请稍后再来");
        }else if(mag.store_state == 3){
         showTips("商家休息，已停止接单");
        }
    });
	wx.ready(function() {
        $(".gotostore").on('click',function(e){
        	 var shopName = $(this).attr("data-shopname"),
	             adrInfo = $(this).attr("data-adrinfo"),
	             lat = $(this).attr("data-lat"),
	             lng = $(this).attr("data-lng");
            e.preventDefault();
            // if(!$.device.wx) return alert("请在微信端打开");
            // 获取店铺地理位置
            wx.getLocation({
              type:'gcj02', //火星坐标
              success:function(res){
                wx.openLocation({
                    latitude: parseFloat(lat),// 纬度，浮点数，范围为90 ~ -90
                    longitude: parseFloat(lng),// 经度，浮点数，范围为180 ~ -180。
                    name : shopName,// 位置名
                    address : adrInfo,// 地址详情说明
                    scale : 14      // 地图缩放级别,整形值,范围从1~28。
                });
              },
              cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
              }
            })
        });
	});
};
