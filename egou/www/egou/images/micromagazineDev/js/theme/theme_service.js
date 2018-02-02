;'use strict';
/*
 * angular服务
 * 1、默认普通模块的颜色数组，以后换主题可以直接改数组
 * 2、普通模块的一些方法
*/
myApp.service('ThemeService',['ColorService','$http',function ThemeService(ColorService,$http) {
	
	//系统图标数组
	var systemicons = ["cart.svg","classifiy.svg","discount.svg","gift.svg","home.svg","order.svg","prize.svg","sign.svg",
	                   "user.svg","vip.svg","wallet.svg","wsq.svg"];
	//正副标题系统背景图
	var titlebgimgs = ["title-bgpic1.png","title-bgpic9.png","title-bgpic10.png","title-bgpic2.png","title-bgpic3.png","title-bgpic4.png","title-bgpic5.png","title-bgpic6.png",
	                   "title-bgpic11.png","title-bgpic7.png","title-bgpic8.png","title-bgpic12.png","title-bgpic13.png"];
	
	var sampleprdimgs = ["product-1.jpg","product-3.jpg","product-4.jpg","product-5.jpg"];
	
	/*根据主题获取这个主题包括的模块和每个模块的名字，图片*/
	var getmodal = {
		"theme1" : ["shopping_contact","icons_menu","h_1_product","s_1_product","title_sub","txt_2_img"],
		"theme2" : ["shopping_contact","icons_menu","h_1_product","s_1_product","title_sub","pic_sticker","txt_1_img"],
		"theme3" : ["shopping_contact","icons_menu","s_1_product","title_sub","pic_sticker","txt_2_img"],
		"theme4" : ["shopping_contact","icons_menu","s_1_product","title_sub"],
		"theme5" : ["shopping_contact","icons_menu","h_1_product","title_sub","pic_sticker"],
		"theme999" : ["shopping_contact","icons_menu","h_1_product","s_1_product","title_sub","pic_sticker","txt_1_img","txt_bgimg","txt_2_img"],   //单独新模块
	};
	var modalinfo = function(type,id,themeattr){
		var arr = {
			"shopping_contact" :{
				"title" : "店铺联系方式",
				"img" : "icon_contact",
				"arr" : !themeattr || !themeattr.shopping_contact ? "" :{
					"field_id" : id,
					"field_type" : 'shopping_contact',
					"is_thememodal" : "1", 
					"field_bgcolor": themeattr.shopping_contact.field_bgcolor.value || '',  
					"phone_color": themeattr.shopping_contact.phone_color.value || '',  
					"fz_color": themeattr.shopping_contact.fz_color.value || '',  
					"contact_info": themeattr.shopping_contact.contact_info.value || '',  
					"contact_phone": themeattr.shopping_contact.contact_phone.value || '',  
				},
			},
			"icons_menu" :{
				"title" : "图标菜单",
				"img" : "icon_menu",
				"arr" : !themeattr || !themeattr.icons_menu ? "" :{
					"field_id" : id,
					"field_type" : 'icons_menu',
					"is_thememodal" : "1",
					"field_bgcolor": themeattr.icons_menu.field_bgcolor.value || '',  
					"field_num" : themeattr.icons_menu.field_num.value || '', 
					"field_items": themeattr.icons_menu.field_items.value || '',  
				},
			},
			"title_sub" :{
				"title" : "正副标题", 
				"img" : "icon_title",
				"arr" : !themeattr || !themeattr.title_sub ? "" :{
					"field_id" : id,
					"field_type" : 'title_sub',
					"is_thememodal" : "1",
					"field_bgcolor": themeattr.title_sub.field_bgcolor.value || '', 
					"img_bgcolor": themeattr.title_sub.img_bgcolor.value || '', 
					"field_bgimg": themeattr.title_sub.field_bgimg.value || '', 
					"is_localimg": themeattr.title_sub.is_localimg.value || '', 
					"title_align": themeattr.title_sub.title_align.value || '', 
					"subtitle_float": themeattr.title_sub.subtitle_float.value || '',   //子标题和标题在一行
					"title_info": themeattr.title_sub.title_info.value || '', 
					"subtitle_info": themeattr.title_sub.subtitle_info.value || '', 
					"title_fz": themeattr.title_sub.title_fz.value || '', 
					"subtitle_fz": themeattr.title_sub.subtitle_fz.value || '', 
					"title_color": themeattr.title_sub.title_color.value || '', 
					"subtitle_color": themeattr.title_sub.subtitle_color.value || '', 
					"title_sub_pd": themeattr.title_sub.title_sub_pd.value || '',  //标题间距
					"is_subtitle": themeattr.title_sub.is_subtitle.value || '',  //标题间距
					"linkurl": themeattr.title_sub.linkurl.value || '', 
					"linkname": themeattr.title_sub.linkname.value || '', 
					"field_pd": themeattr.title_sub.field_pd.value || '',
					"titleinfo_pt": themeattr.title_sub.titleinfo_pt.value || '', 
					"titleinfo_pb": themeattr.title_sub.titleinfo_pb.value || '', 
					"is_btn": themeattr.title_sub.is_btn.value || '', 
					"btn_info": themeattr.title_sub.btn_info.value || '', 
					"btn_color": themeattr.title_sub.btn_color.value || '', 
					"btn_fz": themeattr.title_sub.btn_fz.value || '', 
					"is_borderb": themeattr.title_sub.is_borderb.value || '', 
					
				},
			},
			"h_1_product" :{
				"title" : "排列商品",
				"img" : "icon_product",
				"arr" : !themeattr || !themeattr.h_1_product ? "" :{
					"field_id" : id,
					"field_type" : 'h_1_product',
					"is_thememodal" : "1",
					"is_prd" : "1",  //是商品模块，后期c端获取商品最新信息时使用，统一进行更新
					"field_bgcolor": themeattr.h_1_product.field_bgcolor.value || '',  
					"tag_bgcolor": themeattr.h_1_product.tag_bgcolor.value || '',
					"tag_color": themeattr.h_1_product.tag_color.value || '',
					"tag_type": themeattr.h_1_product.tag_type.value || '',     //标签样式，1是条形，2是半弧形，3是斜三角
					"tag_position": themeattr.h_1_product.tag_position.value || '',  //标签位置，居左还是居右
					"prd_bgcolor": themeattr.h_1_product.prd_bgcolor.value || '',
					"prdtitle_color": themeattr.h_1_product.prdtitle_color.value || '',
					"btn_bgcolor": themeattr.h_1_product.btn_bgcolor.value || '',
					"btn_color": themeattr.h_1_product.btn_color.value || '',
					"btn_info": themeattr.h_1_product.btn_info.value || '',
					"btn_width": themeattr.h_1_product.btn_width.value || '',
					"btn_height": themeattr.h_1_product.btn_height.value || '',
					"btn_float": themeattr.h_1_product.btn_float.value || '',
					"btn_radius": themeattr.h_1_product.btn_radius.value || '',
					"main_pt": themeattr.h_1_product.main_pt.value || '',
					"main_pb": themeattr.h_1_product.main_pb.value || '',
					"li_pt": themeattr.h_1_product.li_pt.value || '',
					"li_pb": themeattr.h_1_product.li_pb.value || '',
					"li_pl": themeattr.h_1_product.li_pl.value || '',
					"li_pr": themeattr.h_1_product.li_pr.value || '',
					"li_borderb_width": themeattr.h_1_product.li_borderb_width.value || '',
					"li_borderb_color": themeattr.h_1_product.li_borderb_color.value || '',
					"img_pd": themeattr.h_1_product.img_pd.value || '',
					"prdinfo_align": themeattr.h_1_product.prdinfo_align.value || '',
					"prdinfo_pl": themeattr.h_1_product.prdinfo_pl.value || '',
					"prdinfo_pr": themeattr.h_1_product.prdinfo_pr.value || '',
					"price_color": themeattr.h_1_product.price_color.value || '',
					"field_items" : [
		                 {
		                     "item_prdid": 1,
		                     "item_pic": mag.themeimgurl+themeattr.h_1_product.prd_img.value || '',
		                     "item_title": "这里是示例商品标题展示",
		                     "item_price": "99.00"
		                 },
		                 {
		                	 "item_prdid": 2,
		                	 "item_pic": mag.themeimgurl+themeattr.h_1_product.prd_img.value || '',
		                	 "item_title": "这里是示例商品标题展示",
		                	 "item_price": "99.00"
		                 },
		                 {
		                	 "item_prdid": 3,
		                	 "item_pic": mag.themeimgurl+themeattr.h_1_product.prd_img.value || '',
		                	 "item_title": "这里是示例商品标题展示",
		                	 "item_price": "99.00"
		                 },
		                 {
		                	 "item_prdid": 4,
		                	 "item_pic": mag.themeimgurl+themeattr.h_1_product.prd_img.value || '',
		                	 "item_title": "这里是示例商品标题展示",
		                	 "item_price": "99.00"
		                 }
		             ],
				},
			},
			"s_1_product" :{
				"title" : "双列商品",
				"img" : "icon_product",
				"arr" : !themeattr || !themeattr.s_1_product ? "" :{
					"field_id" : id,
					"field_type" : 's_1_product',
					"is_thememodal" : "1",
					"is_prd" : "1",
					"field_bgcolor": themeattr.s_1_product.field_bgcolor.value || '',  
					"tag_bgcolor": themeattr.s_1_product.tag_bgcolor.value || '',
					"tag_color": themeattr.s_1_product.tag_color.value || '',
					"tag_type": themeattr.s_1_product.tag_type.value || '',
					"tag_position": themeattr.s_1_product.tag_position.value || '',
					"prd_bgcolor": themeattr.s_1_product.prd_bgcolor.value || '',
					"prdtitle_color": themeattr.s_1_product.prdtitle_color.value || '',
					"is_btn": themeattr.s_1_product.is_btn.value || '',
					"btn_bgcolor": themeattr.s_1_product.btn_bgcolor.value || '',
					"btn_color": themeattr.s_1_product.btn_color.value || '',
					"btn_info": themeattr.s_1_product.btn_info.value || '',
					"btn_width": themeattr.s_1_product.btn_width.value || '',
					"btn_height": themeattr.s_1_product.btn_height.value || '',
					"btn_radius": themeattr.s_1_product.btn_radius.value || '',
					"main_pt": themeattr.s_1_product.main_pt.value || '',
					"main_pb": themeattr.s_1_product.main_pb.value || '',
					"img_pd": themeattr.s_1_product.img_pd.value || '',
					"prdinfo_align": themeattr.s_1_product.prdinfo_align.value || '',
					"prdinfo_pl": themeattr.s_1_product.prdinfo_pl.value || '',
					"prdinfo_pr": themeattr.s_1_product.prdinfo_pr.value || '',
					"price_color": themeattr.s_1_product.price_color.value || '',
					"field_items" : [
		                 {
		                     "item_prdid": 1,
		                     "item_pic": mag.themeimgurl+themeattr.s_1_product.prd_img.value || '',
		                     "item_title": "这里是示例商品标题展示",
		                     "item_price": "99.00"
		                 },
		                 {
		                	 "item_prdid": 2,
		                	 "item_pic": mag.themeimgurl+themeattr.s_1_product.prd_img.value || '',
		                	 "item_title": "这里是示例商品标题展示",
		                	 "item_price": "99.00"
		                 },
		                 {
		                	 "item_prdid": 3,
		                	 "item_pic": mag.themeimgurl+themeattr.s_1_product.prd_img.value || '',
		                	 "item_title": "这里是示例商品标题展示",
		                	 "item_price": "99.00"
		                 },
		                 {
		                	 "item_prdid": 4,
		                	 "item_pic": mag.themeimgurl+themeattr.s_1_product.prd_img.value || '',
		                	 "item_title": "这里是示例商品标题展示",
		                	 "item_price": "99.00"
		                 }
		             ],
				},
			},
			"pic_sticker" :{
				"title" : "图片贴纸", 
				"img" : "icon_img",
				"arr" : !themeattr || !themeattr.pic_sticker ? "" :{
					"field_id" : id,
					"field_type" : 'pic_sticker',
					"is_thememodal" : "1",
					"field_bgcolor": themeattr.pic_sticker.field_bgcolor.value || '', 
					"field_pd": themeattr.pic_sticker.field_pd.value || '', 
					"field_bgimg": themeattr.pic_sticker.field_bgimg.value || '', 
					"is_localimg": themeattr.pic_sticker.is_localimg.value || '', 
					"con_bgcolor": themeattr.pic_sticker.con_bgcolor.value || '', 
					"con_bordercolor": themeattr.pic_sticker.con_bordercolor.value || '', 
					"title_info": themeattr.pic_sticker.title_info.value || '', 
					"subtitle_info": themeattr.pic_sticker.subtitle_info.value || '', 
					"title_fz": themeattr.pic_sticker.title_fz.value || '', 
					"subtitle_fz": themeattr.pic_sticker.subtitle_fz.value || '', 
					"title_color": themeattr.pic_sticker.title_color.value || '', 
					"subtitle_color": themeattr.pic_sticker.subtitle_color.value || '', 
					"is_subtitle": themeattr.pic_sticker.is_subtitle.value || '',  //标题间距
					"linkurl": themeattr.pic_sticker.linkurl.value || '', 
					"linkname": themeattr.pic_sticker.linkname.value || '', 
					"is_btn": themeattr.pic_sticker.is_btn.value || '', 
					"btn_info": themeattr.pic_sticker.btn_info.value || '', 
					"btn_bgcolor": themeattr.pic_sticker.btn_bgcolor.value || '', 
					"btn_color": themeattr.pic_sticker.btn_color.value || '', 
					"btn_fz": themeattr.pic_sticker.btn_fz.value || '', 
				},
			},
			"txt_1_img" : {     //图文：左图右文，左文右图，上图下文，上文下图，正副标题+按钮
				"title" : "图文列表",
				"img" : "icon_text",
				"arr" :!themeattr || !themeattr.txt_1_img ? "" :{
					"field_id" : id,
					"field_type" : 'txt_1_img',
					"is_thememodal" : "1",
					"field_bgcolor": themeattr.txt_1_img.field_bgcolor.value || '',
					"img_position" : themeattr.txt_1_img.img_position.value || '',   //图文：左图右文，左文右图，上图下文，上文下图
					"title_align" : themeattr.txt_1_img.title_align.value || '',
					"title_pt" : themeattr.txt_1_img.title_pt.value || '', 
					"title_pb" : themeattr.txt_1_img.title_pb.value || '',
					"titleimg_pd" : themeattr.txt_1_img.titleimg_pd.value || '',
					"title_fz" : themeattr.txt_1_img.title_fz.value || '',
					"is_descibe" :themeattr.txt_1_img.is_descibe.value || '',
					"descibe_fz" : themeattr.txt_1_img.descibe_fz.value || '',
					"is_btn" : themeattr.txt_1_img.is_btn.value || '',  
					"btn_fz" : themeattr.txt_1_img.btn_fz.value || '',
					"btn_radius" : themeattr.txt_1_img.btn_radius.value || '',
					"item_pd": themeattr.txt_1_img.item_pd.value || '',             //每个item的内边距
					"item_margin": themeattr.txt_1_img.item_margin.value || '',   //每个item的外边距
					"item_radius": themeattr.txt_1_img.item_radius.value || '',   //每个item的弧度
					"is_item_border": themeattr.txt_1_img.is_item_border.value || '',   //item是否有边线
					"item_bordercolor": themeattr.txt_1_img.item_bordercolor.value || '',   //item边线颜色
					"field_pd": themeattr.txt_1_img.field_pd.value || '',        //整体模块的内边距
					"line_num": themeattr.txt_1_img.line_num.value || '',     //一行几个  1——4
					"field_items" : [
		                 {
		                     "id": 1,
		                     "field_img": themeattr.txt_1_img.field_img.value || '',
		 					 "is_localimg": themeattr.txt_1_img.is_localimg.value || '',
		 					 "bgcolor": themeattr.txt_1_img.item_bgcolor.value || '',
		                     "linkurl": themeattr.txt_1_img.linkurl.value || '',
		                     "title_info" : themeattr.txt_1_img.title_info.value || '',
		                     "title_color" : themeattr.txt_1_img.title_color.value || '',
		                     "descibe_info" : themeattr.txt_1_img.descibe_info.value || '',
		                     "descibe_color" : themeattr.txt_1_img.descibe_color.value || '',
		                     "btn_info" : themeattr.txt_1_img.btn_info.value || '',
		                     "btn_color" : themeattr.txt_1_img.btn_color.value || '',
		 					 "btn_bgcolor" : themeattr.txt_1_img.btn_bgcolor.value || '',
		 					 "btn_bordercolor" : themeattr.txt_1_img.btn_bordercolor.value || '',
		                 },
		                 {
		                	 "id": 2,
		                	 "field_img": themeattr.txt_1_img.field_img.value || '',
		                	 "is_localimg": themeattr.txt_1_img.is_localimg.value || '',
		                	 "bgcolor": themeattr.txt_1_img.item_bgcolor.value || '',
		                	 "linkurl": themeattr.txt_1_img.linkurl.value || '',
		                	 "title_info" : themeattr.txt_1_img.title_info.value || '',
		                	 "title_color" : themeattr.txt_1_img.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_1_img.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_1_img.descibe_color.value || '',
		                	 "btn_info" : themeattr.txt_1_img.btn_info.value || '',
		                	 "btn_color" : themeattr.txt_1_img.btn_color.value || '',
		                	 "btn_bgcolor" : themeattr.txt_1_img.btn_bgcolor.value || '',
		                	 "btn_bordercolor" : themeattr.txt_1_img.btn_bordercolor.value || '',
		                 },
		             ],
				},
			},	
			"txt_bgimg" : {     //图文   图片定位百分百贴合，正副标题+按钮 定位在图片上
				"title" : "背景图文列表",
				"img" : "icon_img",
				"arr" :!themeattr || !themeattr.txt_bgimg ? "" :{
					"field_id" : id,
					"field_type" : 'txt_bgimg',
					"is_thememodal" : "1",
					"field_bgcolor": themeattr.txt_bgimg.field_bgcolor.value || '',
					"title_align" : themeattr.txt_bgimg.title_align.value || '',
					"title_pd" : themeattr.txt_bgimg.title_pd.value || '',
					"title_post" : themeattr.txt_bgimg.title_post.value || '',    //标题块定位
					"title_posb" : themeattr.txt_bgimg.title_posb.value || '',
					"title_posl" : themeattr.txt_bgimg.title_posl.value || '',
					"title_posr" : themeattr.txt_bgimg.title_posr.value || '',
					"title_radius" : themeattr.txt_bgimg.title_radius.value || '',   //标题块弧度
					"title_fz" : themeattr.txt_bgimg.title_fz.value || '',
					"is_descibe" :themeattr.txt_bgimg.is_descibe.value || '',
					"descibe_fz" : themeattr.txt_bgimg.descibe_fz.value || '',
					"is_btn" : themeattr.txt_bgimg.is_btn.value || '',  
					"btn_fz" : themeattr.txt_bgimg.btn_fz.value || '',
					"btn_radius" : themeattr.txt_bgimg.btn_radius.value || '',
					"item_margin": themeattr.txt_bgimg.item_margin.value || '',   //每个item的外边距
					"item_radius": themeattr.txt_bgimg.item_radius.value || '',   //每个item的弧度
					"field_pd": themeattr.txt_bgimg.field_pd.value || '',        //整体模块的内边距
					"line_num": themeattr.txt_bgimg.line_num.value || '',     //一行几个  1——4
					"field_items" : [
		                 {
		                	 "id": 1,
		                	 "field_img": themeattr.txt_bgimg.field_img.value || '',
		                	 "is_localimg": themeattr.txt_bgimg.is_localimg.value || '',
		                	 "bgcolor": themeattr.txt_bgimg.item_bgcolor.value || '',
		                	 "title_bgcolor" : themeattr.txt_bgimg.title_bgcolor.value || '',
		                	 "linkurl": themeattr.txt_bgimg.linkurl.value || '',
		                	 "title_info" : themeattr.txt_bgimg.title_info.value || '',
		                	 "title_color" : themeattr.txt_bgimg.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_bgimg.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_bgimg.descibe_color.value || '',
		                	 "btn_info" : themeattr.txt_bgimg.btn_info.value || '',
		                	 "btn_color" : themeattr.txt_bgimg.btn_color.value || '',
		                	 "btn_bgcolor" : themeattr.txt_bgimg.btn_bgcolor.value || '',
		                	 "btn_bordercolor" : themeattr.txt_bgimg.btn_bordercolor.value || '',
		                 },
		                 {
		                	 "id": 2,
		                	 "field_img": themeattr.txt_bgimg.field_img.value || '',
		                	 "is_localimg": themeattr.txt_bgimg.is_localimg.value || '',
		                	 "bgcolor": themeattr.txt_bgimg.item_bgcolor.value || '',
		                	 "title_bgcolor" : themeattr.txt_bgimg.title_bgcolor.value || '',
		                	 "linkurl": themeattr.txt_bgimg.linkurl.value || '',
		                	 "title_info" : themeattr.txt_bgimg.title_info.value || '',
		                	 "title_color" : themeattr.txt_bgimg.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_bgimg.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_bgimg.descibe_color.value || '',
		                	 "btn_info" : themeattr.txt_bgimg.btn_info.value || '',
		                	 "btn_color" : themeattr.txt_bgimg.btn_color.value || '',
		                	 "btn_bgcolor" : themeattr.txt_bgimg.btn_bgcolor.value || '',
		                	 "btn_bordercolor" : themeattr.txt_bgimg.btn_bordercolor.value || '',
		                 },
	                 ],
				},
			},	
			"txt_2_img" : {     //图文：固定排版，3项或5项，正副标题
				"title" : "图文魔方",
				"img" : "icon_text",
				"arr" :!themeattr || !themeattr.txt_2_img ? "" :{
					"field_id" : id,
					"field_type" : 'txt_2_img',
					"is_thememodal" : "1",
					"field_bgcolor": themeattr.txt_2_img.field_bgcolor.value || '',
					"title_fz" : themeattr.txt_2_img.title_fz.value || '',
					"descibe_fz" : themeattr.txt_2_img.descibe_fz.value || '',
					"item_bordercolor": themeattr.txt_2_img.item_bordercolor.value || '',   //item边线颜色
					"field_num": themeattr.txt_2_img.field_num.value || '',     //总共几个   3个或5个
					"field_items" : [
		                 {
		                     "id": 1,
		                     "field_img": "txtimg4.png",
		 					 "is_localimg": themeattr.txt_2_img.is_localimg.value || '',
		                     "linkurl": themeattr.txt_2_img.linkurl.value || '',
		                     "title_info" : themeattr.txt_2_img.title_info.value || '',
		                     "title_color" : themeattr.txt_2_img.title_color.value || '',
		                     "descibe_info" : themeattr.txt_2_img.descibe_info.value || '',
		                     "descibe_color" : themeattr.txt_2_img.descibe_color.value || '',
		                 },
		                 {
		                	 "id": 2,
		                	 "field_img": "txtimg2.png",
		                	 "is_localimg": themeattr.txt_2_img.is_localimg.value || '',
		                	 "linkurl": themeattr.txt_2_img.linkurl.value || '',
		                	 "title_info" : themeattr.txt_2_img.title_info.value || '',
		                	 "title_color" : themeattr.txt_2_img.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_2_img.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_2_img.descibe_color.value || '',
		                 },
		                 {
		                	 "id": 3,
		                	 "field_img": "txtimg3.png",
		                	 "is_localimg": themeattr.txt_2_img.is_localimg.value || '',
		                	 "linkurl": themeattr.txt_2_img.linkurl.value || '',
		                	 "title_info" : themeattr.txt_2_img.title_info.value || '',
		                	 "title_color" : themeattr.txt_2_img.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_2_img.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_2_img.descibe_color.value || '',
		                 },
		                 {
		                	 "id": 4,
		                	 "field_img": "txtimg3.png",
		                	 "is_localimg": themeattr.txt_2_img.is_localimg.value || '',
		                	 "linkurl": themeattr.txt_2_img.linkurl.value || '',
		                	 "title_info" : themeattr.txt_2_img.title_info.value || '',
		                	 "title_color" : themeattr.txt_2_img.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_2_img.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_2_img.descibe_color.value || '',
		                 },
		                 {
		                	 "id": 5,
		                	 "field_img": "txtimg2.png",
		                	 "is_localimg": themeattr.txt_2_img.is_localimg.value || '',
		                	 "linkurl": themeattr.txt_2_img.linkurl.value || '',
		                	 "title_info" : themeattr.txt_2_img.title_info.value || '',
		                	 "title_color" : themeattr.txt_2_img.title_color.value || '',
		                	 "descibe_info" : themeattr.txt_2_img.descibe_info.value || '',
		                	 "descibe_color" : themeattr.txt_2_img.descibe_color.value || '',
		                 },
		             ],
				},
			},	
			"prd_1_list" : {
				"title" : "商品列表",
				"img" : "icon_product",
				"arr" : !themeattr ? "" :{
					"field_id" : id,
					"field_type" : 'prd_1_list',
				},
			},	
			"three_colprd" : {
				"title" : "三列商品列表",
				"img" : "icon_product",
				"arr" : !themeattr ? "" :{
					"field_id" : id,
					"field_type" : 'three_colprd',
				},
			},
		};
		if(type){
			return arr[type];
		}else{
			return arr;
		}
	};
	Array.prototype.unique = function()
	{
		this.sort();
		var re=[this[0]];
		for(var i = 1; i < this.length; i++)
		{
			if( this[i] !== re[re.length-1])
			{
				re.push(this[i]);
			}
		}
		return re;
	};
	var func = {
		getmodalarr : function(themeattr){
			var themeinit = [],   //主题的模块数组列表 ——后期根据选中的主题进行赋值
				diymodalarr = [];   //重组完整的配置数组
			for(var i in themeattr){
				var newField = modalinfo(i,"",themeattr).arr;
				diymodalarr.push(newField);
			}
			var obj = {"diymodalarr" : diymodalarr,"themeinit":themeinit}
			return obj;
		},
	};
    return {
    	getmodalarr : function(theme,themeattr){
    		return func.getmodalarr(theme,themeattr);
    	},
    	modalinfo : modalinfo(),
    	systemicons : systemicons,
    	titlebgimgs : titlebgimgs,
    	sampleprdimgs : sampleprdimgs,
        //添加主题对应的模块 
        addfield : function(type,id,themeattr){ 
        	var newField = modalinfo(type,id,themeattr).arr;
        	return newField;
        },
        //添加图标菜单模块
    	add_iconmenu : function(itemarr,num){
    		if(itemarr.length < num){
    			var lastOptionID = 0;
    			for(var i = 0; i < itemarr.length; i++){
    				var id = itemarr[i].id;
    				if(id > lastOptionID){
    					lastOptionID = id;
    				}
    			};
    			var newNav = {
    					"id":lastOptionID + 1,
    					"bgcolor" : "#ff6f41",
    					"title" : "分类名",
    					"imgurl" : "",
    					"link" : "",
    					"linktitle" : "",
    					"is_localimg" : "",
    			};
    			itemarr.push(newNav);
    		}else{
    			mag.showtips("最多有4组分组");
    			return false;
    		}
    	},
    	//添加图文列表1模块
    	add_txtimg : function(themeattr,itemarr,num){
    		if(itemarr.length < num){
    			var lastOptionID = 0;
    			for(var i = 0; i < itemarr.length; i++){
    				var id = itemarr[i].id;
    				if(id > lastOptionID){
    					lastOptionID = id;
    				}
    			};
    			var newNav = {
    				 "id": parseInt(lastOptionID) + 1,
                     "field_img": themeattr.txt_1_img.field_img.value || '',
 					 "is_localimg": themeattr.txt_1_img.is_localimg.value || '',
 					 "bgcolor": themeattr.txt_1_img.item_bgcolor.value || '',
                     "linkurl": themeattr.txt_1_img.linkurl.value || '',
                     "title_info" : themeattr.txt_1_img.title_info.value || '',
                     "title_color" : themeattr.txt_1_img.title_color.value || '',
                     "descibe_info" : themeattr.txt_1_img.descibe_info.value || '',
                     "descibe_color" : themeattr.txt_1_img.descibe_color.value || '',
                     "btn_info" : themeattr.txt_1_img.btn_info.value || '',
                     "btn_color" : themeattr.txt_1_img.btn_color.value || '',
 					 "btn_bgcolor" : themeattr.txt_1_img.btn_bgcolor.value || '',
 					 "btn_bordercolor" : themeattr.txt_1_img.btn_bordercolor.value || '',
    			};
    			itemarr.push(newNav);
    		}else{
    			mag.showtips("最多有"+num+"组分组");
    			return false;
    		}
    	},
    	//添加图文魔方模块
    	add_txt2img : function(themeattr,itemarr,num){
    		if(itemarr.length < num){
    			var lastOptionID = 0;
    			for(var i = 0; i < itemarr.length; i++){
    				var id = itemarr[i].id;
    				if(id > lastOptionID){
    					lastOptionID = id;
    				}
    			};
    			var newNav = {
    					"id": parseInt(lastOptionID) + 1,
	                	"field_img": "txtimg2.png",
	                	"is_localimg": themeattr.txt_2_img.is_localimg.value || '',
	                	"linkurl": themeattr.txt_2_img.linkurl.value || '',
	                	"title_info" : themeattr.txt_2_img.title_info.value || '',
	                	"title_color" : themeattr.txt_2_img.title_color.value || '',
	                	"descibe_info" : themeattr.txt_2_img.descibe_info.value || '',
	                	"descibe_color" : themeattr.txt_2_img.descibe_color.value || '',
    			};
    			itemarr.push(newNav);
    		}else{
    			mag.showtips("最多有"+num+"组分组");
    			return false;
    		}
    	},
    };
}]);
