var map2D = null;
/**
 * 定义二维地图事件 mapExtentChange
 */
var mapExtentChange = null;
var graphicLayer = null;//图片标注数据层
var map2DFlag = true;
$(document).ready(function() {
	$('.btm_right_top_right_esld').toggle(function() {
		layerSwitchState = 0;
		cityListState = 1;
		$('.btm_right').css("left", "72px");
		$('#map3D').css("width", "50%");
		$('#map2D').css("display", "block");
		$('#map2D').css("width", "50%");
		//调用arcgis服务 
		map2D = loadMap("map2D", 120.22, 30.21, 10);// 初始化ArcGIS服务
		/*
		 * 添加二维图片标注
		 */
		graphicLayer = addGraphicLater();
		map2D.addLayer(graphicLayer);
		var iconurl ='../img/dw_r.png';
		addImageLabel(graphicLayer,120.22, 30.21,iconurl);
		/*
		 * 开启二维地图事件
		 */
		mapExtentChange = map2D.on("extent-change", function(e) {
			var scale = map2D.getScale();// 获取地图比例
			var extent = map2D.extent;
			var x = (extent.xmax + extent.xmin) / 2;
			var y = (extent.ymax + extent.ymin) / 2;
			// 墨卡托转地理坐标
			var Lon = x / 20037508.34 * 180;
			var Lat = y / 20037508.34 * 180;
			var height = scale / 6;
			map3D.flyPosition(Lon, Lat, height, 0, -0.49 * 3.14, 1, 0);
		});
		// 开启三维事件
		content3d.attachEvent("FireOnLButtonUp", leftButtonEvent);
		content3d.attachEvent("FireOnMouseWheel", mouseWheelEvent);
	}, function() {
		layerSwitchState = 1
		$('.btm_right').css("left", "352px");
		$('#map3D').css("width", "100%");
		$('#map2D').css("display", "none");
		$('#map2D').css("width", "0%");
		// 关闭二维事件
		removeMapClick(mapExtentChange);
		mapExtentChange = null;
		// 关闭三维事件
		content3d.detachEvent("FireOnLButtonUp", leftButtonEvent);
		content3d.detachEven("FireOnMouseWheel", mouseWheelEvent);
	});

});
/* 
 * 二维地图移除事件 
 */
function removeMapClick(mapE) {
	// 移除地图的点击事件
	mapE.remove();
}
/*
 * 三维鼠标左键点击移动事件
 */
function leftButtonEvent(x, y) {
	var points = map3D.getViewPoint();
	var map3Lon = points.split(";")[0].split(":")[1];
	var map3Lat = points.split(";")[1].split(":")[1];
	var centerPoint = new esri.geometry.Point(map3Lon, map3Lat);
	map2D.centerAt(centerPoint);
}
/*
 * 三维鼠标滚动事件
 */
function mouseWheelEvent(x, y) {
	var points = map3D.getCameraPoint();
	var map3height = points.split(";")[2];
	var scale = getScale(map3height);
	map2D.setScale(scale);
}
function getScale(height) {
	var scales = Config.getConstant("scales");
	var heights = Config.getConstant("heights");
	var distance = 100000000;
	var minMark = 0;
	for (var i = 0; i < heights.length; i++) {
		if (Math.abs(height - heights[i]) <= distance) {
			distance = Math.abs(height - heights[i]);
			minMark = i;

		}
	}
	_scale = scales[minMark];
	return _scale;
}