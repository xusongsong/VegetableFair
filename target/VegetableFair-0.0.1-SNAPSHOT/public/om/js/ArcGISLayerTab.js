var map2D = null;
/**
 * 定义二维地图事件
 * mapExtentChange
 */
var mapExtentChange = null;
var graphicLayer;
var map2DFlag = true;
$(document).ready(function(){
	$('.btm_right_top_right_esld').toggle(function(){
		layerSwitchState = 0;
		cityListState = 1;
		//$('.btm_left_menu').css("display","none");
		$('.btm_right').css("left","72px");
		$('#map3D').css("width","50%");	
		$('#map2D').css("display","block");	
		$('#map2D').css("width","50%");	
		/*调用arcgis服务*/
			load2D("map2D",120.22,30.21,10);//初始化ArcGIS服务
		//开启三维事件
		 content3d.attachEvent("FireOnLButtonUp",leftButtonEvent);
		 content3d.attachEvent("FireOnMouseWheel",mouseWheelEvent);
	},function(){
		layerSwitchState = 1
		//$('.btm_left_menu').css("display","block");
		$('.btm_right').css("left","352px");
		$('#map3D').css("width","100%");	
		$('#map2D').css("display","none");	
		$('#map2D').css("width","0%");
		//关闭二维事件
		removeMapClick(mapExtentChange);
		mapExtentChange = null;
		//关闭三维事件
		content3d.detachEvent("FireOnLButtonUp",leftButtonEvent);
		content3d.detachEven("FireOnMouseWheel",mouseWheelEvent);
	});
	
});
/**
 * 初始化天地图
 * divId->二维容器
 * lon->经度坐标
 * lat->纬度坐标
 * zoom->地图缩放比例
 * type->服务类型
 * url->服务地址
 */
function load2D(divId,lon,lat,zoom){
	require([
	         "esri/map", "esri/SpatialReference","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/geometry/Circle", "esri/symbols/SimpleFillSymbol",  
	         "esri/graphic", "esri/layers/GraphicsLayer", "esri/symbols/TextSymbol",  
	         "dojo/dom", "dojo/dom-attr", "dojo/domReady!"
	       ], function(
	         Map, SpatialReference,ArcGISDynamicMapServiceLayer,ArcGISTiledMapServiceLayer,Circle, SimpleFillSymbol, 
	         Grahpic, GraphicsLayer,dom, domAttr) {
		if(map2DFlag){
			map2D = new Map(divId, {
		         basemap: "streets",
		          center: [lon, lat],
		          zoom: zoom
		        }); 
			map2D.spatialReference =  new SpatialReference(4326);
			 map2DFlag = false;		
		}
		
				 mapExtentChange = map2D.on("extent-change", function(e){
					 var scale = map2D.getScale();//获取地图比例
						var extent = map2D.extent;
					  	var x = (extent.xmax + extent.xmin) / 2;
						var y = (extent.ymax + extent.ymin) / 2;
						//墨卡托转地理坐标
					  var Lon = x / 20037508.34 * 180;
				      var Lat = y / 20037508.34 * 180;
				      var height = scale / 6;
					map3D.flyPosition(Lon,Lat,height,0, -0.49*3.14, 1, 0);
				 });				
	});
}
//添加图标标注
function addMarker(map,lon,lat,iconOpt){
	this.iconOpt = iconOpt;
	var iconUrl = this.iconOpt.Url || "";
	var iconName = this.iconOpt.Name || "";
	var iconWidth = this.iconOpt.Width || 20;
	var iconHeight = this.iconOpt.Hidth || 20;
	 //设置标注的经纬度
    var pt = new esri.geometry.Point(lon,lat,map.spatialReference);
    var symbol = new esri.symbol.PictureMarkerSymbol(iconUrl, iconWidth, iconHeight);
    //要在模版中显示的参数
    var attr = { "Name":iconName};

    //创建模版
    var infoTemplate = new esri.InfoTemplate("标题","<b>名称: </b>${Name}<br/>");
    var graphic = new esri.Graphic(pt, symbol, attr, infoTemplate);
    //把图像添加到刚才创建的图层上
    map.graphicLayer.add(graphic);
	return graphic;
}
/*二维地图移除事件*/
function removeMapClick(mapE)
 {
 //移除地图的点击事件
	mapE.remove();
}
function leftButtonEvent(x,y){	
	var points = map3D.getViewPoint();
	var map3Lon = points.split(";")[0].split(":")[1];
	var map3Lat = points.split(";")[1].split(":")[1];
	var centerPoint = new esri.geometry.Point(map3Lon,map3Lat);
	map2D.centerAt(centerPoint);
}
function mouseWheelEvent(x,y){
	var points = map3D.getCameraPoint();
	var map3height = points.split(";")[2];
	var scale = getScale(map3height);
	map2D.setScale(scale);
}
function getScale(height){
	    var scales=[591657527.591555,295828763.795777,147914381.897889,73957190.948944,36978595.474472,18489297.737236,
	                9244648.868618,4622324.434309,2311162.217155,1155581.108577,577790.554289,288895.277144,144447.638572,
	                72223.819286,36111.909643,18055.954822,9027.977411,4513.988705,2256.994353,1128.497176,564.248588,
	                282.124294,141.062147,70.5310735];
	    var heights=[98609587.93192583,49304793.96596283,24652396.9829815,12326198.49149067,6163099.245745333,3081549.622872667,
	                 1540774.811436333,770387.4057181667,385193.7028591667,192596.8514295,96298.42571483333,48149.21285733333,24074.60642866667,
	                 12037.30321433333,6018.651607166667,3009.325803666667,1504.662901833333,752.3314508333333,376.1657255,188.0828626666667,94.04143133333333,
	                 47.02071566666667,23.51035783333333,11.75517891666667];
	    var distance=100000000;
	    var minMark=0;
	    for(var i = 0;i<heights.length;i++){
	        if(Math.abs(height-heights[i]) <= distance){
	            distance = Math.abs(height-heights[i]);
	            minMark=i;
	            
	        }
	    }
	    _scale=scales[minMark];
	return _scale;
}