/*
 * 基于天地图的二三维联动
 */
var map2D = null;
/**
 * 定义二维地图事件 clickEvent
 */
var timer;//定义的一个定时器
var customerWinInfo = null;//图片标注弹出框
var zoomendEvent = moveendEvent = null;
var ismap2D = true;
var is3Dor2D = "3D";
$(document).ready(
		function() {
			$('.btm_right_top_right_esld').toggle(
					function() {
						layerSwitchState = 0;
						cityListState = 1;
						$('.btm_right').css("left", "72px");
						$('#map3D').css("width", "50%");
						$('#map2D').css("display", "block");
						$('#map2D').css("width", "50%");
						// 调用天地图服务
						if (ismap2D) {
							var points = map3D.getCameraPoint();
							var zoom = getLevel(points.split(";")[2]);
							var lat = points.split(";")[0];
							var lon = points.split(";")[1];
							map2D = loadMap("map2D", lat, lon,zoom);// 初始化天地图服务	
								map2D.enableHandleMouseScroll();//允许鼠标滚轮缩放地图
								map2D.enableInertia();//允许鼠标地图惯性拖拽	
							
							/*
							 * 添加二维图片标注
							 */
							var iconurl = '../img/dw_r.png';
							iconMarker = addIconMarker(map2D, 120.22, 30.21,
									iconurl, 20, 20, 0, 0);
							ismap2D = false;
						}
						/* 给图片标注绑定事件 */
						TEvent.addListener(iconMarker, "mouseover",
								function() {
									customerWinInfo = addWinInfo(map2D,
											"kelan</br>hello", 120.22, 30.21);
								});
						TEvent.addListener(iconMarker, "mouseout", function(){
							 map2D.removeOverLay(customerWinInfo);
						});
						/*
						 * 开启二维地图事件
						 */
						//鼠标
						zoomendEvent = TEvent.addListener(map2D,"zoomend",function(n){
							var zoom = map2D.getZoom();//获取地图等级
							var scale = levelToScale(zoom);
							var height = scale / 6;
							if(is3Dor2D == "2D"){
								return;
							}
							map3D.flyPosition(map2D.getCenter().getLng(), map2D.getCenter().getLat(), height, 0, -0.49 * 3.14, 1, 0);
							is3Dor2D == "3D";
							
						});
						//鼠标拖动事件
						moveendEvent = TEvent.addListener(map2D,"moveend",function(n){
							var zoom = map2D.getZoom();//获取地图等级
							var scale = levelToScale(zoom);
							var height = scale / 6;
							map3D.flyPosition(map2D.getCenter().getLng(), map2D.getCenter().getLat(), height, 0, -0.49 * 3.14, 1, 0);
						});
						
							// 开启三维事件
							 content3d.attachEvent("FireOnLButtonUp",
							 leftButtonEvent);
							 content3d.attachEvent("FireOnMouseWheel",
							 mouseWheelEvent);
					
						
					}, function() {
						layerSwitchState = 1
						$('.btm_right').css("left", "352px");
						$('#map3D').css("width", "100%");
						$('#map2D').css("display", "none");
						$('#map2D').css("width", "0%");
						// 关闭二维事件
						 removeMapClick(zoomendEvent);
						 removeMapClick(moveendEvent);
						// 关闭三维事件
						 content3d.detachEvent("FireOnLButtonUp",
						 leftButtonEvent);
						 content3d.detachEvent("FireOnMouseWheel",
						 mouseWheelEvent);
					});

		});
/*
 * 二维地图移除事件
 */
function removeMapClick(mapE) {
	// 移除地图的点击事件
	TEvent.removeListener(mapE); 
}
/*
 * 三维鼠标左键点击移动事件
 */
function leftButtonEvent(x, y) {
	//var points = map3D.getViewPoint();
	var points = map3D.getCameraPoint();
	var map3Lon = points.split(";")[0];
	var map3Lat = points.split(";")[1];
	//var map3Lon = points.split(";")[0].split(":")[1];
	//var map3Lat = points.split(";")[1].split(":")[1];
	map2D.setCenterAtLngLat(new TLngLat(parseFloat(map3Lon), parseFloat(map3Lat)));//变换天地图的中心点坐标
}
/*
 * 三维鼠标滚动事件
 */
function mouseWheelEvent(x, y) {
	is3Dor2D = "2D";
	var points = map3D.getCameraPoint();
	var map3height = points.split(";")[2];
	var zoom = getLevel(map3height);
	map2D.setZoom(zoom);	
}
/*
 * 通过高度获取二维地图的缩放级别
 */
function getLevel(height) {
	var scales = Config.getConstant("Tscales");
	var heights = Config.getConstant("Theights");
	var data = Config.getConstant("Tdata");
	var distance = 100000000;
	var minMark = 0;
	for (var i = 0; i < heights.length; i++) {
		if (Math.abs(height - heights[i]) <= distance) {
			distance = Math.abs(height - heights[i]);
			minMark = i;
		}
	}
	var scale = scales[minMark];
	var zoom = 0;
	for(var i=0;i<data.length;i++){
		if(scale == data[i].scale){
			zoom = data[i].level;
		}
	}
	return zoom;
}
/*
 * 获取天地图的zoom，得到对应的缩放距离scale
 */
function levelToScale(zoom){
	var Tscale = null;
	var data = Config.getConstant("Tdata");
	for(var i=0;i<data.length;i++){
	if(zoom == data[i].level){
	Tscale = data[i].scale;
	}
	}
	return Tscale;
}
/*
 * 获取天地图的缩放距离scale，得到对应的zoom
 */
function scaleToLevel(scale){
	var TZoom = null;
	var data = Config.getConstant("Tdata");
	for(var i=0;i<data.length;i++){
	if(scale == data[i].scale){
	TZoom = data[i].level;
	}
	}
	return TZoom;
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
	var scale = scales[minMark];
	return scale;
}