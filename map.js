// JavaScript Document
var areaListState = false;// 城市列表展开状态
var map3D; // 定义SDK地图对象
var SDKevent;
var cityListState = 1;// 定义二三维状态
var FullScreenState = false; // 全屏状态
var WshShell = null; // F11默认状态
var newWidth; // 当前窗口宽度
var newHeight; // 当前窗口高度
var dttcState = 1;// 地图图层状态值(1代表关闭，0代表开启)
var dtgjState = 1;// 地图工具状态值
var sdscState = 1;// 视点收藏状态值
var cityListState = 0;// 初始化列表展示
var roamModeState = 1;// 漫游模式状态值
var mapShps = [];// 所有地图上面新增的图层
var layerSwitchState = 1;//二三维联动状态值
var planState = 1;//规划状态值
var tipState =null;//自定义响应事件数组(由于响应事件多弹窗会互相干扰，所以需要在总事件入口添加自行调配的参数值进行判断)
var notifyLayerState =null;//自定义响应事件数组(由于响应事件多弹窗会互相干扰，所以需要在总事件入口添加自行调配的参数值进行判断)
// 初始化地图界面
function init() {
	/*初始化地图大小和位置*/
	var windowWidth = document.body.clientWidth;
	var windowHeight = document.body.clientHeight;
	var mapWidth = windowWidth - 71;
	var mapHeight = windowHeight - 60 - 30 - 20;//35代表下端高度提示map
	map3D = new OM.Map3D({
		id : "map3D", // 加载三维地图容器的id
		width : mapWidth,
		height : mapHeight
	});
	map3D.getLicence(authorizeIP+"@"+authorizePort+"@");// 网络授权
	SDKevent = map3D.sdkEvent();// 注册事件
	
	//获取当前屏幕对象
	/* 定制sdk
	var mvCount = map.GetMapViewCount();
	mvID = map.GetMapViewIDByIndex(mvCount - 1);
	mv1 = map.GetMapViewByID(mvID);
	*/
	setPlanCSS();
	
	// 影像地形加载
	initLayerImgTerLoad();
	
	// 模型加载
	//	getModelList();
	// 获取模型服务
	getModelSName();
	//开启响应器
	FireOnResponserNotifAll();
	// 初始化飞行定位杭州
	setTimeout(function() {
	    //本地加载dom影像
        //var range = [-180.00000000,-90.00000000,180.00000000,90.00000000];
        //domLayer = map3D.loadDOM("http://192.168.10.34:9096/coo-server/dataLoad/ZJGDDOM",range,0,22,"EPSG:4326");//加载网络服务
        //var range12 = [120.388183594,31.7518615723,120.690307617,31.9839477539];
        //domLayer12 = map3D.loadDOM("http://192.168.10.34:9096/coo-server/dataLoad/ZJGDOM",range12,0,22,"EPSG:4326");//加载网络服务
        //var range111 = [-180.00000000,-90.00000000,180.00000000,90.00000000];
        //demLayer = map3D.loadDEM("http://192.168.10.34:9096/coo-server/dataLoad/ZJGDEM",range111,0,22,"EPSG:4326");
		map3D.flyPosition(120.537076005,31.8580576688,34.4822065542,0.2303567444357986,-0.7636288710665455,60.57183609779933,3);// 飞行定位
	  	}, 500);
	
	$(".btm_right").css("width",mapWidth + "px");//设置容器宽度
	$(".btm_right").css("height",mapHeight + "px");//设置容器高度
	
	$(".k8,.k7,.k9,.k10,.k4,.k6").click(function(){
		var mapWidth = document.body.clientWidth - 71 -280;
		$(".btm_right").css("width",mapWidth + "px");//设置容器宽度
	});
	$(".k8_1,.k7_1,.k9_1,.k10_1,.k4_1,.k6_1").click(function(){
		var mapWidth = document.body.clientWidth - 71;
		$(".btm_right").css("width",mapWidth + "px");//设置容器宽度
	});
	
	/* 监听窗口变化 */
	  $(window).resize(function() {
			  newWidth = document.body.clientWidth;
			  newHeight = document.body.clientHeight;
			  var mapHeight = newHeight - 60 -30 ;
			  var mapWidth = newWidth - 71;
			  $(".OMmap_btm").css("height", newHeight - 60 +"px");
			  $(".btm_right").css("height", newHeight - 60 - 30 - 20 + "px");
			  if(!FullScreenState){//避免窗口缩小全屏再退出后，地图高度变小
				  $("#map3D").css("height", newHeight - 60 - 30 - 20 + "px");//退出全屏与btm_right一致 
				  if(layerSwitchState == 0){
					  $("#map2D").css("height", newHeight - 60 - 30 - 20 + "px");//二维退出全屏  
				  }
			  }
			  if(cityListState == 0 || dttcState == 0 || dtgjState == 0 || sdscState ==0 || planState == 0){
				  $(".btm_right").css("width", newWidth - 71 -281 + "px");//罗盘位置调整
				  }else {
					  $(".btm_right").css("width", newWidth - 71 + "px"); 
					  }
			  if(layerSwitchState == 0&& FullScreenState == false){//退出全屏开启二三维
				  $(".btm_right").css("width",  mapWidth + "px"); //获取全屏宽度
			  }
			  if(layerSwitchState == 1&& FullScreenState == true){
				  $(".btm_right").css("width", window.screen.width + "px"); //获取全屏宽度
			  }
			  //二三维联动开启左侧列表栏开启自适应
			  if((planState == 0 || cityListState == 0 || dttcState == 0 || dtgjState == 0 || sdscState ==0)&& layerSwitchState == 0 && FullScreenState == false){
				  lendonWithMenu();
			  }
			  //二三维联动开启左侧列表栏关闭自适应
			  if(planState == 1 && cityListState == 1 && dttcState == 1 && dtgjState == 1 && sdscState ==1 && layerSwitchState == 0 && FullScreenState == false ){
				  lendonWithoutMenu();
			  }
			  if(layerSwitchState == 0 && FullScreenState == true ){//二三维开启全屏
				  $(".btm_right").css("width", window.screen.width + "px"); //获取全屏宽度
				  $(".btm_right").css("height", window.screen.height + "px"); //获取全屏宽度
			  }
			   $(".btm_left_menu").css("height", mapHeight + "px");
			  /********************************************************************xgf修改***********************************************************************************/
			  $("#map3D").css("width", mapWidth+ "px");//退出全屏右侧空白bug 
			  /********************************************************************xgf修改***********************************************************************************/
	 });
	/* 全局监听Esc事件 */
	content3d.attachEvent("FireOnKeyUp", function(key) {
		var windowWidth = document.body.clientWidth;
		var windowHeight = document.body.clientHeight;
		if (FullScreenState) {
			if (key == 27) {
				if (WshShell != null) {
					WshShell.SendKeys('{F11}');
					$(".OMmap_top").css("display", "block");
					$(".OMmap_btm_left").css("display", "block");
					$(".btm_right_left_dz").css("display", "block");
					$(".btm_right_top_left_xy").css("display", "block");
					$(".btm_right_top").css("display", "block");
					$(".btm_left_menu li").css("display", "block");
					$(".btm_right").css("height", _windowHeight + "px");
					$(".btm_right").css("left", "71px");//地图容器距左侧边框列表距离
					//关闭左侧工具栏响应状态
					if(cityListState == 0 ){//城市列表
						$('.btm_left_menu .zh_k').hide();
						$(".btm_right_top_left_xy span").removeClass(
								"btm_right_top_left_xy_dx1");
						cityListState = 1;
					}
					if(dttcState == 0 ){//地图图层
						dttcState = 1;
						$('.k4').show();
						$('.k4_1,.k1').hide();
					}
					if(dtgjState == 0){//地图工具
						dtgjState = 1;
						spaceClose();
						$('.k5').show();
						$('.k5_1,.k1').hide();
					}
					if(sdscState == 0){//视点收藏
						sdscState = 1;
						$('.k6').show();
						$('.k6_1,.k1').hide();
					}
					if(planState == 0){//规划隐藏
						planState = 1;
						$('.k3').show();
						$('.k3_1,.k1').hide();
					}
					if (layerSwitchState == "0") {
						$(".btm_right").css("width", windowWidth - 71 + "px");
						$(".btm_right").css("height", _windowHeight - 90 + "px");
						var _btm_right_width1 = $(".btm_right").width();
						$("#map2D").css("width", _btm_right_width1 / 2 + "px");
						$("#map2D").css("height", _windowHeight - 90 + "px");
						$("#map2D").css("float", "left");
						$("#map3D").css("width", _btm_right_width1 / 2 + "px");
						$("#map3D").css("height", _windowHeight - 90 - 35 + "px");
						// $("#map3D").css("margin-left",
						// _btm_right_width1 / 2 + "px");
					} else {
						$(".btm_right").css("width", windowWidth - 71 + "px");
						$(".btm_right").css("height", _windowHeight - 90 - 35 + "px");
						$("#map3D").css("margin-left", "0px");
						$("#map3D").css("width", windowWidth - 71 + "px");
						$("#map3D").css("height", _windowHeight - 90 - 35 + "px");
					}
				}
				FullScreenState = false;
			}
		}
		if (roamModeState == 0) {
			if (key == 27) {
				roamMode("clearRoamMode");
				$('.dtgj_top ul').removeClass('used_mapTools');
			}
		}
	})
	// 添加罗盘事件
	//map3D.addCompass();
    //建筑添加文字标准
	addBuilderTextLabel();
}

$(document)
		.ready(
				function() {
				    //人口管理点击
					
					$(".rkgl_menu ul").hide().eq(0).show();
				    

					//左侧图标背景色变化
					$('.k2 div').click(function(){
						$('.k2 div').removeClass('k4click');
						$(this).addClass('k4click');
					});
					$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10').click(function() {
						$('.btm_right').animate({
							left : '352px'
						}, 100);
					});
					$(
							'.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10,.map_ss_btn,.btm_right_top_left_xy_yx,.btm_right_top_left_xy_dx')
							.click(function() {
								$('#maptoolCityFrame').animate({
									left : '352px'
								}, 100);
								$('#maptoolAreaFrame').animate({
									left : '445px'
								}, 100);
							});
					$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1,.map_ss_jg_gb').click(
							function() {
								$('#maptoolCityFrame').animate({
									left : '71px'
								}, 100);
								$('#maptoolAreaFrame').animate({
									left : '164px'
								}, 100);
							});

					$(".btm_right_top_left_xy span").click(
							function() {
								
								//20180406修改
								$("#videoFourDialog").css("left",71 + 281 + 8 + "px");
								//20180406修改
								
								
								$(".btm_right_top_left_xy span").removeClass(
										"btm_right_top_left_xy_dx1");
								$(this).addClass("btm_right_top_left_xy_dx1");
							});

					// $('.Associative').hide();
					// $('#city').click(function() {
					// $('.Associative').toggle();
					// // 城市列表
					// // getMapList();
					// $("#maptoolCityFrame").show();// 城市列表下拉框
					// $('.area_lb').hide();
					// areaListState = false;
					// var mapAreaList = '';
					// $(".area_lb").html(mapAreaList);
					// });
					// $('#city').click(
					// function() {
					// $('.Associative_top').toggleClass(
					// '.Associative_topclick');
					// });
					$('.Associative_top_gb').click(function() {
						$('.Associative').hide();
					});

					// $('.lx_ss_k').hide();
					$('.map_ss').click(function() {
						// $('.lx_ss_k').show();
						//$("#searchFrame").show();// iframe搜索下拉框显示
					});

					// $('.map_ss').blur(function() { //
					// // $('.lx_ss_k').hide();
					// $("#searchFrame").hide();// iframe搜索下拉框隐藏
					// });

					$("#searchFrame").mouseleave(function() {// iframe搜索下拉框显示
						$("#searchFrame").hide();
					});
					$("#maptoolCityFrame").mouseleave(function() {// iframe城市下拉框显示
						$("#maptoolCityFrame").hide();
						maptoolCityFrameState = 0;
					});
					$("#maptoolAreaFrame").mouseleave(function() {// iframe区域下拉框显示
						$("#maptoolAreaFrame").hide();
						maptoolAreaFrameState = 0;
					});

					$(".map_ss_btn").click(function() {
						$("#searchFrame").hide();// iframe搜索下拉框隐藏
					});
					// $('.map_ss').blur(function() {
					// $("#searchFrame").hide();//iframe搜索下拉框隐藏
					// });

					// $('.area_lb').hide();
					// $('.dz_qy').click(function() {
					// $('.Associative').hide();
					// if (!areaListState) {
					// $('.area_lb').show();
					// // 区域列表
					// // getMapAreaList();
					// $("#maptoolAreaFrame").show();// 区域列表下拉框
					// areaListState = true;
					// } else {
					// $('.area_lb').hide();
					// areaListState = false;
					// var mapAreaList = '';
					// $(".area_lb").html(mapAreaList);
					// }
					// });
					// $('.area_lb span').click(function() {
					// $('.area_lb').hide();
					// });

					$('.yx_lb').hide();
					// $('.yx_xy').mouseenter(function() {
					// $('.yx_lb').show();
					// });
					// $('.yx_xy').mouseleave(function() {
					// $('.yx_lb').hide();
					// });
					
					$('.btm_left_menu .zh_k').hide().eq(8).show();
					$('.zh_k .map_ss_jg').hide().eq(0).show();
					$('.map_ss_btn').click(function() {
						// map页面点击搜索
						searchSubmit(1);
						$('.btm_right').animate({
							left : '352px'
						}, 100);
						$('.btm_left_menu .zh_k').hide().eq(8).show();
						$('.zh_k .map_ss_jg').hide().eq(0).show();
						$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10').show();
						$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1,.k1').hide();
					});
					$('.jhxs_gx').click(function() {
						$(this).toggleClass('jhxs_gxclick');
					});

					$('.map_ss_jg_gb').click(
							function() {
								$('.btm_right').animate({
									left : '71px'
								}, 100);
								$('.btm_left_menu .zh_k').hide();
								$(".btm_right_top_left_xy span").removeClass(
										"btm_right_top_left_xy_dx1");
							});
					// $('.map_ss_jg_lb').mouseenter(function() {
					// $(this).children('.lb_dw').toggleClass('lb_dwclick');
					// });
					// $('.map_ss_jg_lb').mouseleave(function() {
					// $(this).children('.lb_dw').toggleClass('lb_dwclick');
					// });

					// $('.icon1').hide();
					// $('.zst_cion').mouseenter(function() {
					// $(this).children('img').hide().eq(1).show();
					// });
					// $('.zst_cion').mouseleave(function() {
					// $(this).children('img').hide().eq(0).show();
					// });

					$('.map_ss_jg_lb_menu_icon').hide();
					// $('.map_ss_jg_lb').mouseenter(function() {
					// $(this).children('.map_ss_jg_lb_menu_icon').show();
					// });
					// $('.map_ss_jg_lb').mouseleave(function() {
					// $(this).children('.map_ss_jg_lb_menu_icon').hide();
					// });
					
					$('.btm_right_top_left_xy_yx,.btm_right_top_left_xy_dx')
							.click(function() {
								$('.btm_right').animate({
									left : '352px'
								}, 100);
								$('.btm_left_menu .zh_k').hide().eq(9).show();//历史影像
								$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10').show();
								$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1,.k1').hide();
							});

					/*
					 * $('.pic1').hide(); $('.sjz_dd').mouseenter(function() {
					 * $(this).children('img').hide().eq(1).show(); });
					 * $('.sjz_dd').mouseleave(function() {
					 * $(this).children('img').hide().eq(0).show(); });
					 * 
					 * $("#lsyx_k").hide(); $('.lsyx_sj_center
					 * span').eq(1).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '200px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(1).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(2).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '245px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(2).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(3).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '290px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(3).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(4).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '335px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(4).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(5).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '385px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(5).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(6).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '435px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(6).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(7).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '480px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(7).mouseleave(function() { $("#lsyx_k").hide();
					 * }); $('.lsyx_sj_center span').eq(8).mouseenter(function() {
					 * $("#lsyx_k").animate({ top : '525px' }, 'fast');
					 * $("#lsyx_k").show(); }); $('.lsyx_sj_center
					 * span').eq(8).mouseleave(function() { $("#lsyx_k").hide();
					 * });
					 */

					$('.tcgl_menu_qh span').click(
							function() {
								$('.tcgl_menu_qh span').removeClass(
										'tcgl_menu_qh_kgfx');
								$(this).addClass('tcgl_menu_qh_kgfx');
							});

					/*
					 * $('.tcgl_menu_qh span').eq(0).click(function(){
					 * $('.shoucang1,.zzhi,.zuzhi_index').show();
					 * $('.shoucang,.zzhi1,.shoucang_index').hide(); });
					 * $('.tcgl_menu_qh span').eq(1).click(function(){
					 * $('.shoucang,.zzhi1,.shoucang_index').show();
					 * $('.shoucang1,.zzhi,.zuzhi_index').hide(); });
					 */
					$(".tcgl_menu_qh span").click(function() {
						var n = $(this).index();
						$("#dttc .map_dttc_menu").hide().eq(n).show();
					});

					$('.tree_k1,.tree_k1_1,.tree_k1_2,.tree_k1_3').hide();
					$('#tree_z1').click(function() {
						$('#tree_g1').next().toggle();
					});
					$('#tree_z2').click(function() {
						$('#tree_g2').next().toggle();
					});
					$('#tree_z4').click(function() {
						$('#tree_g4').next().toggle();
					});
					$('#tree_z5').click(function() {
						$('#tree_g5').next().toggle();
					});
					$('#tree_z6').click(function() {
						$('#tree_g6').next().toggle();
					});

					$('.z_menu').click(
							function() {
								$(this).children('.tree_xl').toggleClass(
										'tree_xlclick');
							});
					$('.tree_xy').click(function() {
						$(this).toggleClass('tree_xyclick');
					});

					$('.map_dttc_qxsy').mouseenter(
							function() {
								$(this).children('.map_dttc_qxsy_xh')
										.toggleClass('map_dttc_qxsy_xhclick');
							});
					$('.map_dttc_qxsy').mouseleave(
							function() {
								$(this).children('.map_dttc_qxsy_xh')
										.toggleClass('map_dttc_qxsy_xhclick');
							});

					// $('#tjsd').hide();
					// $('#sdgb,#sd_btn span').click(function() {
					// $('#tjsd').hide();
					// });
					// 添加标注
					$('.sdsc_btn').click(function() {
						$('#tjsd').show();
					});

					$('#kgfx').click(function() {
						$('.btm_left_menu .zh_k').hide().eq(10).show();
						$('.dtgj_top ul').removeClass('used_mapTools');
					});
					/* 自行添加通视分析 */
					$('#tsfx').click(function() {
						$('.btm_left_menu .zh_k').hide().eq(11).show();
						$('.dtgj_top ul').removeClass('used_mapTools');
					});
					/* 自行添加视域分析 */
					$('#syfx').click(function() {
						$('.btm_left_menu .zh_k').hide().eq(12).show();
						$('.dtgj_top ul').removeClass('used_mapTools');
					});

					$('.kgfx_fh').click(function() {
						$('.btm_left_menu .zh_k').hide().eq(6).show();
					});

					$('#bjgl').click(function() {
						$('.btm_left_menu .zh_k').hide().eq(13).show();
						findLabelPoint(1);//页面加载时模拟执行搜索按键
					});

					$('.bjgl_fh').click(function() {
						$('.btm_left_menu .zh_k').hide().eq(6).show();
					});

					$('.bjgl_menu_qh span').click(function() {
						$('.bjgl_menu_qh span').removeClass();
						$(this).addClass('bjgl_menu_qh_kgfx');
					});

					$('.gl_menu').hide().eq(0).show();
					$(".bjgl_menu_qh span").click(function() {
						var n = $(this).index();
						$(".gl_menu").hide().eq(n).show();
					});

					$('#tjbz').hide();
					$('#bzgb,#bz_btn').click(function() {
						$('#tjbz').hide();
					});

					$('.tjbz_btn').click(function() {
						$('#tjbz').show();
					});

					$('.bzxg_menu,.bzxg_menu_sd').hide();
					// $('.bzxg_menu_btn span').click(function() {
					// $('.bzxg_menu').hide();
					// });

					$('#bzxg').click(function() {
						$('.bzxg_menu').show();
					});

					// $('.bzxg_menu_btn span').click(function() {
					// $('.bzxg_menu_sd').hide();
					// });

					// $('#sdxg').click(function() {
					// $('.bzxg_menu_sd').show();
					// });

					$('#ljgl').click(
							function() {
								findPowerPath(1);
								$('.gl_menu').hide().eq(1).show();
								$('.btm_left_menu .zh_k').hide().eq(13).show();
								$('.bjgl_menu_qh span').removeClass();
								$('.bjgl_menu_qh span').eq(1).addClass(
										'bjgl_menu_qh_kgfx');
							});
					$('#bjgl').click(
							function() {
								$('.gl_menu').hide().eq(0).show();
								$('.btm_left_menu .zh_k').hide().eq(13).show();
								$('.bjgl_menu_qh span').removeClass();
								$('.bjgl_menu_qh span').eq(0).addClass(
										'bjgl_menu_qh_kgfx');
							});

					$('#q_tk').hide();
					$('.qy_tk_btn').click(function() {
						$('#q_tk').show();
					});
					$('.qy_gb').click(function() {
						$('#q_tk').hide();
					});

					$('#qxsy_tk').hide();
					$('.qxsy_tk_btn').click(function() {
						$('#qxsy_tk').show();
					});
					$('#qxsy_gb').click(function() {
						$('#qxsy_tk').hide();
					});

					$('#sxcx_tk').hide();
					$('.btm_right_top_right_sxck').click(function() {
						$('#sxcx_tk').show();
					});
					$('#sxcx_gb').click(function() {
						$('#sxcx_tk').hide();
					});

					/* $('.jttk').hide(); */
					$('.btm_right_top_right_jt')
							.click(
									function() {
										var src = "../mapTools/print.do";
										var par = "dialogHeight:215px;dialogWidth:440px;dialogLeft:740px;dialogTop:440px;status:no;screen:no;scroll:no";
										var k = window.showModelessDialog(src,
												window, par);
									});
					/*
					 * $('.jt_tk_btn span,#jt_gb').click(function() {
					 * $('.jttk').hide(); });
					 */
					$('.kjtk').hide();
					$('.btm_right_top_right_kjxz').click(function() {
						$('.kjtk').show();
					});
					$('.kj_tk_btn span,#kjxz_gb').click(function() {
						$('.kjtk').hide();
					});

					// 规划数据
					$(".kgsj_top ul").click(function() {
						$(".kgsj_top ul").removeClass("kgfa");
						$(this).addClass("kgfa");
					});
					$(".ghsj .kgfa_k").hide().eq(0).show();
					$(".kgsj_top ul").click(function() {
						var n = $(this).index();
						$(".ghsj .kgfa_k").hide().eq(n).show();
					});
					/* 规划数据方案数据 */
					$('.fasj_next_menu').hide();
					$('.fasjqh').click(function() {
						$('.fasj_next_menu').toggle();
					});
					$('.fasjqh_fa').click(function() {
						$('.fasjqh_fa_menu').toggle();
					});
					/* 资源目录-三维模型-区域点击切换背景 */
					$(
							'.fasjqh_xm_menu,.fasjqh_gj_menu,.fasjqh_fanga_menu,.fasjqh_fa_menu,.fasjqh_fanga_z_menu,.fasjqh_fanga_zl_menu')
							.hide();
					$('.zcqh').click(function() {
						$(this).toggleClass('zcqhclick');
					});
					$('.fasjqh_xm').click(function() {
						$('.fasjqh_xm_menu').toggle();
					});
					$('.fasjqh_fanga').click(function() {
						$('.fasjqh_fanga_menu').toggle();
					});
					$('.fasjqh_gj').click(function() {
						$('.fasjqh_gj_menu').toggle();
					});
					$('.fasjqh_fanga_z').click(function() {
						$('.fasjqh_fanga_z_menu').toggle();
					});
					$('.fasjqh_fanga_zl').click(function() {
						$('.fasjqh_fanga_zl_menu').toggle();
					});
					$('.ssts_k').hide();
					$('#sj_btn').click(function() {
						$('.ssts_k').show();
					});
					$('.ssts_k').click(function() {
						$('.ssts_k').hide();
					});
					/* 数据规划-方案数据箭头切换 */
					$('.fasjqh').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					$('.fasjqh_fa').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					$('.fasjqh_gj').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					$('.fasj_next_menu_k').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					$('.lzwbk_m').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					$('.fasjqh_xm').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					$('.fasjqh_fanga').click(function() {
						$(this).children('.jtqh').toggleClass('jtqhclick');
					});
					// 规划数据

				});

// 根据启动类型绑定不同的CSS样式
function setPlanCSS() {
	if (reqType == "noPlan") {
		$(".k4").click(function() {
			$(".k1").animate({
				top : '0px'
			}, 'fast');
			$(".k1").show();
		});
		$(".k5").click(function() {
			$(".k1").animate({
				top : '80px'
			}, 'fast');
			$(".k1").show();
		});
		$(".k6").click(function() {
			$(".k1").animate({
				top : '160px'
			}, 'fast');
			$(".k1").show();
		});
		$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10').click(function() {
			$('.btm_right').animate({
				left : '352px'
			}, 100);
		});
		$('.k4_1,.k5_1,.k6_1,.k1,.k3_1,.k7_1,.k8_1,.k9_1,.k10_1').hide();
		/*安防图层*/
		$('.k3').click(function(){
			$('.k3_1,.k4,.k5,.k6,.k7,.k8,.k9,.k10').show();
			$('.k3,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(0).show();
		});
		$('.k3_1').click(function(){
			$('.k3').show();
			$('.k3_1').hide();
			$('.btm_right').animate({left:'71px'},100);
		});
		$('.k4').click(function() {
			dttcState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			$('.k3,.k4_1,.k5,.k6,.k7,.k8,.k9,.k10').show();
			$('.k3_1,.k4,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(5).show();
		});
		$('.k4_1').click(function() {
			dttcState = 1;
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			$('.k4').show();
			$('.k4_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});

		$('.k5').click(function() {
			dtgjState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			$('.k3,.k4,.k5_1,.k6,.k7,.k8,.k9,.k10').show();
			$('.k3_1,.k4_1,.k5,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(6).show();

		});
		$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10').click(function() {
			$('.btm_right').animate({
				left : '352px'
			}, 100);
		});
		$('.k5_1').click(function() {
			dtgjState = 1;
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			spaceClose();
			$('.k5').show();
			$('.k5_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});

		$('.k6').click(function() {
			sdscState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			findViewPoint(1);// 视点查询
			$('.k3,.k4,.k5,.k6_1,.k7,.k8,.k9,.k10').show();
			$('.k3_1,.k4_1,.k5_1,.k6,.k7_1,.k8_1,.k9_1,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(7).show();
		});
		$('.k6_1').click(function() {
			sdscState = 1;
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			$('.k6').show();
			$('.k6_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});
		/*视频监控*/
		$('.k7').click(function(){
			$('.k3,.k4,.k5,.k6,.k7_1,.k8,.k9,.k10').show();
			$('.k3_1,.k4_1,.k5_1,.k6_1,.k7,.k8_1,.k9_1,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(1).show();
            $(".iframeClose").css("display","none");
            /***************************************************************xgf修改*************************************************/
            setTimeout(function(){
            	findPatroList(1);
            },100);
            /***************************************************************xgf修改*************************************************/
		});
		$('.k7_1').click(function(){
			$('.k7').show();
			$('.k7_1').hide();
			$('.btm_right').animate({left:'71px'},100);
            reSetIframe()
		});
		/*安防管理*/
		$('.k8').click(function(){
			$('.k3,.k4,.k5,.k6,.k7,.k8_1,.k9,.k10').show();
			$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8,.k9_1,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(2).show();
            reSetIframe()
			//获取视频监控列表
			getVideoList();
		});
		$('.k8').trigger('click');
		setTimeout(function(){
			$('.k8_1').trigger('click');	
		},200)
			
		$('.k8_1').click(function(){
			$('.k8').show();
			$('.k8_1').hide();
			$('.btm_right').animate({left:'71px'},100);
            reSetIframe()
		});
		$('.k9').click(function(){
			$('.k3,.k4,.k5,.k6,.k7,.k8,.k9_1,.k10').show();
			$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9,.k10_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(3).show();
            reSetIframe()
		});
		$('.k9_1').click(function(){
			$('.k9').show();
			$('.k9_1').hide();
			$('.btm_right').animate({left:'71px'},100);
            reSetIframe()
		});
		$('.k10').click(function(){
			$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10_1').show();
			$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10').hide();
			$(".btm_left_menu .zh_k").hide().eq(4).show();
            reSetIframe()
			getVehicleList();
		});
		$('.k10_1').click(function(){
			$('.k10').show();
			$('.k10_1').hide();
			$('.btm_right').animate({left:'71px'},100);
            reSetIframe()
		});
		$('.k4,.k5,.k6,.k7,.k8,.k9,.k10').click(function(){
			lendonWithVideo();
			lendonWithLock();
		});
		$('.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1').click(function(){
			lendonWithoutVideo();
			lendonWithoutLock();
		});
	} else if (reqType == "regulatory" || reqType == "plan") {
		// 规划数据
		/*planState = 0;
		$(".k3").click(function() {
			$(".k1").animate({
				top : '00px'
			}, 'fast');
			$(".k1").show();
		});
		$(".k4").click(function() {
			$(".k1").animate({
				top : '80px'
			}, 'fast');
			$(".k1").show();
		});
		$(".k5").click(function() {
			$(".k1").animate({
				top : '160px'
			}, 'fast');
			$(".k1").show();
		});
		$(".k6").click(function() {
			$(".k1").animate({
				top : '240px'
			}, 'fast');
			$(".k1").show();
		});

		$('.k3,.k4,.k5,.k6').click(function() {
			$('.btm_right').animate({
				left : '352px'
			}, 100);
		});
		$('.k3_1,.k4_1,.k5_1,.k6_1,.k1').hide();
		$('.k3').click(function() {
			planState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			$('.k3_1,.k4,.k5,.k6').show();
			$('.k3,.k4_1,.k5_1,.k6_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(9).show();
		});
		$('.k3_1').click(function() {
			planState = 1;
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			$('.k3').show();
			$('.k3_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});
		$('.k4').click(function() {
			dttcState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			$('.k3,.k4_1,.k5,.k6').show();
			$('.k3_1,.k4,.k5_1,.k6_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(0).show();
		});
		$('.k4_1').click(function() {
			dttcState = 1;
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			$('.k4').show();
			$('.k4_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});
		$('.k5').click(function() {
			dtgjState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			$('.k3,.k4,.k5_1,.k6').show();
			$('.k3_1,.k4_1,.k5,.k6_1').hide();
			$(".btm_left_menu .zh_k").hide().eq(1).show();
		});
		$('.k5_1').click(function() {
			dtgjState = 1;
			spaceClose();
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			$('.k5').show();
			$('.k5_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});
		$('.k6').click(function() {
			sdscState = 0;
			cityListState = 1;
			if(layerSwitchState == 0){
				lendonWithMenu();//改变二三维联动适屏宽高(左侧列表栏开启状态)
			}
			findViewPoint(1);// 视点查询
			$('.k3,.k4,.k5,.k6_1').show();
			$('.k3_1,.k4_1,.k5_1,.k6').hide();
			$(".btm_left_menu .zh_k").hide().eq(2).show();
		});
		$('.k6_1').click(function() {
			sdscState = 1;
			if(layerSwitchState == 0){
				lendonWithoutMenu();//改变二三维联动适屏宽高(左侧列表栏关闭状态)
			}
			$('.k6').show();
			$('.k6_1,.k1').hide();
			$('.btm_right').animate({
				left : '71px'
			}, 100);
		});
		// 规划数据
	}*/
	/*if (reqType == "noPlan") {

	} else if (reqType == "regulatory") {
		$("#regulatoryBtn").click();
		$(".k3").click();
	} else if (reqType == "plan") {
		$("#planBtn").click();
		$(".k3").click();
	}*/
}
	//安防管理
	// $(".kgsj_top li").click(function(){
	// 	$(".kgsj_top li").removeClass("kgfa");
	// 	$(this).addClass("kgfa");
    // });
	$(".afgl_menu ul").hide().eq(0).show();
    $(".kgsj_top li").click(function(){
        $(".kgsj_top li").removeClass("kgfa");
        $(this).addClass("kgfa");
 	    var n = $(this).index();
     	reSetIframe()
 	    switch(n)
		{
			case 0 :
				//开启视频监控列表
				getVideoList();
				break;
			case 1 :
				//开启门禁列表
				getLockList();
				break;
            case 2 :
                //防攀爬列表
                getClimbList();
                break;
            case 3 :
                //wifi列表
                getWifiList();
                break;
			default :
				break;
		}
		$(".afgl_menu .xxmenu").hide().eq(n).show();
    });

	$('.jz_ssjg4').mouseenter(function(){
		$(this).children('.ss_index_menu_bh1').toggleClass('ss_index_menu_bh1click');
	});
	$('.jz_ssjg4').mouseleave(function(){
		$(this).children('.ss_index_menu_bh1').toggleClass('ss_index_menu_bh1click');
	});

    $('.bf,.zt,.tz').unbind('click').click(function(){
        $(this).children('.ss_index_menu_bh1').toggleClass('ss_index_menu_bh1click');
    });


	$('#spjk').hide();
	$('.tree_xy').click(function(){
	$('#spjk').show();
	});
	$('#spjk').find('.qy_gb').click(function(){
	$('#spjk').hide();
	});
	//交互弹窗事件
	$('.sp').click(function(){
		$(this).toggleClass('spclick');
	});
	$('.mj').click(function(){
		$(this).toggleClass('mjclick');
	});
	$('.fpp').click(function(){
		$(this).toggleClass('fppclick');
	});
	$('.wf').click(function(){
		$(this).toggleClass('wfclick');
	});
	
	
	$('.xz').click(function(){
		$(this).toggleClass('xzclick');
		$(this).parents('.mj_jl').find('.mj_jl_btm').toggle();
	});
	
	
	
	
//	$('.mj_jl').hide();
	$('.k8').click(function(){
		$('.mj_jl').show();
        reSetIframe()
	});
	$('.k8_1').click(function(){
		$('.mj_jl').hide();
        reSetIframe()
	});
//	$('.fppgl').click(function(){
//		$('#fppgl').show();
//	});
//	$('.mjgl,.wfgl,.k7,.k9,.k10,.k4,.kgfa').click(function(){
//		$('#fppgl').hide();
//	});
//	$('.wfgl').click(function(){
//		$('#wfgl').show();
//	});
//	$('.mjgl,.fppgl,.k7,.k9,.k10,.k4,.kgfa').click(function(){
//		$('#wfgl').hide();
//	});
	$('.k10').click(function(){
		$('#clgl').show();
	});
	$('.k10_1').click(function(){
		$('#clgl').hide();
	});
	
	
	$('.rfcx_menu').hide().eq(0).show();
	$('#qh1 span').hide().eq(0).show();
	$('#qh').hide();


	$('.rfgl_lb_menu_lb').mouseenter(function(){
		$(this).children('.rfgl_lb_menu_lb_dw').toggleClass('rfgl_lb_menu_lb_dwclick');
	});
	$('.rfgl_lb_menu_lb').mouseleave(function(){
		$(this).children('.rfgl_lb_menu_lb_dw').toggleClass('rfgl_lb_menu_lb_dwclick');
	});
	
	
	
	$(".tjfx_menu").next().hide();
	$(".tjfx_menu").click(function(){
		$(this).children('.tjfx_jt').toggleClass('tjfx_jtclick');
		$(this).next().toggle();
	});
	
	
	
	
	$(".jkgl_menu").hide().eq(0).show();
//	$("#jkglss_btn").click(function(){
//		$(".jkgl_menu").hide().eq(1).show();
//	});
	$(".xqss_index_top_fh").click(function(){
		$(".jkgl_menu").hide().eq(0).show();
	});
	/*$('.zjd2 div .gm').click(function(){
		$('.zjd2 div .gm').removeClass('gmclick');
		$(this).addClass('gmclick');
	});*/
	
	
	
	
	

								$(".clgl_top span").click(function(){
									$(".clgl_top span").removeClass("kgfa");
									$(this).addClass("kgfa");
							    });
								$(".clgl_menu").hide().eq(0).show();
							    $(".clgl_top span").click(function(){
							 	    var n = $(this).index();	
									$(".clgl_menu").hide().eq(n).show();
							    });
	
	
	
	
	$('#rwtc,#jztc').hide();
	
	$("#rw .rfgl_lb_menu_lb").click(function(){
		$("#rwtc").show();
	});
	$(".qy_gb").click(function(){
		$(this).parents('.alltk').hide();
	});
	
	$("#jz .rfgl_lb_menu_lb").click(function(){
		$("#jztc").show();
	});
	$(".qy_gb").click(function(){
		$(this).parents('.alltk').hide();
	});
	
	$('.pagenumber li span').click(function(){
		$('.pagenumber li span').removeClass('one');
		$(this).addClass('one');
	});
	//左侧功能关闭时，iframe四宫格弹窗缩进
	function lendonWithoutVideo(){
		$("#videoFourDialog").css("left",71 + 8 + "px");
	}
	//左侧功能开启时，iframe四宫格弹窗展开
	function lendonWithVideo(){
		$("#videoFourDialog").css("left",71 + 281 + 8 + "px");
	}
	//二三维联动开启,左侧工具栏开启时地图调整
	function lendonWithMenu(){
		$(".btm_right").css("width", document.body.clientWidth - 71 - 281 + "px");
		$(".btm_right").css("height", document.body.clientHeight - 90 + "px");
		var _btm_right_width1 = $(".btm_right").width();
		$("#map2D").css("width", _btm_right_width1 / 2 + "px");
		$("#map2D").css("height", document.body.clientHeight - 90 + "px");
		$("#map2D").css("float", "left");
		$("#map3D").css("width", _btm_right_width1 / 2 + "px");
		$("#map3D").css("height", document.body.clientHeight - 90 - 35 + "px");
	}
	
	//二三维联动开启，左侧工具栏关闭时地图调整
	function lendonWithoutMenu(){
		$(".btm_right").css("width", document.body.clientWidth - 71  + "px");
		$(".btm_right").css("height", document.body.clientHeight - 90 + "px");
		var _btm_right_width1 = $(".btm_right").width();
		$("#map2D").css("width", _btm_right_width1 / 2 + "px");
		$("#map2D").css("height", document.body.clientHeight - 90 + "px");
		$("#map2D").css("float", "left");
		$("#map3D").css("width", _btm_right_width1 / 2 + "px");
		$("#map3D").css("height", document.body.clientHeight - 90 - 35 + "px");
	}
	
}	


//重置iframe及关闭高亮
function reSetIframe(){
	$(".iframeClose").css("display","none");
    // cancelPreviewVideo();
	/*******************************************************xgf修改**********************************************/
	//map.RemoveResponser("TipsDialogResponser");//该事件导致鼠标双击功能缺失
	/*******************************************************xgf修改**********************************************/
	CancelHaloOperation();
}

//初始化地图后就给建筑加文字标注
function addBuilderTextLabel() {
	var builderTextLayer=map3D.createPointTextEditLayer({
		fColor:"1.0,1.0,1.0,1.0",
		fontSize:8,
		align:"5",
		ImageURL:"http://" + projectIP + ":" + projectPort+"/ICGis/img/jz.png"
	});
	map3D.addPointTextLabel(builderTextLayer,"沙工新村-42幢",120.53734902,31.85857941,36.3,"沙工新村-42幢");
	map3D.addPointTextLabel(builderTextLayer,"沙工新村-43幢",120.53724401,31.85829918,36.3,"沙工新村-43幢");
	map3D.addPointTextLabel(builderTextLayer,"沙工新村-44幢",120.53704102,31.85807718,36.3,"沙工新村-44幢");
	map3D.addPointTextLabel(builderTextLayer,"沙工新村-45幢",120.53679918,31.85869572,36.3,"沙工新村-45幢");
	map3D.addPointTextLabel(builderTextLayer,"沙工新村-46幢",120.53681666,31.85838785,36.3,"沙工新村-46幢");
}