;/* *
 * 各模块type名称
 * 
 * 标题模块  ：title
 * 富文本模块  ：richtxt
 * 轮播图模块  ：carousel
 * 图片集模块  ：imggroup
 * 拼图模块  ：puzzle
 * ....
 *    
 * */
myApp.controller('mainCtr', ['$scope','$http','$state','$rootScope', '$sessionStorage','$timeout','ColorService','ActivityService','SaveService','ThemeService',
 function ($scope,$http,$state, $rootScope, $sessionStorage,$timeout,ColorService,ActivityService,SaveService,ThemeService) {
	$scope.diyboxHeight = ($(window).height()-218)+"px";   //中间预览的高度
	$rootScope.$state = $state;
	$scope.color = ColorService.color;  //各个模块初始颜色服务...
	$scope.baseinfo = ColorService.baseinfo;  //左侧模块每项的基本信息
	$scope.modalarr = ColorService.modalarr;  //左侧模块所包含的对应的模块数组
	
	$scope.systemicons = ThemeService.systemicons;  //系统图标数组
	$scope.titlebgimgs = ThemeService.titlebgimgs;  //正副标题系统背景图
	$scope.sampleprdimgs = ThemeService.sampleprdimgs;  //示例商品图数组
	
	if(mag.configid && mag.ismag){
		$scope.configid = mag.configid;   //配置id
		$scope.themeattr = mag.configdata['content'];   //主题所需要的配置数组（各个属性的默认值和是否可编辑）
		var getmodalarr = ThemeService.getmodalarr($scope.themeattr);
		$scope.modalarr.design = getmodalarr.diymodalarr;    //(左侧菜单和拖拽用到)设计模块的基础数组
		$scope.modalinfo = ThemeService.modalinfo;  //自定义每个模块对应的标题，图片
		$scope.currentthemearr = mag.thememgz_data;
		//新增图标菜单模块
		$scope.add_iconmenu = function(itemarr,num){
			ThemeService.add_iconmenu(itemarr,num);
		};
		//新增图文列表模块   新增背景图文列表模块
		$scope.add_txtimg = function(itemarr,num){
			ThemeService.add_txtimg($scope.themeattr,itemarr,num);
		};
		//新增图文魔方模块
		$scope.add_txt2img = function(itemarr,num){
			ThemeService.add_txt2img($scope.themeattr,itemarr,num);
		};
	};
	
	if(mag.isact){
		$scope.actname = ActivityService.actname;  //各个活动初始化模块名称
		$scope.actnamez = ActivityService.actnamez;  //各个活动初始化模块名称（中文名）头部导航用到
		$scope.act = ActivityService.activity;  //各个活动初始化模块样式字段
		$scope.rules = ActivityService.getrules(mag.act_type);  //各个活动初始化规则字段
		$scope.styles = ActivityService.styles;  //各个活动初始化背景各种样式字段
		$scope.actthemename = ActivityService.actthemename;  //各个活动主题名字与值的集合
		$scope.acttheme = ActivityService.getacttheme(mag.act_type);  //各个活动主题（主题重置颜色）
		
		$scope.act_name = $scope.actname[mag.act_type];   //预览部分用来判断当前模块是否可以删除
		$scope.act_themename = $scope.actthemename[mag.act_type];   //获取当前活动的主题名字与值
		
		//活动options用到的数组
		$scope.numtype_opt = ActivityService.numtype_opt;
		$scope.num_opt = ActivityService.num_opt;
		$scope.prizetype_opt = ActivityService.prizetype_opt;
	};
	if(mag.isedit){          //编辑模式下对数组进行赋值
		//console.log(mag.data.content);
		var id = 0;
		for(var i = 0; i < mag.data.content.form_fields.length; i++){
			var current = mag.data.content.form_fields[i];
            if(parseInt(current.field_id) >= parseInt(id)){
            	id = current.field_id;
            }else{
            	id = id;
            };
            if(mag.iscate && current.field_id == 1){   //如果是分类页，将模拟商品分类页数据赋值
            	current.field_items = ColorService.catepageinit[0].field_items;
            };
        };
        
		$scope.$storage = $sessionStorage.$default({
			showmagazineset : true,
			lastAddedID : parseInt(id),
			form : mag.data.content,
			magid : mag.isedit,
			isShow : "",
			currentindex : "",
		});
		if($scope.$storage.magid != mag.isedit){    //同一个页面后退编辑其他微杂志时，重置sessionstorage的值
			$scope.$storage.showmagazineset = true;
			$scope.$storage.lastAddedID = parseInt(id);
			$scope.$storage.form = mag.data.content;
			$scope.$storage.magid = mag.isedit;
			$scope.$storage.isShow = "";
			$scope.$storage.currentindex = "";
		};
	}else{                //创建微杂志
		if(mag.isact){   //如果是活动页面
			$scope.$storage = $sessionStorage.$default({
				showmagazineset : true,
				lastAddedID : $scope.act[mag.act_type].length,     //模块编号id
				form : {
					"type" : $scope.actname[mag.act_type],
					"paddingt" : "0px",
					"paddingr" : "0px",
					"paddingb" : "0px",
					"paddingl" : "0px",
					"styles" : $scope.styles[mag.act_type],
					"rules" : $scope.rules,
					"form_fields" :$scope.act[mag.act_type],
				},
				isShow : "",
				currentindex : "",
			});
		}else{       //自定义微杂志
			if(mag.iscate){    //分类
				var field_arr = ColorService.catepageinit,
					lastID = 1,
					form_type = "catepage";
			}else if(mag.isstore){   //门店
				var field_arr = ColorService.storeinit,
				lastID = 2,
				form_type = "store";
			}else{     //微杂志
				var field_arr = [];
				var lastID = $scope.currentthemearr ? $scope.currentthemearr.form_fields.length : 0;
				var form_type = "magazine";
			};
			if($scope.currentthemearr){
				$scope.currentthemearr.share = {
						"shareimg":"",
						"sharetitle":"",
						"sharecontent":"",
				};
			};
			$scope.$storage = $sessionStorage.$default({
				showmagazineset : true,
				lastAddedID : lastID,     //模块编号id
				form : $scope.currentthemearr ? $scope.currentthemearr : {
					"type":form_type,
					"bgcolor" : $scope.color.bgcolor,
					"paddingt" : "0px",
					"paddingr" : "0px",
					"paddingb" : "0px",
					"paddingl" : "0px",
					"share" : {
						"shareimg":"",
						"sharetitle":"",
						"sharecontent":"",
					},
					"form_fields" :field_arr,
				},
				isShow : "",
				currentindex : "",
			});
		};
	};
	if($scope.$storage.form){    //同理编辑模式下的方法，要对富文本进行转码
		for(var i = 0; i < $scope.$storage.form.form_fields.length; i++){
			var current = $scope.$storage.form.form_fields[i];
            if(current.field_type == "richtxt"){
            	//current.field_richcon = decodeURIComponent(current.field_richcon);
            }else if(current.field_type == "puzzle"){
            	if(!current.field_style)current.field_style = "4";
            };
        };
	};
	//点击列表时清除sessionstorage
	$scope.clearsession = function(){
		$scope.$storage.$reset();
	};
	/*清理ueditor的缓存*/
	window.onunload = function(){
		localStorage.removeItem("ueditor_preference");
	};
    //添加模块
    $scope.addNewField = function(type){
		if($scope.checkbuildpuzzle()){     //生成了拼图，或者上一个模块不是拼图
			$scope.confirmaddNewField(type);
		}else{
			if(confirm("您修改的拼图还未生成，离开将不能保存，确认离开吗？") == true){
				$scope.resetpuzzle();
				$scope.confirmaddNewField(type);
			};
		}
	}; 
	//确认添加模块，因为拼图需要判断
	$scope.confirmaddNewField = function(type){
    	var len = 0;
		for(var i = 0; i < $scope.$storage.form.form_fields.length; i++){
            if($scope.$storage.form.form_fields[i].field_type == type){
                len ++;
            }
        };
    	if(len >= 1){
    		if(type == "notice" || type == "contact" || type == "time" || type == "menu" || type == "share"  || type == "form" || type == "qrcode" || type == "searchprd" || type == "navtab"){
    			mag.showtips("该模块只能添加一个");
    			return false;
    		}
    	};
		$scope.$storage.lastAddedID++;
		//展示当前编辑模块
		if(parseInt($scope.$storage.currentindex) >= parseInt(0)){
			$scope.$storage.currentindex = parseInt($scope.$storage.currentindex) +1;
		}else{
			$scope.$storage.currentindex = 0;
		}
		$scope.confirmshowcurrent(type,$scope.$storage.lastAddedID,$scope.$storage.currentindex);
		//从服务里调取要添加的对象
		if($scope.baseinfo[type]){  
			var newField = ColorService.addfield(type,$scope.$storage.lastAddedID);
		}else{   //如果是主题模块
			var newField = ThemeService.addfield(type,$scope.$storage.lastAddedID,$scope.themeattr);
		};
		//将数组添加到当前位置的下一个位置
		if($scope.$storage.currentindex){
			$scope.$storage.form.form_fields.splice($scope.$storage.currentindex, 0, newField);
			//滑动定位
			var container = $('#scrolldIV'), 
			scrollTo = $('.currenteditor');
			container.animate({ 
				scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()+scrollTo.height() 
			});​ 
		}else{
			$scope.$storage.form.form_fields.push(newField);
			mag.scrollbottom();
		};
	};
	//判断拼图是否生成
	$scope.checkbuildpuzzle = function(){
		var isshow = $scope.$storage.isShow,
		indexof = isshow.indexOf("puzzle"),
		lastid = isshow.substring(indexof+6);
		//切换模块，新建模块，删除模块
		//第一步：判断上一个模块是否是拼图模块
		if(isshow && isshow.indexOf("puzzle") != -1){
			var current = $(".editmodalbox."+isshow).find(".magictable");
			if(current.find(".notempty").length > 0){  
				var html = '<table class="magictable">'+current.html()+'</table>';
				html = html.replace(/\s+|\n/g, " ").replace(/>\s</g,"><");
				html = html.replace(/<div([\s\w=\">\<-]*[\W]*){4}(\/div>){1}/g, '');
				html = encodeURIComponent(html);
				var arr = $scope.$storage.form.form_fields;
				for(var i = 0; i < arr.length; i++){
					if(arr[i].field_id == lastid){
						//内容不相同代表没有生成
						if(arr[i].field_puzzlecon !== html){
							return false;
						}else{
							return true;
						}
					}
				};
			}else{    //完全没有动过的拼图，可直接添加下一个模块
				return true;
			};
		}else{
			return true;
		};
	};
	//重置拼图内容
	$scope.resetpuzzle = function(){
		var isshow = $scope.$storage.isShow,
		indexof = isshow.indexOf("puzzle"),
		lastid = isshow.substring(indexof+6);
		var current = $(".editmodalbox."+isshow).find(".magictable");
		var arr = $scope.$storage.form.form_fields;
		var table = "";
		for(var i = 0; i < arr.length; i++){
			if(arr[i].field_id == lastid){
				if($scope.checkpuzzlestyle(arr[i])){
					current.next(".resizable").css({"top":"-102px"});
					var btns = '<div class="magic_btns"><span class="edit_magicurl selectpuzzleurl" data-mark="backurl" type="magic" title="选择链接"></span><span class="edit_magicimg selectpuzzleimage" data-mark="magic" title="选择图片"></span><span class="del_magic" title="删除"></span></div>';
					var text = decodeURIComponent(arr[i].field_puzzlecon);
					$(text).find("tr").each(function(){
						var len = $(this).find("td.notempty").length;
						if(len > 0){
							var isbtns = $(this).find("td.notempty").find(".magic_btns");
							if(!isbtns){
								$(this).find("td.notempty").append(btns);
							};
						};
						var trcon = "<tr>"+$(this).html()+"</tr>";
						table += trcon;
					});
				}else{
					current.next(".resizable").css({"top":"0px"});
					var tr = "";
					for(var x = 0; x < arr[i].field_style; x++){
						var td = "";
						for(var y = 0; y < arr[i].field_style; y++){
							td += '<td class="empty" data-x="'+y+'" data-y="'+x+'"></td>';
						}
						tr += '<tr>'+td+'</tr>';
					}
					table = tr;
				}; 
			};
		};
		current.css("z-index","90");
		current.next(".resizable").css({"width":"100px","height":"100px","left":"0px","z-index":"100"});
		current.html(table);
	};
	//改变拼图模块
	$scope.changepuzzle = function(field,style){
		field.field_style = style;
		$scope.resetpuzzle();
	};
	//验证拼图内容与当前格子数是否对应的
	$scope.checkpuzzlestyle = function(field){
		var text = decodeURIComponent(field.field_puzzlecon);
		var hastr = text.match(/<tr>/g);
		if(hastr && field.field_style == hastr.length){
			return true;
		}else{
			return false;
		}
	};
	//编辑模块  判断拼图模块是否完成
	$scope.showcurrentitem = function(type,id,index){
		if($scope.checkbuildpuzzle()){     //生成了拼图，或者上一个模块不是拼图
			$scope.confirmshowcurrent(type,id,index);
		}else{
			if(confirm("您修改的拼图还未生成，离开将不能保存，确认离开吗？") == true){
				$scope.resetpuzzle();
				$scope.confirmshowcurrent(type,id,index);
			};
		}
	};
	//确定展示当前模块
	$scope.confirmshowcurrent = function(type,id,index){
		$scope.$storage.currentindex = index;
		$scope.$storage.isShow = type+id;
		//$scope.$storage.showmagazineset = false;
		$state.go("index."+type); 
	};
	/*拖拽展示当前模块*/
	 $scope.$on("Ctr1NameChange",function (event, type,id,index) {
		$scope.confirmshowcurrent(type,id,index);
	});
	//删除模块
	$scope.IsdeleteField = function ($event,field_id,field_type){
		$event.stopPropagation();
		if(mag.iscate && field_id == 1){
			alert("当前模块是模拟分类页的商品模块，不能删除");
			return false;
		};
		if(mag.isstore && (field_type == 'storestatic' || field_type == 'store')){
			alert("当前模块是门店模板的占位模块，不能删除");
			return false;
		};
		$scope.clientX = ($event.clientX - 150)+ "px";
		$scope.clientY = ($event.clientY - 66) + "px";
		$scope.showdelmodal = true;
		$scope.del_id = field_id;
	};
	//取消删除
	$scope.cancledeleteField = function (){
		$scope.del_id = "";
		$scope.clientX = "-300px";
		$scope.clientY = "-300px";
		$scope.showdelmodal = false;
	};
	//确认删除
	$scope.deleteField = function (){
		var arr = $scope.$storage.form.form_fields;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].field_id == $scope.del_id){
				//删除后默认移到上面的编辑模块，否则移到下方模块，没有模块时展示整体设置
				if(i-1 >= 0){
					var previd = arr[i-1].field_id,
				    prevtype = arr[i-1].field_type;
				}else if(i+1 < arr.length){
					var nextid = arr[i+1].field_id,
				    nexttype = arr[i+1].field_type;
				};
				if(previd){
					$scope.confirmshowcurrent(prevtype,previd,i-1);
				}else if(nextid){
					$scope.confirmshowcurrent(nexttype,nextid,i+1);
				}else{
					$scope.confirmshowmagazine();
				};
				arr.splice(i, 1);
				$scope.clientX = "-300px";
				$scope.clientY = "-300px";
				$scope.showdelmodal = false;
				break;
			}
		};
    };
    //展示微杂志整体设置模块
    $scope.showsetmagazine = function(){
		if($scope.checkbuildpuzzle()){     //生成了拼图，或者上一个模块不是拼图
			$scope.confirmshowmagazine();
		}else{
			if(confirm("您修改的拼图还未生成，离开将不能保存，确认离开吗？") == true){
				$scope.resetpuzzle();
				$scope.confirmshowmagazine();
			};
		}
    };
	//确定展示微杂志整体设置模块
	$scope.confirmshowmagazine = function(){
    	$scope.$storage.showmagazineset = true;
    	$scope.$storage.isShow = "";
    	$scope.$storage.currentindex = "";
    	$state.go("index.mainset");
    };
	// 上移
	$scope.upmove_modal = function(arr,$index){
		ColorService.upmove_modal(arr,$index);
	};
	// 下移
	$scope.downmove_modal = function(arr,$index){
		ColorService.downmove_modal(arr,$index);
	};
	/*标题模块  样式三时修改字体颜色*/
	$scope.changetitlecolor = function(field,color){
		field.field_color = color;
	};
	/* ****************** 轮播图模块    S ****************** */
	//添加轮播图片    //添加单图列表模块
	$scope.addcarouselimg = function(field){
		ColorService.addcarouselimg(field);
	};
	//删除轮播图图片    //删除单图列表图片
	$scope.del_carousel = function(field,img){
		ColorService.del_carousel(field,img);
	};
	/* ****************** 轮播图模块    E ****************** */
	//选择商品主题
	$scope.selectprdtheme = function(field){
		$scope.$broadcast('selectprdtheme',field);
	};
	$scope.$on('confirmprdtheme', function(e, val,name,bgcolor,attr,field) {
		field.field_themetitle = name;
		field.field_prdtheme = val;
		field.field_prdstyle = attr;
		field.field_bgcolor = bgcolor;
		if(val !== "defaultskin"){
			field.field_showcart = 'havecart';
		}else{
			field.field_showcart = 'nocart';
		};
	});
	//判断每个主题里哪些可编辑的数组
	$scope.$on('getcaneditattr', function(e,attr) {
		$scope.prdcanedittheme = attr;
	});
	
	
	/* ****************** 菜单模块    S ****************** */
	//添加菜单图片
	$scope.addmenu_nav = function(field){
		ColorService.addmenu_nav(field);
	};
	//删除菜单模块
	$scope.del_nav = function(field,nav){
		ColorService.del_nav(field,nav);
	};
	//重置图标
	$scope.menu_restoreicon = function(nav){
		nav.nav_imgurl = "";
	};
	/* ****************** 菜单模块    E ****************** */
	
	//改变分类主题
	$scope.changeclassfiy = function(field,val){
		field.field_style = val;
	};
	/*富文本模块*/
	$scope.ueditor = [];
	$scope.ready = function(editor,id){
		$scope.ueditor[id] = editor;
	};
	$scope._simpleConfig = ColorService.richConfig;
	$scope.$on('$destroy', function() {
		$scope._simpleConfig.destroy();
	});
	 
	//视频模块   生成视频html
	$scope.creat_videohtml = function($event,field){
		var url = field.field_url;
		var _t = $($event.target).parent().next(".info");;
		if(url){
			var videohtml = video.buildvideo(url,'320',_t);
			field.field_video = encodeURIComponent(videohtml);
		}else{
			_t.html("请输入连接");
			setTimeout(function(){_t.html("")},"3000");
			return false;
		}
	};
	
	//拼图
	$scope.creatpuzzleimgs = function($event,field){
		var current = $($event.target).prev().find(".magictable"),
		len1 = current.find("td.empty").length,
		len2 = current.find("td.notempty").length,
		len3 = current.find("td.notempty.hasimg").length;
		if(len1 > 0){
			mag.showtips("请将拼图布局完成，不能有空格区域");
			return false;
		}else if(len2 !== len3){
			mag.showtips("图片不能为空，请将图片选择完成");
			return false;
		};
		var html = '<table class="magictable">'+current.html()+'</table>';
		html = html.replace(/\s+|\n/g, " ").replace(/>\s</g,"><");    //去除html的空格和换行
		html = html.replace(/<div([\s\w=\">\<-]*[\W]*){4}(\/div>){1}/g, '');
		field.field_puzzlecon = encodeURIComponent(html);
		mag.showloadingtips(2,"已生成");
		setTimeout(function(){mag.hideloadingtips();},1000);
	};
	/*************tab切换模块    S   *****************/
	//添加分组
	$scope.addnavtab = function(field){
		ColorService.add_navtab(field);
	};
	//删除分组
	$scope.del_navtab = function(field,nav){
		ColorService.del_navtab(field,nav);
	};
	//切换分组
	$scope.changetabtype = function(item){
		item.conids = "";
		item.content = [];
		if(item.type == "prd"){
			item.prdtype = item.prdtype ? item.prdtype : "mod-col-list";
		}
	}
	/*************tab切换模块    E    *****************/
	
	//大转盘模块主题切换
	$scope.changedzptheme = function(form,theme){
		ActivityService.changedzptheme(form,theme);
	};
	//摇一摇模块主题切换
	$scope.changeshaketheme = function(form,theme){
		ActivityService.changeshaketheme(form,theme);
	};
	//删除奖项模块
	$scope.delprize = function(prize,index){
		ActivityService.delprize(prize,index);
	};
	//增加奖项模块
	$scope.addprize = function(prize){
		ActivityService.addprize(prize);
	};
	//不同活动奖品，下拉框的change事件
	$scope.changeprize = function(x){
		if(x.type == '2'){      //积分
			x.award = {"type" : "code","value" : ""};
		}else if(x.type == '6'){     //补签机会
			x.award = {"type" : "sign","value" : ""};
		}else{
			x.award = "";
		}
	};

	//保存微杂志
	$scope.clicklock = 0;   //阻止连续点击保存
	$scope.savemagazine = function(){
		if ($scope.clicklock) return false; 
        $scope.clicklock = 1;
		var form = $scope.$storage.form;
		SaveService.savemagazine($scope);
	};
	//预览微杂志
	$scope.previewmagazine = function(){
		SaveService.previewmagazine($scope);
	};
	$scope.confirm_preview = function(){
		SaveService.confirm_preview($scope,$timeout);
	};
	//选择系统图标
	$scope.selectSystemimg = function(item){
		$("#systemiconsmodal").modal("show");
		$scope.confirm_selecticon = function(img){
			$("#systemiconsmodal").modal("hide");
			item.is_localimg = 1;
			item.imgurl = img;
		};
	};
	//正副标题模块  选择系统背景图
	$scope.setsubtitlebgimg = function(field){
		$("#titlebgimgsmodal").modal("show");
		$scope.confirm_titlebgimg = function(img){
			$("#titlebgimgsmodal").modal("hide");
			field.is_localimg = 1;
			field.field_bgimg = "titlebgpic/"+img;
		};
	};
	if(mag.themetype == 'config'){
		//选择示例商品
		$scope.select_sampleprd = function(field){
			$("#select_sampleprdmodal").modal("show");
			$scope.confirm_sampleprd = function(prd,num){
				var arr = [];
				for(var i = 0;i<num;i++){
					arr.push(prd);
				}
				field.field_items = arr;
				$("#select_sampleprdmodal").modal("hide");
			}
		};
	};
	//删除模块，通用方法  数组名固定为field_items   id名固定为id即可直接使用
	//itemarr是数组  item删除项   num最少保留几项
	$scope.del_fielditems = function(itemarr,item,num){
		ColorService.del_fielditems(itemarr,item,num);
	};
	
}]);
/*菜单切换，原本的锚点方式与router冲突，修改*/
myApp.controller('modalnavCtr', ['$scope' , '$rootScope',function ($scope, $rootScope) {
	/*导航切换*/
	$scope.navtype = 'txtmodals';
	$scope.showmodalnav = function(type){
		$scope.navtype = type;
	};
	/*拖拽添加模块*/
	$scope.sortableConfig = { group: {pull: 'clone',put: false}, animation: 150,sort:false};
	$scope.sortableConfig['onSort'] = function(e){
		var type = e.evt.clone.dataset.type;
		 for ( var i in $scope.modalarr ){  //遍历对象
			 for(var j = 0; j < $scope.modalarr[i].length; j++){
				 if($scope.modalarr[i][j].field_type == type){
					 $scope.$storage.lastAddedID ++ ;
					 $scope.modalarr[i][j].field_id = $scope.$storage.lastAddedID;
				 };
			 };
		};
	};
}]);
/*ui-sortable与track by 冲突，一个controller里面不能有两个数组里面都有相同数字，所以各加一个controller将之区分*/
myApp.controller('viewCtr', ['$scope', '$rootScope',function ($scope, $rootScope) {
	$scope.sortableConfig = { 
			group: {pull: false,put: true}, 
			animation: 150,
	};
	$scope.sortableConfig['onAdd'] = function(e){
		$scope.$emit("Ctr1NameChange",e.model.field_type,e.model.field_id,e.newIndex);
	};
}]);
/*myApp.controller('editCtr', ['$scope', '$rootScope',function ($scope, $rootScope) {
	 
}]);*/ 
//商品主题模块
myApp.controller('productCtr', ['$scope', 'ProductService',function ($scope, ProductService) {
	$scope.showprdtheme = false;      //选择商品主题模块
	$scope.caneditattr = ProductService.caneditattr;
	//console.log($scope.caneditattr.buybgcolor["pinkskin"]);
	$scope.$emit('getcaneditattr', $scope.caneditattr);
	$scope.$on('selectprdtheme', function(e,field) {
		$scope.showprdtheme = true; 
		//点击才会加载商品主题数组
		if(!$scope.prdthemetitle){
			$scope.prdthemetitle = ProductService.prdthemetitle;    //商品主题的名字，值，图片的数组集合
		};
		$scope.confirmprdtheme = function(val,name,bgcolor){
			$scope.showprdtheme = false;
			$scope.productMc = ProductService.getprdtheme(val);    //商品主题的属性
			$scope.$emit('confirmprdtheme', val,name,bgcolor,$scope.productMc,field);
		};
    });
	$scope.closeprdtheme = function(){
		$scope.showprdtheme = false;
	};
}]);
//选择主题
myApp.controller('selectthemeCtr', ['$scope','$state','$rootScope',function ($scope,$state,$rootScope) {
	$rootScope.$state = $state;
	$scope.usethemeCreatmgz = function(configid,magid,is_useable){
		if(is_useable == '1'){
			$scope.clearsession();
			window.location.href= mag.HOST+"/index.php/shangjia/catslist/micromagazine/shoptype/2?configid="+configid+"&thememgzid="+magid+"&themetype=theme"; 
		}else if(is_useable == '0'){
			mag.showtips("当前主题为收费主题，请联系客服购买使用，你也可以使用其他免费的主题");
			return false;
		}
	}
	//查看详情
	$scope.showthemedetail = function(key){
		$scope.themelist = theme.themelist;
		$scope.showthemeinfo = $scope.themelist[key];
		var text_name  = $scope.themelist[key].text_name;
		text_name = text_name.substring(0,text_name.length-4);
		$scope.showthemeinfo.codeimg = mag.getpreviewthemecode+"?sinaUid=w132"+"&kId="+text_name;
		$("#themeinfomodal").modal("show");
	};
	//切换价格
	$scope.changethemefee = function(price){
		$scope.showcurrentprice = price;
	};
}]);

