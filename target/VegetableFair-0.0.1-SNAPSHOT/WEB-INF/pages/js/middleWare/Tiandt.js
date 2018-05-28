function loadMap(mapId,lon,lat,zoom){
var map = null;
	try {
	map = new TMap(mapId); //初始化地图对象
	map.centerAndZoom(new TLngLat(lon,lat), zoom);//设置显示地图的中心点和级别
	} catch(err) {
			alert('天地图加载不成功，请稍候再试！你可以先使用其他功能！');
	}
	map.switchingMaps("EPSG:4326"); 
	return map;
}
//添加图片标注
function addIconMarker(map,lon,lat,iconurl,height,width,xPixel,yPixel){
	 var icon = new TIcon(iconurl, new TSize(height,width), {anchor: new TPixel(xPixel,yPixel)});
	 var marker =  new TMarker(new TLngLat(lon, lat), {icon: icon});
	map.addOverLay(marker);
	return marker;
}
//添加标注弹出框
function addWinInfo(map,content,lon,lat){
var config = {
        		offset:new TPixel(3,-60),
        		position:new TLngLat(lon,lat)
        	};
        	var customerWinInfo=new TLabel(config);
        	customerWinInfo.setLabel(content);
        	customerWinInfo.setAnchorPer([0.5,0]);//偏移量
        	customerWinInfo.getObject().style.zIndex = 10000;
        	map.addOverLay(customerWinInfo);
			return customerWinInfo;
}
//添加文字标注
function addTextMarker(map,name,lon,lat){
var marker = null;
	var config = {
		text:name,
		offset:new TPixel(0,10),
		position:new TLngLat(lon,lat)
	};
	marker =new TLabel(config);//创建地图文本对象
	marker.setAnchorPer([0.5,0]);//偏移量
	marker.setBorderLine (0);
	map.addOverLay(marker);
	return marker;
}