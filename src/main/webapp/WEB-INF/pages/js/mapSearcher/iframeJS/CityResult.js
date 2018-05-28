/**
 * 此js用于map页面城市下拉列表的iframe
 * 
 * @author DL
 * @creatDate 2017-09-28
 *//*
// 封装的读取json的方法
var mapSearcher = new MapSearcher();
var jsonPath = '../js/City.json';
// map搜索框
var searchFrame;
// 城市下拉框
var maptoolCityFrame;
// 地区下拉框
var maptoolAreaFrame;
$(document).ready(function() {
	// 获取父页面的各个iframe
	searchFrame = parent.document.getElementById("searchFrame");
	maptoolCityFrame = parent.document.getElementById("maptoolCityFrame");
	maptoolAreaFrame = parent.document.getElementById("maptoolAreaFrame");
	// 获取城市列表
	getMapCityList();
	parent.document.getElementById('city').onclick = function() {
		// 若城市下拉框开启则执行(默认关闭为0)
		if (parent.maptoolCityFrameState) {
			closeCityList();
		} else {
			// map页面城市列表展开
			maptoolCityFrame.style.display = "block";
			// 获取城市列表
			getMapCityList();
			parent.maptoolCityFrameState = 1;
			// map页面区域列表关闭
			maptoolAreaFrame.style.display = "none";
			parent.maptoolAreaFrameState = 0;
		}
	}
});
*//**
 * 获取map页面中的城市列表
 *//*
function getMapCityList() {
	// 城市列表节点
	var cityList = '';
	// 城市名称列表
	var cityNameList = '';
	// 城市字母列表
	var letterlist = '';
	cityList += '<li class="Associative_top">';
	cityList += '<span>城市列表</span>';
	cityList += '<span class="Associative_top_gb" onclick="closeCityList();"></span>';
	cityList += '</li>';
	cityList += '<li class="City_settings">';
	cityList += '<span><span>当前城市：</span><span id="defaultName">' + parent.defaultName + '</span> </span>';
	cityList += '<span class="Default_City"><u  onclick="setupDefault(\'' + parent.defaultName + '\');">设置为默认城市</u></span>';
	cityList += '</li>';
	cityList += '<li class="all_city">';
	// 获取城市列表
	cityNameList = mapSearcher.getCityList(jsonPath, 'CITY');
	*//** 去除重复**//*
	var doList1 = [];
	doList1 = uniqueList(cityNameList);
	for (var i = 0; i < doList1.length; i++) {
		cityList += '<span ondblclick="setupDefaultName(\'' + doList1[i] + '\');" onclick="openCityList(\'' + doList1[i] + '\')">' + doList1[i] + '</span>   ';
	}
	cityList += '<br>';
	// 获取城市开头字母
	letterlist = mapSearcher.getCityList(jsonPath, 'LETTER');
	*//** 去除重复**//*
	var doList2 = [];
	doList2 = uniqueList(letterlist);
	for (var i = 0; i < doList2.length; i++) {
		cityList += '<span onclick="letterDependent(\'' + doList2[i] + '\')">'
				+ doList2[i] + '</span> ';
	}
	cityList += '</li>';
	// 获取默认城市首字母
	var letterName = mapSearcher.getCityEnameByName(jsonPath,parent.defaultName);
	cityList += '<li class="Alphabet_City">';
	// 默认列表
	cityList += '<ul class="fy">';
	cityList += '<li style="width: 85px; height: 25px;">';
	cityList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>' + letterName + '</strong></span> <span style="margin-left: 5px;"><strong>' + parent.defaultName + '</strong></span>';
	cityList += '</li>';
	cityList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, parent.defaultName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
			cityCode);
	*//** 去除重复**//*
	var doList3 = [];
	doList3 = uniqueList(belongCityList);
	for (var i = 0; i < doList3.length; i++) {
		cityList += '<span onclick="chooseEvent(\'' + parent.defaultName + '&' + doList3[i] + '\');">' + doList3[i] + '</span>  ';
	}
	cityList += '</li>';
	cityList += '</ul>';
	cityList += '</li>';
	$(".Associative").html(cityList);
}
*//**
 * 点击区域名触发事件
 * 
 * @param names,城市和区域名
 *//*
function chooseEvent(names) {
	var nameVals = names.split("&");
	// 城市名
	var cityName = nameVals[0];
	// 区域名
	var areaName = nameVals[1];
	// 设置默认值
	parent.defaultName = cityName;
	parent.defaultAreaName = areaName;
	parent.document.getElementById("mapDefaultName").innerText = cityName;
	parent.document.getElementById("mapDefaultAreaName").innerText = areaName;
	// 页面iframe高度自适应
	var bHeight = maptoolAreaFrame.contentWindow.document.body.scrollHeight;
	var dHeight = maptoolAreaFrame.contentWindow.document.documentElement.scrollHeight;
	var height = Math.max(bHeight, dHeight);
	maptoolAreaFrame.height = height;
	closeCityList();
}
*//**
 * 关闭并清空城市列表和区域列表
 *//*
function closeCityList() {
	// 城市列表关闭
	maptoolCityFrame.style.display = "none";
	parent.maptoolCityFrameState = 0;
	// 区域列表关闭
	maptoolAreaFrame.style.display = "none";
	parent.maptoolAreaFrameState = 0;
}
*//**
 * 设置默认值
 * 
 * @param cityName,城市名
 *//*
function setupDefault(cityName) {
	alert("设置默认城市保存为: " + cityName);
	parent.defaultName = cityName;
	closeCityList();
}
*//**
 * 双击设置默认值
 * 
 * @param cityName,城市名
 *//*
function setupDefaultName(cityName) {
	// 设置列表里的城市值
	$("#defaultName").html(cityName);
	parent.defaultName = cityName;
	// 设置工具栏城市值
	parent.document.getElementById("mapDefaultName").innerText = cityName;
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, cityName);
	// 获取城市下属区域
	var belongCityList = '';
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY', cityCode);
	*//** 去除重复**//*
	var doList = [];
	doList = uniqueList(belongCityList);
	// 默认取第一个区域名
	parent.defaultAreaName = doList[0];
	// 设置工具栏区域值
	parent.document.getElementById("mapDefaultAreaName").innerText = parent.defaultAreaName;
}
*//**
 * 单击城市名获取城市列表
 * 
 * @param cityName,城市名
 *//*
function openCityList(cityName) {
	// 获取城市首字母
	var cityEname = mapSearcher.getCityEnameByName(jsonPath, cityName);
	var alphabetList = '';
	alphabetList += '<ul class="fy">';
	alphabetList += '<li style="width: 85px; height: 25px;">';
	alphabetList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>' + cityEname + '</strong></span> <span style="margin-left: 5px;"><strong>' + cityName + '</strong></span>';
	alphabetList += '</li>';
	alphabetList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, cityName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY', cityCode);
	*//** 去除重复**//*
	var doList6 = [];
	doList6 = uniqueList(belongCityList);
	for (var i = 0; i < doList6.length; i++) {
		alphabetList += '<span onclick="chooseEvent(\'' + cityName + '&' + doList6[i] + '\');">' + doList6[i] + '</span>  ';
	}
	alphabetList += '</li>';
	alphabetList += '</ul>';
	$(".Alphabet_City").html();
	$(".Alphabet_City").html(alphabetList);
}
*//**
 * 单击城市首字母获取城市结果集事件
 * 
 * @param Ename,城市首字母
 *//*
function letterDependent(Ename) {
	var alphabetList = '';
	// 城市名称列表
	var cityNameList = new Array();
	// 获取城市列表
	cityNameList = mapSearcher.getCityByEname(jsonPath, Ename);
	*//** 去除重复**//*
	var doList4 = [];
	doList4 = uniqueList(cityNameList);
	// 得到所有以该字母开头的城市
	for (var i = 0; i < doList4.length; i++) {
		alphabetList += '<ul class="fy">';
		alphabetList += '<li style="width: 85px; height: 25px;">';
		alphabetList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>' + Ename + '</strong></span> <span style="margin-left: 5px;"><strong>' + doList4[i] + '</strong></span>';
		alphabetList += '</li>';
		alphabetList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';
		// 获取城市区域编码
		var cityCode = mapSearcher.getCityCodeByName(jsonPath, doList4[i]);
		// 获取城市下属区域
		var belongCityList = new Array();
		belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY', cityCode);
		*//** 去除重复**//*
		var doList5 = [];
		doList5 = uniqueList(belongCityList);
		for (var j = 0; j < doList5.length; j++) {
			alphabetList += '<span onclick="chooseEvent(\'' + doList4[i] + "&" + doList5[j] + '\');">' + doList5[j] + '</span>  ';
		}
		alphabetList += '</li>';
		alphabetList += '</ul>';
	}
	doList4 = [];
	$(".Alphabet_City").html();
	$(".Alphabet_City").html(alphabetList);
}
*//**
 * 去除数据集合中重复的值
 * 
 * @param array
 * @returns {Array}
 *//*
function uniqueList(array) {
	var r = [];
	for (var i = 0, l = array.length; i < l; i++) {
		for (var j = i + 1; j < l; j++)
			if (array[i] === array[j])
				j = ++i;
		r.push(array[i]);
	}
	return r;
}*/