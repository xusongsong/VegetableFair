/**
 * 首页面城市列表
 * 
 * @author DL
 * @creatDate 2017-09-15
 */
// 封装的读取json的方法
var mapSearcher = new MapSearcher();
var jsonPath = '../js/City.json';
// 系统初次启动的默认城市和区域
//var defaultName = '杭州市';
var defaultName = '张家港市';
var defaultAreaName = '市辖区';

/**
 * 获取城市列表
 */
function getCityList() {
	// 城市列表节点
	var cityList = '';
	// 清空列表
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
	cityList += '<span><span>当前城市：</span><span id="defaultName">' + defaultName + '</span> </span>';
	cityList += '<span class="Default_City"><u  onclick="setDefaultName();">设置为默认城市</u></span>';
	cityList += '</li>';
	cityList += '<li class="all_city">';
	// 获取城市列表
	cityNameList = mapSearcher.getCityList(jsonPath, 'CITY');
	/** 去除重复**/
	var doList1 = [];
	doList1 = uniqueList(cityNameList);
	for (var i = 0; i < doList1.length; i++) {
		cityList += '<span ondblclick="setupDefault(\'' + doList1[i] + '\');" onclick="openCityList(\'' + doList1[i] + '\')">' + doList1[i] + '</span>   ';
	}
	cityList += '<br>';
	// 获取城市开头字母
	letterlist = mapSearcher.getCityList(jsonPath, 'LETTER');
	/** 去除重复**/
	var doList2 = [];
	doList2 = uniqueList(letterlist);
	for (var i = 0; i < doList2.length; i++) {
		cityList += '<span onclick="letterDependent(\'' + doList2[i] + '\')">' + doList2[i] + '</span> ';
	}
	cityList += '</li>';
	// 获取默认城市首字母
	var letterName = mapSearcher.getCityEnameByName(jsonPath, defaultName);
	cityList += '<li class="Alphabet_City">';
	// 默认列表
	cityList += '<ul class="fy">';
	cityList += '<li style="width: 85px; height: 25px;">';
	cityList += '<span style="font-size:24px; line-height: 25px;color:#cccccc;"><strong>'+ letterName + '</strong></span> <span style="margin-left: 5px;"><strong>' + defaultName + '</strong></span>';
	cityList += '</li>';
	cityList += '<li class="city_dm" style="width: 305px; height: 50px; margin-top:5px; margin-left:5px;">';
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, defaultName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',cityCode);
	/** 去除重复**/
	var doList3 = [];
	doList3 = uniqueList(belongCityList);
	var rowNum = 0;
	for (var i = 0; i < doList3.length; i++) {
		cityList += '<span onclick="chooseEvent(\'' + defaultName + '&' + doList3[i] + '\');">' + doList3[i] + '</span>  ';
		rowNum++;
		// 7个换行
		if (rowNum == 7) {
			cityList += '<br/>';
			rowNum = 0;
		}
	}
	cityList += '</li>';
	cityList += '</ul>';
	cityList += '</li>';
	$(".Associative").html(cityList);
}
/**
 * 点击搜索按钮
 */
function search() {
	// 城市名
	var cityName;
	// 区域名
	var areaName;
	// 输入框中的内容
	var inputText = $("#inputText").val();
	// 获取城市和区域的值
	var names = $("#currentCity").val();
	// 若未选择则显示默认城市名和区域
	if (!names) {
		cityName = defaultName;
		areaName = defaultAreaName;
	} else {
		var name = names.split("&");
		cityName = name[0];
		areaName = name[1];
	}
	// 页面传值
	$('#cityName').val(cityName);
	$('#areaName').val(areaName);
	// 页面跳转
	$("#searchBtn").submit();
}
/**
 * 双击设置默认值
 * 
 * @param cityName,城市名
 */
function setupDefault(cityName) {
	$("#defaultName").html(cityName);
	defaultName = cityName;
	$("#currentCity").html(cityName);
	// 获取城市区域编码
	var cityCode = mapSearcher.getCityCodeByName(jsonPath, defaultName);
	// 获取城市下属区域
	var belongCityList = new Array();
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',cityCode);
	/** 去除重复**/
	var doList = [];
	doList = uniqueList(belongCityList);
	defaultAreaName = doList[0];
}
/**
 * 设置默认城市
 */
function setDefaultName() {
	alert("设置成功保存为: " + defaultName);
	closeCityList();
}
/**
 * 点击区域名
 * 
 * @param name,区域名
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
	closeCityList();
}
/**
 * 单击城市首字母获取城市结果集
 * 
 * @param Ename,城市首字母
 */
function letterDependent(Ename) {
	var alphabetList = '';
	// 城市名称列表
	var cityNameList = new Array();
	// 获取城市列表
	cityNameList = mapSearcher.getCityByEname(jsonPath, Ename);
	/** 去除重复**/
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
		/** 去除重复**/
		var doList5 = [];
		doList5 = uniqueList(belongCityList);
		var rowNum = 0;
		for (var j = 0; j < doList5.length; j++) {
			alphabetList += '<span onclick="chooseEvent(\'' + doList4[i] + "&"+ doList5[j] + '\');">' + doList5[j] + '</span>  ';
			rowNum++;
			// 7个换行
			if (rowNum == 7) {
				alphabetList += '<br/>';
				rowNum = 0;
			}
		}
		alphabetList += '</li>';
		alphabetList += '</ul>';
	}
	doList4 = [];
	$(".Alphabet_City").html();
	$(".Alphabet_City").html(alphabetList);
}
/**
 * 单击城市名获取城市列表
 * 
 * @param cityName,城市名
 */
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
	belongCityList = mapSearcher.getBelongCityList(jsonPath, 'BELONGCITY',
			cityCode);
	/** 去除重复**/
	var doList6 = [];
	doList6 = uniqueList(belongCityList);
	var rowNum = 0;
	for (var i = 0; i < doList6.length; i++) {
		alphabetList += '<span onclick="chooseEvent(\'' + cityName + '&' + doList6[i] + '\');">' + doList6[i] + '</span>  ';
		rowNum++;
		// 7个换行
		if (rowNum == 7) {
			alphabetList += '<br/>';
			rowNum = 0;
		}
	}
	alphabetList += '</li>';
	alphabetList += '</ul>';
	$(".Alphabet_City").html();
	$(".Alphabet_City").html(alphabetList);
}
/**
 * 关闭并清空列表
 */
function closeCityList() {
	$('.Associative').hide();
	listState = false;
	cityList = '';
	$(".Associative").html(cityList);
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
/**
 * 点击规划专题按钮触发的事件
 * 
 * @param type,类型
 */
function openPlanMap(type) {
	// 城市名
	var cityName;
	// 区域名
	var areaName;
	// 输入框中的内容
	var inputText = $("#inputText").val();
	// 获取城市和区域的值
	var names = $("#currentCity").val();
	// 若未选择则显示默认城市名和区域
	if (!names) {
		cityName = defaultName;
		areaName = defaultAreaName;
	} else {
		var name = names.split("&");
		cityName = name[0];
		areaName = name[1];
	}
	// 页面传值
	$('#inputTextForPlan').val(inputText);
	$('#cityNameForPlan').val(cityName);
	$('#areaNameForPlan').val(areaName);
	
	if (type == "regulatory") {
		$('#regulatoryPlan').val("regulatory");
	} else if (type == "plan") {
		$('#regulatoryPlan').val("plan");
	}
	$("#regulatoryPlanBtn").submit();
}

/**
 * 点击安防图层按钮触发的事件
 */
function mapClick(id) {
    // 城市名
    var cityName;
    // 区域名
    var areaName;
    // 输入框中的内容
    var inputText = $("#inputText").val();
    // 获取城市和区域的值
    var names = $("#currentCity").val();
    // 若未选择则显示默认城市名和区域
    if (!names) {
        cityName = defaultName;
        areaName = defaultAreaName;
    } else {
        var name = names.split("&");
        cityName = name[0];
        areaName = name[1];
    }
    // 页面传值
    $('#cityName').val(cityName);
    $('#areaName').val(areaName);
    // 页面跳转
    $("#searchBtn").submit();

}