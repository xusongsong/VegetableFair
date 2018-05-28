/**
 * 加载二维地图
 * 
 * @param mapDiv
 * @param lat
 * @param lon
 * @param zoom
 * @returns {Map}
 */
function loadMap(mapDiv, lat, lon, zoom) {
	var map = null;
	require([ "esri/map" ], function(Map) {
		map = new Map(mapDiv, {
			basemap : "streets",
			center : [ lat, lon ],
			zoom : zoom,
			logo : false
		});
	});
	return map;
}

// 添加坐标系
function addSpatialReference() {
	var spatialReference = null;
	require([ "esri/SpatialReference" ], function(SpatialReference) {
		spatialReference = new SpatialReference(4326);

	});
	return spatialReference;
}
// 创建一个graphic图层，用于存放图片标注
function addGraphicLater() {
	var graphicLayer = null;
	// 创建图层
	require([ "esri/layers/GraphicsLayer" ], function(GraphicsLayer) {
		graphicLayer = new GraphicsLayer();
	});
	return graphicLayer;
}

// 添加图片标注
function addImageLabel(layer, xx, yy, iconurl) {
	var pt = new esri.geometry.Point(xx, yy, addSpatialReference());
	var symbol = new esri.symbol.PictureMarkerSymbol(iconurl, 25, 25);
	// 要在模版中显示的参数
	var attr = {
		"Name" : "zhangsan"
	};
	// 创建模版
	var infoTemplate = new esri.InfoTemplate("标题", "<b>名称: </b>${Name}<br/>");
	var graphic = new esri.Graphic(pt, symbol, attr, infoTemplate);
	// 把图像添加到刚才创建的图层上
	layer.add(graphic);
}
