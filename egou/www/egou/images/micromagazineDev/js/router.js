
myApp.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when("/index/modalrichtxt", "/index/modalrichtxt/title");
	$urlRouterProvider.when("", "/index/mainset");
	$urlRouterProvider.when("/index", "/index/mainset");
    $stateProvider 
	    .state("index", { 
	    	abstract: true,
	    	url:"/index",
	    	templateUrl: mag.magtemplateurl+'&mark=1',
	    })
	    .state("selecttheme", { 
	    	url:"/selecttheme/{page}",
	    	templateUrl: function($routeParams) {
	            return mag.magtemplateurl+'&mark=2&page='+$routeParams.page;
	        },
	    	controller : "selectthemeCtr",
	    })
	    .state("index.mainset", {   //微杂志主页面设置或者活动规则设置
	    	url:"/mainset",
	    	views: {
	    		'mainattrbox': {
	    			templateUrl: mag.getmainseturl,
	    		},
	    	}
	    })
	    .state("index.title", {
	    	url:"/modaltitle",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=title',
	    		},
	    	}
	    })
	    .state("index.richtxt", {
	    	url:"/modalrichtxt",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=richtxt',
	    		},
	    	}
	    })
	    .state("index.carousel", {
	    	url:"/modalcarousel",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=carousel',
	    		},
	    	}
	    })
	    .state("index.imglist", {
	        url:"/modalimglist",
	        views: {
	     	    'editattrbox': {
	     		   templateUrl: mag.geteditmodaltempurl+'&type=imglist',
	        	},
	        }
	    })
	    .state("index.puzzle", {
	    	url:"/modalpuzzle",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=puzzle',
	    		},
	    	}
	    })
	    .state("index.product", {
	    	url:"/modalproduct",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=product',
	    		},
	    	}
	    })
	    .state("index.classfiy", {
	    	url:"/modalclassfiy",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=classfiy',
	    		},
	    	}
	    })
	    .state("index.searchprd", {
	    	url:"/modalsearchprd",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=searchprd',
	    		},
	    	}
	    })
	    .state("index.btnlink", {
	    	url:"/modalbtnlink",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=btnlink',
	    		},
	    	}
	    })
	    .state("index.division", {
	    	url:"/modaldivision",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=division',
	    		},
	    	}
	    })
	    .state("index.notice", {
	    	url:"/modalnotice",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=notice',
	    		},
	    	}
	    })
	    .state("index.contact", {
	    	url:"/modalcontact",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=contact',
	    		},
	    	}
	    })
	    .state("index.menu", {
	    	url:"/modalmenu",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=menu',
	    		},
	    	}
	    })
	    .state("index.share", {
	    	url:"/modalshare",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=share',
	    		},
	    	}
	    })
	    .state("index.navtab", {
	    	url:"/modalnavtab",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=navtab',
	    		},
	    	}
	    })
	    .state("index.time", {
	    	url:"/modaltime",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=time',
	    		},
	    	}
	    })
	    .state("index.form", {
	    	url:"/modalform",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=form',
	    		},
	    	}
	    })
	    .state("index.video", {
	    	url:"/modalvideo",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=video',
	    		},
	    	}
	    })
	    .state("index.qrcode", {
	    	url:"/modalqrcode",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=qrcode',
	    		},
	    	}
	    })
	    //门店
	    .state("index.store", {
	    	url:"/modalstore",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=store',
	    		},
	    	}
	    })
	    .state("index.storestatic", {
	    	url:"/modalstorestatic",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&type=storestatic',
	    		},
	    	}
	    })
	    //活动模块
	    .state("index.shaking", {
	    	url:"/act/shaking",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&kind=act&type=shaking',
	    		},
	    	}
	    })
	    .state("index.dazhuanpan", {
	    	url:"/act/dazhuanpan",
	    	views: {
	    		'editattrbox': {
	    			templateUrl: mag.geteditmodaltempurl+'&kind=act&type=dazhuanpan',
	    		},
	    	}
	    })
	    //富文本子模块
       .state("index.richtxt.title", {
           url:"/title",
           views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'title',
	        	},
           }
       })
       .state("index.richtxt.content", {
    	   url:"/content",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'content'
	        	},
           }
       })
       .state("index.richtxt.attention", {
    	   url:"/attention",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'attention'
	        	},
           }
       })
       .state("index.richtxt.line", {
    	   url:"/line",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'line'
	        	},
           }
       })
       .state("index.richtxt.readmore", {
    	   url:"/readmore",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'readmore'
	        	},
           }
       })
       .state("index.richtxt.share", {
    	   url:"/share",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'share'
	        	},
           }
       })
       .state("index.richtxt.pushother", {
    	   url:"/pushother",
    	   views: {
        	   'richmodal': {
        		   templateUrl: mag.getrichmodaltempurl+'pushother'
	        	},
           }
       })
	   //主题模块
       .state("index.txtimg", {
    	   url:"/theme/txtimg",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=txtimg',
    		   },
    	   }
       })
       .state("index.shopping_contact", {
    	   url:"/theme/shopping_contact",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=shopping_contact',
    		   },
    	   }
       })
       .state("index.icons_menu", {
    	   url:"/theme/icons_menu",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=icons_menu',
    		   },
    	   }
       })
       .state("index.title_sub", {
    	   url:"/theme/title_sub",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=title_sub',
    		   },
    	   }
       })
       .state("index.h_1_product", {
    	   url:"/theme/h_1_product",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=h_1_product',
    		   },
    	   }
       })
       .state("index.s_1_product", {
    	   url:"/theme/s_1_product",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=s_1_product',
    		   },
    	   }
       })
       .state("index.pic_sticker", {
    	   url:"/theme/pic_sticker",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=pic_sticker',
    		   },
    	   }
       })
       .state("index.txt_1_img", {
    	   url:"/theme/txt_1_img",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=txt_1_img', 
    		   },
    	   }
       })
       .state("index.txt_bgimg", {
    	   url:"/theme/txt_bgimg",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=txt_bgimg',
    		   },
    	   }
       })
       .state("index.txt_2_img", {
    	   url:"/theme/txt_2_img",
    	   views: {
    		   'editattrbox': {
    			   templateUrl: mag.geteditmodaltempurl+'&kind=theme&type=txt_2_img',
    		   },
    	   }
       })
}]);
