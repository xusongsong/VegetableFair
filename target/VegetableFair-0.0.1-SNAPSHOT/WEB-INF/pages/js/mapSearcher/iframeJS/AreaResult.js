/**
 * 此js用于搜索框下拉列表的iframe
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
	// 获取区域列表
	getAreaList(parent.defaultName);
	parent.document.getElementById('area').onclick = function() {
		// 若地区下拉框开启则执行(默认关闭为0)
		if (parent.maptoolAreaFrameState) {
			closeCityList();
		} else {
			// map页面区域列表展开
			maptoolAreaFrame.style.display = "block";
			// 获取区域列表
			getAreaList(parent.defaultName);
			parent.maptoolAreaFrameState = 1;
			// map页面城市列表关闭
			maptoolCityFrame.style.display = "none";
			parent.maptoolCityFrameState = 0;
		}
	}
});
*//**
 * 单击城市名获取城市列表事件
 * 
 * @param cityName,城市名
 *//*
function getAreaList(cityName) {
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, cityName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',cityCode);
	*//** 去除重复**//*
	var doList6 = [];
	doList6 = uniqueList(belongCityList);
	var alphabetList = '';
	for (var i = 0; i < doList6.length; i++) {
		alphabetList += '<span onclick="chooseEvent(\'' + cityName + '&' + doList6[i] + '\');">' + doList6[i] + '</span>  ';
	}
	$(".area_lb").html(alphabetList);
	// 页面iframe高度自适应
	var bHeight = maptoolAreaFrame.contentWindow.document.body.scrollHeight;
	var dHeight = maptoolAreaFrame.contentWindow.document.documentElement.scrollHeight;
	var height = Math.max(bHeight, dHeight);
	maptoolAreaFrame.height = height;
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
	closeCityList();
}
*//**
 * 关闭并清空城市列表和区域列表
 *//*
function closeCityList() {
	// 城市下拉关闭
	maptoolCityFrame.style.display = "none";
	parent.maptoolCityFrameState = 0;
	// 区域关闭
	maptoolAreaFrame.style.display = "none";
	parent.maptoolAreaFrameState = 0;
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