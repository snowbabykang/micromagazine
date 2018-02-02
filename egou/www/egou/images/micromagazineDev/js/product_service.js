;'use strict';
/*
 * angular服务
 * 1、商品模块后台整体控制属性参数
 * 2、根据不同模块释放一些可让客户编辑的属性
 * 
 * 			"bgcolor" : "#fff",	      //单个商品块的背景色
			"bgradius" : "",       //商品块的圆角
			"bgshadow" : "",       //商品块的阴影
			"bgpadding" : "",       //商品块的边距
			"infobgcolor" : "#fff",    //标题价钱块的背景色
			"infopadding" : "0px",
			"titlesize" : "",      //标题的大小
			"titlecolor" : "",     //标题的颜色
			"titlealign" : "",     //标题的对齐
			"titleline" : "",          //标题行数
			"titleheight" : "",        //标题高度
			"titlelineheight" : "",        //标题行高
			"titlemargin" : "",       //标题padding
			"pricecolor" : "",     //价钱的颜色
			"pricesize" : "",      //价钱的大小
			"pricealign" : "",     //价钱的对齐
			"pricelineh" : "",     //价钱的上下对齐
			"pastpricecolor" : "" ,  //原价颜色
			"pastpricesize" : "" ,  //原价大小
			"iscart" : "",    // 0 = 无购物车文字       1 = 有购物车图标         2 = 有文字
			"buyinfo" : "",        //立即购买按钮的文字
			"buybgcolor" : "",     //立即购买按钮的背景色
			"buycolor" : "",      //立即购买按钮的颜色
			"buysize" : "",       //立即购买按钮的大小
			"buyradius" : "",     //立即购买按钮的圆角
			"buypadding" : "",  
			"actlabel" : "",      //标签的样式         0 = 左上角长方形          1 = 右上角三角形
 * 
 * 
*/
myApp.service('ProductService', function ProductService() {
	var prdthemetitle = [       //商品主题对应中文名字
        {
        	"name" : "默认主题",
        	"value" : "defaultskin",
        	"bgcolor" : "#eeeeee",
        	"img" : IMAGEPATH+"/micromagazine/img/prdtheme/defaultskin.jpg",
        },
		{
			"name" : "粉色护肤",
			"value" : "pinkskin",
			"bgcolor" : "#eeeeee",
			"img" : IMAGEPATH+"/micromagazine/img/prdtheme/pinkskin.jpg",
		},
		{
			"name" : "酒庄",
			"value" : "greenwine",
			"bgcolor" : "#eeeeee",
			"img" : IMAGEPATH+"/micromagazine/img/prdtheme/greenwine.jpg",
		},
		{
			 "name" : "食物",
			 "value" : "greenfood",
			 "bgcolor" : "#fff",
			 "img" : IMAGEPATH+"/micromagazine/img/prdtheme/greenfood.jpg",
		},
		{
			 "name" : "绿色护肤",
			 "value" : "greenskin",
			 "bgcolor" : "#fff",
			 "img" : IMAGEPATH+"/micromagazine/img/prdtheme/greenskin.jpg",
		},
		{
			"name" : "春节",
			"value" : "spring",
			"bgcolor" : "#a70009",
			"img" : IMAGEPATH+"/micromagazine/img/prdtheme/spring.jpg",
		},
		{
			"name" : "婴幼儿",
			"value" : "babyskin1",
			"bgcolor" : "#ffd801",
			"img" : IMAGEPATH+"/micromagazine/img/prdtheme/babyskin1.jpg",
		},
   ],
	productMc = {              //商品属性模板总控制台（每个模板的属性值）
		"pinkskin" : {
			"bgcolor" : "#fff",	      
			"bgradius" : "0px",       
			"bgshadow" : "0px 9px 9px -7px rgba(0,0,0,0.3)",       
			"bgpadding" : "8px",      
			"infobgcolor" : "#fff", 
			"infopadding" : "0px",
			"titlesize" : "10px",     
			"titlecolor" : "#666",     
			"titlealign" : "left",     
			"titleline" : "1",       
			"titleheight" : "24px",      
			"titlelineheight" : "2",
			"titlemargin" : "14px 0 9px",
			"pricecolor" : "#000",   
			"pricesize" : "12px",     
			"pricealign" : "left", 
			"pricelineh" : "26px", 
			"pastpricecolor" : "#b2b2b2" ,  
			"pastpricesize" : "10px" , 
			"iscart" : "1",    
			"buyinfo" : "",       
			"buybgcolor" : "#fc5087",   
			"buycolor" : "#fff",    
			"buysize" : "20px",    
			"buyradius" : "100%", 
			"buypadding" : "3px",
			"actlabel" : "0",    
		},
		"greenwine" : {
			"bgcolor" : "#fff",	      
			"bgradius" : "4px",       
			"bgshadow" : "none",       
			"bgpadding" : "8px",      
			"infobgcolor" : "#fff",  
			"infopadding" : "0px",
			"titlesize" : "10px",     
			"titlecolor" : "#666",     
			"titlealign" : "left",     
			"titleline" : "1",       
			"titleheight" : "24px",      
			"titlelineheight" : "2",
			"titlemargin" : "15px 0",
			"pricecolor" : "#000",   
			"pricesize" : "12px",     
			"pricealign" : "left", 
			"pricelineh" : "20px", 
			"pastpricecolor" : "#b2b2b2" ,  
			"pastpricesize" : "10px" , 
			"iscart" : "2",    
			"buyinfo" : "立即尝鲜",       
			"buybgcolor" : "#588722",   
			"buycolor" : "#fff",    
			"buysize" : "8px",    
			"buyradius" : "20px", 
			"buypadding" : "5px",
			"actlabel" : "1", 
		},
		"greenfood" : {
			"bgcolor" : "#fff",	      
			"bgradius" : "0px",       
			"bgshadow" : "none",       
			"bgpadding" : "0px",      
			"infobgcolor" : "#fff",    
			"infopadding" : "0 10px 5px",    
			"titlesize" : "10px",     
			"titlecolor" : "#333333",     
			"titlealign" : "left",     
			"titleline" : "1",       
			"titleheight" : "24px",      
			"titlelineheight" : "2",
			"titlemargin" : "13px 0 8px",
			"pricecolor" : "#78bd50",   
			"pricesize" : "12px",     
			"pricealign" : "left", 
			"pricelineh" : "20px", 
			"pastpricecolor" : "#b2b2b2" ,  
			"pastpricesize" : "10px" , 
			"iscart" : "2",    
			"buyinfo" : "立即尝鲜",       
			"buybgcolor" : "#78bd50",   
			"buycolor" : "#fff",    
			"buysize" : "8px",    
			"buyradius" : "20px", 
			"buypadding" : "5px",
			"actlabel" : "1",  
		},
		"greenskin" : {
			"bgcolor" : "#fff",	      
			"bgradius" : "4px",       
			"bgshadow" : "none",       
			"bgpadding" : "0px",      
			"infobgcolor" : "#acd07f", 
			"infopadding" : "0px",
			"titlesize" : "10px",     
			"titlecolor" : "#fff",     
			"titlealign" : "center",     
			"titleline" : "1",       
			"titleheight" : "27px",      
			"titlelineheight" : "27px",
			"titlemargin" : "0",
			"pricecolor" : "#fff",   
			"pricesize" : "15px",     
			"pricealign" : "center",
			"pricelineh" : "26px", 
			"pastpricecolor" : "#b2b2b2" ,  
			"pastpricesize" : "10px" , 
			"iscart" : "0",    
			"buyinfo" : "",       
			"buybgcolor" : "#acd07f",   
			"buycolor" : "",    
			"buysize" : "",    
			"buyradius" : "", 
			"buypadding" : "",
			"actlabel" : "0",
		},
		"spring" : {
			"bgcolor" : "#c20009",	      
			"bgradius" : "0px",       
			"bgshadow" : "0px 0px 5px -2px rgba(0,0,0,0.3)",       
			"bgpadding" : "8px",      
			"infobgcolor" : "#c20009", 
			"infopadding" : "0px",
			"titlesize" : "11px",     
			"titlecolor" : "#fff",     
			"titlealign" : "left",     
			"titleline" : "1",       
			"titleheight" : "27px",      
			"titlelineheight" : "27px",
			"titlemargin" : "5px 0 0",
			"pricecolor" : "#fff",   
			"pricesize" : "14px",     
			"pricealign" : "left",
			"pricelineh" : "22px", 
			"pastpricecolor" : "#b2b2b2" ,  
			"pastpricesize" : "10px" , 
			"iscart" : "2",    
			"buyinfo" : "立即抢购",       
			"buybgcolor" : "#fed501",   
			"buycolor" : "#c20009",    
			"buysize" : "12px",    
			"buyradius" : "0", 
			"buypadding" : "4px 5px",
			"actlabel" : "1",
		},
		"babyskin1" : {
			"bgcolor" : "#fff",	      
			"bgradius" : "4px",       
			"bgshadow" : "none",       
			"bgpadding" : "0px",      
			"infobgcolor" : "#fb3c6f",  
			"infopadding" : "5px 10px 8px",
			"titlesize" : "10px",     
			"titlecolor" : "#fff",     
			"titlealign" : "left",     
			"titleline" : "1",       
			"titleheight" : "22px",      
			"titlelineheight" : "2",
			"titlemargin" : "0 0 5px 0",
			"pricecolor" : "#fff",   
			"pricesize" : "12px",     
			"pricealign" : "left", 
			"pricelineh" : "20px", 
			"pastpricecolor" : "#b2b2b2" ,  
			"pastpricesize" : "10px" , 
			"iscart" : "2",    
			"buyinfo" : "立即抢购",       
			"buybgcolor" : "#ffd801",   
			"buycolor" : "#672c2c",    
			"buysize" : "8px",    
			"buyradius" : "20px", 
			"buypadding" : "5px 10px",
			"actlabel" : "0", 
		},
	},
	/*"pinkskin" : 1,"greenwine" : 1,"greenfood" : 1,"greenskin" : 1 ,"spring" : 1,"babyskin1" : 1*/
	caneditattr = {        //商品模板哪些属性可编辑，可编辑的属性的原始值（重置时使用）
		"bgcolor" : {"spring" :"#c20009"},
		"buybgcolor" : {"pinkskin" : "#fc5087","greenwine" : "#588722","greenfood" :"#78bd50","spring" :"#fed501","babyskin1" :"#ffd801"},
		"infobgcolor" : {"greenskin" : "#acd07f" ,"spring" :"#c20009","babyskin1" : "#fb3c6f"},
		"pricecolor" : {"greenfood" :"#78bd50"},
		"iscart" : {"greenwine" : 1,"greenfood" : 1,"spring" : 1,"babyskin1" : 1},
	};
    return {
    	prdthemetitle:prdthemetitle,
    	caneditattr:caneditattr,     //商品模板哪些属性可编辑
        //获取商品模块主题的样式
        getprdtheme : function(theme){
        	return productMc[theme];
        }
    }
});
