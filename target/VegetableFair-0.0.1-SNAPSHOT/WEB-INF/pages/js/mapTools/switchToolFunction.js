/**
 * 封装地图工具方法
 * @author lixiang
 * @param layers
 */

/*全屏方法*/
var _windowHeight;//全局监听ESC事件参数
/*--------------------------------------------------全屏功能-----------------------------------------------------------------*/
function fullScreen() {
	/*获取屏幕坐标*/
	_windowHeight  = document.body.clientHeight;//获取整个页面body高度
	var screenHeight  = window.screen.height; //获取屏幕分辨率高
	var screenWidth  = window.screen.width;	//获取屏幕分辨率宽
	/*f11监听事件调用*/
	WshShell = new ActiveXObject('WScript.Shell');//调用active插件获取对象
    WshShell.SendKeys('{F11}');//添加F11触发事件
	/*f11操作整个全屏事件开启*/
	$(".OMmap_btm").css("height",screenHeight+"px");//设置地图div为屏幕分辨率高度
	$(".OMmap_btm").css("width", screenWidth+"px");//设置地图div为屏幕分辨率宽度
	$(".btm_right").css("left","0px");//设置容器至左边地图工具与地图列表的距离
	$(".OMmap_top").css("display","none");//设置地图顶div为隐藏
	$(".OMmap_btm_left").css("display","none");//设置左边地图工具栏位隐藏
	$(".btm_left_menu li").css("display","none");//设置左边地图工具列表栏为隐藏
	$(".btm_right_left_dz").css("display","none");//设置地图杭州市-市辖区栏位隐藏
	$(".btm_right_top_left_xy").css("display","none");//设置地图工具地形影像栏位隐藏
	$(".btm_right_top").css("display","none");//设置地图工具按钮栏隐藏
	$(".btm_right").css("width",screenWidth+"px");//设置地图容器宽度为屏幕分辨率宽度
	$(".btm_right").css("height",screenHeight+"px");//设置地图工具长度为屏幕分辨率长度
	/*是否开启二三维事件*/
	if(layerSwitchState == "0"){//二三维开启时
		var _btm_right_width1 = $(".btm_right").width();//全局ESC监听时间参数定义
		var _btm_right_height1 = $(".btm_right").height();
		$("#map2D").css("width", _btm_right_width1/2+"px");//二维地图展示为屏幕宽度一半
		$("#map2D").css("height", _btm_right_height1+"px");//二维地图高度展示为地图容器的一半
		$("#map2D").css("float", "left");//二维地图左浮动
		$("#map3D").css("width", _btm_right_width1/2+"px");//三维地图展示为屏幕宽度一半
		$("#map3D").css("height", _btm_right_height1+"px");//三维地图展示为屏幕高度一半
	}else{//二三维关闭时
		$("#map3D").css("width", screenWidth+"px");//设置地图展示div宽度为全屏
		$("#map3D").css("height",screenHeight+"px");//设置地图展示div高度为全屏
	}
	FullScreenState = true;//设置是否为全屏状态
};

/*--------------------------------------------------全幅功能-----------------------------------------------------------------*/
/*全幅功能*/
function fullWidth(){
/*	map3D.flyPosition(Config.getConstant("longitude"), //配置文件读取杭州经度坐标
					  Config.getConstant("latitude"),//杭州纬度坐标
					  Config.getConstant("elevation"), //杭州高程坐标
					  Config.getConstant("Azimuth"),//杭州旋转角坐标
					  Config.getConstant("Pitch"),//杭州俯仰角坐标
					  Config.getConstant("range"),//杭州视距范围
					  Config.getConstant("time"))//飞行定位预飞行时间
*/	
	/*若有漫游模式则关闭*/
	if (roamModeState == 0) {
		roamMode("clearRoamMode");
	}
	 map3D.flyPosition(119.5000907,29.5132123,275000,
	         0,-0.46*3.14,3,3);//飞行定位	

}

/*--------------------------------------------------定向观察功能-----------------------------------------------------------------*/
/*定向观察*/
var dxgcflag = true;
function directionView(){
	map3D.DirectObserva(dxgcflag);//调用SDK定向观察接口
	if (dxgcflag) {
		dxgcflag = false;
	} else {
		dxgcflag = true;
	}
}

/*--------------------------------------------------漫游模式功能-----------------------------------------------------------------*/
//此功能调用SDK方法选项，里面的速度控制可在map3D里面进行调节修改
var walkState = driveState = flyState = 1;//漫游模式单独状态值添加(单击当当前开启的漫游模式，完成关闭)
/*漫游模式*/
function roamMode(type){
	if(type == "onWalk"){
		map3D.createRoamMode("OnWalk");//车行
		roamModeState = 0;
		walkState = 0;
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#walk').toggleClass('used_mapTools');
	}else if(type == "onDrive"){
		map3D.createRoamMode("OnDrive");//步行
		roamModeState = 0;
		driveState = 0;
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#drive').toggleClass('used_mapTools');
	}else if(type == "onFly"){
		map3D.createRoamMode("OnFly");//飞行
		roamModeState = 0;
		flyState = 0;
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#fly').toggleClass('used_mapTools');
	}else if(type == "clearRoamMode"){
		map3D.destroyRoamMode();//清除漫游状态
		$('#roamMode ul').removeClass('used_mapTools');
		roamModeState = 1;
		walkState = driveState = flyState =  1;
	}
}

/**
 * 路径漫游的内联方法
 */
function roamOnclick(obj){
	var value = obj.value();
	var id = obj.id;
	if(value == '1'){
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#'+id).toggleClass('used_mapTools');
		return;
	}
	roamMode(id);//里面的参数值信息都可以动态展示
}
/*--------------------------------------------------空间测量功能-----------------------------------------------------------------*/
/*测量方法封装*/
var verticalLayers = horizontalLayers = distanceLayers = areaLayers = surfaceAreaLayers =[];//测量图层参数
var verticalLayer = horizontalLayer = distanceLayer = areaLayer = surfaceAreaLayer = null;
var layerMap = [];
var horizontalState = verticalState = distanceState = areaState = 1;
function measure(id){
	switch(id){
	case 0:
		delMeasure();
		content3d.detachEvent("FireOnLayerNotify",measureFireOnLayerNotify);
		horizontalState = verticalState = distanceState = areaState = 1;
		break;	
	//水平测量
	 case 1:
		//每次点击事件之前移除相应互斥事件处理
		content3d.detachEvent("FireOnLayerNotify",measureFireOnLayerNotify);
		content3d.attachEvent("FireOnLayerNotify", measureFireOnLayerNotify);
		 horizontalLayer = map3D.addSphereMeasure(1);
		horizontalLayers.push(horizontalLayer);
		break;
	//垂直测量
	case 2:
		//每次点击事件之前移除相应互斥事件处理
		content3d.detachEvent("FireOnLayerNotify",measureFireOnLayerNotify);
		content3d.attachEvent("FireOnLayerNotify", measureFireOnLayerNotify);
		verticalLayer = map3D.addSphereMeasure(2);
		verticalLayers.push(verticalLayer);
		break;
	//距离测量 
	case 3:
		//每次点击事件之前移除相应互斥事件处理
		content3d.detachEvent("FireOnLayerNotify",measureFireOnLayerNotify);
		content3d.attachEvent("FireOnLayerNotify", measureFireOnLayerNotify);
	    distanceLayer = map3D.addSphereMeasure(3);
		distanceLayers.push(distanceLayer);
		break;
	//面积测量
	case 4:
		//每次点击事件之前移除相应互斥事件处理
		content3d.detachEvent("FireOnLayerNotify",measureFireOnLayerNotify);
		content3d.attachEvent("FireOnLayerNotify", measureFireOnLayerNotify);
		areaLayer = map3D.addSphereMeasure(4);
		areaLayers.push(areaLayer);
		break;
	//空间测量
	case 5:
		//每次点击事件之前移除相应互斥事件处理
		content3d.detachEvent("FireOnLayerNotify",measureFireOnLayerNotify);
		content3d.attachEvent("FireOnLayerNotify", measureFireOnLayerNotify);
	    surfaceAreaLayer = map3D.addSphereMeasure(5);
		surfaceAreaLayers.push(surfaceAreaLayer);
		break;
	default:
		break;
	}
}

//当点击右键图层更新时，改变测量状态栏
function measureFireOnLayerNotify(layerid , type) {//拾取响应器触发
	var layer = layermap[layerid];
	var opt = layer.GetLayerResult();
	switch(opt.GetConfigValueByKey("DataSourceTypeName")){
		case "as_horizontal":
			horizontalState = 1 ;
			break;
		case "as_vertical":
			verticalState = 1 ;
			break;
		case "areaMeasure":
			areaLayer = 1 ;
			break;
		case "as_distance":
			distanceState = 1 ;
			break;
		default:
			break;
	}
}

/*获取测量结果*/	
function getMeasure(layerid,type){
	/*var opt = horizontalLayer.GetLayerResult();		//获取图层结果
	//判断当前图层数据源类型
	if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_horizontal")
	{
		var points = opt.GetConfigValueByKey("ClickPoints"); //获取点击点坐标
		var strs = new Array();//定义一数组
		strs = points.split(';');//获取距离测量返回数组
		var startStrs = strs[0].split(',');
		var endStrs = strs[strs.length-2].split(',');
		var startScreenXY = map3D.coordTransformation(4,{lon:startStrs[0],lat:startStrs[1],height:startStrs[2]});
		//endScreenXY =  map3D.coordTransformation(4,{lon:endStrs[0],lat:endStrs[1],height:endStrs[2]});
		alert(startScreenXY);
		var HorizontalResult = opt.GetConfigValueByKey("HorizontalResult").split(';')[0]; //获取测量结果
		//alert("HorizontalResult:" + HorizontalResult);
	}*/
	var result = new Array();
	result = map3D.GetHorizontalMeasure(horizontalLayer);
	var strs = new Array();//定义一数组
	strs = result[0].split(';');//获取距离测量返回数组
	var startStrs = strs[0].split(',');
	var endStrs = strs[strs.length-2].split(',');
	var startScreenXY = map3D.coordTransformation(4,{Lon:startStrs[0],Lat:startStrs[1],Height:startStrs[2]});
	//alert(startScreenXY);
	$("#measureReminder").css({"top":startScreenXY.split(',')[0],"left":startScreenXY.split(',')[1]});
	document.getElementById("measureReminder").style.display = "block";
	var top = $("#measureReminder").css("top");
	var left = $("#measureReminder").css("left");
	//alert(top);
	//alert(left);
}

/*清除测量方法*/
function delMeasure() {
		if(verticalLayers != null || verticalLayers != undefined) {
    for(var i = 0 ; i<verticalLayers.length ; i++){
      map3D.removelayer(verticalLayers[i]);
    }		
		}
		if(horizontalLayers != null || horizontalLayers != undefined) {
     for(var i = 0 ; i<horizontalLayers.length ; i++){
      map3D.removelayer(horizontalLayers[i]);
    } 
		}
		if(distanceLayers != null || distanceLayers != undefined) {
     for(var i = 0 ; i<distanceLayers.length ; i++){
      map3D.removelayer(distanceLayers[i]);
    } 	
		}
  if(areaLayers != null || areaLayers != undefined) {
     for(var i = 0 ; i<areaLayers.length ; i++){
      map3D.removelayer(areaLayers[i]);
    }   
  }
  if(surfaceAreaLayers != null || surfaceAreaLayers != undefined) {
     for(var i = 0 ; i<surfaceAreaLayers.length ; i++){
      map3D.removelayer(surfaceAreaLayers[i]);
    }   
  }
}

/*--------------------------------------------------移除图层方法-----------------------------------------------------------------*/
/*移除图层*/
function removeArrayLayers(layers) {
	if (layers.length != 0) {
		for (var i = 0; i < layers.length; i++) {
			map3D.removelayer(layers[i]);//SDK方法删除图层
		}
		layers = [];
	}
}	

/*--------------------------------------------------空间分析功能-----------------------------------------------------------------*/
var view=null;//可视域分析图层变量
var sight=null;//通视分析图层变量
var heightControl=null;//控高分析图层变量 
var views = [];//可视域分析图层组
var sights = [];//通视分析图层组
var heightControls = [];//控高分析图层组
var layermap = [];//图层更新组
var heightControlState = viewState = sightState = 1;
/*输入框回车触发事件*/
function spaceCallBack(){
	startHeightControl();
};

/*开启控高分析*/
function startHeightControl(){
	var height0=$("#TextBox3").val();
	if(isNaN(height0)){
		$("#TextBox3").val("0");
	}
	if(heightControl){//移除图层的同时需将其置为null值
		heightControl = map3D.updateHeightControl(heightControl,height0);//更新控高分析
		heightControls.push(heightControl);
		modifyLayer();
	}else{
		heightControl = map3D.heightControl(height0==""?0:height0);//开启控高分析
		heightControls.push(heightControl);
		modifyLayer();
	}
}

/*开启视域分析*/
function startView(){
	var VAngle=60;
	var HAngle=60;
	view = map3D.sightAnalysis(VAngle, HAngle);
	views.push(view);
	layermap[view.GetLayerID()] = view;
	view.AddObServer();
	//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);//移除互斥变量事件
	//content3d.attachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);//添加互斥状态变量事件
	$("#horizontalView").val(VAngle);//水平视角
	$("#verticalView").val(HAngle);//垂直视角
}

/*开启通视分析*/
function startSight(){
	sight = map3D.lineOfSight();
	sights.push(sight);
	layermap[sight.GetLayerID()] = sight;
	sight.AddObServer();
	//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
	//content3d.attachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
}

/*关闭控高分析*/
function shutHeightController(){
	//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
	if(heightControls){
		$("#TextBox3").val("请输入高度");
		for (var i=0;i<heightControls.length;i++){
			map3D.removelayer(heightControls[i]);
		}
	}
	heightControl=null;
	heightControlState = 1;
	$("#hbgd").html("0");
	$("#height").text("0");
}

/*关闭视域分析*/
function shutView(){
	//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
	if(views){
		for (var i=0;i<views.length;i++){
			map3D.removelayer(views[i]);
		}
		$("#view_x").html("");
		$("#view_y").html("");
		$("#view_z").html("");
		$("#aimview_x").html("");
		$("#aimview_y").html("");
		$("#aimview_z").html("");
		$("#horizontalView").val("");
		$("#verticalView").val("");
	}
	view = null;
	viewState = 1;
}

/*关闭通视分析*/
function shutSight(){
	//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
	if(sights){
		for (var i=0;i<sights.length;i++){
			map3D.removelayer(sights[i]);
		}
		$("#sight_x").html("");
		$("#sight_y").html("");
		$("#sight_z").html("");
		$("#aimsight_x").html("");
		$("#aimsight_y").html("");
		$("#aimsight_z").html("");
	}
	sight=null;
	sightState = 1;
}

/*控高添加更新图层事件封装*/
function modifyLayer(){
	layermap[heightControl.GetLayerID()] = heightControl;
	heightControl.AddObServer();
	//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
	//content3d.attachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
}

/*获取控高分析结果集*/
function getHeightControl(layerid,type) {
	if(heightControl == null || heightControl == undefined){
		return;
	}
	var opt = heightControl.GetLayerResult();		//获取图层结果
	if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_heightcontrol"){
		var clickPoints = opt.GetConfigValueByKey("ClickPoints"); 	//获取起始点坐标
		var Height = opt.GetConfigValueByKey("Height"); //控高的高度
		var arrs = new Array();
	    arrs = clickPoints.split(";");
	    var startZ =Number((arrs[0].split(","))[2]).toFixed(1);//对获取字符串进行处理转number类型并保留俩位小数
	    var altitude = Number(startZ) + Number(Height);//获取海拔高度
	    $("#hbgd").html(altitude);
	    $("#height").text(Height);    
	}
}

/*获取视域分析的观察点坐标*/
function loadViewShe(layerid,type){	
	var point3=map3D.getViewShedPos(view);
	var arr = new Array();
    arr = point3.split(",");
	$("#view_x").html("&nbsp;&nbsp;&nbsp;"+arr[0]);
	$("#view_y").html("&nbsp;&nbsp;&nbsp;"+arr[1]);
	$("#view_z").html("&nbsp;&nbsp;&nbsp;"+arr[2]);
}

/*获取视域分析的目标点坐标*/
function loadViewAim(layerid,type){	
	var point4=map3D.getViewAimPos(view);
	var arr = new Array();
    arr = point4.split(",");
	$("#aimview_x").html("&nbsp;&nbsp;&nbsp;"+arr[0]);
	$("#aimview_y").html("&nbsp;&nbsp;&nbsp;"+arr[1]);
	$("#aimview_z").html("&nbsp;&nbsp;&nbsp;"+arr[2]);
}

/*获取通视分析的观察点坐标*/
function loadLineShe(layerid,type){
	var point1=map3D.getLineOfSightStartPos(sight);
	var arr = new Array();
    arr = point1.split(",");
	$("#sight_x").html("&nbsp;&nbsp;&nbsp;"+arr[0]);
	$("#sight_y").html("&nbsp;&nbsp;&nbsp;"+arr[1]);
	$("#sight_z").html("&nbsp;&nbsp;&nbsp;"+arr[2]);
}	

/*获取通视分析的目标点坐标*/
function loadLineAim(layerid,type){
	var point2=map3D.getLineOfSightEndPos(sight);
	var arrs = new Array();
    arrs = point2.split(";");
    var arr=new Array();
    arr=arrs[0].split(",");
    $("#aimsight_x").html("&nbsp;&nbsp;&nbsp;"+arr[0]);
	$("#aimsight_y").html("&nbsp;&nbsp;&nbsp;"+arr[1]);
	$("#aimsight_z").html("&nbsp;&nbsp;&nbsp;"+arr[2]);
}


//当点击右键图层更新时，改变空间测量状态栏
/*function spaceAnalyFireOnLayerNotify(layerid , type) {//拾取响应器触发
	var layer = layermap[layerid];
	var opt = layer.GetLayerResult();
	switch(opt.GetConfigValueByKey("DataSourceTypeName")){
		case "as_heightcontrol":
			heightControlState = 1 ;
			getHeightControl(layerid,type);
			break;
		case "as_viewshed":
			viewState = 1 ;
			loadViewShe(layerid,type);
			loadViewAim(layerid,type);
			break;
		case "as_linesight":
			sightState = 1 ;
			loadLineShe(layerid,type);
			loadLineAim(layerid,type);
			break;
		default:
			break;
	}
}*/

/*清除空间测量*/
function spaceClose(){//功能关闭
	//样式变换
	if(heightControls){//清除控高分析
		//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
		$("#TextBox3").val("请输入高度");
		for (var i=0;i<heightControls.length;i++){
			map3D.removelayer(heightControls[i]);
		}
		heightControl=null;
		heightControlState = 1;
		$("#hbgd").html("0");
		$("#height").text("0");
		
	}
	if(sights){//清除通视分析
		//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
		for (var i=0;i<sights.length;i++){
			map3D.removelayer(sights[i]);
		}
		$("#sight_x").html("");
		$("#sight_y").html("");
		$("#sight_z").html("");
		$("#aimsight_x").html("");
		$("#aimsight_y").html("");
		$("#aimsight_z").html("");
		sight=null;
		sightState = 1;
	}
	if(views){//清除视域分析
		//content3d.detachEvent("FireOnLayerNotify",spaceAnalyFireOnLayerNotify);
		for (var i=0;i<views.length;i++){
			map3D.removelayer(views[i]);
		}
		$("#view_x").html("");
		$("#view_y").html("");
		$("#view_z").html("");
		$("#aimview_x").html("");
		$("#aimview_y").html("");
		$("#aimview_z").html("");
		$("#horizontalView").val("");
		$("#verticalView").val("");
		view=null;
		viewState = 1;
	}
}

/*截图功能*/
function printScreen(){
	var src = "../mapTools/print.do";
	var par = "dialogHeight:190px;dialogWidth:440px;dialogLeft:740px;dialogTop:440px;status:no;screen:no;scroll:no";
	var k = window.showModelessDialog(src,
			window, par);
}

/*--------------------------------------------------标注管理功能-----------------------------------------------------------------*/
var labelLayer;//候选标注图片图层
var labelLayers = [];//候选标注图片图层样式组
var labelName;//弹窗标注名称
var labelMemo ;//标注备注
var labelLongitude = '';//经度
var labelLatitude = '';//纬度
var labelElevation = '';//高程
var labelRotateAngle = '';//旋转角
var labelOverAngle = '';//俯仰角
var labelRange = '';//视距范围
var clickState = 1;//设置单击地图取点状态值
var labelState = 1;//设置添加标注状态值
var labelBouncedUrl = "http://" + projectIP + ":" + projectPort//弹出框页面路径
		+ "/VegetableFair/mapTools/labelDialog.do";
var imageBouncedUrl = "http://" + projectIP + ":" + projectPort //标注图片路径
		+ "/VegetableFair/img/mapdw.png"

/*---------------------------------------------------标注增删改查ajax请求方法------------------------------------------------------*/
		
/* 标注查询 */
function findLabelPoint(pagenumber) {
	var labeltName = document.getElementById("LabeltName").value;// 值为空则查询所有结果
	var pageSize = 7;//设置页码参数值
	$.ajax({
		url : '../mapTools/findLabel.do',
		type : "post",
		data : {
			name : labeltName,
			pageNo : pagenumber,
			pageSize : pageSize
		},
		success : function(data) {
			var labelResultList = '';//定义labelResultList页面挂载
			if (data.success == 1) {
				/*获得返回值*/
				var records = data.record.records;//获取返回值集合
				var totalRecords = data.record.totalRecords;//获取返回值总条目数字段
				var totalPage = data.record.totalPage;//页数(取整)
				/*labelResultList +='<div style="position:relative;height:450px;width:280px;overflow-y:auto;overflow-x:hidden;">'*/
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var id = record.id;// id
					var memo = record.memo;//备注
					memo = memo == null ?'' : memo;//对备注进行判空运算
					labelResultList += '<ul id="'
							+ id
							+ '" class="map_dttc_qxsy" style="margin-top: 25px;">';
					labelResultList += '<span class="map_dttc_qxsy_xh"> <span class="fh">'
							+ (i + 1) + '</span>';
					labelResultList += '</span>';
					labelResultList += '<span  id="label'+id+'" onclick="flyLabelPoint('//绑定飞行定位事件
							+ record.longitude + ',' + record.latitude
							+ ',' + record.elevation + ','
							+ record.rotateAngle + ','
							+ record.overAngle + ',' + record.range
							+ ',' + id + ');">' + record.name
							+ '</span>';
					labelResultList += '<span class="sdsc_sc" onclick ="delLabelPoint('//绑定删除标注事件
								+ id + ')"></span>';
					labelResultList += '<span class="sdsc_bj" onclick = "startUpdateLabel('+id+',\''+memo+'\','
					+ record.longitude + ',' + record.latitude
					+ ',' + record.elevation + ','
					+ record.rotateAngle + ','
					+ record.overAngle + ',' + record.range
					+ ');"></span>';//绑定修改标注事件
					labelResultList += '</ul>';
				}
				/*labelResultList +='</div>';*/
				labelResultList += createLabelPageList(pagenumber, totalPage);//对页面挂载进行分页挂载
			}else{
				//若查询的结果为空则
				var totalPage = 0;
				var labelResultList = '';
				labelResultList += createLabelPageList(pagenumber,0);
			}
			$('#labelResult').html(labelResultList);//页面挂载
		},
		error : function(e) {
			 alert("Ajax请求错误,请检查网络连接");
		}
	});
}

/*标注删除*/
function delLabelPoint(id){
	/*点击标注删除时 标注图标变红*/
	$('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass('map_dttc_qxsy_xhclick');// 清除所有标记
	$('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');// 特定标记
	if(confirm("确定删除此标注?")){
		$.ajax({
			url : '../mapTools/delLabel.do',
			type : 'post',
			data : {
				url : '/coo-server/vector/delPotOrLabel',
				callback : 'js',
				id : id
			},
			success : function(data){
				if(data.success == 1){
					//移除图层？
					findLabelPoint(1);
				}
				else{
					alert(data.msg);
				}
			},
			error : function(e){
				alert("ajax请求有误，请稍后重试");
			}
		});
	}
}

/*标注修改*/
function updateLabelPoint(updateLabelName,labelRemark,id){
	$.ajax({
		url : '../mapTools/updateLabel.do',
		type : 'post',
		data : {
			name : updateLabelName,
			longitude : labelLongitude,
			latitude : labelLatitude,
			elevation : labelElevation,
			rotateAngle : labelRotateAngle,
			overAngle : labelOverAngle,
			range : labelRange,
			memo : labelRemark,
			id : id
		},
		success : function(data){
			if(data.success == 1){
				findLabelPoint(1);
			}
			else{
				alert(data.msg);
			}
		},
		error : function(e){
			alert("ajax请求有误，请稍后重试");
		}
	});
}

/*标注添加*/
function addLabelPoint(wegditLabelName, wegditLabelMemo){
	$.ajax({
		url : '../mapTools/addLabel.do',
		type : 'post',
		data : {
			userId : '',
			name : wegditLabelName ,
			longitude : labelLongitude,
			latitude : labelLatitude,
			elevation : labelElevation,
			rotateAngle : labelRotateAngle,
			overAngle : labelOverAngle,
			range : labelRange,
			memo : wegditLabelMemo,
		},
		success : function(data){
			if(data.success == 1){
				findLabelPoint(1);
				alert("添加标注成功");
			}else{
				alert(data.msg);
			}
		},
		error : function(e){
			alert("ajax请求有误，请稍后重试");
		}
	});
}

/*--------------------------------------------------标注添加功能相关方法-----------------------------------------------------------------*/
//方法：当标注列表查询出来时，单击页面定位图标实现飞行定位
/*标注定位 飞行定位时图标变红样式变换*/
function flyLabelPoint(lon, lat, height, Azimuth, Pitch, range, id) {
	$('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass('map_dttc_qxsy_xhclick');// 清除所有标记
	var time = 3;// 延迟时间
	removeArrayLayers(labelLayers);
	labelLayer = map3D.createImageLabelLayer({//创建标注图标点
		liftUp:"4",
		iconUrl:imageBouncedUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	labelLayers.push(labelLayer);
	map3D.addImageLabel({
		layer:labelLayer, 
		imageValue:1,
		Lon:lon,
		Lat:lat,
		Height:height});//获取动态图片
	/*控制标注弹框出现的时间*/
	map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);// 飞行定位
	$('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');// 特定标记
	$('.bzxg_menu').hide();//修改栏弹窗隐藏
	clickState = 1;
}

/**
 * 分页路径列表创建
 * @param pageNo (分页数)
 * @param totalPage (总页数)
 * @returns pageList (分页结果集列表)
 */
function createLabelPageList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	//中间展示几页数目
	var middlePageSize = 3;
	//分页列表拼接
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageList += '<span style="width: 15px;" onclick="findLabelPoint(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick="findLabelPoint(' + (currPage - 1) + ')">&lt;</span>';
	}
	//设定中间起始值
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	//设定中间结束值
	var endPage = (startPage + middlePageSize ) > totalPage ? totalPage :(startPage + middlePageSize); 
	//该判定是为了当不足几页显示几页的样式
	if(endPage <= middlePageSize){
		endPage = middlePageSize;
	}
	//循环生成中间列表层级
	for(var page = 1; page <= endPage; page++){
		if(page == currPage){
			pageList += '<span style="width: 25px;" class="shuzi"><b>' + currPage + '</b></span>';
		}else{
			pageList += '<span style="width: 25px;" class="shuzi" onclick="findLabelPoint(' + page + ')"><b>' + page + '</b></span>';
		}
	}
	//下一页
	if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick= "findLabelPoint(' + (currPage + 1) + ') ">&gt;</span>';
	}
	//最后一页
	pageList += '<span style="width: 15px;" onclick="findLabelPoint(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}


//对标注列表进行分页展示处理
/*分页查询事件*/
function LabelPager(pageNo, totalPage) {
	// 若超出限制则只显示前25*9---200条记录
	if (totalPage > 25) {
		totalPage = 25;
	}
	var currPage = pageNo;
	var totalPage = totalPage;
	var resultList = '';
	resultList += '<div style="width: 100%; height: 24px; background: #f0f3f4;position: absolute; bottom: 0px;">';
	resultList += '<div class="fanye1">';
	//第一页
	resultList += '<span style="width: 20px;" onclick="findLabelPoint(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if (currPage == 1) {
		resultList += '<span style="width: 20px;">&lt;</span> ';
	} else {
		resultList += '<span style="width: 20px;" onclick="findLabelPoint('
				+ (currPage - 1) + ')">&lt;</span> ';
	}

	// 中间每一页
	var startPage = (currPage - 1) < 1 ? 1 :(currPage-1);
	var endPage = (startPage+3)>totalPage?totalPage:(startPage+3);
	for(var page = startPage ;page <= endPage;page++){
		if(page==currPage){
			resultList += '<span style="width: 25px;" class="shuzi"><b>' + page + '</b></span>';
		}else{
			resultList += '<span style="width: 25px;" class="shuzi" onclick="findLabelPoint(' + page + ')">' + page + '</span>';
		}
	}
	// 下一页
	if (currPage == totalPage) {
		resultList += '<span style="width: 20px;">&gt;</span>';
	} else {
		resultList += '<span style="width: 20px;" onclick="findLabelPoint('
				+ (currPage + 1) + ')">&gt;</span>';
	}
	resultList += '<span style="width: 20px;" onclick="findLabelPoint('
			+ totalPage + ')">&gt;&gt;</span>';
	resultList += '</div>';
	resultList += '</div>';
	return resultList;
}

/*--------------------------------------------------标注修改功能相关方法-----------------------------------------------------------------*/
/*开启标注弹窗*/
function startUpdateLabel(id,memo,x,y,z,rotateAngle,overAngle,range){
	$('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass('map_dttc_qxsy_xhclick');// 清除所有标记
	$('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');// 特定标记
	$('#bzxgname').val($('#label'+id).text());//标注修改窗获取标注名称信息
	$('#labelRemark').text(memo);//获取备注信息
	$('.bzxg_menu').show();//显示标注修改窗
	
	/*标注修改窗确定事件*/
	$('#bzqd').unbind('click').click(function(){
		var updateLabelName = $('#bzxgname').val();
		var labelRemark = $('#labelRemark').text();
		if(clickState == 1){
			labelLongitude = x;//赋值当前标注x坐标
			labelLatitude = y;//赋值当前标注y坐标
			labelElevation = z;//赋值当前标注z坐标
			labelRotateAngle = rotateAngle;
			labelOverAngle = overAngle;
			lablelRange = range;
		}
		updateLabelPoint(updateLabelName,labelRemark,id);//调用标注修改事件
		$('.bzxg_menu').hide();//修改栏弹窗隐藏
		clickState = 1;
	});
	
	/*点击地图事件*/
	$('.cxqd').unbind('click').click(function(){
		//SDKevent.attachEvent("FireOnLButtonUp",updateMap);
		updateMap(true);
		clickState = 0;
	});
	
	/*标注删除*/
	$('#bzsc').unbind('click').click(function(){
		$('.bzxg_menu').hide();//修改栏弹窗隐藏
		clickState = 1;
	});
}

/*标注修改重新点击地图进行取点事件*/
function updateMap(flage){
	function VPSDKCtrl::FireOnResponserNotify(x,y)
	{
		if(flage){
		 var pos = map3D.coordTransformation(3,{
	    		screenX:x,screenY:y
				}).split(','); // 将屏幕坐标点转换成经纬度坐标
		 var viewPoints2 = map3D.getViewPoint().split(';');//获取视点坐标
		 labelLongitude = pos[0];
		 labelLatitude = pos[1];
		 labelElevation = pos[2];
		 labelRotateAngle = viewPoints2[3].split(':')[1];
		 labelOverAngle = viewPoints2[4].split(':')[1];
		 labelRange = viewPoints2[5].split(':')[1];
		 updateMap(false);
		 //SDKevent.detachEvent("FireOnLButtonUp",updateMap);
		}
	}
}

/*-----------------------------------------------------标注新增事件-----------------------------------------------------------*/
//SDK未合版的测试方法
function startAddLabelTest(){
	 labelLongitude = '119.5000907';//经度
	 labelLatitude = '29.5132123';//纬度
	 labelElevation = '275000';//高程
	 labelRotateAngle = '0';//旋转角
	 labelOverAngle = '-0.46*3.14';//俯仰角
	 labelRange = '3';//视距范围
	 addLabelPoint("测试 " + Math.floor((Math.random() * 199 + 1) * 100),'SDK接口还未合版');
	 alert("SDK接口还未合版");
}


//方法:当点击添加标注按钮的时候，开启标注起始事件(1.绑定标注点击地图事件 2.绑定标注弹框响应事件 3.执行标注弹框关闭事件)
function startAddLabel(){
	map3D.removelayer(labelLayer);
	if(labelState){
		$(".tjbz_btn").css("background", "url(../img/tjbz_icon1.png)");
		labelState = 0;
		clickMap(true);
		//content3d.attachEvent('FireOnLButtonUp',clickMap);
		//添加标注时，自定义图层拾取判定参数值
		notifyState = 'startAddLabel';
		//content3d.attachEvent('FireOnResponserNotify',saveLabelWegdit);
	}else{
		$(".tjbz_btn").css("background", "url(../img/tjbz_icon.png)");
		labelState = 1;
		clickMap(false);
		//content3d.detachEvent('FireOnLButtonUp',clickMap);
		//content3d.detachEvent('FireOnResponserNotify',saveLabelWegdit);
		canelLabelWegdit();
	}
}

//方法:当点击添加标注按钮的时候，开启点击地图事件(实现:当点击地图的时候出现标注弹出窗与标注图片显示)
function clickMap(flage){
		function VPSDKCtrl::FireOnLButtonUp(x,y)
		{
			if(flage){
				 var pos = map3D.coordTransformation(3,{
			    		screenX:x,screenY:y
						}).split(','); // 将屏幕坐标点转换成经纬度坐标
				  var viewPoints2 = map3D.getViewPoint().split(';');//获取视点坐标
				  LoadLayer(pos);//加载标注图层与页面弹框
				  labelLongitude = pos[0];
				  labelLatitude = pos[1];
				  labelElevation = pos[2];
				  labelRotateAngle = viewPoints2[3].split(':')[1];
				  labelOverAngle = viewPoints2[4].split(':')[1];
				  labelRange = viewPoints2[5].split(':')[1];
			}
		}
}

//方法：显示标注图层与页面弹框，与点击地图事件相关联
function LoadLayer(pos){
	/*移除图层进行图层更新*/
	removeArrayLayers(labelLayers);
	/*if(labelLayers.length !=0){
		for(var i = 0; i <= labelLayers.length; i++ ){
			map3D.removelayer(labelLayers[i]);
		}
		labelLayers = [];
	}*/
	labelLayer = map3D.createImageLabelLayer({//map3D里面改变定位相机大小状态值
		liftUp:"4",
		iconUrl:imageBouncedUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	labelLayers.push(labelLayer);
	map3D.addImageLabel({
				layer:labelLayer, 
				imageValue:1,
				Lon:pos[0],
				Lat:pos[1],
				Height:pos[2],
				ename:''});//获取动态图片
	/*控制标注弹框出现的时间*/
	setTimeout(function(){
    	showLabelWegdit(pos);	
     },300); 
}

/*-----------------------------------------------------标注弹窗相应方法事件(SDK提供方法)-------------------------------------------*/

//备注://由于SDK所提供的方法只能知道里面传递了什么值出来，不能知晓到底执行了哪个按钮，触发了什么事件，所以在外面我们需要自行定义一个状态值进行模拟判断页面里面执行的是哪个方法
/*保存页面弹框*/
function saveLabelWegdit(){
	var msg = webResp.GetResponserResult().GetConfigValueByKey("Param");//SDK获取页面里面传递出来的参数的方法
	var msgs = msg.split('@#');
	if(msgs[0] == "1"){//获取触发事件的状态值，若触发事件是确定事件，则执行保存方法	
		var wegditLabelName = msgs[1];
		var wegditLabelMemo = msgs[2];
		if(!wegditLabelName){
			alert('标注名称不能为空');
			return;
		}
		addLabelPoint(wegditLabelName, wegditLabelMemo);
		canelLabelWegdit();
	}else{
		canelLabelWegdit();
	}
}

/*取消页面弹框*/
function canelLabelWegdit(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	webResp = null;
	$(".tjbz_btn").css("background", "url(../img/tjbz_icon.png)");
	labelState = 1;
	removeArrayLayers(labelLayers);
	clickMap(false);
	//content3d.detachEvent('FireOnLButtonUp',clickMap);//取消时需要解除绑定单击地图绑定事件
	//content3d.detachEvent('FireOnResponserNotify',saveLabelWegdit);//取消时需要解除绑定保存事件
}

/*页面弹框显示*/
var webResp = null;
function showLabelWegdit(pos) {//传递坐标值与页面跳转路径
	if (webResp) {
		//** 坐标转换* *//*
		var pOption = map.CreateResponserOptions("123"); // /< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]); // /< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]); // /< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight", pos[2]); // /< 指向经纬度坐标高度
		webResp.UpdateResponserOptions(pOption);
	} else {
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]);								///< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]);								///< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight", pos[2]);												///< 指向经纬度坐标高度
		pOption.AddConfig("Widget", "348");													///< 窗口宽度
		pOption.AddConfig("Height", "198");													///< 窗口高度
		pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
		pOption.AddConfig("Radial", "20");													///< 圆角直径
		pOption.AddConfig("Url", labelBouncedUrl);				///< 指向网页url
		pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
		pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
		webResp  = map.CreateResponser("TipsDialogResponser", pOption);		7			///< 创建响应器
		webResp.AddObserver();
		map.AddResponser(webResp);															///< 响应器添加至场景
	}
}

function AB() {
	if(webResp){
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("FunctionName", "Test");											///< 函数名
		pOption.AddConfig("FunctionParam", "20");											///< 函数参数
		webResp.UpdateResponserOptions(pOption);						///< 创建响应器
	}
}


/**--------------------------------------------------截图子页面调用父页面方法------------------------**/
var imageName = null;//图片名称
var imageFilePath = null;//图片路径

/*截图方法调用*/
function imagePrint(){
		imageFilePath = imageFilePath +"\\"; //SDK需求，拼接路径
		imageName = "" + imageName + ".jpg";
		map3D.imageCut(imageFilePath, imageName, 4);//调用SDK截图方法
}


