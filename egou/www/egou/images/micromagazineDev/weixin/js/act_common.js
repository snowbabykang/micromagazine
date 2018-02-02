/*活动运行****************S*************/
var Act = {
	a_id: "", //
	seller_id: "",
	user_id: "",
	cantplay: "", //
	is_inter: 1, //是否需要积分
	inter: 0, //消耗多少积分
	allTime: 0, //共有几次机会
	count: $("#count"),
	countInput: $('#countInput'),
	awardinfo: "", //获奖提示
	awardshare: "", //获奖分享信息
	loseinfo: "", //未获奖提示
	loseshare: "", //未获奖分享信息
	playUrl: "", //触发访问路径
	beforePlay: function(){ return true;},
	playIng: function(){ return true;},
	hasAward: function(json){ return true;},
	noAward: function(json){ return true;},
	afterPlay: function(){ return true;},
	playAgain: function(){ return true;}
};
(function(act){
	act.init = function(options){
		for (var i in options) {
	        Act[i] = options[i];
	    }
	    act.playAgain = function(){
	    	act.cantplay = ""; //解锁
			hideLayer("#J_award", "popAnim");
	    	options.playAgain && options.playAgain();
	    };
	};
	act.startplay = function(){
		if(act.cantplay){
			if(act.cantplay === 1){
				return false;
			}else if(act.cantplay == "nofollow"){ //未关注
				My.showAlert({
					text: "您还没有关注我们，关注后才能参与活动！",
					yesText: "去关注",
					yesStyle: "b_dred",
					onYes: My.showFollow,
					noText: "再看看"
				});
			} else{
				My.errorTip(act.cantplay);
			}
		}else{ //not act.cantplay 
	    	if(act.is_inter == 2){ //是否需要积分
				var haveTime = act.count.text(), //剩余次数
					noticestr = "您每次抽奖需要消耗" + act.inter + mag.credit_mark+"，是否继续";
				if(act.inter > 0 && act.allTime == haveTime){ //需要大于0的积分且第一次抽奖的时候
					My.showAlert({
						text: noticestr,
						yesText: "好的",
						yesStyle: "b_dred",
						onYes: function(){
							lottery();
						},
						noText: "再看看",
						noStyle: "b_white"
					});
				} else{
					lottery();
				}
				return false;
			}
			lottery();
		}
	};
	act.showNoAward = function(c){
		var info = act.loseinfo;
		if(c != 0){
            info = info || "真遗憾，没中奖，还有<span class='dred'>" + c + "</span>次机会，<br/>再来一次吧";
            My.showAlert({
                text: info,
                yesText: "好的",
                yesStyle: "b_dred",
                onYes: act.playAgain
            });
        } else{
            info = info || "真遗憾，没中奖，<br/>要再接再厉哟！";
            My.showAlert({
                text: info,
                yesText: "好吧",
                yesStyle: "b_dred",
                onYes: act.playAgain
            });
        }
	}

	function lottery(){
	    My.showLoad("正在排队...");
	    act.cantplay = 1; //禁止默认
	    act.beforePlay(); //开始之前执行
	    $.ajax({
	        type: 'POST',
	        url: act.playUrl,
	        dataType: 'json',
	        data: { 'a_id': act.a_id, 'user_id': act.user_id},
	        cache: false,
	        error: function () {
	            act.cantplay="出错了，刷新再试！";                       
	            My.errorTip(act.cantplay);
	            My.hideLoad();
	        },
	        success: function (json) {
	            My.hideLoad();
	            var level = json.awardlevel;
	            var count = json.count; //抽奖次数
	            act.playIng(); //正在执行
	            if(level > 0 && level < 7){ //中奖了
	                act.count.text(count);
	                act.countInput.val(count);
	                act.hasAward(json);
	                if(act.awardshare){ //改变分享内容
	                    desc = act.awardshare.replace(/#奖品#/g, json.awardname);
	                }else{
	                    desc = "我中了"+ json.awardname +"，小伙伴们也一起来玩啊！";
	                }
	                setShare();
	            }else if(level == 0){ //没中奖
	                act.count.text(count);
	                act.countInput.val(count);
	                act.noAward(json);
	                desc = act.loseshare;
	                setShare();
	            }else if (level == '7') {
	                act.cantplay = "对不起，您没有机会了";
	                act.count.text(0);
	            }else if (level == '8') {
	            	act.cantplay = "nofollow";
	                My.showAlert({
	                    text: "您还没有关注我们，关注后才能参与活动！",
	                    yesText: "去关注",
	                    yesStyle: "b_dred",
	                    onYes: My.showFollow,
	                    noText: "再看看"
	                });
	            }else if (level == '9') {
	                act.cantplay = "活动还未开始，敬请期待";
	            }else if (level == '11') {
	                act.cantplay = "对不起，活动已经结束了！";
	            }else if(level == 10){
	                act.cantplay = "未知错误，请连续客服";
	            }else if(level == 12){
	                act.cantplay = mag.credit_mark+"不足，不能抽奖";
	            }
	            if((act.cantplay != 1) && act.cantplay){
	                (level != '8') && My.errorTip(act.cantplay);
	                act.afterPlay();
	            }
	        } //success
	    });
	}
})(Act);
var islock = 0, page = 0, winning_page = 1;
function winningLoad(first){
	if(haswinnerlist != "1"){return false;}
	
	page = winning_page; 
	//winning_page++;
	$.ajax({
		type: "POST",
		url: winnerslist_data,
		data: {
		    'a_id': Act.a_id,
		    'sid': Act.seller_id,
		    'page': page,
		    'page_size': 5,
		},
		error: function () {
			islock = 0;
		},
		success: function(json){
			islock = 0;
			var data = eval('(' + json + ')');
			if (data.status == 1) {
				$('#J_winner').hide();
			}else {
				//console.log(data.winners_list);
				var li = "";
				for(i = 0 ; i < data.winners_list.length ; i++){
					var _t = data.winners_list[i],
					img = _t.headimgurl ? _t.headimgurl : mag.defaultimg,
					nick = _t.user_nick ? _t.user_nick : "小虾米",
					url = _t.ownrecord == '2' ? mag.HOST+"/index.php/act/normal/prizelist?sid="+Act.seller_id+"&a_id="+Act.a_id : "javascript:void(0);";
					li += '<li class="list_li"><a href="'+url+'"><div class="list_cell small"><div class="img_cont rAll"><img class="rAll" src="'+img+'" alt="">'
					+'</div></div><div class = "list_cell"><p><span class="actcolor2">'+nick+'</span><span class="f10 lighter">'+_t.award_time+'</span></p>'
					+'<p class="f12 lh1 actcolor1">获得 <span class="actcolor2">'+_t.award_name+'</span></p></div></a></li>';
				}
				$('#J_winner').show().find('ul').html(li); 
     		}
		}
	});
};
if(mag.act_kind){
	/*小明的MyJs*/
	/**
	 * id打开层id: #id，
	 * anim动画自定义，
	 * iscloseMask 关闭是否关闭阴影
	 */
//打开层
	function showLayer(id, anim){
		My.showMask();
		My(id).open(anim);
		$(My.mask).bind(Click, function(){hideLayer(id, anim);});
	}
//关闭层
	function hideLayer(id, anim, nocloseMask){
		!nocloseMask && setTimeout(My.hideMask, 200);
		My(id).close(anim);
		$(My.mask).unbind(Click);
	}
	/**
	 * id 针对内层有position:absolute的层
	 */
//层全切出显示
	function showSlideR(id, animte){ //slideLeftAnim
		My.showMask();
		document.querySelector(id).style.display = "block";
		My(id + " .j_div").open(animte);
	}
//层全切出隐藏
	function hideSlideR(id, animte){
		My(id + " .j_div").close(animte);
		My(id).close(animte);
		setTimeout(function(){My.hideMask();}, 200);
	}
//分享，关注
	$(".j_share").live(Click, function(){
		My.showShare();
	});
	$(".j_follow").live(Click, function(){
		My.showFollow();
	});
//form input
	function errorInput(input){
		input.focus();
		input.parent().addClass("error");
		input.attr("onblur", "removeError(this)");
	}
	function removeError(_this){
		$(_this).parent().removeClass("error");
	}
};