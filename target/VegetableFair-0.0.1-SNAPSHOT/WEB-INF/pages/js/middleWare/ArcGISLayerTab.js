/*
 * 基于arcgis的二三维联动
 */
var map2D = null;
var _overFlag = "out";
/**
 * 定义二维地图事件 mapExtentChange
 */
var mapExtentChange = mouseOver = mouseOut = null;
var graphicLayer = null;//图片标注数据层
var ismap2D = true;
var is3Dor2D = "3D";
$(document).ready(function() {
	$('.btm_right_top_right_esld').toggle(function() {
		layerSwitchState = 0;
		cityListState = 1;
		$('.btm_right').css("left", "72px");
		$('#map3D').css("width", "50%");
		$('#map3D').css("float", "right");
		$('#map2D').css("display", "block");
		$('#map2D').css("width", "50%");
		//调用arcgis服务 
		if(ismap2D){
			map2D = loadMap("map2D",Config.getConstant("longitude"), Config.getConstant("latitude"),8);// 初始化ArcGIS服务
			//添加切片地图服务
			addTiledMap(map2D,"https://192.168.10.34:6443/arcgis/rest/services/middleWare/hzTileMap/MapServer");
			ismap2D = false;
		}	
		/*开启三维事件*/
		content3d.attachEvent("FireOnLButtonUp", leftButtonEvent);
		content3d.attachEvent("FireOnMouseWheel", mouseWheelEvent);
		/*
		 * 开启二维地图事件,当鼠标聚焦在二维地图的时候，触发范围改变事件
		 */
		mouseOver = map2D.on("mouse-over",function(e){
			mapExtentChange = map2D.on("extent-change", function(t) {
				var scale = map2D.getScale();// 获取地图比例
				var extent = map2D.extent;
				var Lon = (extent.xmax + extent.xmin) / 2;
				var Lat = (extent.ymax + extent.ymin) / 2;
				/*// 墨卡托转地理坐标
				var Lon = x / 20037508.34 * 180;
				var Lat = y / 20037508.34 * 180;*/
				var height = scale / 6;		
					map3D.flyPosition(Lon, Lat, height, 0, -0.49 * 3.14, 1, 0);				
			});
			// 关闭三维事件
			content3d.detachEvent("FireOnLButtonUp", leftButtonEvent);
			content3d.detachEvent("FireOnMouseWheel", mouseWheelEvent);
		});
		mouseOut = map2D.on("mouse-out",function(e){
			//alert(2);
				if(mapExtentChange == null){
					return;
				}
				else{
					removeMapClick(mapExtentChange);
					mapExtentChange = null;
					// 开启三维事件
					content3d.attachEvent("FireOnLButtonUp", leftButtonEvent);
					content3d.attachEvent("FireOnMouseWheel", mouseWheelEvent);
				}			
			});
		
		
	}, function() {
		layerSwitchState = 1;
		 $(".btm_right").css("width",  document.body.clientWidth - 71 + "px"); //获取全屏宽度
		$(".btm_right").css("left", "71px");
		//关闭右侧页面
		if(cityListState == 0 ){
			$('.btm_left_menu .zh_k').hide();
			$(".btm_right_top_left_xy span").removeClass(
					"btm_right_top_left_xy_dx1");
			cityListState = 1;
		}
		//$('.btm_right').css("left", "352px");
		$('#map3D').css("width", "100%");
		$('#map2D').css("display", "none");
		$('#map2D').css("width", "0%");
		removeMapClick(mouseOut);
		mouseOut = null;
		removeMapClick(mouseOver);
		mouseOver = null;
		content3d.datachEvent("FireOnLButtonUp", leftButtonEvent);
		content3d.datachEvent("FireOnMouseWheel", mouseWheelEvent);
		//关闭左侧工具栏响应状态
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
	
	var points = map3D.getCameraPoint();
	var map3Lon = points.split(";")[0];
	var map3Lat = points.split(";")[1];
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
/*
 * 通过高度获取二维地图的缩放比例
 */
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
	var scale = scales[minMark];
	return scale;
}