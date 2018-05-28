/**
 * 地形影像加载功能
 * 
 * @author cd
 * @createDate 2017-09-26
 */
//地形集合,保存格式为key(图层ID):value(图层对象)
var terrainLayerList = [];
//影像集合,保存格式为key(图层ID):value(图层对象)
var imageLayerList = [];
//是否初次加载影像列表
var fristImageListFlag = true;
//是否初次加载地形列表
var fristTerrainListFlag = true;
//保存DOM图层属性信息
var terrainArray = [];
//保存DEM图层属性信息
var imageArray = [];

//#yes、#no表示是否初次加载状态
//#@show、#@hide表示(当前)节点状态,进行互斥

// 保存属性对象,key:路径,value:配置文件属性值
var terrainImageParam = [];
// 获取地形结果集
var getTerrainList = getTerrainArray();
// 获取影像结果集
var getImageList = getImageArray();

/**
 * 生成地形结果集
 */
function getTerrainArray() {
	// 服务类型
	var dataType = "dem";
	var terrainArray = [];
	// 获取登录用户对应服务的服务名列表
	var sname = getSnameArrayByType(dataType);
	// 将异步方法改为同步方法
	$.ajaxSettings.async = false;
	$.ajax({
		type : 'POST',
		data : {
			cityCode : "",
			stype : dataType,
			sname : ""
		},
		url : '../layerManager/getCoverageList',
		success : function(data) {
			/** 对封装的数据进行解析* */
			if (data.success == "1") {
				var records = data.record;
				// 所有结果按照年份储存
				var yearList = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var attribute = record.attribute;
					if (attribute) {
						var yearObj = {};
						yearObj.id = attribute.year;
						yearObj.msg = record;
						yearList.push(yearObj);
					}
				}
				terrainArray = sortWithYear(yearList,dataType,defaultDEMDateValue,defaultDEMMonthValue);
			}
		},
		error : function(e) {
		}
	});
	return terrainArray;
}

/**
 * 生成影像结果集
 */
function getImageArray() {
	// 服务类型
	var dataType = "dom";
	var imageArray = [];
	// 获取登录用户对应服务的服务名列表
	var sname = getSnameArrayByType(dataType);
	// 将异步方法改为同步方法
	$.ajaxSettings.async = false;
	$.ajax({
		type : 'POST',
		data : {
			cityCode : "",
			stype : dataType,
			sname : ""
		},
		url : '../layerManager/getCoverageList',
		success : function(data) {
			/** 对封装的数据进行解析* */
			if (data.success == "1") {
				var records = data.record;
				// 所有结果按照年份储存
				var yearList = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var attribute = record.attribute;
					if (attribute) {
						var yearObj = {};
						yearObj.id = attribute.year;
						yearObj.msg = record;
						yearList.push(yearObj);
					}
				}
				imageArray = sortWithYear(yearList,dataType,defaultDOMDateValue,defaultDOMMonthValue);
			}
		},
		error : function(e) {
		}
	});
	return imageArray;
}

/**
 * 根据年份组合结果集
 * 
 * @param yearList,根据年份生成的集合
 * @param type,数据类型(DEM,DOM)
 * @param defaultDate(默认加载的数据年份)
 * @param defaultMonth(默认加载的数据月份)
 * @returns {Array},匹配加载格式的结果集
 */
function sortWithYear(yearList,type,defaultDate,defaultMonth) {
	var terrainImageArray = [];
	/** 获取所有年份 * */
	var yearArr = [];
	for (var i = 0; i < yearList.length; i++) {
		var year = yearList[i].id;
		yearArr.push(year);
	}
	// 去除重复值
	yearArr = removeDuplicates(yearArr);
	for (var i = 0; i < yearArr.length; i++) {
		var obj = {};
		var choosedYear = yearArr[i];
		obj.year = choosedYear; 		
		// 获取同一年份下数据个数
		var num = getListNum(yearList,choosedYear);					
		obj.child = [];
		for (var j = 0; j < yearList.length; j++) {
			if (yearList[j].id == choosedYear) {
				var record = yearList[j].msg;
				var attribute = record.attribute;
				// 服务名
				obj.name = record.sname;			
				// 生产商
				obj.production = attribute.production;
				// 面积
				obj.area = attribute.area;			
				// 数据精度
				obj.precision = attribute.precision;				
				if(num == 1){// 没有子节点
					if((record.stype == type)&&(choosedYear == defaultDate)){
						obj.url = record.path + "/#yes";			
					}else{
						obj.url = record.path + "/#no";
					}
					var object = {};
					object.path = attribute.url+"/";
					object.attr = attribute;
					terrainImageParam.push(object);
				}else{
					obj.url = null;
					// 该年份下的各份数据
					var objChild = {};
					objChild.month = attribute.month;
					objChild.name = attribute.ename;
					objChild.production = attribute.production;
					objChild.area = attribute.area;
					objChild.precision = attribute.precision;
					if((record.stype == type)&&(choosedYear == defaultDate)&&(attribute.month == defaultMonth)){
						objChild.url = attribute.url + "/#yes";
					}else{
						objChild.url = attribute.url + "/#no";
					}
					obj.child.push(objChild);
					var object = {};
					object.path = attribute.url+"/";
					object.attr = attribute;
					terrainImageParam.push(object);
				}
			}
		}
		terrainImageArray.push(obj);
	}
	// 去除重复值
	terrainImageArray = removeDuplicates(terrainImageArray);
	return terrainImageArray;
}

/**
 * 获取同一年份下数据个数
 * 
 * @param yearList,根据年份生成的集合
 * @param year,匹配的年份
 * @returns num,匹配个数
 */
function getListNum(yearList,year){
	var num = 0;
	for(var i=0; i<yearList.length;i++){
		if(yearList[i].id == year){
			num++;
		}
	}
	return num;
}

/**
 * 根据路径查询属性信息
 * 
 * @param path,key:路径
 * @returns json,配置文件属性值
 */
function getAttrByPath(path){
	var attr = {};
	for(var i =0;i<terrainImageParam.length; i++){
		var param = terrainImageParam[i];
		if(param.path == path){
			attr = param.attr;
		}
	}
	return attr;
}

/**
 * 获取生成影像和地形列表
 * 
 * @param type,服务类型
 */
function getTerrainOrImageList(type) {
	if(type == "image"){
		document.getElementById("domNameforTI").innerText = "历史影像";
		$("#imageList").show();
		$("#terrainList").hide();
		if(fristImageListFlag){
			//获取结果集
			var imageList = getImageList;
			//列表节点
			var imgResultList = '';
			//影像列表
			imgResultList += '<ul class="lsyx_sj_left">';
			var childIsNull=true;
			for(var i=0;i<imageList.length;i++){
				if(imageList[i].child.length == 0){
					if(imageList[i].year == defaultDOMDateValue){
						if(childIsNull){
							imgResultList += '<span style="margin-top: 67px;color:#2f88e6;" class="lsyx_sj_left_text1" id="' + imageList[i].url + '">' + imageList[i].name + '</span>';
							childIsNull = false;
						}else{
							imgResultList += '<span style="color:#2f88e6;" class="lsyx_sj_left_text1" id="' + imageList[i].url + '">' + imageList[i].name + '</span>';
						}
					}else{
						if(childIsNull){
							imgResultList += '<span style="margin-top: 67px;" class="lsyx_sj_left_text1" id="' + imageList[i].url + '">' + imageList[i].name + '</span>';
							childIsNull = false;
						}else{
							imgResultList += '<span style="" class="lsyx_sj_left_text1" id="' + imageList[i].url + '">' + imageList[i].name + '</span>';
						}
					}
				}else{
					imgResultList += '<span style="margin-top: 67px;" class="lsyx_sj_left_text1" id="' + imageList[i].url + '">' + imageList[i].year + '</span>';
					for(var j=0;j<imageList[i].child.length;j++){
						if(imageList[i].child[j].month == defaultDOMMonthValue){
							imgResultList += '<span style="color:#2f88e6;" class="lsyx_sj_left_text2" id="' + imageList[i].child[j].url + '">' + imageList[i].child[j].month + '</span>';
						}else{
							imgResultList += '<span class="lsyx_sj_left_text2" id="' + imageList[i].child[j].url + '">' + imageList[i].child[j].month + '</span>';
						}
					}
				}
			}
			imgResultList += '</ul>';
			imgResultList += '<ul class="lsyx_sj_center" id="imageCss">';
			imgResultList += '<span><img src="../img/lsyx_sjz.png"></span>';
			for(var i=0;i<imageList.length;i++){
				if(imageList[i].child.length == 0){
					if(imageList[i].year == defaultDOMDateValue){
						imgResultList += '<span class="sjz_dd_image" onclick="setTerImgToggle(this,\'' + "image" + '\');" id="' + imageList[i].url + "#@show" + '" value="' + imageList[i].year + "#@" + imageList[i].name + "#@" + imageList[i].production + "#@" + imageList[i].area + "#@" + imageList[i].precision + '"><img src="../img/lsyx_dd.png"><img class="pic1_image" src="../img/lsyx_dd1.png"></span><!-- ../img/lsyx_dd.png大项 -->';
					}else{
						imgResultList += '<span class="sjz_dd_image" onclick="setTerImgToggle(this,\'' + "image" + '\');" id="' + imageList[i].url + "#@null" + '" value="' + imageList[i].year + "#@" + imageList[i].name + "#@" + imageList[i].production + "#@" + imageList[i].area + "#@" + imageList[i].precision + '"><img src="../img/lsyx_dd.png"><img class="pic1_image" src="../img/lsyx_dd1.png"></span><!-- ../img/lsyx_dd.png大项 -->';
					}
				}else{
					imgResultList += '<span class="sjz_dd_image" onclick="setTerImgToggle(this,\'' + "image" + '\');" id="' + imageList[i].url + "#@null" + '" value="' + imageList[i].year + "#@" + imageList[i].name + "#@" + imageList[i].production + "#@" + imageList[i].area + "#@" + imageList[i].precision + '"><img src="../img/lsyx_dd.png"><img class="pic1_image" src="../img/lsyx_dd1.png"></span><!-- ../img/lsyx_dd.png大项 -->';
					for(var j=0;j<imageList[i].child.length;j++){
						if(imageList[i].child[j].month == defaultDOMMonthValue){
							imgResultList += '<span class="sjz_dd_image" onclick="setTerImgToggle(this,\'' + "image" + '\');" id="' + imageList[i].child[j].url + "#@show" + '" value="' + imageList[i].year + "#@" + imageList[i].child[j].month + "#@" + imageList[i].child[j].name + "#@" + imageList[i].child[j].production + "#@" + imageList[i].child[j].area + "#@" + imageList[i].child[j].precision + '"><img src="../img/lsyx_xd22.png"><img class="pic1_image" src="../img/lsyx_xd11.png"></span><!-- ../img/lsyx_xd.png小项 -->';
						}else{
							imgResultList += '<span class="sjz_dd_image" onclick="setTerImgToggle(this,\'' + "image" + '\');" id="' + imageList[i].child[j].url + "#@null" + '" value="' + imageList[i].year + "#@" + imageList[i].child[j].month + "#@" + imageList[i].child[j].name + "#@" + imageList[i].child[j].production + "#@" + imageList[i].child[j].area + "#@" + imageList[i].child[j].precision + '"><img src="../img/lsyx_xd22.png"><img class="pic1_image" src="../img/lsyx_xd11.png"></span><!-- ../img/lsyx_xd.png小项 -->';
						}
					}
				}
			}
			imgResultList += '</ul>';
			imgResultList += '<ul class="lsyx_sj_right" id="informationWindow">';
			imgResultList += '<li id="lsyx_k_image" class="lsyx_sj_right_menu">';
			imgResultList += '<ul class="lsyx_sj_right_menu_top"></ul>';
			imgResultList += '<ul class="lsyx_sj_right_menu_center">';
			imgResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;"><strong id="terImgInformationName_image"> </strong></span>';
			imgResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;" id="terImgInformationProduction_image"> </span>';
			imgResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;" id="terImgInformationArea_image"> </span>';
			imgResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;" id="terImgInformationPrecision_image"> </span>';
			imgResultList += '</ul>';
			imgResultList += '</li>';
			imgResultList += '</ul>';
			//影像列表
			$("#imageList").html(imgResultList);
			fristImageListFlag = false;
			$('.pic1_image').hide();
			$('.sjz_dd_image').mouseenter(function() {
				$(this).children('img').hide().eq(1).show();
			});
			$('.sjz_dd_image').mouseleave(function() {
				$(this).children('img').hide().eq(0).show();
			});
			setCssFunction("image");
		}
	}else if(type == "terrain"){
		document.getElementById("domNameforTI").innerText = "历史地形";
		$("#imageList").hide();
		$("#terrainList").show();
		if(fristTerrainListFlag){
			//获取结果集
			var terrainList = getTerrainList;
			//列表节点
			var terrainResultList = '';
			//地形列表
			terrainResultList += '<ul class="lsyx_sj_left">';
			var childIsNull=true;
			for(var i=0;i<terrainList.length;i++){
				if(getTerrainList[i].child.length == 0){
					if(terrainList[i].year == defaultDEMDateValue){
						if(childIsNull){
							terrainResultList += '<span style="margin-top: 67px;color: #2f88e6;" class="lsyx_sj_left_text1" id="' + terrainList[i].url + '">' + terrainList[i].name + '</span>';
							childIsNull = false;
						}else{
							terrainResultList += '<span style="color: #2f88e6;" class="lsyx_sj_left_text1" id="' + terrainList[i].url + '">' + terrainList[i].name + '</span>';
						}
					}else{
						if(childIsNull){
							terrainResultList += '<span style="margin-top: 67px;" class="lsyx_sj_left_text1" id="' + terrainList[i].url + '">' + terrainList[i].name + '</span>';
							childIsNull = false;
						}else{
							terrainResultList += '<span style="" class="lsyx_sj_left_text1" id="' + terrainList[i].url + '">' + terrainList[i].name + '</span>';
						}
					}
				}else{
					terrainResultList += '<span style="margin-top: 67px;" class="lsyx_sj_left_text1" id="' + terrainList[i].url + '">' + terrainList[i].year + '</span>';
					for(var j=0;j<terrainList[i].child.length;j++){
						if(terrainList[i].child[j].month == defaultDEMMonthValue){
							terrainResultList += '<span style="color:#2f88e6;" class="lsyx_sj_left_text2" id="' + terrainList[i].child[j].url + '">' + terrainList[i].child[j].month + '</span>';
						}else{
							terrainResultList += '<span class="lsyx_sj_left_text2" id="' + terrainList[i].child[j].url + '">' + terrainList[i].child[j].month + '</span>';
							
						}
					}
				}
			}
			terrainResultList += '</ul>';
			terrainResultList += '<ul class="lsyx_sj_center" id="terrainCss">';
			terrainResultList += '<span><img src="../img/lsyx_sjz.png"></span>';
			for(var i=0;i<terrainList.length;i++){
				if(terrainList[i].child.length == 0){
					if(terrainList[i].year == defaultDEMDateValue){
						terrainResultList += '<span class="sjz_dd_terrain" onclick="setTerImgToggle(this,\'' + "terrain" + '\');" id="' + terrainList[i].url + "#@show" + '" value="' + terrainList[i].year + "#@" + terrainList[i].name + "#@" + terrainList[i].production + "#@" + terrainList[i].area + "#@" + terrainList[i].precision + '"><img src="../img/lsyx_dd.png"><img class="pic1_terrain" src="../img/lsyx_dd1.png"></span><!-- ../img/lsyx_dd.png大项 -->';
					}else{
						terrainResultList += '<span class="sjz_dd_terrain" onclick="setTerImgToggle(this,\'' + "terrain" + '\');" id="' + terrainList[i].url + "#@null" + '" value="' + terrainList[i].year + "#@" + terrainList[i].name + "#@" + terrainList[i].production + "#@" + terrainList[i].area + "#@" + terrainList[i].precision + '"><img src="../img/lsyx_dd.png"><img class="pic1_terrain" src="../img/lsyx_dd1.png"></span><!-- ../img/lsyx_dd.png大项 -->';
					}
				}else{
					terrainResultList += '<span class="sjz_dd_terrain" onclick="setTerImgToggle(this,\'' + "terrain" + '\');" id="' + terrainList[i].url + "#@null" + '" value="' + terrainList[i].year + "#@" + terrainList[i].name + "#@" + terrainList[i].production + "#@" + terrainList[i].area + "#@" + terrainList[i].precision + '"><img src="../img/lsyx_dd.png"><img class="pic1_terrain" src="../img/lsyx_dd1.png"></span><!-- ../img/lsyx_dd.png大项 -->';
					for(var j=0;j<terrainList[i].child.length;j++){
						if(terrainList[i].child.month == defaultDEMMonthValue){
							terrainResultList += '<span class="sjz_dd_terrain" onclick="setTerImgToggle(this,\'' + "terrain" + '\');" id="' + terrainList[i].child[j].url + "#@show" + '" value="' + terrainList[i].year + "#@" + terrainList[i].child[j].month + "#@" + terrainList[i].child[j].name + "#@" + terrainList[i].child[j].production + "#@" + terrainList[i].child[j].area + "#@" + terrainList[i].child[j].precision + '"><img src="../img/lsyx_xd22.png"><img class="pic1_terrain" src="../img/lsyx_xd11.png"></span><!-- ../img/lsyx_xd.png小项 -->';
						}else{
							terrainResultList += '<span class="sjz_dd_terrain" onclick="setTerImgToggle(this,\'' + "terrain" + '\');" id="' + terrainList[i].child[j].url + "#@null" + '" value="' + terrainList[i].year + "#@" + terrainList[i].child[j].month + "#@" + terrainList[i].child[j].name + "#@" + terrainList[i].child[j].production + "#@" + terrainList[i].child[j].area + "#@" + terrainList[i].child[j].precision + '"><img src="../img/lsyx_xd22.png"><img class="pic1_terrain" src="../img/lsyx_xd11.png"></span><!-- ../img/lsyx_xd.png小项 -->';
						}
					}
				}
			}
			terrainResultList += '</ul>';
			terrainResultList += '<ul class="lsyx_sj_right">';
			terrainResultList += '<li id="lsyx_k_terrain" class="lsyx_sj_right_menu">';
			terrainResultList += '<ul class="lsyx_sj_right_menu_top"></ul>';
			terrainResultList += '<ul class="lsyx_sj_right_menu_center">';
			terrainResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;"><strong id="terImgInformationName_terrain"> </strong></span>';
			terrainResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;" id="terImgInformationProduction_terrain"> </span>';
			terrainResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;" id="terImgInformationArea_terrain"> </span>';
			terrainResultList += '<span style="line-height: 20px; font-size: 12px; width: 110px; margin: auto; display: block;" id="terImgInformationPrecision_terrain"> </span>';
			terrainResultList += '</ul>';
			terrainResultList += '</li>';
			terrainResultList += '</ul>';
			//地形列表
			$("#terrainList").html(terrainResultList);
			fristTerrainListFlag = false;
			$('.pic1_terrain').hide();
			$('.sjz_dd_terrain').mouseenter(function() {
				$(this).children('img').hide().eq(1).show();
			});
			$('.sjz_dd_terrain').mouseleave(function() {
				$(this).children('img').hide().eq(0).show();
			});
			setCssFunction("terrain");
		}
	}
} 

/**
 * 重写信息弹窗
 * 
 * @param obj,dom节点对象
 * @param type,服务类型
 */
function cerateTIInformation(obj, type) {
	var str = obj.val();
	var arr = str.split("#@");
	if(arr.length == 5){
		document.getElementById("terImgInformationName" + "_" + type).innerText = "名称:" + arr[1];
		document.getElementById("terImgInformationProduction" + "_" + type).innerText = "提供方:" + arr[2];
		document.getElementById("terImgInformationArea" + "_" + type).innerText = "面积:" + arr[3];
		document.getElementById("terImgInformationPrecision" + "_" + type).innerText = "数据经度:" + arr[4];
	}else if(arr.length == 6){
		document.getElementById("terImgInformationName" + "_" + type).innerText = "名称:" + arr[1] + arr[2];
		document.getElementById("terImgInformationProduction" + "_" + type).innerText = "提供方:" + arr[3];
		document.getElementById("terImgInformationArea" + "_" + type).innerText = "面积:" + arr[4];
		document.getElementById("terImgInformationPrecision" + "_" + type).innerText = "数据经度:" + arr[5];
	}
}

/**
 * 初始化加载影像地形
 */
function initLayerImgTerLoad() {
	for(var i=0;i<getImageList.length;i++){
		if(getImageList[i].child.length == 0){// 没有月份
			if(getImageList[i].year == defaultDOMDateValue){
				var attr = getAttrByPath(getImageList[i].url.split("#")[0]);// MinX MinY MaxX MaxY
				var layer = map3D.loadDOM(getImageList[i].url.split("#")[0],[attr.minX,attr.minY,attr.maxX,attr.maxY],attr.minLevel,attr.maxLevel,attr.srs);
				var name = getImageList[i].url.split("#")[0];
				var imageLayer = layer;
				var map = {};
				map.layerID = name;
				map.imageLayer = imageLayer;
				imageLayerList.push(map);
			}
		}else{
			for(var j=0;j<getImageList[i].child.length;j++){
				if(getImageList[i].child[j].month == defaultDOMMonthValue){
					var attr = getAttrByPath(getImageList[i].child[j].url.split("#")[0]);// MinX MinY MaxX MaxY
					var layer = map3D.loadDOM(getImageList[i].child[j].url.split("#")[0],[attr.minX,attr.minY,attr.maxX,attr.maxY],attr.minLevel,attr.maxLevel,attr.srs);
					var name = getImageList[i].child[j].url.split("#")[0];
					var imageLayer = layer;
					var map = {};
					map.layerID = name;
					map.imageLayer = imageLayer;
					imageLayerList.push(map);
				}
			}
		}
	}
	for(var i=0;i<getTerrainList.length;i++){
		if(getTerrainList[i].child.length == 0){// 没有月份
			if(getTerrainList[i].year == defaultDEMDateValue){
				var attr = getAttrByPath(getTerrainList[i].url.split("#")[0]);// MinX MinY MaxX MaxY
				var layer = map3D.loadDEM(getTerrainList[i].url.split("#")[0],[attr.minX,attr.minY,attr.maxX,attr.maxY],attr.minLevel,attr.maxLevel,attr.srs);
				var name = getTerrainList[i].url.split("#")[0];
				var terrainLayer = layer;
				var map = {};
				map.layerID = name;
				map.terrainLayer = terrainLayer;
				terrainLayerList.push(map);
			}
		}else{
			for(var j=0;j<getTerrainList[i].child.length;j++){
				if(getTerrainList[i].child[j].month == defaultDEMMonthValue){
					var attr = getAttrByPath(getTerrainList[i].child[j].url.split("#")[0]);// MinX MinY MaxX MaxY
					var layer = map3D.loadDEM(getTerrainList[i].child[j].url.split("#")[0],[attr.minX,attr.minY,attr.maxX,attr.maxY],attr.minLevel,attr.maxLevel,attr.srs);
					var name = getTerrainList[i].child[j].url.split("#")[0];
					var terrainLayer = layer;
					var map = {};
					map.layerID = name;
					map.terrainLayer = terrainLayer;
					terrainLayerList.push(map);
				}
			}
		}
	}
}

/**
 * 控制图层显影
 * 
 * @param obj,dom节点对象
 * @param type,服务类型
 */
function setTerImgToggle(obj, type) {
	if(type == "image"){
		var str = obj.id;
		var arr = str.split("#@");
		//表示该年份下按月份分层
		if(arr[0] == "null"){
			
		}else{
			if(arr[1] == "null"){
				// $("#imageList .lsyx_sj_left").find("span").each(function(i){
				// 	this.style.color = "#000000";
				// });
				// $("#imageCss").find(".sjz_dd_image").each(function(i){
				// 	if(this.id.split("#@")[1] == "show"){
				// 		this.id = this.id.split("#@")[0] + "#@hide";
				// 	}
				// });
				// if(imageLayerList.length != 0){
				// 	for(var i=0;i<imageLayerList.length;i++){
				// 		map3D.hidelayer(imageLayerList[i].imageLayer);
				// 	}
				// }
				if(arr[0].split("#")[1] == "no"){
					var attr = getAttrByPath(arr[0].split("#")[0]);
					var layer = map3D.loadDOM(arr[0].split("#")[0],[attr.minX,attr.minY,attr.maxX,attr.maxY],attr.minLevel,attr.maxLevel,attr.srs);
					var name = arr[0].split("#")[0];
					var imageLayer = layer;
					var map = {};
					map.layerID = name;
					map.imageLayer = imageLayer;
					imageLayerList.push(map);
				}
				document.getElementById(arr[0]).style.color="#2f88e6";
				obj.id = arr[0] + "#@show";
			}else if(arr[1] == "hide"){
				// $("#imageList .lsyx_sj_left").find("span").each(function(i){
				// 	this.style.color="#000000";
				// });
				// $("#imageCss").find(".sjz_dd_image").each(function(i){
				// 	if(this.id.split("#@")[1] == "show"){
				// 		this.id = this.id.split("#@")[0] + "#@hide";
				// 	}
				// });
				// if(imageLayerList.length != 0){
				// 	for(var i=0;i<imageLayerList.length;i++){
				// 		map3D.hidelayer(imageLayerList[i].imageLayer);
				// 	}
				// }
				if(imageLayerList.length != 0){
					for(var i=0;i<imageLayerList.length;i++){
						if(imageLayerList[i].layerID == arr[0].split("#")[0]){
							map3D.showlayer(imageLayerList[i].imageLayer);
						}
					}
				}
				document.getElementById(arr[0]).style.color="#2f88e6";
				obj.id = arr[0] + "#@show";
			}else if(arr[1] == "show"){
				// $("#imageList .lsyx_sj_left").find("span").each(function(i){
				// 	this.style.color="#000000";
				// });
				// $("#imageCss").find(".sjz_dd_image").each(function(i){
				// 	if(this.id.split("#@")[1] == "show"){
				// 		this.id = this.id.split("#@")[0] + "#@hide";
				// 	}
				// });
				if(imageLayerList.length != 0){
					for(var i=0;i<imageLayerList.length;i++){
						if(imageLayerList[i].layerID == arr[0].split("#")[0]){
							map3D.hidelayer(imageLayerList[i].imageLayer);
						}
					}
				}
				document.getElementById(arr[0]).style.color="#000000";
				obj.id = arr[0] + "#@hide";
			}
		}
	}else if(type == "terrain"){
		var str = obj.id;
		var arr = str.split("#@");
		if(arr[0] == "null"){
			
		}else{
			if(arr[1] == "null"){
				// $("#terrainList .lsyx_sj_left").find("span").each(function(i){
				// 	this.style.color = "#000000";
				// });
				// $("#terrainCss").find(".sjz_dd_terrain").each(function(i){
				// 	if(this.id.split("#@")[1] == "show"){
				// 		this.id = this.id.split("#@")[0] + "#@hide";
				// 	}
				// });
				// if(terrainLayerList.length != 0){
				// 	for(var i=0;i<terrainLayerList.length;i++){
				// 		map3D.hidelayer(terrainLayerList[i].terrainLayer);
				// 	}
				// }
				if(arr[0].split("#")[1] == "no"){
					var attr = getAttrByPath(arr[0].split("#")[0]);
					var layer = map3D.loadDEM(arr[0].split("#")[0],[attr.minX,attr.minY,attr.maxX,attr.maxY],attr.minLevel,attr.maxLevel,attr.srs);
					var name = arr[0].split("#")[0];
					var terrainLayer = layer;
					var map = {};
					map.layerID = name;
					map.terrainLayer = terrainLayer;
					terrainLayerList.push(map);
				}
				document.getElementById(arr[0]).style.color="#2f88e6";
				obj.id = arr[0] + "#@show";
			}else if(arr[1] == "hide"){
				// $("#terrainList .lsyx_sj_left").find("span").each(function(i){
				// 	this.style.color="#000000";
				// });
				// $("#terrainCss").find(".sjz_dd_terrain").each(function(i){
				// 	if(this.id.split("#@")[1] == "show"){
				// 		this.id = this.id.split("#@")[0] + "#@hide";
				// 	}
				// });
				// if(terrainLayerList.length != 0){
				// 	for(var i=0;i<terrainLayerList.length;i++){
				// 		map3D.hidelayer(terrainLayerList[i].terrainLayer);
				// 	}
				// }
				if(terrainLayerList.length != 0){
					for(var i=0;i<terrainLayerList.length;i++){
						if(terrainLayerList[i].layerID == arr[0].split("#")[0]){
							map3D.showlayer(terrainLayerList[i].terrainLayer);
						}
					}
				}
				document.getElementById(arr[0]).style.color="#2f88e6";
				obj.id = arr[0] + "#@show";
			}else if(arr[1] == "show"){
				// $("#terrainList .lsyx_sj_left").find("span").each(function(i){
				// 	this.style.color="#000000";
				// });
				// $("#terrainCss").find(".sjz_dd_terrain").each(function(i){
				// 	if(this.id.split("#@")[1] == "show"){
				// 		this.id = this.id.split("#@")[0] + "#@hide";
				// 	}
				// });
				if(terrainLayerList.length != 0){
					for(var i=0;i<terrainLayerList.length;i++){
						if(terrainLayerList[i].layerID == arr[0].split("#")[0]){
							map3D.hidelayer(terrainLayerList[i].terrainLayer);
						}
					}
				}
				document.getElementById(arr[0]).style.color="#000000";
				obj.id = arr[0] + "#@hide";
			}
		}
	}
}

/**
 * 初始化列表设置CSS样式
 * 
 * @param type,服务类型
 */
function setCssFunction(type) {
	if(type == "image"){
		$("#lsyx_k_image").hide();
		$('#imageCss span').eq(1).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '200px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(1).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(2).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '245px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(2).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(3).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '290px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(3).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(4).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '335px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(4).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(5).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '385px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(5).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(6).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '435px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(6).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(7).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '480px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(7).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
		$('#imageCss span').eq(8).mouseenter(function() {
			$("#lsyx_k_image").animate({
				top : '525px'
			}, 'fast');
			cerateTIInformation($(this), "image");
			$("#lsyx_k_image").show();
		});
		$('#imageCss span').eq(8).mouseleave(function() {
			$("#lsyx_k_image").hide();
		});
	}else if(type == "terrain"){
		$("#lsyx_k_terrain").hide();
		$('#terrainCss span').eq(1).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '200px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(1).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(2).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '245px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(2).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(3).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '290px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(3).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(4).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '335px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(4).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(5).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '385px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(5).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(6).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '435px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(6).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(7).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '480px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(7).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
		$('#terrainCss span').eq(8).mouseenter(function() {
			$("#lsyx_k_terrain").animate({
				top : '525px'
			}, 'fast');
			cerateTIInformation($(this), "terrain");
			$("#lsyx_k_terrain").show();
		});
		$('#terrainCss span').eq(8).mouseleave(function() {
			$("#lsyx_k_terrain").hide();
		});
	}
}