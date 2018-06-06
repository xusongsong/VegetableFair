/**
 * 此js用于map页面城市下拉列表的iframe
 * 
 * @author DL
 * @creatDate 2017-09-28
 */
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
});
/**
 * 鼠标移入输入框时候生成下拉城市列表
 */
function getInputFocusList() {
	// 获取城市列表
	var cityNameList = [];
	cityNameList = mapSearcher.getCityList(jsonPath, 'CITY');
	/** 去除重复**/
	var doList = [];
	doList = uniqueList(cityNameList);
	// 生成列表节点
	var cityList = '';
	for (var i = 0; i < doList.length; i++) {
		cityList += '<span style="margin-right: 10px;" onclick="focusCityList(\'' + doList[i] + '\')">' + doList[i] + '</span>';
	}
	$(".all_city").html(cityList);
}
/**
 * 点击输入框下拉列表的城市触发的事件
 * 
 * @param cityName,城市名
 */
function focusCityList(cityName) {
	// 下拉城市和区域列表及默认值
	maptoolCityFrame.contentWindow.setupDefaultName(cityName);
	// iframe搜索下拉框隐藏
	searchFrame.style.display = "none";
	parent.searchFrameState = 0;
	// 城市列表下拉框显示
	maptoolCityFrame.style.display = "block";
	parent.maptoolCityFrameState = 1;
	// iframe获取城市列表
	maptoolCityFrame.contentWindow.getMapCityList();
	// 区域列表下拉框隐藏
	maptoolAreaFrame.style.display = "none";
	parent.maptoolAreaFrameState = 0;
}
/**
 * 关闭城市列表和区域列表
 */
function closeCityList() {
	// 城市列表关闭
	maptoolCityFrame.style.display = "none";
	parent.maptoolCityFrameState = 0;
	// 区域列关闭
	maptoolAreaFrame.style.display = "none";
	parent.maptoolAreaFrameState = 0;
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