;'use strict';
/*
 * angular服务
 * 
 * 普通微杂志：保存微杂志的方法（包含各种判断）
 * 活动：规则判断保存
 * 
*/
myApp.service('SaveService', function SaveService() {
	//验证自定义微杂志
	var validatemagazine = function($scope,mark){
		var form = $scope.$storage.form,
		arr = form.form_fields;
		//判断如果上一个编辑模块是拼图的话， 判断是否保存生成
		var isshow = $scope.$storage.isShow,
			indexof = isshow.indexOf("puzzle"),
			lastid = isshow.substring(indexof+6);
		if(indexof !== -1 && parseInt($scope.del_id) !== parseInt(lastid)){
			var current = $(".editmodalbox."+isshow).find(".magictable");
			var html = '<table class="magictable">'+current.html()+'</table>';
			html = html.replace(/\s+|\n/g, " ").replace(/>\s</g,"><");
			html = html.replace(/<div([\s\w=\">\<-]*[\W]*){4}(\/div>){1}/g, '');
			html = encodeURIComponent(html);
			for(var i = 0; i < arr.length; i++){
				if(arr[i].field_id == lastid){
					if(arr[i].field_puzzlecon !== html){
						if(confirm("您修改的拼图还未生成，离开将不能保存，确认离开吗？") == true){
							return true;
						}else{
							$scope.clicklock = 0;
							return false;
						};
					}
				}
			}; 
		};
		if(mark == 'mgz' || mark == 'store'){
			var share = form.share,
			shareimg = share.shareimg,
			sharetitle = share.sharetitle,
			sharecontent = share.sharecontent;
			if(arr.length <= 0){
				mag.showtips("请添加标题");
				$scope.clicklock = 0;
				return false;
			}else if(!sharetitle || !sharecontent){
				mag.showtips("请填写分享内容");
				$scope.showsetmagazine();
				$scope.clicklock = 0;
				return false;
			}else if(!shareimg){
				mag.showtips("请选择分享图片");
				$scope.showsetmagazine();
				$scope.clicklock = 0;
				return false;
			};
		};
		if(mark == 'cate'){
			var share = form.share,
			sharetitle = share.sharetitle;
			if(!sharetitle){
				mag.showtips("请填写分类页标题");
				$scope.showsetmagazine();
				$scope.clicklock = 0;
				return false;
			};
		};
		for(var i = 0; i < arr.length; i++){
            var type = arr[i].field_type,
            id = arr[i].field_id;
            switch (type){
               case "richtxt":
            		if(!arr[i].field_richcon){
            			mag.showtips("富文本内容不能为空");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "carousel":
            		var imgarr = arr[i].field_imgs;
            		var relratio = imgarr[0].img_relratio;
            		for(var j = 0; j < imgarr.length; j++){
        	            var rel = imgarr[j].img_relratio;
        	            if(relratio != rel){
        	            	var x = parseInt(j)+1;
        	            	mag.showtips("轮播图第"+x+"张尺寸不对，请重新选择图片");
        	            	$scope.showcurrentitem(type,id);
        	            	$scope.clicklock = 0;
        	            	return false;
        	            }
            		}
            		break;
            	case "puzzle":
            		if(!arr[i].field_puzzlecon){
            			mag.showtips("拼图内容不能为空");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "product":
            		if(arr[i].field_items.length <= 0){
            			mag.showtips("商品模块为空，请选择商品");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "classfiy":
            		if(arr[i].field_items.length <= 0){
            			mag.showtips("关联分类模块为空，请选择关联分类");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "time":
            		if(!arr[i].field_time){
            			mag.showtips("倒计时的时间不能为空");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "contact":
            		if(!arr[i].field_tel){
            			mag.showtips("请填写电话号码");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "form":
            		if(!arr[i].field_formid){
            			mag.showtips("请选择表单");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            	case "video":
            		if(!arr[i].field_url){
            			mag.showtips("请填写视频连接并生成");
            			$scope.showcurrentitem(type,id);
            			$scope.clicklock = 0;
            			return false;
            		}
            		break;
            };
        };
		return true;
	},
	isRate = function(s) {           // 判断中奖率
        var dige = "^\\d+(\\.\\d+)?$";
        var re = new RegExp(dige);
        if (s.search(re) != -1) {
            return true;
        }
        else {
            return false;
        }
    },
    //微杂志，活动，提交成功后的操作（各种失败返回问题，统一成一个方法）
    savebackfunc = function(data,link,$scope){
    	if(data.code == 0){
			mag.showloadingtips(2,data.tip);
			$scope.clearsession();
			setTimeout(function(){mag.hideloadingtips();window.location.href = link;},1000);
		}else if(data.code == 1){    
			if(data.err_type == 2){     //保存失败
				mag.showloadingtips(3,data.tip);
				setTimeout(function(){mag.hideloadingtips();},2000);
			}else if(data.err_type == 1){  
				var type = data.type,tips = "",id=data.field_id,tip=data.tip;
				switch (type){
				case "act":
					tips = data.tip;
					break;
				case "content":
					tips = "请添加微杂志内容";
					break;
				case "setshare":
					tips = "请填写微杂志分享内容";
					break;
				case "richtxt":
					tips = tip ? tip : "富文本内容不能为空";
					break;
				case "carousel":
					tips = "轮播图尺寸不对，请选择尺寸一样或者比例一样的图片";
					break;
				case "puzzle":
					tips = "拼图内容不能为空";
					break;
				case "product":
					tips = "商品模块为空，请选择商品";
					break;
				case "classfiy":
					tips = "关联分类模块为空，请选择关联分类";
					break;
				case "time":
					tips = "倒计时的时间不能为空";
					break;
				case "form":
					tips = "请选择表单";
					break;
				case "video":
					tips = "请填写视频连接并生成";
					break;
				};
				$scope.$apply(function () {
					if(type == "setshare" || type == "act"){
						$scope.showsetmagazine();
					}else if(type != "content"){
						$scope.showcurrentitem(type,id);
					};
				});
				mag.showtips(tips);
			};
		}
    	
    },
	//自定义微杂志的保存
	savecommonmag = function($scope){
		if(validatemagazine($scope,'mgz')){
			if(mag.isedit){
				var data = {"id":mag.isedit,"configid" : mag.configid,"thememgzid":mag.thememgz_id,"themetype" : mag.themetype,"content":$scope.$storage.form} ;
			}else{
				var data = {"configid" : mag.configid,"thememgzid":mag.thememgz_id,"themetype" : mag.themetype,"content":$scope.$storage.form};
			};
			$.ajax({
				type : "post",
				data : data,
				url : mag.savemagazine,
				beforeSend : function(){
					mag.showloadingtips(1,"保存中，请稍后...");
				},
				success : function(msg){
					$scope.clicklock = 0;
					var data = eval("("+msg+")"),
					link = mag.themetype == 'config' ? mag.configmgzlist : mag.magazinelisturl ;
					savebackfunc(data,link,$scope);
				}
			});	
    	};
	},
	//自定义分类页的保存
	savecatepage = function($scope){
		if(validatemagazine($scope,'cate')){
			var arr =  $.extend(true, {}, $scope.$storage.form);
			for(var i = 0; i < arr.form_fields.length; i++){
				if(arr.form_fields[i].field_id == 1){
					arr.form_fields[i].field_items = [];
				};
			};
			if(mag.isedit){
				var data = {"id":mag.isedit,page_id:3,"content":arr};
			}else{
				var data = {page_id:3,"content":arr};
			};
			$.ajax({
				type : "post",
				data : data,
				url : mag.savemagazine,
				beforeSend : function(){
					mag.showloadingtips(1,"保存中，请稍后...");
				},
				success : function(msg){
					$scope.clicklock = 0;
					var data = eval("("+msg+")"),
					link = mag.catepagelisturl;
					savebackfunc(data,link,$scope);
				}
			});	
		};
	};
	//自定义门店模板的保存
	savestorepage = function($scope){
		if(validatemagazine($scope,'store')){
			var arr =  $.extend(true, {}, $scope.$storage.form);
			for(var i = 0; i < arr.form_fields.length; i++){
				if(arr.form_fields[i].field_id == 1){
					arr.form_fields[i].field_items = [];
				};
			};
			if(mag.isedit){
				var data = {"id":mag.isedit,"page_id":11,"content":arr};
			}else{
				var data = {"page_id":11,"content":arr};
			};
			$.ajax({
				type : "post",
				data : data,
				url : mag.savemagazine,
				beforeSend : function(){
					mag.showloadingtips(1,"保存中，请稍后...");
				},
				success : function(msg){
					$scope.clicklock = 0;
					var data = eval("("+msg+")");
					console.log(data);
					link = mag.storelisturl;
					savebackfunc(data,link,$scope);
				}
			});	
		};
	};
    return {
    	//预览微杂志
    	previewmagazine : function($scope){
    		if(validatemagazine($scope,'mgz')){
    			$("#previewmag").modal("show");
    		};
    	},
    	confirm_preview : function($scope,$timeout){
    		if(validatemagazine($scope,'mgz')){
    			if($scope.nick){
    				$.ajax({
                        type:"POST",
                        url : mag.previewUrl,
                        data:{"str":$scope.$storage.form,'nick':$scope.nick,"type":6,"mgzname":$scope.$storage.form.share.sharetitle},
                        success:function(msg){
                        	var data = eval("("+msg+")");
                        	$scope.$apply(function() {  
                                $scope.previewtip = true;
                                $scope.previewinfo = data.reason;
                                if(data.status==1){
                                	$scope.previewstatus = "red";
                                }else{
                                	$scope.previewstatus = "green";
                                };
                                $timeout(function(){$scope.previewtip = false;},2000);
                            });  
                        },
                    });
    			}else{
    				$scope.$apply(function() {  
                        $scope.previewtip = true;
                        $scope.previewinfo = "昵称不能为空";
                    	$scope.previewstatus = "red";
                    	$timeout(function(){$scope.previewtip = false;},2000);
                    });  
    				$("#wx_nick").focus();
    				return false;
    			}
    		};
    	},
        //保存微杂志，保存活动
        savemagazine : function($scope){
        	var savetype = $scope.$storage.form.type;
        	if(savetype == "magazine" ){       //保存微杂志
        		savecommonmag($scope);
        	}else if(savetype == "catepage"){    //保存自定义分类页
        		savecatepage($scope);
        	}else if(savetype == "store"){    //保存自定义门店模板
        		savestorepage($scope);
        	}else{                                 //保存活动
        		var rules = $scope.$storage.form.rules;
        		var patrn = /[`~!@#$%^&*()_+?:"{}\/;'[\]]/im,
        			jfpatrn = /^[0-9]*[1-9][0-9]*$/,
        			mountpatrn = /^[0-9]*[0-9][0-9]*$/;
        		if(!rules.title || patrn.test(rules.title)){
        			mag.showtips("活动标题不能为空且不能含有非法字符");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(rules.iscode == 'true' && (!rules.code || !jfpatrn.test(rules.code) || rules.code.length > 5)){
        			mag.showtips(mag.credit_mark+"值不能为空，必须是长度小于6的正整数");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.starttime){
        			mag.showtips("活动开始时间不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.endtime){
        			mag.showtips("活动结束时间不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(rules.starttime > rules.endtime){
        			mag.showtips("活动开始时间不能晚于结束时间");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.themetxt || patrn.test(rules.themetxt)){
        			mag.showtips("活动主题不能为空且不能含有非法字符");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.describe){
        			mag.showtips("活动描述不能为空且小于500字");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.commonshare){
        			mag.showtips("活动普通分享内容不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.awardshare){
        			mag.showtips("活动中奖分享内容不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.loseshare){
        			mag.showtips("活动未中奖分享内容不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.awardinfo){
        			mag.showtips("活动中奖提示文字不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(!rules.loseinfo){
        			mag.showtips("活动未中奖提示文字不能为空");
        			$scope.showsetmagazine();
        			$scope.clicklock = 0;
        			return false;
        		}else if(rules.prize.length > 0){
        			var rates = 0;
        			for(var i = 0; i < rules.prize.length; i++){
                       var current = rules.prize[i];
                       rates =  parseFloat(rates) +  parseFloat(rules.prize[i].rate);
                       if(!current.name || patrn.test(current.name)){
                    	    mag.showtips("奖品"+(i+1)+"名不能为空且不能含有非法字符");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(!current.rate || current.rate < 0.01 || current.rate > 100){
                    	    mag.showtips("奖品"+(i+1)+"中奖率不能为空应在0.01%-100%之间");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(!isRate(current.rate)){
                    	    mag.showtips("奖品"+(i+1)+"中奖率格式不对");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(rates.toFixed(2) > 100){
                    	    mag.showtips("中奖率之和应该不大于100！");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(current.num.length > 100 || !mountpatrn.test(current.num)){
                    	    mag.showtips("奖品"+(i+1)+"数量必须是非负整数且长度小于100位");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(!current.type){
                    	    mag.showtips("奖品"+(i+1)+"请选择一种奖品类型");
	               			$scope.showsetmagazine();
	               			$scope.clicklock = 0;
	               			return false;
                       }else if(current.type == '1' || current.type == '3' || current.type == '4'){
                    	   var num = current.award.num,arr = {"1":"优惠券","3":"提货卡","4":"店铺礼金"};
                    	    if(!current.award.id){
                    		    mag.showtips("奖品"+(i+1)+"请选择"+arr[current.type]);
	   	               			$scope.showsetmagazine();
	   	               			$scope.clicklock = 0;
	   	               			return false;
                    	    }else if(parseInt(num) < parseInt(current.num)){
                    	    	mag.showtips("奖品"+(i+1)+"选择的"+arr[current.type]+"数量不能小于奖品数量");
    	               			$scope.showsetmagazine();
    	               			$scope.clicklock = 0;
    	               			return false;
                    	    };
                       }else if(current.type == '2' || current.type == '6'){
                    	    var val = current.award.value,arr = {"2":mag.credit_mark,"6":"补签机会"};
	                   	    if(!jfpatrn.test(val)){
	                   	    	mag.showtips("奖品"+(i+1)+"填写的"+arr[current.type]+"数量必须是正整数");
	   	               			$scope.showsetmagazine();
	   	               			$scope.clicklock = 0;
	   	               			return false;
	                   	    };
                       }else if(current.type == '5'){
	                   	    var id = current.award.id;
	                   	    if(!id){
	                   	    	mag.showtips("奖品"+(i+1)+"请选择自定义的奖项");
	   	               			$scope.showsetmagazine();
	   	               			$scope.clicklock = 0;
	   	               			return false;
	                   	    };
	                   }
                    };
        		};
        		if(validatemagazine($scope,'act')){   //判断模块
        			if(mag.isedit){
        				var data = {"content":$scope.$storage.form,"act_kind":mag.act_type,"id":mag.isedit};
        			}else{
        				var data = {"content":$scope.$storage.form,"act_kind":mag.act_type};
        			};
	        		$.ajax({
	    				type : "post",
	    				data : data,
	    				url : mag.saveactivity,
	    				beforeSend : function(){
	    					mag.showloadingtips(1,"保存中，请稍后...");
	    				},
	    				success : function(msg){
	    					$scope.clicklock = 0;
	    					var data = eval("("+msg+")"),
	    					link = data.skip_link;
	    					savebackfunc(data,link,$scope);
	    				}
	    			});	
        		};
        	};
        },
        
    };
});
