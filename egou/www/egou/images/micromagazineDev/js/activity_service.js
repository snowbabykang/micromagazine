;'use strict';
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
	         	"name" : "年年有余",
	         	"value" : "newred",
	         },
	         {
	        	 "name" : "美人坊",
	        	 "value" : "beautygirl",
	         },
	         {
	        	 "name" : "酒家馆",
	        	 "value" : "winehome",
	         },
	         {
	        	 "name" : "美食馆",
	        	 "value" : "delicious",
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
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/purple/purplebg.jpg",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/purple/purple_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/purple/purple_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/purple/purple_shade.png",
				"bg_color": "#820fb7",  
				"color_1" : "#fff",            //还有多少次机会的背景色
				"color_2" : "#a20503",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/purple/share_shake.jpg",
				"tuwen_img" : IMAGEPATH+"/micromagazine/img/shaking/purple/purple_tuwen.jpg",
			},
		},
		"newred" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/newred/newred_bg.gif",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/newred/newred_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/newred/newred_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/newred/newred_shade.png",
				"bg_color": "#b6004f",  
				"color_1" : "#29a6f4",            //还有多少次机会的背景色
				"color_2" : "#fff",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/newred/newred_share.jpg",
				"tuwen_img" : IMAGEPATH+"/micromagazine/img/shaking/newred/newred_tuwen.jpg",
			},
		},
		"beautygirl" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/beautygirl/beauty_bg.png",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/beautygirl/beauty_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/beautygirl/beauty_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/beautygirl/beauty_shade.png",
				"bg_color": "#b70050",  
				"color_1" : "rgb(107, 0, 29)",            //还有多少次机会的背景色
				"color_2" : "#fff",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/beautygirl/beauty_share.jpg",
				"tuwen_img" : IMAGEPATH+"/micromagazine/img/shaking/beautygirl/beauty_tuwen.jpg",
			},
		},
		"winehome" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/winehome/wine_bg.jpg",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/winehome/wine_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/winehome/wine_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/winehome/wine_shade.png",
				"bg_color": "#305200",  
				"color_1" : "rgb(26, 44, 0)",            //还有多少次机会的背景色
				"color_2" : "#fff",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/winehome/wine_share.jpg",
				"tuwen_img" : IMAGEPATH+"/micromagazine/img/shaking/winehome/wine_tuwen.jpg",
			},
		},
		"delicious" : {
			"major" : {
				"bg_img" : IMAGEPATH+"/micromagazine/img/shaking/delicious/delicious_bg.jpg",
				"hand_img" : IMAGEPATH+"/micromagazine/img/shaking/delicious/delicious_hand.png",
				"wheel_img" : IMAGEPATH+"/micromagazine/img/shaking/delicious/delicious_wheel.png",
				"shade_img" : IMAGEPATH+"/micromagazine/img/shaking/delicious/delicious_shade.png",
				"bg_color": "#b97102",  
				"color_1" : "rgb(156, 7, 7)",            //还有多少次机会的背景色
				"color_2" : "#fff",         //还有多少次机会的字体颜色
				"color_3" : "#fff",         //菜单字体颜色
				"share_img" : IMAGEPATH+"/micromagazine/img/shaking/delicious/delicious_share.jpg",
				"tuwen_img" : IMAGEPATH+"/micromagazine/img/shaking/delicious/delicious_tuwen.jpg",
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
			"tuwenimg" : shakingtheme["purple"].major.tuwen_img,
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
		prizetype_opt : [{value: "0",text: '实物奖品'},{value: "1",text: '优惠券'},{value: "2",text: mag.credit_mark},{value: "3",text: '功能卡'},
          {value: "4",text: '礼金'},{value: "5",text: '自定义'},{value: "6",text: '补签机会'}],     //活动奖品类型
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
    		form.styles["tuwenimg"] = shakingtheme[theme].major.tuwen_img;
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
