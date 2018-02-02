;var video = {
	trim : function(str){ //删除左右两端的空格
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	/* qq连接匹配 */
	qq_handler : function(url,width,height){
		var qqvid = "";
		/* 正则匹配 */
		var qqreg= /^(http||https):\/\/v\.qq\.com(\/[a-zA-Z0-9]+){1,}.html(\?vid=([a-zA-Z0-9]+))?/i;
		var arr;
		if(qqreg.test(url)){
			arr=qqreg.exec(url); 
		}else{
			arr = "";
		}
		if(arr){
			if(url.indexOf('?vid=') == -1){
				qqvid = arr[2];
				qqvid = qqvid.substring(1,qqvid.length);
			}else{
				var len = arr.length;
				qqvid = arr[len-1];
			}
		}else{
			qqvid = "";
		}
		if(qqvid){
			var iframehtml = '<iframe class="videoiframe" scrolling="no" allowfullscreen src="http://v.qq.com/iframe/player.html?vid='
					+qqvid+'" data-url="'+url+'" width="'+width+'" height="'+height+'" frameborder="0"></iframe>';
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
