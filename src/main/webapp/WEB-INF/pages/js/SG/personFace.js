/**
 * @author shine
 * 
 * 人脸识别模块方法集
 * 
 * @date 2018-4-10
 */

//备注:观看此方法时，请先以方法为切入点，先看方法数目以及其作用，连成一条线形成业务路径，再去观看代码

//查询人脸设备时分页每页条数
var facePageSize = 7;
//人脸设备图片图层
var faceImageLayer = '';
//人脸设备图片路径
var faceImageUrl = "http://" + projectIP + ":" + projectPort
+"/VegetableFair/img/rlsb_1.png";
//人脸设备弹窗属性路径
var faceWebUrl = "http://" + projectIP + ":" + projectPort
+ "/VegetableFair/mapTools/faceAttribute.do";
//人脸识别详情弹窗路径
var faceDetailUrl =  "http://" + projectIP + ":" + projectPort
+ "/VegetableFair/mapTools/faceDetail.do";
//设备弹窗对象
var faceWebResp = null;
//人脸识别弹窗对象
var faceDetailResp = null;
//存储所有设备列表对象信息
var faceInfo = [];
//存储所有抓拍机信息
var posePictureInfo = [];
//存储所有的预警信息列表
var alarmListInfo =[];
//存储所有人脸要素数组
var faceLayerArray = [];
/**由于未提供查询人脸视频组织编号接口，以下为业务数据自取**/
//人脸第五层级组织编号
var faceFiveCode = '37078302002160547247';
//预警gif图片图层
var alarmLayer = null;
//预警gif图片图层组
var alarmFeatureArr = [];
//预警gif图片路径
var alarmGifPath = "http://" + projectIP + ":" + projectPort
+"/VegetableFair/img/jd11.gif";
//自定义ID值(弹窗与列表的唯一id值)
var id = 1;
/**
 * 获取人脸相机列表
 * @param pageNo
 * @returns
 */
function getVideoFaceList(pageNo){
	var url = '../artemis/findCameraInfoPageByTreeNode';
	var data = {
			treeNode:faceFiveCode,
			start:'0',
			size:facePageSize,
			orderby:'0',
			order:'0'
	};
	//获取人脸设备列表结果集
	$.ajax({
		url:url,
		type:'get',
		data:data,
		success:function(data){
			var faceList = '';
			//初始化清除所有的人脸要素信息(适合单页显示标注信息,若全部显示则需优化)
			deleteFaceImageAll();
			if(data.success == '1'){//若有设备结果集则
				//获取后台总数
				var total = data.record[0].total;
				//获取后台总分页数
				//var totalPage = (total/facePageSize) == 0?(total/facePageSize):((total/facePageSize)+1);
				var totalPage = Math.ceil(total/facePageSize);
				//挂载设备列表
				faceList += createVideoFaceList(data);
				//初始化创建当前人脸摄像头要素(根据faceInfo)
				loadPresentFeature();//(由于清除当前标注完毕后，再次点击当前页不触发请求，所以去除分页判断)
			}else{//若无则挂载空的分页列表
				var totalPage = 0;
			}
			faceList += pageVideoFaceList(pageNo,totalPage);
			$('#faceList').html(faceList);
		},
		error:function(e){
		}
	});
}

/**
 * 创建人脸设备列表
 * @param data
 * @returns
 */
function createVideoFaceList(data){
	var faceList = '';
	if(data.record){//判断人脸设备结果集是否为空
		var faceArray = data.record;
		for(var i = 0; i < faceArray.length; i++ ){
			var level = faceArray[i];
			//创建自定义单选ID
			var faceId = "face_"+i;
			//获取当前设备列表数组
			faceInfo[i] = level;
			faceList += '<div class="rfgl_lb_menu_lb">';
			faceList += '<div onclick="flyFacePosition(\'' + level.longitude + '\',\'' + level.latitude + '\');">';
			faceList += '<span class="rfgl_lb_menu_lb_dw">';
			faceList += '<p class="p1">' + (i+1) + '</p>';
			faceList += '</span>';
			faceList += '<span class="rfgl_lb_menu_lb_text">';
			faceList += '<span>人脸抓拍机</span>';
			faceList += '</span>';
			faceList += '<span class="rfgl_lb_menu_lb_text1">' + level.name + '</span>';
			faceList += '</div>';
			faceList += '<span class="gxbf" name="perviewCheck" id = "' + faceId + '"  value="' + level.indexCode + '" onclick= "faceChildrenChoose(\'' + faceId + '\');">';
			faceList +='</span>';
			faceList += '</div>';
	
		}
	}
	return faceList;
}

/**
 * 获取人脸抓拍机结果集
 * @returns
 */
function getPosePicture(pageNo){
	var url = "../cameraoption/cameralist";
	var data = {
			"pageNo":pageNo,
			"pageSize":1000//未有查询全部的人脸相机为了查询全部扩大pageSize值(需优化)
	};
	$.ajax({
		url:url,
		type:"get",
		data:data,
		success:function(data){
			if(data.success == '0'){
				var records = data.record.records;
				for(var i = 0; i < records.length; i++){
					var level = records[i];
					posePictureInfo.push(level);
				}
			}
		},
		error:function(e){
		}
	});
}

/**
 * 分页拼接结果集
 * @param pageNo
 * @param totalPage
 * @returns
 */
function pageVideoFaceList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	//中间展示几页数目
	var middlePageSize = 3;
	//分页列表拼接
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageList += '<span style="width: 15px;" onclick="getVideoFaceList(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	/*if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{*/
		pageList += '<span style="width: 53px;" onclick="getVideoFaceList(' + (currPage - 1) + ')">&lt;</span>';
	/*}*/
	//设定中间起始值(小于极小点)
	var startPage = currPage - 1 < 1 ? 1: currPage -1;
	//设定结束值(大于极大点)
	var endPage = (startPage + middlePageSize) > totalPage ? totalPage : (startPage + middlePageSize);
	//该判定是为了当不足几页显示几页的样式
	if(endPage <= middlePageSize){
		endPage = middlePageSize;
	}
	//循环生成中间列表层级
	for(var page = 1; page <= endPage; page++){
		/*if(page == currPage){
			pageList += '<span style="width: 25px;" class="shuzi"><b>' + currPage + '</b></span>';
		}else{*/
			pageList += '<span style="width: 25px;" class="shuzi" onclick="getVideoFaceList(' + page + ')"><b>' + page + '</b></span>';
		/*}*/
	}
	//下一页
	/*if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{*/
		pageList += '<span style="width: 53px;" onclick= "getVideoFaceList(' + (currPage + 1) + ') ">&gt;</span>';
	/*}*/
	//最后一页
	pageList += '<span style="width: 15px;" onclick="getVideoFaceList(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}

/**
 * 添加列表事件(在列表重新进行挂载后，原先的事件会失效，需重新挂载)
 * @returns
 */
function addVideoFaceEvent(){
	$('.gxbf').click(function(){
		$(this).toggleClass('gxbfclick');
	});
	$('.rfgl_lb_menu_lb').mouseenter(function(){
		$(this).children('.rfgl_lb_menu_lb_dw').toggleClass('rfgl_lb_menu_lb_dwclick');
	});
	$('.rfgl_lb_menu_lb').mouseleave(function(){
		$(this).children('.rfgl_lb_menu_lb_dw').toggleClass('rfgl_lb_menu_lb_dwclick');
	});
}

/**
 * 序号选择预览事件(预览按钮触发)
 * @returns
 */
function faceListCheck(){
	//定义当前勾选中的子节点indexCode数组
	var checkIndexCodes = [];
	//根据name值获取当前所有子节点序号栏
	var facecheks = $("[name='perviewCheck']");
	//获取当前选中的全部节点编号值
	for(var i = 0; i < facecheks.length; i++){
		if(facecheks.eq(i).hasClass('gxbfclick')){
			var indexCode = facecheks[i].value;
			checkIndexCodes.push(indexCode);
		}
	}
	//循环遍历播放当前选中的全部视频(注：视频超过9个也播放9个)
	var len = checkIndexCodes.length;
	//当前播放的视频编号
	//realIndexCode = checkIndexCodes[j];
	if(len == 1){//只有一个开放一个视频栏
		previewAllPopVideo(1,checkIndexCodes);
	}else if(len <= 4){//不满四个超过俩个开放4个视频栏
		previewAllPopVideo(4,checkIndexCodes);
	}else {//不满9个或超过9个都开放9个视频栏
		previewAllPopVideo(9,checkIndexCodes);
	}
}

/**
 * 序号全选事件(全选按钮触发)
 * @returns
 */
function faceChooseAll(){
	//根据name值获取当前所有子节点序号栏
	var facecheks = $("[name='perviewCheck']");
	var allcheck = $("#checkAll").val();
	//根据当前父节点状态循环遍历子节点进行全选操作
	for(var i = 0; i < facecheks.length; i++){
		if(allcheck == '1'){//若准备全部取消则
			if(facecheks.eq(i).hasClass("gxbfclick")){
				facecheks.eq(i).removeClass("gxbfclick");
			}
			$("#checkAll").val('0');
		}else if(allcheck == '0'){//若准备全部选中则
			if(!facecheks.eq(i).hasClass("gxbfclick")){
				facecheks.eq(i).addClass("gxbfclick");
			}
			$("#checkAll").val('1');
		}
	}
}

/**
 * 子层级序号选中联动父层级
 * @param id
 * @returns
 */
function faceChildrenChoose(id){
	//获取所有子节点信息
	var facecheks = $("[name='perviewCheck']");
	//作为全选累加器
	var sum = 0;
	if($("#"+id) !=null || $("#"+id) != undefined){
		//改变当前节点样式
		if($("#"+id).hasClass("gxbfclick")){
			$("#"+id).removeClass("gxbfclick");
		}else{
			$("#"+id).addClass("gxbfclick");
		}
		//筛选当前所有的已勾选项进行判断
		for(var i = 0; i < facecheks.length; i++){
			if(facecheks.eq(i).hasClass("gxbfclick")){
				sum++;
			}
		}
		//判断子节点是否全部选中
		if(sum == facecheks.length){
			//改变当前父节点按钮显隐值(0:全部未选 1:全部选中)
			$("#checkAll").val('1');
		}else{
			$("#checkAll").val('0');
		}
	}
}

/**
 * 批量播放视频
 * @param count 视频窗口数
 * @param checkIndexCodes 选择窗口的编号
 * @returns
 */
function previewAllPopVideo(count,checkIndexCodes){
		var videoParam = getVideoParam();
		videoParam.CamList = checkIndexCodes;
		var param = 'hikvideoclient://ReqType:' + videoParam.palyType + ';' + 'VersionTag:artemis' + ';' +  ';'+'WndCount:' + count + ';'+'SvrIp:' + videoParam.SvrIp + ';' + 'SvrPort:' + videoParam.SvrPort + ';' + 'Appkey:' + videoParam.artemisAppKey + ';' + 'AppSecret:' + videoParam.appSecret + ';' + 'time:' + videoParam.time + ';' + 'timesecret:' + videoParam.timeSecret + ';' + 'httpsflag:' +  videoParam.httpsflag + ';' + 'CamList:' + videoParam.CamList + ';';
		document.getElementById("previewPopVideo").src = param;
		//window.location.href = param;
}

/**
 * 飞行定位人脸摄像机位置
 * @param lon
 * @param lat
 * @returns
 */
function flyFacePosition(lon,lat){
	//获取飞行定位坐标
	var height = videoHeight;
	var Azimuth = 0.273371041489176;
	var Pitch = -0.5019506333936141;
	var range = 77.73607483319054;
	var time = 3;
	// 飞行定位(需判断经纬度是都为空，若不判断，map3D会报类型不匹配)
	if(lon == '' || lat == ''){
		//lon = 118.83553;
		//lat = 36.85229;
		return;
	}
	map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
}


/**
 * 根据当前摄像头匹配对应的摄像头对象(获取单个)
 * @param id
 * @returns
 */
function getFaceLevelById(indexCode){
	var level = null;
	if(indexCode){
		for(var i = 0; i < faceInfo.length; i++){
			faceLevel = faceInfo[i];
			if(faceLevel.indexCode == id){
				level = faceLevel;
			}
		}
	}
	return level;
}

/**
 * 创建当前页人脸摄像头要素
 * @returns
 */
function loadPresentFeature(){
	for(var i = 0; i < faceInfo.length; i++){
		faceLevel = faceInfo[i];
		createFaceFeature(faceLevel);
	}
}

/**
 *创建摄像机图片图层
 * @returns
 */
function createFaceImage(){
	faceImageLayer = map3D.createImageLabelLayer({
		liftUp:"0",
		iconUrl:faceImageUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	vectorAllLayer.push(faceImageLayer);//往图片要素图层组中添加所创建图层
}
/**
 * 添加摄像头图片要素
 * @param level
 * @returns
 */
function addFaceImage(level){
	//将时间戳转为时间节点
	var createTime = dateTurn(level.createTime);
	//设置当前变量方便拾取时获取当前拾取对象的信息
	var faceImageValue = '';
	//拼接待获取的参数值信息
	var faceImageValue = level.indexCode + "," + level.name + ","  + level.pixel + "," + createTime;
	//判断当前拾取的是哪个图层(适用于一个场景同时存在多拾取事件)
	var ename = '3';
	//判断当前对象的经纬度是否为空，为空则不创建要素
	if(level.longitude == '' || level.latitude == ''){
		//level.longitude = 118.83553;
		//level.latitude = 36.85229;
		return;
	 }
	//创建图片要素信息(参照SDK图片要素创建)
	var imageFeature = map3D.addImageLabel({
		layer:faceImageLayer, 
		imageValue:faceImageValue,
		Lon:level.longitude,
		Lat:level.latitude,
		Height:videoHeight,
		ename:ename});
	return imageFeature;
}


/**
 * 删除摄像机要素
 * @returns
 */
function deleteFaceImage(deleteLayer){
	 if(deleteLayer.imageFeature == '' || deleteLayer.imageFeature == undefined){
		 return;
	 }
	map3D.deleteImageById({
		feature:deleteLayer.imageFeature,
		layer:deleteLayer.imageLayer
		}); // 删除一个图片要素
}

/**
 * 删除所有的摄像机要素
 * @returns
 */
function deleteFaceImageAll(){
	for(var i = 0 ; i < faceLayerArray.length; i++){
		var deleteLayer = faceLayerArray[i];
		deleteFaceImage(deleteLayer);
	}
	faceLayerArray = [];
	//关闭当前已开启的属性弹窗
	cancelFaceDialog();
}

/**
 * 创建人脸相机要素对象
 * @param level
 * @returns
 */
function createFaceFeature(level){
	var mapFeature = {};
	//加载图片要素
	var imageFeature = addFaceImage(level);
	//生成要素对象(其他属性可以自行根据需要进行添加)
	mapFeature.imageLayer = faceImageLayer;//要素属性
	mapFeature.imageFeature = imageFeature;//图层属性
	mapFeature.id = level.cameraId;//id属性唯一标识
	//要素图层组中存入要素对象
	faceLayerArray.push(mapFeature);
}

/**
 * 加载人脸相机属性弹窗
 * @param pos
 * @param faceWebUrl
 * @returns
 */
function loadFaceDialog(pos,faceWebUrlParam){
	if (faceWebResp) {//若已存在弹窗则关闭
		cancelFaceDialog();
	}
	//SDK方法调用，请查询SDK弹窗生成文档
	var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
	pOption.AddConfig("Longitude", pos[0]);												///< 指向经纬度坐标经度
	pOption.AddConfig("Latitude", pos[1]);												///< 指向经纬度坐标维度
	pOption.AddConfig("PosHeight",  pos[2]);											///< 指向经纬度坐标高度
	pOption.AddConfig("Widget", "366");													///< 窗口宽度
	pOption.AddConfig("Height", "140");	//150	-125									///< 窗口高度
	pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
	pOption.AddConfig("Radial", "20");													///< 圆角直径
	pOption.AddConfig("Url", faceWebUrlParam);					                        ///< 指向网页url
	pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
	pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
	faceWebResp  = map.CreateResponser("TipsDialogResponser", pOption);					///< 创建响应器
	faceWebResp.AddObserver();
	map.AddResponser(faceWebResp);														///< 响应器添加至场景
}

/**
 * 关闭人脸相机弹窗
 * @returns
 */
function cancelFaceDialog(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	faceWebResp = null;
}

/**--------------------------------------------------------人脸信息实时推送模块------------------------------------------------------------**/
function showSnapshotMessage(autoMessage){//方法名固定-接收实时推送
	if(autoMessage != null && autoMessage != undefined){
		if(realPush){//若开启实时推送则
			var data = eval('(' + autoMessage + ')');
		    createRealList(data);
		}
	}
} 

/**
 *实时列表创建
 * @returns
 */
function createRealList(data){
	var realList = '';
	if(data){
		var imageUrl = data.image;
		var deviceName = data.deviceName;
		var faceTime = data.faceTime;
		realList += '<div class="sb_pic">';
		realList += '<span class="zp"><img class = "realImage" src=" '+ imageUrl + '"/></span>';
		realList += '<span style="margin-top: 6px;">'  + deviceName + '</span>';
		realList += '<span>' + faceTime + '</span>';
		realList += '</div>';
		$('#realList').prepend(realList);
		var limitLength = $("#realList").children('div').length;
		var Doms = $('#realList div');
		if(limitLength > 20){//当超出20张时
			Doms.eq(Doms.length - 1).remove();
		}
	}
}


/**-------------------------------------------------------------人脸预警信息实时推送---------------------------------------------------------**/
function showAlarmMessage(autoMessage){//方法名固定-接收预警推送
	if(autoMessage != null && autoMessage != undefined){
		if(realPush){//若开启实时预警则
			//var data = eval('(' + autoMessage + ')');
			createAlarmList(autoMessage);
		}
	}
}


/**
 * 预警列表创建
 * @param autoMessage
 * @returns
 */
function createAlarmList(autoMessage){
	//实时推送预警信息转为JSON对象
	var data = eval('(' + autoMessage + ')');
	//赋值当前预警人员列表信息
	alarmListInfo [id] = autoMessage;
	//var indexCode = "ZPJ15235045078680005818";//测试数据
	var indexCode = data.indexCode;
	//根据预警信息code值匹配抓拍机经纬度
	var pointLevel = compareData(indexCode);
	pointLevel.id = id;
	//开始生成预警图片
	addAlarmFeature(pointLevel);
	//获取相机名称
	var cameraName = data.cameraName;
	//获取预警时间
	var alarmTime = data.alarmTime;
	//开始动态挂载预警列表
	var alarmList = '';
	alarmList += '<div class="sb_pic"  id="sb_' + id + '" onclick = "flyAlarmPosition(\'' + pointLevel.longitude + '\',\'' + pointLevel.latitude + '\',' + id + ');">';
	alarmList += '<span class="zp"><img class = "realImage" src=" '+ data.facePicUrl + '"/></span>';
	alarmList += '<span style="margin-top: 6px;">'  + cameraName + '</span>';
	alarmList += '<span>' + alarmTime + '</span>';
	alarmList += '</div>';
	$('#alarmList').prepend(alarmList);
	//当预警时默认飞行定位到相应相机位置
	$("#sb_"+id ).click();
	id++;
}


/**
 * 通过比对预警信息与抓拍机信息code获取经纬度坐标
 * @returns
 */
function compareData(indexCode){
	var pointLevel = {};
	//循环遍历全部的抓拍机列表根据code值进行匹配数据
	for(var i = 0; i < posePictureInfo.length; i++ ){
		var level = posePictureInfo[i];
		if(indexCode == level.deviceCode ){
			pointLevel.longitude = level.longitude;
			pointLevel.latitude = level.latitude;
		}
	}
	return pointLevel;
}

/**
 * 飞行定位人脸摄像机位置
 * @param lon
 * @param lat
 * @returns
 */
function flyAlarmPosition(lon,lat,id){
	//获取飞行定位坐标
	var height = videoHeight;
	var Azimuth = 0.2725942536713117;
	var Pitch = -0.5012657011642883;
	var range = 309.4181844028518;
	var time = 3;
	// 飞行定位(需判断经纬度是都为空，若不判断，map3D会报类型不匹配)
	if(lon == ''|| lon == "undefined" || lat == '' || lat == "undefined"){
		return;
	}
	map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
	//定义pos坐标数组
	var pos = [lon,lat,height];
	//关闭全部的弹窗事件
	cancelAllDialog(id);
	//加载人脸预警弹窗
	var faceDetailUrlParam = faceDetailUrl + "?values=" + alarmListInfo[id] +"&id="+id;
	loadFaceDetailDialog(pos,faceDetailUrlParam,id);
	//设定单弹窗展示时的图层更新事件匹配值(用于多进程事件判定，详见videoView.js)
	notifyState = "flyAlarmPosition";
}

/**
 * 加载人识别详情弹窗
 * @param pos
 * @param faceWebUrl
 * @returns
 */
function loadFaceDetailDialog(pos,faceDetailUrlParam,id){
	if (faceDetailResp) {//若已存在弹窗则关闭
		cancelFaceDetailDialog(id-1);
	}
	//SDK方法调用，请查询SDK弹窗生成文档
	var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
	pOption.AddConfig("Longitude", pos[0]);												///< 指向经纬度坐标经度
	pOption.AddConfig("Latitude", pos[1]);												///< 指向经纬度坐标维度
	pOption.AddConfig("PosHeight",  pos[2]);											///< 指向经纬度坐标高度
	pOption.AddConfig("Widget", "968");	//600												///< 窗口宽度
	pOption.AddConfig("Height", "206");	//370								///< 窗口高度
	pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
	pOption.AddConfig("Radial", "20");													///< 圆角直径
	pOption.AddConfig("Url", faceDetailUrlParam);					                        ///< 指向网页url
	pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
	pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
	faceDetailResp  = map.CreateResponser("TipsDialogResponser", pOption);					///< 创建响应器
	faceDetailResp.AddObserver();
	map.AddResponser(faceDetailResp);														///< 响应器添加至场景
}

/**
 * 关闭人脸识别详情弹窗
 * @returns
 */
function cancelFaceDetailDialog(id){//弹窗只存在一个情况下,创建要素时以单一ID进行匹配(要素只存在一个)-全局变量的定义具单一性
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	faceDetailResp = null;
	for(var i = 0; i < alarmFeatureArr.length; i++){//移除警报要素
		var level = alarmFeatureArr[i];
		if(level.id == id){//若当前预警图层为当前所定位的抓拍机编号
			setTimeout(function(){//定时关闭当前相机编号
				deleteAlarmFeature(level);
				//移除当前要素
				alarmFeatureArr.splice(i,1);
		     },3000); 
		}
	}
}

/**
 * 关闭全部其他弹窗事件(因SDK限制,特弹窗只能存在一个,当自动预警时自动关闭其他弹窗)
 * @returns
 */
function cancelAllDialog(id){
	if (faceDetailResp) {//若已存在预警弹窗则关闭前一个报警图片
		cancelFaceDetailDialog(id-1);//参数可以自行修改1，关闭前面几个报警图片
	}if (webResp) {//若已存在标注弹窗则关闭
		canelLabelWegdit();
	}if (faceWebResp) {//若已存在人脸相机列表弹窗则关闭
		cancelFaceDialog();
	}if (webRespSG) {//若已存在视频资源列表弹窗则关闭
		cancelVideoWegdit();
	}
}
/**------------------------------------------------加载报警动态gif------------------------------------------------------------------**/
/**
 * 创建预警动态图层
 */
function createAlarmGif(){
	alarmLayer = map3D.CreatePointAndIcon({
		backgroundUrl:alarmGifPath,//预警图片URL
		Align:"5"//要素相对于文字位置
	});
}

/**
 * 添加预警动态要素数组
 * @param level
 * @returns
 */
function addAlarmFeature(level){
	var mapFeature = {};//创建要素对象
	//若经纬为空则
	if(level.longitude == "undefined" || level.latitude == "undefined"){
		return;
	}
	//添加动态要素
	var alarmFeature = map3D.addTextLabel({
		layer:alarmLayer, 
		Lon:level.longitude,
		Lat:level.latitude,
		Height:videoHeight + 10});//预警图片相对于抓拍机位置上调10
	mapFeature.feature = alarmFeature;
	mapFeature.layer = alarmLayer;
	mapFeature.id = level.id;
	alarmFeatureArr.push(mapFeature);//添加要素对象
}

/**
 * 删除预警要素
 * @param deleteFeature
 * @returns
 */
function deleteAlarmFeature(deleteFeature){
	//根据要素对象信息进行清除要素
	map3D.deleteTextById({
		feature:deleteFeature.feature,
		layer:deleteFeature.layer
		}); // 删除一个图片要素
}

