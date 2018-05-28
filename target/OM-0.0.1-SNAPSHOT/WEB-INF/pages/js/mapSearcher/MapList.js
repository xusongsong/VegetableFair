/**
 * 获取页面传值
 */
// 输入框的值
var inputText = localStorage.getItem('inputText');
// 城市名
var cityName = localStorage.getItem('cityName');
// 区域名
var areaName = localStorage.getItem('areaName');

var mapSearcher = new MapSearcher();
var jsonPath = '../js/City.json';
// 系统初次启动默认城市和区域
var defaultName = cityName;// 城市
var defaultAreaName = areaName;// 区域
// alert(inputText + '; ' + defaultName + '; ' + defaultAreaName);
$(document).ready(function() {
	// 引用获取的值
	$(".map_ss").val(inputText);
	$("#mapDefaultName").text(defaultName);
	$(".dz_qy").text(defaultAreaName);
	// 移入输入框时候自动弹出的下拉列表
	getFocusList();
	// 模拟执行搜索按键
	searchSubmit(1);
	// 新生成列表添加样式
	$('.btm_right').animate({
		left : '352px'
	}, 100);
	$('.btm_left_menu .zh_k').hide().eq(3).show();
	$('.zh_k .map_ss_jg').hide().eq(0).show();
	$('.k4,.k5,.k6').show();
	$('.k4_1,.k5_1,.k6_1,.k1').hide();
});
/**
 * 鼠标移入输入框时候生成下拉城市列表
 */
function getFocusList() {
	var cityNameList = [];
	var cityList = '';
	// 获取城市列表
	cityNameList = mapSearcher.getCityList(jsonPath, 'CITY');
	// 去除重复
	var doList = [];
	doList = uniqueList(cityNameList);
	for (var i = 0; i < doList.length; i++) {
		cityList += '<span style="margin-right: 10px;" onclick="focusList(\''
				+ doList[i] + '\')">' + doList[i] + '</span>';
	}
	$(".all_city").html(cityList);
}
/**
 * 点击输入框下拉列表的城市触发事件
 */
function focusList(cityName) {
	defaultName = cityName;
	$('.Associative').show();
	// 城市列表
	getMapList();
	$('.area_lb').hide();
	areaListState = false;
	var mapAreaList = '';
	$(".area_lb").html(mapAreaList);
}
/**
 * 获取页面中的区域列表
 */
function getMapAreaList() {
	// 点击区域列表关闭城市列表
	$('.Associative').hide();
	/*
	 * 清空列表
	 */
	// 区域列表节点
	var mapAreaList = '';
	$(".area_lb").html(mapAreaList);
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, defaultName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
			cityCode);
	// 去除重复
	var doList0 = [];
	doList0 = uniqueList(belongCityList);
	for (var i = 0; i < doList0.length; i++) {
		mapAreaList += '<span onclick="closeAreaList(\'' + doList0[i] + '\')">'
				+ doList0[i] + '</span>  ';
	}
	$(".area_lb").html(mapAreaList);
	areaListState = true;
}
/**
 * 关闭区域列表并保存选择区域
 */
function closeAreaList(areaName) {
	$('.area_lb').hide();
	areaListState = false;
	var mapAreaList = '';
	$(".area_lb").html(mapAreaList);
	$(".dz_qy").text(areaName);
	defaultAreaName = areaName;
}
/**
 * 获取页面中的城市列表
 */
function getMapList() {
	/*
	 * 清空列表
	 */
	// 城市列表节点
	var cityList = '';
	$(".Associative").html(cityList);

	// 城市名称列表
	var cityNameList = new Array();
	// 城市字母列表
	var letterlist = new Array();

	cityList += '<li class="Associative_top">';
	cityList += '<span>城市列表</span>';
	cityList += '<span class="Associative_top_gb" onclick="closeCityList();"></span>';
	cityList += '</li>';

	cityList += '<li class="City_settings">';
	cityList += '<span><span>当前城市：</span><span id="defaultName">' + defaultName
			+ '</span> </span>';
	cityList += '<span class="Default_City"><u  onclick="setDefaultName();">设置为默认城市</u></span>';
	cityList += '</li>';

	cityList += '<li class="all_city">';
	// 获取城市列表
	cityNameList = mapSearcher.getCityList(jsonPath, 'CITY');
	// 去除重复
	var doList1 = [];
	doList1 = uniqueList(cityNameList);
	for (var i = 0; i < doList1.length; i++) {
		cityList += '<span ondblclick="setupDefault(\'' + doList1[i]
				+ '\');" onclick="openCityList(\'' + doList1[i] + '\')">'
				+ doList1[i] + '</span>   ';
	}
	cityList += '<br>';
	// 获取城市开头字母
	letterlist = mapSearcher.getCityList(jsonPath, 'LETTER');
	// 去除重复
	var doList2 = [];
	doList2 = uniqueList(letterlist);
	for (var i = 0; i < doList2.length; i++) {
		cityList += '<span onclick="letterDependent(\'' + doList2[i] + '\')">'
				+ doList2[i] + '</span> ';
	}
	cityList += '</li>';
	// 获取默认城市首字母
	var letterName = mapSearcher.getCityEnameByName(jsonPath, defaultName);
	cityList += '<li class="Alphabet_City">';
	// 默认列表
	cityList += '<ul class="fy">';
	cityList += '<li style="width: 85px; height: 25px;">';
	cityList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>'
			+ letterName
			+ '</strong></span> <span style="margin-left: 5px;"><strong>'
			+ defaultName + '</strong></span>';
	cityList += '</li>';
	cityList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, defaultName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
			cityCode);
	// 去除重复
	var doList3 = [];
	doList3 = uniqueList(belongCityList);
	for (var i = 0; i < doList3.length; i++) {
		cityList += '<span onclick="chooseEvent(\'' + defaultName + '&'
				+ doList3[i] + '\');">' + doList3[i] + '</span>  ';
	}
	cityList += '</li>';
	cityList += '</ul>';

	cityList += '</li>';
	$(".Associative").html(cityList);
}
/**
 * 处理双击设置默认值
 */
function setupDefault(cityName) {
	$("#defaultName").html(cityName);
	defaultName = cityName;
	$("#mapDefaultName").html(cityName);

	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, defaultName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
			cityCode);
	// 去除重复
	var doList = [];
	doList = uniqueList(belongCityList);
	defaultAreaName = doList[0];

	$(".dz_qy").html(defaultAreaName);

}
/**
 * 设置默认城市
 */
function setDefaultName() {
	alert("设置成功保存为: " + defaultName);
	closeCityList();
}
/**
 * 点击区域名触发事件
 * 
 * @param name
 */
function chooseEvent(names) {
	var nameVals = names.split("&");
	// 城市名
	var cityName = nameVals[0];
	// 区域名
	var areaName = nameVals[1];
	$("#currentCity").html(areaName);
	// 赋值,提供给搜索功能
	$("#currentCity").val(cityName + '&' + areaName);
	defaultName = cityName;
	defaultAreaName = areaName;
	$("#mapDefaultName").text(defaultName);
	$(".dz_qy").text(defaultAreaName);
	closeCityList();
	$('.area_lb').hide();
	areaListState = false;
	var mapAreaList = '';
	$(".area_lb").html(mapAreaList);
}
/**
 * 单击城市首字母获取城市结果集事件
 * 
 * @param Ename
 */
function letterDependent(Ename) {
	var alphabetList = '';
	// 城市名称列表
	var cityNameList = new Array();
	// 获取城市列表
	cityNameList = mapSearcher.getCityByEname(jsonPath, Ename);
	// 去除重复
	var doList4 = [];
	doList4 = uniqueList(cityNameList);
	// 得到所有以该字母开头的城市
	for (var i = 0; i < doList4.length; i++) {
		alphabetList += '<ul class="fy">';
		alphabetList += '<li style="width: 85px; height: 25px;">';
		alphabetList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>'
				+ Ename
				+ '</strong></span> <span style="margin-left: 5px;"><strong>'
				+ doList4[i] + '</strong></span>';
		alphabetList += '</li>';
		alphabetList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';
		// 获取城市区域编码
		var cityCode = mapSearcher.getCityCodeByName(jsonPath, doList4[i]);
		// 获取城市下属区域
		var belongCityList = new Array();
		belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
				cityCode);
		// 去除重复
		var doList5 = [];
		doList5 = uniqueList(belongCityList);
		for (var j = 0; j < doList5.length; j++) {
			alphabetList += '<span onclick="chooseEvent(\'' + doList4[i] + "&"
					+ doList5[j] + '\');">' + doList5[j] + '</span>  ';
		}
		alphabetList += '</li>';
		alphabetList += '</ul>';
	}
	doList4 = [];
	$(".Alphabet_City").html();
	$(".Alphabet_City").html(alphabetList);
}
/**
 * 单击城市名获取城市列表事件
 * 
 * @param cityName
 */
function openCityList(cityName) {
	// 获取城市首字母
	var cityEname = mapSearcher.getCityEnameByName(jsonPath, cityName);
	var alphabetList = '';
	alphabetList += '<ul class="fy">';
	alphabetList += '<li style="width: 85px; height: 25px;">';
	alphabetList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>'
			+ cityEname
			+ '</strong></span> <span style="margin-left: 5px;"><strong>'
			+ cityName + '</strong></span>';
	alphabetList += '</li>';
	alphabetList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';

	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, cityName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
			cityCode);
	// 去除重复
	var doList6 = [];
	doList6 = uniqueList(belongCityList);
	for (var i = 0; i < doList6.length; i++) {
		alphabetList += '<span onclick="chooseEvent(\'' + cityName + '&'
				+ doList6[i] + '\');">' + doList6[i] + '</span>  ';
	}
	alphabetList += '</li>';
	alphabetList += '</ul>';
	$(".Alphabet_City").html();
	$(".Alphabet_City").html(alphabetList);
}
/**
 * 关闭并清空城市列表和区域列表
 */
function closeCityList() {
	$('.Associative').hide();
	listState = false;
	cityList = '';
	$(".Associative").html(cityList);

	$('.area_lb').hide();
	areaListState = false;
	var mapAreaList = '';
	$(".area_lb").html(mapAreaList);
}
/**
 * 去除数据集合中重复的值
 * 
 * @param array
 * @returns {Array}
 */
function uniqueList(array) {
	var r = [];
	for (var i = 0, l = array.length; i < l; i++) {
		for (var j = i + 1; j < l; j++)
			if (array[i] === array[j])
				j = ++i;
		r.push(array[i]);
	}
	return r;
}