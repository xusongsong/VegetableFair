/**
 * OSGB功能板块
 * 
 * @author DL
 * @version 7.0
 */

// 是否初次加载倾斜摄影列表
var fristOSGBListFlag = true;
// 提供给方案压平,保存格式为key(服务名):value(图层对象)
var OSGBLayerList = [];
// 飞行定位功能,保存OSGB图层属性信息,保存格式为key(图层ID):attribute(图层对象属性)
var osgbAttribute = [];
// 显隐功能,倾斜摄影集合,保存格式为key(图层ID):value(图层对象)
var osgbLayerArray = [];
// 矢量显隐功能,倾斜摄影范围线集合,保存格式为key(图层ID):value(图层对象)
var osgbShpLayerArray = [];
// 加载功能,储存子节点的路径,保存格式为key(id):path(加载路径)
var osgbPath = {};
// 矢量加载功能,储存服务名,保存格式为key(id):name(服务名)
var shpNameById = {};
// 中间数组,处理ID和服务名匹配,保存格式为key(ID):value(服务名)
var OSGBServerNameByID = [];

/**
 * 获取倾斜摄影列表生成页面
 * @param readyFlage(是否初始化加载倾斜摄影,可填可不填)
 * @returns
 */
function getOSGBList() {
	// 仅第一次加载发送服务请求
	if (fristOSGBListFlag) {
		// 获取登录用户对应服务的服务名列表
		var sname = getSnameArrayByType("osgb");
		$.ajax({
			type : 'POST',
			data : {
				cityCode : "",
				stype : "osgb",
				sname : sname
			},
			url : '../layerManager/getCoverageList',
			success : function(data) {
				if (data.success == "1") {
					var osgbResultList = createOSGBList(data);
					$("#osgbList").html(osgbResultList);
					// 生成的列表添加样式
					$('.map_dttc_qxsy').mouseenter(function() {
						$(this).children('.map_dttc_qxsy_xh').toggleClass('map_dttc_qxsy_xhclick');
					});
					$('.map_dttc_qxsy').mouseleave(function() {
						$(this).children('.map_dttc_qxsy_xh').toggleClass('map_dttc_qxsy_xhclick');
					});
				}
				
			},
			error : function(e) {
			}
		});
	}
	fristOSGBListFlag = false;
}

/**
 * 生成倾斜摄影列表
 * 
 * @param data,结果集
 * @return osgbLIst,列表节点
 */
function createOSGBList(data) {
	var osgbResultList = '<div id="osgbListAuto" style="HEIGHT: 750px; OVERFLOW: auto; OVERFLOW-X: hidden">';
	var records = data.record;
	// 挂载列表节点
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		var name = record.sname;
		var id = record.id;
		var url = record.path;
		var attribute = record.attribute;
		if (attribute) {
			osgbAttribute[id] = attribute;
		}
		osgbPath[id] = url;
		shpNameById[id] = name;
		OSGBServerNameByID[id] = name;
		osgbResultList += '<div class="map_dttc_qxsy" id="' + id + '" value="0">';
		osgbResultList += '<span class="map_dttc_qxsy_xh" id="' + id + "_icon" + '" >';
		osgbResultList += '<span class="fh" id="' + id + "_text" + '" >' + (i + 1) + '</span>';
		osgbResultList += '</span>';
		osgbResultList += '<span style="cursor: pointer;" onclick="flyPosition(\'' + id + '\')">' + name + '</span>';// 定位
		osgbResultList += '<input type="hidden" id="' + id + "_hidden" + '" value="0"/>';
//		osgbResultList += '<span class="qxsy_fwx" id="' + id + "_fwx" + '" value="0" onclick="rangeLine(\'' + id + '\')"></span>';// 范围线
		osgbResultList += '<span class="qxsy_xy" id="' + id + "_xy" + '" value="0" onclick="showOrhiddenOSGB(\'' + id + '\')"></span>';// 显隐
		osgbResultList += '</div>';
	}
	osgbResultList += '</div>';
	return osgbResultList;
}

/**
 * 加载倾斜摄影
 * 
 * @param id,唯一标识
 * @return layer,图层对象
 */
function loadOSGB(id) {
	var layer;
	// 该id对应的加载路径
	var basePath = osgbPath[id];
	var fullPath = basePath + "/LAYER00/PRIFIXION_L00_0.osgb.zip";
	// 获取对应属性值
	var attribute = osgbAttribute[id];
	 if(attribute){
		 var srs = attribute.srs;
		 var originPoint = attribute.originPoint;
		 layer = map3D.loadOSGB(basePath, fullPath, originPoint, srs);
		 layer.Locate();
	 }
	return layer;
}

/**
 * 加载倾斜摄影范围线
 * 
 * @param id,唯一标识
 * @return layer,图层对象
 */
function loadOSGBFWX(id) {
	alert("加载倾斜摄影范围线: " + id);
	var shpLayer;
	var name = shpNameById[id];
	alert(name);
	return shpLayer;
}

/**
 * OSGB显隐
 * 
 * @param id,唯一标识
 */
function showOrhiddenOSGB(id) {
	// 选中时序号图标样式
	selectedStyle(id);
	// 显隐按钮
	var value = $('#' + id + '_xy').val();
	// 是否加载过
	var isLoad = $('#' + id).val();
	if (value == "0") {
		$('#' + id + '_xy').css("background", "url(../img/tree_xy2.png)");
		$('#' + id + '_xy').val("1");
		if (isLoad == '0') {
			// 加载倾斜摄影
			var OSGBLayer = loadOSGB(id);
			// 生成结束
			var map = {};
			map.id = id;
			map.layer = OSGBLayer;
			osgbLayerArray.push(map);
			
			// 保存数组用于压平,key(服务名):value(图层)
			var serverName = OSGBServerNameByID[id];
			var obj = {};
			obj.name = serverName;
			obj.layer = OSGBLayer;
			OSGBLayerList.push(obj);
			
			// 显隐,不重复加载
			$('#' + id).val("1");
		} else {
			// 显示倾斜摄影
			showOrHide(id, osgbLayerArray, false);
		}
	} else {
		$('#' + id + '_xy').css("background", "url(../img/tree_xy1.png)");
		$('#' + id + '_xy').val("0");
		if (isLoad == '1') {
			// 隐藏倾斜摄影
			showOrHide(id, osgbLayerArray, true);
		}
	}
}

/**
 * 范围线
 * 
 * @param id,唯一标识
 */
function rangeLine(id) {
	// 选中时序号图标样式
	selectedStyle(id);
	// 范围线按钮
	var value = $('#' + id + '_fwx').val();
	// 是否加载过
	var isLoad = $('#' + id + '_hidden').val();
	if (value == "0") {
		$('#' + id + '_fwx').css("background", "url(../img/fwx2.png)");
		$('#' + id + '_fwx').val("1");
		if (isLoad == '0') {
			// 加载倾斜摄影范围线
			var OSGBFWXlayer = loadOSGBFWX(id);
			// 生成结束
			var map = {};
			map.id = id;
			map.layer = OSGBFWXlayer;
			osgbShpLayerArray.push(map);
			// 显隐,不重复加载
			$('#' + id + '_hidden').val("1");
		} else {
			// 显示倾斜摄影
			showOrHide(id, osgbShpLayerArray, false);
		}
	} else {
		$('#' + id + '_fwx').css("background", "url(../img/fwx1.png)");
		$('#' + id + '_fwx').val("0");
		if (isLoad == '1') {
			// 隐藏倾斜摄影
			showOrHide(id, osgbShpLayerArray, true);
		}
	}
}

/**
 * 图层显隐控制
 * 
 * @param id,唯一标识
 * @param layerArray,保存图层的数组
 * @param flag,显示还是隐藏的控制状态
 */
function showOrHide(id, layerArray, flag) {
	var layer;
	for (var i = 0; i < layerArray.length; i++) {
		if (id == layerArray[i].id) {
			if (layerArray[i].layer) {
				layer = layerArray[i].layer;
			}
		}
	}
	// ture-已显示-执行隐藏
	// false-已隐藏-执行显示
	if (flag) {
		map3D.hidelayer(layer);
	} else {
		map3D.showlayer(layer);
	}
}

/**
 * 飞行定位
 * 
 * @param id,唯一标识
 */
function flyPosition(id) {
	// 选中时序号图标样式
	selectedStyle(id);
	// 获取对应属性值
	var attribute = osgbAttribute[id];
	if (attribute) {
		var lon = eval(attribute.longitude);
		var lat = eval(attribute.latitude);
		var height = eval(attribute.elevation);
		var Azimuth = eval(attribute.azimuth);
		var Pitch = eval(attribute.pitch);
		var range = eval(attribute.range);
		var time = 3;
		// 飞行定位
		map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
	}
}

/**
 * 选中时序号图标样式
 * 
 * @param id,唯一标识
 */
function selectedStyle(id) {
	$('.map_dttc_qxsy_xh').css("background", "url(../img/dw_b.png)");
	$('.fh').css("color", "black");
	$('#' + id + "_icon").css("background", "url(../img/dw_r.png)");
	$('#' + id + "_text").css("color", "red");
}

/**
 * 列表高度自适应
 */
$(window).resize(function() {
	var windowHeight = document.body.clientHeight;
	$("#osgbListAuto").css("height", (windowHeight - 151) + "px");
});