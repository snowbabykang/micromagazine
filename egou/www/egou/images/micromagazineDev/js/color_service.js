;'use strict';
/*
 * angular服务
 * 1、默认普通模块的颜色数组，以后换主题可以直接改数组
 * 2、普通模块的一些方法
 * 
 * 3、组件模块的数组
*/
myApp.service('ColorService', function ColorService() {
	var color = {
        	"bgcolor" : "#f3f3f3",   //整体模块的背景色
        	"title" :{
        		"stylecolor": "#ff5d5d",
                "bgcolor": "rgba(255,255,255,0)",
                "color": "#333333",
        	},
        	 "richtxt" : {
        		 "color":"#ff5d5d",
        		 "bgcolor": "#fff",
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
    			"bordercolor": "#eee",
    			"bgcolor": "#fff",
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
    			"bgcolor": "#fff",
    			"color": "#5f646e",
    			"bordercolor": "#dfdfdf",
    		},
    		'product': {
    			"bgcolor":"transparent",
    		},
			'searchprd': {
    			"bgcolor":"#f3f3f3",
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
        },
    catepageinit = [{
		"field_id" : 1,
		"field_type" :"product",
		"field_prdtheme" : "defaultskin",     //商品主题
		"field_themetitle" : "默认主题",       //商品主题名
		"field_bgcolor": color['product'].bgcolor,
		"field_showcart" : "nocart",
		"field_makeup": 'mod-two-title',
		"field_items" : [
            {
                "item_prdid": 1,
                "item_pic": "http://imgcdn.bestweshop.com/image_spaces/ac/8b/43/6a/1455692495542.jpg_400x400.jpg",
                "item_title": "消耗"+mag.credit_mark+"的同时可以带来销售，通过多种渠道累计"+mag.credit_mark+"再去商城购物",
                "item_price": "￥10000"
            },
            {
                "item_prdid": 2,
                "item_pic": "http://imgcdn.bestweshop.com/image_spaces/a9/50/09/74/145570262874.jpg_400x400.jpg",
                "item_title": "粉丝互动地带，与公众号完美的对接，从而能够一体化运营",
                "item_price": "￥10000"
            },
            {
                "item_prdid": 3,
                "item_pic": "http://imgcdn.bestweshop.com/image_spaces/ac/8b/43/6a/1455692442187.jpg_400x400.jpg",
                "item_title": "吸粉，活跃粉丝的神器，粉丝在上架平台邀请若干位好友在规定时间内帮忙拆开礼盒",
                "item_price": "￥10000"
            },
            {
                "item_prdid": 4,
                "item_pic": "http://imgcdn.bestweshop.com/image_spaces/ac/8b/43/6a/1455692442220.jpg_400x400.jpg",
                "item_title": "迅速累计千万粉丝，所有消费者直达品牌商城购买",
                "item_price": "￥10000"
            }
        ],
		"field_prdids" : "",
		"field_pt": "8px",
		"field_pr": "8px",
		"field_pb": "8px",
		"field_pl": "8px",
		"field_mt": "0px",
		"field_mb": "0px",	
	}],
	storeinit = [{
    	"field_id" : 1,
    	"field_type" : 'store',
    	'field_isshow' : '1',
    },{
    	"field_id" : 2,
    	"field_type" : 'storestatic',
    }],
    backmodalarray = function(type,id){
    	var modal_array = {
			'title':{        //标题
				"field_id" : id,
				"field_type" : 'title',
				"field_con" : "标题文字",
				"field_fz": "18px",
				"field_style": "zero",
				"field_stylecolor":color['title'].stylecolor,
				"field_align": "center",
				"field_isbold": 'bold',
				"field_isindent": '0em',
				"field_bgcolor": color['title'].bgcolor,
				"field_color": color['title'].color,
				"field_pt": "8px",
				"field_pr": "5px",
				"field_pb": "8px",
				"field_pl": "15px",
				"field_mt": "0px",
				"field_mb": "0px",
			},
			'richtxt':{       //富文本
				"field_id" : id,
				"field_type" : 'richtxt',
				"field_richcon" : "",
				"field_color":color['richtxt'].color,
				"field_bgcolor": color['richtxt'].bgcolor,
				"field_pt": "20px",
				"field_pr": "15px",
				"field_pb": "15px",
				"field_pl": "15px",
			},
			'carousel': {         //轮播图
				"field_id" : id,
				"field_type" : 'carousel',
				"field_bgcolor": color['carousel'].bgcolor,
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
			},
			'imglist':{           //图片列表
				"field_id" : id,
				"field_type" : 'imglist',
				"field_bgcolor": color['imglist'].bgcolor,
				"field_showtitle" : "hide",
				"field_radius" : "0",
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
	               "field_mb": "0px",
			},
			'puzzle':{        //拼图模块
				"field_id" : id,
				"field_type" :'puzzle',
				"field_style":"4", 
				"field_puzzlecon" : "",
				"field_pt": "0px",
				"field_pr": "0px",
				"field_pb": "0px",
				"field_pl": "0px",
				"field_mt": "0px",
				"field_mb": "8px",
			},
			'btnlink':{         //连接按钮模块
				"field_id" : id,
				"field_type" : 'btnlink',
				"field_con" : "连接按钮",
				"field_fz": "14px",
				"field_bgcolor":color['btnlink'].bgcolor,
				"field_color": color['btnlink'].color,
				"field_bordercolor": color['btnlink'].bordercolor,
				"field_isblock": "block",
				"field_align": "center",
				"field_radius": "5px",
				"field_pt": "4px",
				"field_pr": "12px",
				"field_pb": "4px",
				"field_pl": "12px",
				"field_mt": "5px",
				"field_mr": "5px",
				"field_mb": "5px",
				"field_ml": "5px",
			},
			'division':{         //分割模块
				"field_id" : id,
				"field_type" :'division',
				"field_bordertype":"solid",
				"field_borderwidth":"1px",
				"field_bordercolor": color['division'].bordercolor,
				"field_bgcolor": color['division'].bgcolor,
				"field_blank":"20px",
				"field_mt": "10px",
				"field_mr": "5px",
				"field_mb": "10px",
				"field_ml": "5px",
			},
			'notice':{         //公告模块
				"field_id" : id,
				"field_type" : 'notice',
				"field_con" : "公告：自即日起本店...",
				"field_fz": "12px",
				"field_bgcolor": color['notice'].bgcolor,
				"field_color": color['notice'].color,
				"field_slide": "left",
				"field_pt": "4px",
				"field_pr": "12px",
				"field_pb": "4px",
				"field_pl": "12px",
				"field_mt": "0px",
				"field_mb": "0px",
			},
			'contact':{         //联系方式模块
				"field_id" : id,
				"field_type" : 'contact',
				"field_fz" : "14px",
				"field_modal" : "1",
				"field_tel" : "400-123-45678",
				"field_con" : "联系我们",
				"field_bgcolor":color['contact'].bgcolor,
				"field_color": color['contact'].color,
				"field_phonefz" : "16px",
				"field_phonecolor":color['contact'].phonecolor,
				"field_img":"",
				"field_pt": "8px",
				"field_pr": "8px",
				"field_pb": "8px",
				"field_pl": "8px",
				"field_mt": "0px",
				"field_mb": "8px",
			},
			'menu':{         //菜单模块
				"field_id" : id,
				"field_type" : 'menu',
				"field_bgcolor": color['menu'].bgcolor,
				"field_color":  color['menu'].color,
				"field_bordercolor":  color['menu'].bordercolor,
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
			},
			'share':{         //分享模块
				"field_id" : id,
				"field_type" : 'share',
				"field_style" : "default",
				"field_shareimg" : IMAGEPATH+"/components/img/wxdiytools/share2.jpg",
				"field_pl": "0px",
				"field_pr": "0px",
				"field_mt": "8px",
				"field_mb": "8px",
			},
			'product':{         //商品模块
				"field_id" : id,
				"field_type" : 'product',
				"field_prdtheme" : "defaultskin",     //商品主题
				"field_themetitle" : "默认主题",       //商品主题名
				"field_bgcolor": color['product'].bgcolor,
				"field_showcart" : "nocart",
				"field_makeup": 'mod-two-title',
				"field_items" : "",
				"field_prdids" : "",
				"field_pt": "8px",
				"field_pr": "8px",
				"field_pb": "8px",
				"field_pl": "8px",
				"field_mt": "0px",
				"field_mb": "0px",
			},
			'classfiy':{         //分类模块
				"field_id" : id,
				"field_type" :'classfiy',
				//"field_style" : "default",
				"field_bgcolor": color['classfiy'].bgcolor,
				"field_color":color['classfiy'].color,
				"field_bordercolor":color['classfiy'].bordercolor,
				"field_fz":"12px",
				"field_lineh":"38px",
				"field_items": "",
				"field_pr": "8px",
				"field_pl": "8px",
				"field_mt": "0px",
				"field_mb": "8px",
			},
			'searchprd':{         //商品搜索模块
				"field_id" : id,
				"field_type" :'searchprd',
				"field_bgcolor": color['searchprd'].bgcolor,
				"field_pt": "8px",
				"field_pr": "8px",
				"field_pb": "8px",
				"field_pl": "8px",
			},
			'navtab':{         //tab切换模块
				"field_id" : id,
				"field_type" :'navtab',
				"field_navs": [
	               {
	            	   "id":1,
	            	   "title" : "分类名",
	            	   "type" : "prd",
	            	   "prdtype" : "mod-col-list",
	            	   "conids" :"",
	            	   "content" : "",
	               },
	               {
	            	   "id":2,
	            	   "title" : "分类名",
	            	   "type" : "prd",
	            	   "prdtype" : "mod-col-list",
	            	   "conids" :"",
	            	   "content" : "",
	               },
               ],
				//"field_bgcolor": color['searchprd'].bgcolor,
				/*"field_pt": "8px",
				"field_pr": "8px",
				"field_pb": "8px",
				"field_pl": "8px",*/
			},
			'time':{         //倒计时模块
				"field_id" : id,
				"field_type" : 'time',
				"field_fz" : "14px",
				"field_con" : "距离活动开始还有",
				"field_bgcolor": color['time'].bgcolor,
				"field_color": color['time'].color,
				"field_size":"18px",
				"field_timebgcolor" :color['time'].timebgcolor,
				"field_timefz" : "12px",
				"field_timefcolor": color['time'].timefcolor,
				"field_time" : "",
				"field_rtime" : "",
				"field_pt": "8px",
				"field_pr": "0px",
				"field_pb": "8px",
				"field_pl": "0px",
				"field_mt": "0px",
				"field_mb": "8px",
			},
			'form':{         //表单模块
				"field_id" : id,
				"field_type" : 'form',
				"field_formid" : "",
				"field_formcon" : "",
				"title" : "",
				"field_pt": "0px",
				"field_pr": "10px",
				"field_pb": "10px",
				"field_pl": "10px",
				"field_mt": "0px",
				"field_mb": "0px",
			},
			'video':{         //视频模块
				"field_id" : id,
				"field_type" : 'video',
				"field_video" : "",
				"field_mt": "0px",
				"field_mb": "8px",
			},
			'qrcode':{         //分销二维码模块
				"field_id" : id,
				"field_type" : 'qrcode',
				"field_bgcolor":color['qrcode'].bgcolor,
				"field_isshadow": 0,
				"field_shadowsize": "5px",
				"field_shadowcolor": color['qrcode'].shadowcolor,
				"field_pt": "10px",
				"field_pb": "10px",
				"field_mt": "0px",
				"field_mb": "0px",
			}
    	};
    	var arr = modal_array[type];
    	return arr;
    };
    var baseinfo = {
		'title':{iconclass:"icon_title",title:"标题"},
		'richtxt':{iconclass:"icon_text",title:"富文本"},
		'carousel':{iconclass:"icon_carousel",title:"轮播图"},
		'imglist':{iconclass:"icon_imgs",title:"图片列表"},
		'puzzle':{iconclass:"icon_puzzle",title:"拼图"},
		'product':{iconclass:"icon_product",title:"商品"},
		'classfiy':{iconclass:"icon_classfiymodal",title:"关联分类"},
		'searchprd':{iconclass:"icon_searchprd",title:"商品搜索"},
		'btnlink':{iconclass:"icon_btnlink",title:"连接按钮"},
		'division':{iconclass:"icon_division",title:"辅助线"},
		'notice':{iconclass:"icon_notice",title:"公告"},
		'contact':{iconclass:"icon_contact",title:"联系方式"},
		'menu':{iconclass:"icon_menu",title:"菜单"},
		'share':{iconclass:"icon_share",title:"分享"},
		'navtab':{iconclass:"icon_navtab",title:"tab切换"},
		'time':{iconclass:"icon_time",title:"倒计时"},
		'form':{iconclass:"icon_form",title:"万能表单"},
		'video':{iconclass:"icon_video",title:"视频"},
		'qrcode':{iconclass:"icon_qrcode",title:"分销二维码"},
    };
	var modalarr = {
			"txtpic" : [backmodalarray('title',''),backmodalarray('richtxt',''),backmodalarray('carousel',''),backmodalarray('imglist',''),backmodalarray('puzzle','')],
			"prd" : [backmodalarray('product',''),backmodalarray('classfiy',''),backmodalarray('searchprd','')],
			"help" : [backmodalarray('btnlink',''),backmodalarray('division',''),backmodalarray('notice',''),backmodalarray('contact',''),backmodalarray('menu',''),backmodalarray('share','')],
			"senior" : [backmodalarray('navtab',''),backmodalarray('time',''),backmodalarray('form',''),backmodalarray('video',''),backmodalarray('qrcode','')],
	};
   
	//上移下移模块   （轮播图使用）
	var swapItems = function(arr, index1, index2) {
		arr[index1] = arr.splice(index2, 1, arr[index1])[0];
		return arr;
	};
    return {
        color:color,
        baseinfo:baseinfo,
        modalarr:modalarr,
        catepageinit:catepageinit, //分类页初始化有个商品模块，不能删除
        storeinit:storeinit, //门店模板初始化占位图，不能删除，不能删除
        //添加普通模块
        addfield : function(type,id){       
        	var newField = {};
        	newField = backmodalarray(type,id);
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
    	//富文本模块定义
    	richConfig : {
    		//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars:[ ["fontsize", "|", "blockquote", "horizontal",  "|","inserttable","localimages","emotion","date","fullscreen", "|","source"],
                    [ "bold", "italic", "underline","strikethrough", "forecolor","backcolor","|", "justifyleft", "justifycenter", "justifyright", "|", 
                      "indent","|","rowspacingtop", "rowspacingbottom", "lineheight", "|", "insertorderedlist", "insertunorderedlist", 
                    "|", "imagenone", "imageleft", "imageright", "imagecenter","|", "removeformat", "link", "unlink"] ],
          	autoClearinitialContent:true,
          	allowDivTransToP:false,
          	autotypeset:{removeEmptyline:true},
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false,
            enableAutoSave: false,
            //默认的编辑区域高度
            initialFrameWidth:330,
            initialFrameHeight:450,
            autoFloatEnabled : false,   //让工具框不跟随滑动条滑动最后悬浮置顶的
            topOffset:0,
            zIndex:1060,
            autoHeightEnabled:false,//设置iframe编辑区高度
            labelMap:{'localimages':'选择微相册图片'},
            iframeUrlMap:{
                'localimages':mag.HOST+"/shangjia/commoncomponent/ueditorimg",
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
    	//添加tab切换模块
    	add_navtab : function(field){
    		if(field.field_navs.length < 4){
    			var lastOptionID = 0;
    			for(var i = 0; i < field.field_navs.length; i++){
    				var id = field.field_navs[i].id;
    				if(id > lastOptionID){
    					lastOptionID = id;
    				}
    			};
    			var newNav = {
    					"id":lastOptionID + 1,
    					"title" : "分类名",
    					"type" : "prd",
    					"prdtype" : "mod-col-list",
    					"conids" : "",
    					"content" : "",
    			};
    			field.field_navs.push(newNav);
    		}else{
    			mag.showtips("最多有4组分组");
    			return false;
    		}
    	},
    	//删除tab切换模块
    	del_navtab : function(field,nav){
    		var len = field.field_navs.length;
    		if(len <= 2){
    			mag.showtips("至少要有2个分组");
    			return false;
    		}else{
    			for(var i = 0; i < field.field_navs.length; i++){
    	            if(field.field_navs[i].id == nav.id){
    	                field.field_navs.splice(i, 1);
    	                break;
    	            }
    	        };
    		}
    	},
    	//删除模块，通用方法  数组名固定为field_items   id名固定为id即可直接使用
    	del_fielditems : function(itemarr,item,num){
    		var len = itemarr.length;
    		if(len <= num){
    			mag.showtips("至少要有"+num+"个分组");
    			return false;
    		}else{
    			for(var i = 0; i < itemarr.length; i++){
    				if(itemarr[i].id == item.id){
    					itemarr.splice(i, 1);
    					break;
    				}
    			};
    		}
    	}
    	
    };
});
