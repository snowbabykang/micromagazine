/*弹层*/
var $alert_tips=$('.alert_tips');
function showTips(a){
	$alert_tips.html(a).animate({opacity:'1',"display":"block"},800,"ease-out",	function(){ 
		$alert_tips.fadeOut("slow");
	})
}
/*展开关闭底部导航*/
(function($) {
	$.fn.openTools = function(){
		this.removeClass("out").addClass("show");
		$("body").addClass("forbidscroll");
		return false;
	}
	$.fn.closeTools = function(){
		this.removeClass("show").addClass("out");
		$("body").removeClass("forbidscroll");
		return false;
	}
})(Zepto);
var $imgurl = $("#prd_bottom").find('.imagebox img'),
	$oldprice = $("#prd_bottom").find('.pastprice'),
	$nowprice = $("#prd_bottom").find('.nowprice'),
	$prdname = $("#prd_bottom").find('.prd_title_line'),
	$discount = $("#prd_bottom").find('.discountmark'),
	$quantity = $("#prd_bottom").find('.quantity_num'),
	$img = $("#prd_bottom").find('.imagebox').find('img'),
	$sku = $("#prd_bottom").find('.prd_sku');
var skufunc = {
	dis_type : "", 
	dis_val : 0,
	sku : '',
	num_iid : '',
	wbulk : '',
	OauthUrl : '',
	property_alias : [],    //sku信息数组
	propertie1 : '', //类似于颜色
	propertie2 : '', //类似于尺码
	propertie3 : '', //备注
	defaultimg : '',
	quantity : -1,
	buynum : 1,
	WeixinUrl : mag.HOST+"/index.php/weixin/shop/show",
	addSku_url : mag.HOST+"/index.php/weixin/shop/getprdsku",
	addCart_url : mag.HOST+"/index.php/weixin/order/shoppingcart",
	cartNum_url : mag.HOST+"/index.php/weixin/order/shoppingprdnum",
	crowdfunding_url : mag.HOST+"/index.php/weixin/order/order",
	addSku: function(prdid,buytype){
		$("#prd_bottom").find(".prd_num").attr("value",1);
		$.ajax({
			type:"post",
			data:{"prdid":prdid,"sid":mag.sid,'buytype':buytype},
			url:skufunc.addSku_url,
			success:function(msg){
				var data=eval('('+msg+')');
				if(data.acttype === 2){ //粉丝特价
					if(data.disval.level.ActType === 'money'){
						$discount.show().html('立减' + data.disval.level.DisMoney + '元');
						skufunc.dis_type = 'money';
						skufunc.dis_val = parseFloat(data.disval.level.DisMoney);
					}
					if(data.disval.level.ActType === 'discount'){
						$discount.show().html(data.disval.level.Discount * 10 + '折');
						skufunc.dis_type = 'discount';
						skufunc.dis_val = parseFloat(data.disval.level.Discount);
					}
					$nowprice.text("￥" + parseFloat(data.now_price).toFixed(2));
					$oldprice.text("￥" + parseFloat(data.price).toFixed(2));
				}else{
					$discount.hide();
					skufunc.dis_type = '';
					skufunc.dis_val = 0;
					$nowprice.text("￥" + parseFloat(data.price).toFixed(2));
					$oldprice.text("");
				};
				if(isNaN(data.price)){
					$nowprice.text("data.price");
					$oldprice.text("");
				};
				$prdname.text(data.title);
				skufunc.defaultimg = data.pic_url+"_180x180.jpg";
				$imgurl.attr({"src":data.pic_url+"_180x180.jpg","data-original":data.pic_url});
				$quantity.text(data.prd_num);
				
				skufunc.sku = data.is_sku ;
				skufunc.num_iid = data.num_iid;
				skufunc.wbulk = data.wbulk;
				skufunc.OauthUrl = data.OauthUrl;
				skufunc.propertie1 = data.propertie1;
				skufunc.propertie2 = data.propertie2;
				skufunc.propertie3 = data.propertie3;
				skufunc.property_alias = data.property_alias;
				if(data.is_sku !== "null"){
					$sku.show().html(data.prdsku.sku);
					$(".more-sku-ui-sku-prop").each(function(){
						$(this).find(".j_sku").each(function(){
							if(!$(this).hasClass("dis")){
								$(this).prev("input[type='radio']").attr("checked","checked");
								$(this).addClass("check");
								return false;
							}
						});
					});
					skufunc.isSku();
				}else{
					skufunc.quantity = data.prd_num;
					$sku.hide();
				};
				if(skufunc.property_alias) {
					for (var i = 0; i < skufunc.property_alias.length; i++) {
						$('input[data_val="' + skufunc.property_alias[i].property + '"]').html(skufunc.property_alias[i].val);
						if(document.getElementById("s_" + skufunc.property_alias[i].property)!=undefined){
							document.getElementById("s_" + skufunc.property_alias[i].property).innerText = skufunc.property_alias[i].val;
						}
					}
				};
				if(buytype == 1 && data.crowd_status==1){ //众筹
					$(".tools_wrap").find(".wx_btn").hide();
					$(".zc_btn").css("display","block");	
				}else{
					if(data.unsale == "unsale"){
						$(".tools_wrap").find(".wx_btn").hide();
						$(".unsale_btn").css("display","block");	
					}else{
						$(".tools_wrap").find(".wx_btn").css("display","block");
						$(".unsale_btn").hide();
					};
					$(".zc_btn").hide();	
				};
				$("#prd_bottom").openTools();
			},
			error:function(){
				alert("数据加载错误");
				return false;
			}
		});
	},
	///判断是否选中sku 
	isSku : function(){
		if(!( (skufunc.propertie1 && !$('input[type="radio"][name="color"]:checked').val() ) || (skufunc.propertie2 && !$('input[type="radio"][name="size"]:checked').val()) || (skufunc.propertie3 && !$('input[type="radio"][name="content"]:checked').val() )  ) ){
			color = $('input[type="radio"][name="color"]:checked').val() ;
			cnum = $('input[type="radio"][name="size"]:checked').val() ;
			content_1 = skufunc.propertie3?$('input[type="radio"][name="content"]:checked').val():"" ;
			cnum = cnum>""?cnum:color ;color = color>""?color:cnum ;
			var reData = skufunc.getSkuIdAndNum(skufunc.sku, color, cnum,content_1) ;
			var skuid = reData['sku_id'] ;
			skufunc.quantity = reData['quantity'] ;
			var skuprice = isNaN(reData["price"]) ? reData["price"] : parseFloat(reData["price"]);
			var skuimg = reData['sku_img'] ;
			//生成页面内容
			$quantity.html(skufunc.quantity);
			var bigskuimg = skuimg.replace(/_180x180.jpg/g,'');
			$img.attr({"src":skuimg,"data-original":bigskuimg});
			if(isNaN(skuprice)){
				$oldprice.text("");
				$nowprice.html(skuprice);
			}else{   
				if(skufunc.dis_type === "money"){
					$oldprice.text("￥" + skuprice.toFixed(2));
					var temp = parseFloat(skuprice - skufunc.dis_val);
					temp = temp < 0 ? 0 : temp;
					$nowprice.html("￥" + temp.toFixed(2));
				}else if(skufunc.dis_type === "discount"){
					$oldprice.text("￥" + skuprice.toFixed(2));
					$nowprice.html("￥" + parseFloat(skuprice * skufunc.dis_val).toFixed(2));
				}else{
					$oldprice.text("");
					$nowprice.html("￥" + skuprice.toFixed(2));
				};
			};
		};
	},
	getSkuIdAndNum : function(sku, color, cnum, content_1) {
		var sku = eval('('+sku+')'),
		scolor = "",
		properties_name = '',
		scnum = 0,
		reData = new Array(),
		properties_color = new Array(),
		properties_cnum = new Array();
		if (!sku.properties_name) {
			for (var i = 0; i < sku.length; i++) {
				properties_name = sku[i].properties_name;
				properties_color = properties_name.split(":");
				if (content_1) {
					properties_scnum = properties_color[properties_color.length - 4].split(";");
					scnum = properties_scnum[0];
					scontent_1 = properties_color[properties_color.length - 1];
				} else {
					scnum = properties_color[properties_color.length - 1];
					scontent_1 = "";
				}
				properties_cnum = properties_color[3].split(";");
				scolor = properties_cnum[0];
				if (color == scolor && scnum == cnum && scontent_1 == content_1) {
					reData['sku_id'] = sku[i].sku_id;
					reData['price'] = sku[i].price;
					reData['quantity'] = sku[i].quantity;
					reData['sku_img'] = sku[i].props_img ? sku[i].props_img+"_180x180.jpg" : skufunc.defaultimg;
					return reData;
				}
			} 
			if (i == sku.length) { //没有找到
				reData['sku_id'] = 0;
				reData['price'] = "暂无产品报价";
				reData['quantity'] = 0;
				reData['sku_img'] = skufunc.defaultimg;
				return reData;
			}
		} else { //单sku
			reData['sku_id'] = sku.sku_id;
			reData['price'] = sku.price;
			reData['quantity'] = sku.quantity;
			reData['sku_img'] = skufunc.defaultimg;
			return reData;
		}
		reData['sku_id'] = 0;
		reData['price'] = "暂无产品报价";
		reData['quantity'] = 0;
		reData['sku_img'] = skufunc.defaultimg;
		return reData;
	},	
	btnBuy : function(sth){  
		if (skufunc.sku != "null" && skufunc.sku) {
			if(skufunc.wbulk == 1){
				setTimeout(function(){window.top.location.href = skufunc.WeixinUrl + "?key=ShowPrd:" + skufunc.num_iid + "&sid=" + mag.sid;},100);
			}else{
				var color = $('input[type="radio"][name="color"]:checked').val(),
				cnum = $('input[type="radio"][name="size"]:checked').val(),
				content_1 = $('input[type="radio"][name="content"]:checked').val() ? $('input[type="radio"][name="content"]:checked').val() : "", //sku备注1
				cnum = cnum > "" ? cnum: color;
				color = color > "" ? color: cnum;
				var reData = skufunc.getSkuIdAndNum(skufunc.sku, color, cnum,content_1);
				var skuid = reData['sku_id'];
				var quantity = reData['quantity']; 
				if(!( (skufunc.propertie1 && !$('input[type="radio"][name="color"]:checked').val() ) || (skufunc.propertie2 && !$('input[type="radio"][name="size"]:checked').val() )  ||  (skufunc.propertie3 && !$('input[type="radio"][name="content"]:checked').val() ) ) ){
					//选择正常
					if (quantity == 0) {
						showTips("库存不足哦,请选择其他规格~");
						return false;
					}
				}
				else if (skufunc.propertie1 && !$('input[type="radio"][name="color"]:checked').val()) {
					showTips("请选择" + skufunc.propertie1 + "!");
					return false;
				} else if (skufunc.propertie2 && !$('input[type="radio"][name="size"]:checked').val()) {
					showTips("请选择" + skufunc.propertie2 + "!");
					return false;
				} else if (skufunc.propertie3 && !$('input[type="radio"][name="content"]:checked').val()) {
					showTips("请选择" + skufunc.propertie3 + "!");
					return false;
				}
				if(sth==1){//众筹
					setTimeout(function(){window.top.location.href =skufunc.crowdfunding_url+"?num="+skufunc.buynum+"&sku_id="+skuid+"&num_iid="+skufunc.num_iid+"&is_donation=0"+"&paid_type=2"+"&helpbuy=2"+"&sid="+mag.sid;},100);
				}else{
					setTimeout(function(){window.top.location.href = skufunc.WeixinUrl + "?key=OrderConfirm:" + skuid + ":" + skufunc.buynum + ":" + skufunc.num_iid + ":1:" + "&viewer=&sid=" + mag.sid;},100);
				}
			};
		} else {
			var prdNum = $quantity.text();
			if(parseInt(prdNum)<1 || prdNum == ''){
				showTips("商品库存不足!");
				return false;
			}; 
			if(sth==1){//众筹
				setTimeout(function(){window.top.location.href = skufunc.crowdfunding_url+"?num="+skufunc.buynum+"&num_iid="+skufunc.num_iid+"&is_donation=0"+"&paid_type=2"+"&helpbuy=2"+"&sid="+mag.sid;},100);
			}else{
				setTimeout(function(){window.top.location.href = skufunc.WeixinUrl+"?key=OrderConfirm:0:"+skufunc.buynum+":"+skufunc.num_iid+":0:"+"&viewer=";},1000);
			}
		};
	},
	//加入购物车
	btnCart : function() {
		if (mag.sina_uid == 0 || !mag.sina_uid) {
			window.top.location.href = skufunc.oauthUrl;
		} else {
			var skuid = 0;
			if (skufunc.sku != "null" && skufunc.sku) {
				var color = $('input[type="radio"][name="color"]:checked').val(),
				cnum = $('input[type="radio"][name="size"]:checked').val(),
				content_1 = $('input[type="radio"][name="content"]:checked').val() ? $('input[type="radio"][name="content"]:checked').val() : ""; //sku备注1
				cnum = cnum > "" ? cnum: color;
				color = color > "" ? color: cnum;
				var reData = skufunc.getSkuIdAndNum(skufunc.sku, color, cnum,content_1);
				skuid = reData['sku_id'];
				var quantity = reData['quantity'];
				if(!( (skufunc.propertie1 && !$('input[type="radio"][name="color"]:checked').val() ) || (skufunc.propertie2 && !$('input[type="radio"][name="size"]:checked').val() )  ||  (skufunc.propertie3 && !$('input[type="radio"][name="content"]:checked').val() ) ) ){
					//选择正常
					if (quantity == 0) {
						showTips("库存不足哦,请选择其他规格~");
						return false;
					}
				}
				else if (skufunc.propertie1 && !$('input[type="radio"][name="color"]:checked').val()) {
					showTips("请选择" + skufunc.propertie1 + "!");
					return false;
				} else if (skufunc.propertie2 && !$('input[type="radio"][name="size"]:checked').val()) {
					showTips("请选择" + skufunc.propertie2 + "!");
					return false;
				} else if (skufunc.propertie3 && !$('input[type="radio"][name="content"]:checked').val()) {
					showTips("请选择" + skufunc.propertie3 + "!");
					return false;
				}
			} else {
				//获取当前商品的库存
				var prdNum = $quantity.text();
				if(parseInt(prdNum)<1 || prdNum == ''){
					showTips("商品库存不足!");
					return false;
				}
				skuid = 0;
			};
			$.ajax({
				type: "POST",
				url: skufunc.addCart_url,
				//向指定页面发送数据
				data: "prd_id=" + skufunc.num_iid + "&sku_id=" + skuid + "&buy_num=" + skufunc.buynum + "&sid=" + mag.sid + "&cid=" + mag.cid,
				success: function(msg) {
					var re = eval('(' + msg + ')');
					if (parseInt(re.seller) > 0) {
						showTips("商品已成功加入购物车");
						setTimeout(function(){
							$("#prd_bottom").closeTools();
							if(!mag.ismenu){$(".cart_nav").show();}
						},100);
						setTimeout(function(){
							$(".cnum").addClass("add");
							$('.cnum').html(parseInt(re.seller));
							if(mag.ismenu){
								$(".menu_cartnum").show().html(parseInt(re.seller));
							};
						},500);
						setTimeout(function(){$(".cnum").removeClass("add");},1000);
					};
				}
			});
		};
	},
};
$(document).ready(function(){
	/*底部购物信息滑出*/
	$("#prd_bottom .bg,#prd_bottom .icon_close").click(function(){ 
		$("#prd_bottom").closeTools();
	});
	$(".prd_items").delegate(".nowBuy","click",function(e){
		e.preventDefault();
		var is_act = $(this).parents("li").attr("is_act"),
		is_unsale = $(this).parents("li").attr("is_unsale"),
		prdid = $(this).parents("li").attr("replaceid");
		if(!is_act && !is_unsale){
			if($(this).attr("is_zc")){
				if(mag.subscribe == 0 && $(this).attr("is_focus")==0){
					showFollowTip();
					return false;
				}else{
					skufunc.addSku(prdid,1);
				}
			}else{
				skufunc.addSku(prdid,0);
			};
		}else{
			var link = $(this).parents("a").attr("href");
			window.location.href = link;
		}
	});
	/*选择sku*/
	$(".j_sku").live("click", function(){
		var self=$(this),
			iid=self.prev("input"),
			father=self.attr("father");
		if(!self.hasClass("check")){
			$("#"+father+" .j_sku.check").removeClass("check");
			self.addClass("check");
			$("#"+father+" input:checked").removeAttr("checked");
			iid.attr("checked","checked").change();
			if(skufunc.quantity!=-1){
				var skuNum = skufunc.quantity;
				if(skuNum > 0 && skuNum < skufunc.buynum){
					$(".prd_num").attr("value",skuNum);
					skufunc.buynum = skuNum;
				}
			}
		};
	});
	$('input[name="size"]').live("change",function() { 
		skufunc.isSku();
	});
	$('input[name="color"]').live("change",function() {
		skufunc.isSku();
	});
	$('input[name="content"]').live("change",function() {
		skufunc.isSku();
	});
	//改变数量 -
	$(".btn_minus").bind("click",function(){
		var num=$(".prd_num").attr("value");
		num=parseFloat(num);
		if(num == 2){
			$(".btn_minus").addClass("disabled");
		}
		if(num==1){
			showTips('商品数量不能小于1') ;
			return false;
		}else{
			var new_num=num-1;
			$(".prd_num").attr("value",new_num);
			$(".btn_add").removeClass("disabled");
			skufunc.buynum=new_num;
		}
    });
	//改变数量 +
	$(".btn_add").bind("click",function(){
		var num=$(".prd_num").attr("value");
		num=parseFloat(num);
		var new_num=num+1;
		if(skufunc.quantity == -1){
			showTips("请选择分类");
			return false;
		}else if(parseFloat(skufunc.quantity)<new_num){
			showTips("您购买的数量已超过库存");
			return false;
		}
		if(parseFloat(skufunc.quantity)-1 <new_num){$(".btn_add").addClass("disabled");}
		$(".prd_num").attr("value",new_num);
		$(".btn_minus").removeClass("disabled");
		skufunc.buynum=new_num;
	});
	//立即购买
	$(".btnbuy").live("click",function(){
		skufunc.btnBuy(0);
	});
	//加入购物车
	$(".btncart").live("click",function(){
		skufunc.btnCart();
	});
	//参与众筹
	$(".zc_btn").live("click",function(){
		skufunc.btnBuy(1);
	});
});
/*微信图片预览   分组预览*/
function wxpreviewimg(img,_t){
	var imgArray = [];
	var curImageSrc = _t.attr('src');
	var oParent = _t.parent();
	if (curImageSrc && !oParent.attr('href')) {
		img.each(function(index, el) {
			var itemSrc = $(this).attr('data-original');
			if(itemSrc){
				imgArray.push(itemSrc);
			};
		});
		wx.previewImage({
			current: curImageSrc,
			urls: imgArray
		});
	}
};
(function(){
	$(".imagebox img").live("click", function(event) {
		wxpreviewimg($(".imagebox img"),$(this));
	})
})();
