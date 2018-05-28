/**
 * 搜索功能
 * 
 * @author DL
 * @creatDate 2017-09-28
 */
// 封装的读取json的方法
var mapSearcher = new MapSearcher();
var jsonPath = '../js/City.json';
// 系统初次启动默认城市和区域
var defaultName = cityName;// 城市
var defaultAreaName = areaName;// 区域
//map搜索框状态值(默认关闭为0)
var searchFrameState = 0;
//城市下拉框状态值(默认关闭为0)
var maptoolCityFrameState = 0;
//地区下拉框状态值(默认关闭为0)
var maptoolAreaFrameState = 0;
//搜索详情图层组
var searchLayer = [];
//默认高度100米
var zToHeight = 100;
$(document).ready(function() {
	// 页面赋值
	$(".map_ss").val(inputText);
	$("#mapDefaultName").text(defaultName);
	$(".dz_qy").text(defaultAreaName);
	// 模拟执行搜索按键
	searchSubmit(1);
	// 生成的列表添加样式
	$('.btm_right').animate({
		left : '352px'
	}, 100);
	$('.btm_left_menu .zh_k').hide().eq(8).show();
	$('.zh_k .map_ss_jg').hide().eq(0).show();
	$('.k3,.k4,.k5,.k6,.k7,.k8,.k9,.k10').show();
	$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8_1,.k9_1,.k10_1,.k1').hide();
});
/**
 * 搜索功能
 * 
 * @param pageNo,页码
 */
function searchSubmit(pageNo) {
	// 获取输入框的值
	var inputText = !($(".map_ss").val(inputText)) ? "" : $(".map_ss").val(inputText);
	// 获取默认城市名
	var cityName = defaultName;
	// 获取默认区域名
	var areaName = defaultAreaName;
	// alert(inputText + '; ' + cityName + '; ' + areaName + '; ' + pageNo);
	/** 向后端传值获取封装的数据结果**/
	$.ajax({
		type : 'POST',
		data : {
			keyWord : inputText,
			pageNo : pageNo
		},
		// url : '../mapSearcher/serach.do',// 关键字搜索
		url : '../mapSearcher/mixed.do',// 混合查询
		success : function(data) {
			/** 对返回的封装数据进行解析**/
			if (data.success == "1") {
				var cityAndArea = cityName + areaName;
				// 生成搜索结果列表
				var resultList = '';
				resultList = searchResult(data, cityAndArea, pageNo);
				$(".map_ss_jg").html(resultList);
				// 添加样式
				$('.icon1').hide();
				$('.zst_cion').mouseenter(function() {
					$(this).children('img').hide().eq(1).show();
				});
				$('.zst_cion').mouseleave(function() {
					$(this).children('img').hide().eq(0).show();
				});
				$('.map_ss_jg_gb').unbind('click').click(function() {
					$('.btm_right').animate({
						left : '71px'
					}, 100);
					$('.btm_left_menu .zh_k').hide();
					$(".btm_right_top_left_xy span").removeClass("btm_right_top_left_xy_dx1");
					$('#maptoolCityFrame').animate({
						left : '71px'
					}, 100);
					$('#maptoolAreaFrame').animate({
						left : '164px'
					}, 100);
				});
				$('.map_ss_jg_lb_menu_icon').hide();
			} else {
				var resultList = '';
				resultList += '<ul class="map_ss_jg_top">';
				resultList += '<span style="margin-left: 10px;">共搜到</span>';
				resultList += '<span style="color: red;">' + '0' + '</span>';
				resultList += '<span>个记录</span>';
				resultList += '<span style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>';
				// resultList += '<span class="jhxs_gx"></span>';
				// resultList += '<span style="margin-left: 4px; color:
				// #999999;">聚合显示</span>';
				resultList += '<span class="map_ss_jg_gb"></span>';
				resultList += '</ul>';
				$(".map_ss_jg").html(resultList);
				// 添加样式
				$('.map_ss_jg_gb').unbind('click').click(function() {
					$('.btm_right').animate({
						left : '71px'
					}, 100);
					$('.btm_left_menu .zh_k').hide();
					
					//20180406修改
					$("#videoFourDialog").css("left",71 + 8 + "px");
					//20180406修改
					
					$(".btm_right_top_left_xy span").removeClass("btm_right_top_left_xy_dx1");
					$('#maptoolCityFrame').animate({
						left : '71px'
					}, 100);
					$('#maptoolAreaFrame').animate({
						left : '164px'
					}, 100);
				});
			}
		},
		error : function(e) {
		}
	})
}
/**
 * 搜索结果列表展示
 * 
 * @param data,结果集
 * @param cityAndArea,城市和区域名
 * @param pageNo,页码
 * @returns {String},列表节点
 */
function searchResult(data, cityAndArea, pageNo) {
	// 计算滚动条高度
	var searchResultHeight = document.body.clientHeight - 96 - 35 - 30 ;
	// 每一条结果集
	var records = data.record.records;
	// 结果集总数
	var totalRecords = data.record.totalRecords;
	// 总页数
	var totalPage = data.record.totalPage;
	/** 搜索结果列表**/
	var resultList = '';
	resultList += '<ul class="map_ss_jg_top">';
	resultList += '<span style="margin-left: 10px;">共搜到</span>';
	resultList += '<span style="color: red;">' + totalRecords + '</span>';
	resultList += '<span>个记录</span>';
	resultList += '<span style="width: 1px; height: 16px; margin-left: 10px; margin-top: 8px; margin-right: 10px; background: #dcdcdc;"></span>';
	// resultList += '<span class="jhxs_gx"></span>';
	// resultList += '<span style="margin-left: 4px; color:
	// #999999;">聚合显示</span>';
	resultList += '<span class="map_ss_jg_gb"></span>';
	resultList += '</ul>';
	resultList += '<div id="searchPOIResult" style="height:'+searchResultHeight+'px;width:100%;overflow:auto;">';
	// 解析每一条结果集
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		// 地址
		var address = record.address;
		// 线轨迹坐标(串)
		var areaShp = record.areaShp;
		// 类型
		var dataType = record.dataType;
		// ID
		var id = record.id;
		// 线轨迹坐标(串)
		var lineShp = record.lineShp;
		// 全称
		var name = record.name;
		// 经度
		var x = record.x;
		// 纬度
		var y = record.y;
		// 高程
		var z = record.z;
		// 列表序号
		var listNum = i + 1;
		// 拼接ID
		if( (!dataType) || (dataType == "null")){
			id = "arcgis" + id;
		}else{
			id = dataType + id;
		}

		/** 搜索结果列表**/
		resultList += '<ul id="' + id + '" class="map_ss_jg_lb">';
		resultList += '<li class="lb_dw">';
		resultList += '<span style="width: 16px; text-align: center;margin-left: 5px; display: block; margin-top: 8px;">' + listNum + '</span>';
		resultList += '</li>';
		resultList += '<li class="map_ss_jg_lb_menu">';
		resultList += '<ul class="map_ss_jg_lb_menu_text">';
		resultList += '<span onclick="flyParticularsPostion(\'' + x + '\',\'' + y + '\',\'' + id + '\');" title="' + name
		   			+ '" style="color: #2b75ff; margin-right: 20px; OVERFLOW: hidden;WIDTH: 110px; WHITE-SPACE: nowrap; TEXT-OVERFLOW: ellipsis">' + name + '</span>';
		resultList += '<span  class="qy_tk_btn" onclick="particulars(\'' + id + '\',\'' + name + '\',\'' + address + '\',\'' + x + '\',\'' + y + '\');">详情>></span>';
		resultList += '</ul>';
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span style="color: #404040; margin-right: 20px;">' + cityAndArea + '</span>';
		resultList += '</ul>';
		/** 搜索结果功能类型**/
		resultList += functionListType(dataType, id, name, address, x, y,areaShp);
	}
	resultList += '</div>';
	/** 分页查询**/
	resultList += pagerSearch(pageNo, totalPage);
//	resultList += pagerMethod(pageNo, totalPage,searchSubmit);
	return resultList;
}

/**
 * 详情查询气泡
 * 
 * @param id,数据id
 * @param name,名字
 * @param address,地址
 * @param x,经度
 * @param y,纬度
 */
function particulars(id, name, address, x, y) {
	// 飞行定位
	flyParticularsPostion(x, y, id);
	for (var i = 0; i < searchLayer.length; i++) {
		if (searchLayer[i][id]) {
			deleteAttributeTip(searchLayer[i][id], x, y, zToHeight);
		}
	}
	// 搜索详情的气泡图层
	var shps = creatAttributeTip(slayer, editLayer);
	var slayer = shps.slayer;
	var editLayer = shps.editLayer;
	// 提供给清除功能
	mapShps.push(slayer);
	var particularsList = '';
	particularsList = "建筑名称 : " + name + "/n";
	if((address) && (address != "null")){
		particularsList += "详细地址 : " + address + "/n";
	}
	particularsList += "经度 : " + x + "/n";
	particularsList += "纬度 : " + y;
	addAttributeTip(editLayer, x, y, zToHeight, particularsList);
	// 键值对保存图层
	var tempLayer = {};
	tempLayer[id] = slayer;
	searchLayer.push(tempLayer);
	// 控制图标显示
	$('#xyhide_' + id).hide();
	$('#xyshow_' + id).show();
	$('.zst_cionXY_' + id).val(0);
}
/**
 * 搜索结果气泡显隐
 * 
 * @param id,数据id
 * @param name,名字
 * @param address,地址
 * @param x,经度
 * @param y,纬度
 */
function showOrHide(id, name, address, x, y) {
	$('.zst_cionXY_' + id).unbind('click').click(function() {
		// 默认隐藏状态(1)
		var State = $('.zst_cionXY_' + id).val();
		// 显隐控制
		if (State == "1") {
			// 详情查询气泡
			particulars(id, name, address, x, y);
			// 控制图标显示
			$('#xyhide_' + id).hide();
			$('#xyshow_' + id).show();
			$('.zst_cionXY_' + id).val(0);
		} else {
			for (var i = 0; i < searchLayer.length; i++) {
				if (searchLayer[i][id]) {
					deleteAttributeTip(searchLayer[i][id], x, y, zToHeight);
				}
			}
			// 控制图标隐藏
			$('#xyhide_' + id).show();
			$('#xyshow_' + id).hide();
			$('.zst_cionXY_' + id).val(1);
		}
	});
}
/**
 * 搜索结果收藏功能及显隐
 * 
 * @param id,数据id
 */
function ctrlLabel(id,name){
	$('.zst_cionSC_' + id).unbind('click').click(function() {
		// 默认隐藏状态(1)
		var State = $('.zst_cionSC_' + id).val();
		// 显隐控制
		if (State == "1") {
			// 添加标注
			addView(name);
			alert("\""+name+"\"" + "视点保存成功");
			// 控制图标显示
			$('#schide_' + id).hide();
			$('#scshow_' + id).show();
			$('.zst_cionSC_' + id).val(0);
		} else {
			// 删除标注(缺少接口...)
			
			// 控制图标隐藏
			$('#schide_' + id).show();
			$('#scshow_' + id).hide();
			$('.zst_cionSC_' + id).val(1);
		}
	});
}

/**
 * 搜索结果范围线功能及显隐
 * 
 * @param id,数据id
 */
function rangeDisplay(id,areaShp){
	$('.zst_cionFWX_' + id).unbind('click').click(function() {
		// 默认隐藏状态(1)
		var State = $('.zst_cionFWX_' + id).val();
		// 显隐控制
		if (State == "1") {
			// 范围线展示
			if(graphicsState){// 不存在则加载
				administrativeDisplay(id,areaShp);
				graphicsState = false;
			}else{
				for(var i = 0;i< graphicsArray.length; i++){
					if(graphicsArray[i].id == id){
						 map3D.showlayer(graphicsArray[i].graphic);
					}
				}
			}
			// 控制图标显示
			$('#fwxhide_' + id).hide();
			$('#fwxshow_' + id).show();
			$('.zst_cionFWX_' + id).val(0);
		} else {
			// 范围线隐藏
			if(!graphicsState){// 存在则隐藏
				for(var i = 0;i< graphicsArray.length; i++){
					if(graphicsArray[i].id == id){
						 map3D.hidelayer(graphicsArray[i].graphic);
					}
				}
			}
			// 控制图标隐藏
			$('#fwxhide_' + id).show();
			$('#fwxshow_' + id).hide();
			$('.zst_cionFWX_' + id).val(1);
		}
	});
}

/**
 * 不同类型不同的功能列表节点
 * 
 * @param type,类型
 * @param id,数据id
 * @param name,名称
 * @param address,地址
 * @param x,经度
 * @param y,纬度
 * @param areaShp,区域名点集
 * @returns {String},列表节点
 */
function functionListType(dataTypeDefault, id, name, address, x, y,areaShp) {
	// 列表节点
	var resultList = '';
	// UI设计类型
	var dataType = '';
	// server提供的类型
	switch (dataTypeDefault) {
		// 点
		case "POINT":
			dataType = '点';
			break;
		// 线
		case "LINE":
			dataType = '路';
			break;
		// 面
		case "SURFACE":
			dataType = '面';
			break;
		// 控规
		case "KG":
			dataType = '面';
			break;
		// 热点标注
		case "LABEL":
			dataType = '点';
			break;
		default:
			dataType = 'POI';
			break;
	}
	/** 各个类型列表节点**/
	if (dataType == '点') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">点</span>';
		resultList += '</ul>';
		resultList += '</li>';
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += viewList(id);
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += particularsEyeList(id,name,address,x,y);
		resultList += favoritesList(id,name);
		resultList += '</div>';
		resultList += '</ul>';
	} else if (dataType == '路') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">路</span>';
		resultList += '</ul>';
		resultList += '</li>';
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += roamList(id);
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += particularsEyeList(id,name,address,x,y);
		resultList += favoritesList(id,name);
		resultList += '</div>';
		resultList += '</ul>';
	} else if (dataType == '面') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">面</span>';
		resultList += '</ul>';
		resultList += '</li>';
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += flyRoamList(id);
		resultList += '<span class="map_ss_jg_fg"></span> ';
		resultList += rangeLineList(id,areaShp);
		resultList += favoritesList(id,name);
		resultList += '</div>';
		resultList += '</ul>';
	} else if (dataType == '区') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">区</span>';
		resultList += '</ul>';
		resultList += '</li>';
		resultList += '<div class="map_ss_jg_lb_menu_icon">';
		resultList += flyRoamList(id);
		resultList += '<span class="map_ss_jg_fg"></span> ';
		resultList += rangeLineList(id,areaShp);
		resultList += favoritesList(id,name);
		resultList += '</div>';
		resultList += '</ul>';
	} else if (dataType == '倾斜摄影') {
		resultList += '<ul class="map_ss_jg_lb_menu_text1">';
		resultList += '<span>类型：</span>';
		resultList += '<span class="leixing">面</span>';
		resultList += '</ul>';
		resultList += '</li>';
		resultList += '<li class="map_ss_jg_lb_menu_icon">';
		resultList += roamList(id);
		resultList += '<span class="map_ss_jg_fg"></span> ';
		resultList += '<span class="zst_cion"><img src="../img/hs1.png"><img class="icon1" src="../img/hs2.png"></span>';
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += '</li>';
		resultList += '<li class="map_ss_jg_lb_menu_icon">';
		resultList += viewList(id);
		resultList += '<span class="map_ss_jg_fg"></span>';
		resultList += rangeLineList(id,areaShp);
		resultList += particularsEyeList(id,name,address,x,y);
		resultList += favoritesList(id,name);
		resultList += '</li>';
		resultList += '</ul>';
	}else{
		resultList += '</li>';
		resultList += '</ul>';
	}
	return resultList;
}
/**
 * 范围线功能节点
 * 
 * @param id,数据id
 * @param areaShp,区域名点集
 * @returns {String},列表节点
 */
function rangeLineList(id,areaShp){
	// 去掉回车换行
	var areaShpDeal;
	if(areaShp){
		areaShpDeal=areaShp.replace(/[\r\n]/g,"");
	}
	var resultList='';
	resultList += '<span title="范围线" value="1" onclick="rangeDisplay(\''+id + '\',\'' + areaShpDeal+'\')" class="zst_cionFWX_'+id+'"><img id="fwxhide_' + id + '" src="../img/fwx1.png"><img class="icon1" id="fwxshow_' + id + '" src="../img/fwx2.png"></span>';
	return resultList;
}

/**
 * 全漫游功能节点
 * 
 * @param id,数据id
 * @returns {String},列表节点
 */
function roamList(id){
	var resultList='';
	resultList += '<span class="zst_cion" id="walk" onclick="socionics(\'walk_'+ id + '\')"><img src="../img/bx1.png"><img class="icon1" src="../img/bx2.png"></span> ';
	resultList += '<span class="zst_cion" id="drive" onclick="socionics(\'drive_'+ id + '\')"><img src="../img/cx1.png"><img class="icon1" src="../img/cx2.png"></span>';
	resultList += '<span class="zst_cion" id="fly" onclick="socionics(\'fly_' + id + '\')"><img src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>';
	return resultList;
}
/**
 * 漫游飞行功能节点
 * 
 * @param id,数据id
 * @returns {String},列表节点
 */
function flyRoamList(id){
	var resultList='';
	resultList += '<span class="zst_cion" id="fly" onclick="socionics(\'fly_' + id + '\')"><img src="../img/fx1.png"><img class="icon1" src="../img/fx2.png"></span>';
	return resultList;
}
/**
 * 视角功能节点
 * 
 * @param id,数据id
 * @returns {String},列表节点
 */
function viewList(id){
	var resultList='';
	resultList += '<span class="zst_cion" id="leftView" onclick="socionics(\'leftView_' + id + '\')"><img src="../img/zst_icon.png"><img class="icon1" src="../img/zst_icon1.png"></span>';
	resultList += '<span class="zst_cion" id="topView" onclick="socionics(\'topView_' + id + '\')"><img src="../img/fst_icon.png"><img class="icon1" src="../img/fst_icon1.png"></span>';
	resultList += '<span class="zst_cion" id="zeroView" onclick="socionics(\'zeroView_' + id + '\')"><img src="../img/ldj1.png"><img class="icon1" src="../img/ldj2.png"></span>';
	resultList += '<span class="zst_cion" id="fotyFiveView" onclick="socionics(\'fotyFiveView_' + id + '\')"><img src="../img/swdj1.png"><img class="icon1" src="../img/swdj2.png"></span>';
	resultList += '<span class="zst_cion" id="ninetyView" onclick="socionics(\'ninetyView_'+ id + '\')"><img src="../img/jsdj1.png"><img class="icon1" src="../img/jsdj2.png"></span>';
	return resultList;
}
/**
 * 收藏功能节点
 * 
 * @param id,数据id
 * @param name,名称
 * @returns {String},列表节点
 */
function favoritesList(id,name){
	var resultList='';
	resultList += '<span style="float: right; margin-right: 10px;" value="1" onclick="ctrlLabel(\''+id+ '\',\'' + name+'\')" class="zst_cionSC_'+id+'"><img src="../img/ssjg_sc1.png" id="schide_' + id + '">';
	resultList += '<img class="icon1" src="../img/ssjg_sc2.png" id="scshow_' + id + '"></span>';
	return resultList;
}
/**
 * 详情功能节点
 * 
 * @param id,数据id
 * @param name,名称
 * @param address,地址
 * @param x,经度
 * @param y,纬度
 * @returns {String},列表节点
 */
function particularsEyeList(id,name,address,x,y){
	var resultList='';
	resultList += '<span id="result4Clear" class="zst_cionXY_' + id + '" value="1" onclick="showOrHide(\'' + id + '\',\'' + name + '\',\'' + address + '\',\'' + x + '\',\''
			   + y + '\')"><img name="hideResult4Clear" id="xyhide_' + id + '" src="../img/ssjg_xy1.png"><img name="showResult4Clear" id="xyshow_'
			   + id + '" class="icon1" src="../img/ssjg_xy2.png"></span>';
	return resultList;
}

/**
 * 分页查询
 * 
 * @param pageNo,页码
 * @param totalPage,总页数
 * @returns {String},列表节点
 */
function pagerSearch(pageNo, totalPage) {
	// 若超出限制则只显示前25*9---200条记录
	if (totalPage > 25) {
		totalPage = 25;
	}
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageNode = "";
	pageNode += '<div style="width: 100%; height: 24px; background: #f0f3f4;position: absolute; bottom: 0px;">';
	pageNode += '<div class="fanye1">';
	// 第一页
	pageNode += '<span style="width: 25px;" onclick="searchSubmit(' + 1 + ')">&lt;&lt;</span> ';
	// 上一页
	if (currPage == 1) {
		pageNode += '<span style="width: 20px;">&lt;</span> ';
	} else {
		pageNode += '<span style="width: 20px;" onclick="searchSubmit(' + (pageNo - 1) + ')">&lt;</span> ';
	}
	// 当前页
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	var endPage = (startPage + 3) > totalPage ? totalPage : (startPage + 3);
	for (var page = startPage; page <= endPage; page++) {
		if (page == currPage) {
			pageNode += '<span style="width: 25px;" class="shuzi"><b>' + page + '</b></span>';
		} else {
			pageNode += '<span style="width: 25px;" class="shuzi" onclick="searchSubmit(' + page + ')">' + page + '</span>';
		}
	}
	// 下一页
	if (currPage == totalPage) {
		pageNode += '<span style="width: 20px;">&gt;</span>';
	} else {
		pageNode += '<span style="width: 20px;" onclick="searchSubmit(' + (pageNo + 1) + ')">&gt;</span>';
	}
	// 最后一页
	pageNode += '<span style="width: 25px;" onclick="searchSubmit(' + totalPage + ')">&gt;&gt;</span>';
	pageNode += '</div>';
	pageNode += '</div>';
	return pageNode;
}
/**
 * 输入框监听回车事件
 */
function keyDownQuerySearch() {
	var event = document.all ? window.event : e;
	if (event.keyCode == 13) {
		searchSubmit(1);
	}
}

/**
 * 列表高度自适应
 */
$(window).resize(function() {
	var searchResultHeight = document.body.clientHeight - 96 - 35 - 30 ;
	$("#searchPOIResult").css("height", searchResultHeight + "px");
});