/**
 * 视频监控功能板块
 * 
 * @author shine
 * @version 7.0
 * @remark 注意区分
 * @param  customId(自定义Id控制显隐)
 * @param  id(设备本身信息ID)	
 */


//是否初次加载视频监控列表
var fristVideoFlag = true;
//视频层级列表对象
var videoKeyLevel = [];
//视频监控信息
var videoInfo = [];
//模糊查询结果数组
var videoSearchArray = [];
//图片标注图层组
var videoImageLayers = [];
//图片标注
var videoImageLayer = null;
//图片标注URL路径
var videoImageLayerUrl = "http://" + projectIP + ":" + projectPort
+"/ICGis/img/view1.png";
//文字标注图层组
var videoTextLayers = [];
//文字标注
var videoTextLayer = null;
//模型标注图层组
var videoModelLayers = [];
//球机模型图层标注
var pdvrLayer = null;
//门禁视频模型图层标注
var doorLayer = null;
//SDK路径
var SDKpath = null;
//矢量图层高度
var videoHeight = 3;
//图片图层高度
var imageHeight =  videoHeight + 26;
//视频监控页面路径
var videoResourceUrl = "http://" + projectIP + ":" + projectPort
+ "/ICGis/mapTools/videoResource.do";
//页面弹框响应器参数
var webResp = null;
//多个图层要素组集合
var videoArrayLayer = [];
//当前打开的视频弹窗id值
var videoDialogId = null;
//第二层级门禁设备名称
var videoName = "门禁设备";
//第二层级球机名称
var pdvrName = "球机";
//播放视频的路径
var videoPlayUrl =  "http://" + projectIP + ":" + projectPort
+ "/ICGis/mapTools/videoPlay.do";
//静态框参数
var webobject;
//所有矢量图层组对象
var vectorAllLayer = [];
//拾取图层
var vectorPickLayer = '';
/**
 *获取视频监控列表
 */
function getVideoList(){
	//初次加载视频监控列表一次
	if(fristVideoFlag){
		var url = "http://device.sshmt.com/api/threeD/getVideoDevice";
		var data = {
			UUID : '660f3afb-0abb-4254-8cc7-f866e36293ad',
			v : '2'
		};
		$.ajax({
			url:url,
			data:data,
			type:"get",
			success:function(data){
				//清空搜索框信息
				$("#videoSearch").val('');
				//获取视频监控列表
				var data = data.data;
				var videoList = createVideoList(data);
				//挂载视频监控列表
				$("#videoList").html(videoList);
				//重新绑定事件
				addEvent();
			},
			error:function(e){
				
			}
		});	
	}
	//判断是否为初次加载
	if(fristVideoFlag ){
		//初始化创建所有图层
		createAllVideoLayers();
		//初始化创建门禁模型图层
		createLockModel();
		//初始化默认全选(id自定义设自1)
		fristVideoFlag = false;
	}
	//开始拾取事件
	videoPickUp();
	//关闭门禁列表记录
	$("#lockListFrame").css("display","none");
}

/**
 * 重新生成列表后添加事件
 */
function addEvent(){
	$('.zjd').next().hide();
	$('.zjd1').next().hide();
	$('.zjd').find('div').click(function(){
		$(this).parent('div').next().toggle();
	});
	$('.zjd1').find('div').click(function(){
		$(this).parent('div').next().toggle();
	});
	$('.zjd').find('div').click(function(){
		$(this).children('.tree_xl').toggleClass('tree_xlclick');
	});
	$('.zjd1').find('div').click(function(){
		$(this).children('.tree_xl').toggleClass('tree_xlclick');
	});
	$('.tree_xy').click(function(){
		$(this).toggleClass('tree_xyclick');
	});
	$('.gm').click(function(){
		$('.gm').removeClass('gmclick');
		$(this).addClass('gmclick');
	});
}

/**
 * 生成第一层视频监控列表
 * @param data
 * @return videoList 列表节点
 */
function createVideoList(data){
	//获取层级列表对象
	getVideoLevel(data);
	//获取第一层级列表集合
	var firstVideoLevel = videoKeyLevel[1];
	var videoList = '';
	//循环第一层级列表参数进行挂载
	for(var i = 0; i < firstVideoLevel.length; i++ ){
		var level = firstVideoLevel[i];
		var name = level.name;
		var customId = level.id;
		videoList += '<div class="zjd">';
		videoList += '<div>';
		videoList += '<span class="tree_xl"></span>';
		videoList += '<span class="pic"><img src="../img/tree_jd1.png"></span>';
		videoList += '<span>' + name + '</span>';
		videoList += '</div>';
		videoList += '<span value = "1" class="tree_xy" id="xy_' + customId + '"  onclick = "videoShowOrHideFirst( \'' + customId + '\');" ></span>';
		videoList += '</div>';
		videoList += createVideoSecList(customId);
	}
	return videoList;
}

/**
 * 生成第二层级视频监控列表(球机与门禁)[伪二层级]
 * @param parentId
 * @return videoList 列表节点
 */
function createVideoSecList(parentId){
	//获取第二层级列表数组
	var firstVideoLevel = videoKeyLevel[1];
	//获取特殊第二层级列表(门禁与球机)
	var specialVideoLevel = videoKeyLevel[6];
	//挂载第二层级列表(分俩层级挂载-球机-门禁)
	var videoList = '<div>';
	for(var i =0; i < specialVideoLevel.length; i++){
		var level =  specialVideoLevel[i];
		var customId =level.id;
		if(parentId == level.parentId){
			videoList += '<div class="zjd1">';
			videoList += '<div style="width: 184px;height: 16px;float: left;">';
			videoList += '<span class="tree_xl"></span>';
			if( level.name == videoName)
			{
				videoList += '<span class="pic"><img src="../img/tree_jd2.png"></span>';
			}
			else if( level.name == pdvrName)
			{
				videoList += '<span class="pic"><img src="../img/tree_jd2.png"></span>';
			}
			videoList += '<span>' + level.name + '</span>';
			videoList += '</div>';
			videoList += '<span value = "1"  name="' + level.parentId + '_video" class="tree_xy" id="xy_' + customId + '"  onclick = "videoShowOrHideSec( \'' + customId + '\');"></span>';
			videoList += '</div>';
			
			if( level.name == videoName)
			{
				videoList += createVideoThirList(customId);
			}
			else if( level.name == pdvrName){
				videoList += createPdvrThirList(customId);
			}
		}
	}
	videoList +='</div>'
	return videoList; 
}

/**
 * 生成第三层级球机列表
 * @param parentId
 * @return videoList 列表节点
 */
function createPdvrThirList(parentId){
	var secondPdvrVideoLevel =  videoKeyLevel[5];
	var videoList = '<div class = "treeSearch">';
	for(var i = 0; i < secondPdvrVideoLevel.length; i++ ){
		var level = secondPdvrVideoLevel[i];
		var name = level.attribute.name;
		var customId = level.id;
		//取自定义id控制显隐
		videoInfo [level.id] = level;
		if(parentId == level.parentId){
			videoList += '<div class="zjd2" style="margin-left:55px;width:209px;">';
			videoList += '<div onclick = "flyVideoPosion(\'' + level.attribute.longitude + '\',\'' + level.attribute.latitude + '\');">';
			videoList += '<span class="pic"><img src="../img/tree_jd3.png" style = "filter:alpha(opacity=90);"></span>';
			videoList += '<span  class = "gm" style="width:130px;" id = "pdvr_' + level.attribute.serial_no + '">' + level.attribute.serial_no + '</span>';
			videoList += '</div>';
			videoList += '<span value = "1" name="' + level.parentId + '_video" class="tree_xy" id="xy_' + customId + '"  onclick = "singleVideoFeature( \'' + customId + '\');"></span>';
			videoList += '</div>';
		}
	}
	videoList += '</div>';
	return videoList;
}

/**
 * 生成第三层视频监控列表
 * @param parentId
 * @return videoList 列表节点
 */
function createVideoThirList(parentId){
	//挂载第三层级楼号列表
	var videoList ='<div class = "treeSearch">';
	//获取第二层级列表数组
	var secondVideoLevel = videoKeyLevel[2];
	//循环第二层级列表数组挂载列表
	for(var i = 0; i < secondVideoLevel.length; i++ ){
		var level = secondVideoLevel[i];
		var name = level.name;
		//自定义id值，控制显隐
		var customId = level.id;
		if(parentId == level.parentId){
			videoList += '<div class="zjd1" style="margin-left: 40px;width: 224px;">';
			videoList += '<div>';
			videoList += '<span class="tree_xl"></span>';
			videoList += '<span class="pic"><img src="../img/tree_jd2.png"></span>';
			videoList += '<span >' + name + '</span>';
			videoList += '</div>';
			videoList += '<span value = "1"  name="' + level.parentId + '_video" class="tree_xy" id="xy_' + customId + '"  onclick = "videoShowOrHideThir( \'' + customId + '\');"></span>';
			videoList += '</div>';
			videoList += createVideoFourList(customId);
		}
	}
	videoList += '</div>';
	return videoList;
}

/**
 * 生成第四层单元号列表
 * @param parentId
 * @return videoList 列表节点
 */
function createVideoFourList(parentId){
	//挂载第四层级列表
	var videoList = '<div class = "treeSearch">';
	//获取第四层级列表数组
	var thirdVideoLevel = videoKeyLevel[3];
	//循环第四层级列表数组挂载列表
	for(var i = 0;i < thirdVideoLevel.length; i++ ){
		var level = thirdVideoLevel[i];
		var name = level.name;
		var customId = level.id;
		//以视频监控编号为单元id值
		var serial_no = level.children.serial_no;
		if(parentId == level.parentId ){
			videoList += '<div class="zjd1" style="margin-left: 60px;width: 204px;">';
			videoList += '<div>';
			videoList += '<span class="tree_xl"></span>';
			videoList += '<span class="pic"><img src="../img/tree_jd2.png"></span>';
			videoList += '<span>' + name + '</span>';
			videoList += '</div>';
			videoList += '<span value = "1"  name="' + level.parentId + '_video" class="tree_xy" id="xy_' + customId + '"  onclick = "videoShowOrHideFour( \'' + customId + '\');"></span>';
			videoList += '</div>';
			videoList += createVideoFiveList(customId);
		}
	}
	videoList += '</div>';
	return videoList;
}

/**
 * 生成第五层级设备信息列表
 * @desc 单元名称存在同名，以楼名作区分匹配
 * @param parentId
 * @return videoList 列表节点
 */
function createVideoFiveList(parentId){//单元名称存在同名，以楼名作区分匹配
	//挂载第五层级设备信息列表
	var videoList = '<div class = "treeSearch">';
	//获取第五层级列表数组
	var fourVideoLevel = videoKeyLevel[4];
	//循环第五层级列表数组挂载列表
	for(var i = 0;i < fourVideoLevel.length; i++ ){
		var level = fourVideoLevel[i].children;
		var name = level.name;
		var customId = fourVideoLevel[i].id;
		//取自定义id控制显隐
		videoInfo [customId] = fourVideoLevel[i];
		if(parentId ==  fourVideoLevel[i].parentId){
			videoList += '<div class="zjd2">';
			videoList += '<div onclick = "flyVideoPosion(\'' + level.longitude + '\',\'' + level.latitude + '\');">';
			videoList += '<span class="pic"><img src="../img/tree_jd3.png" style = "filter:alpha(opacity=90);"></span>';
			videoList += '<span class = "gm" id = "door_' + level.serial_no + '" style="width:130px;">' + level.serial_no + '</span>';
			videoList += '</div>';
			videoList += '<span  name="' + fourVideoLevel[i].parentId + '_video" class="tree_xy" id="xy_' + customId + '" value = "1" onclick = "singleVideoFeature( \'' + customId + '\');"></span>';
			videoList += '</div>';
		}
	}
	videoList += '</div>';
	return videoList; 
}

/**
 * 获取不同层级列表
 * @param data
 */
function getVideoLevel(data){
	//第一层级小区级数组
	var firstVideoLevel = [];
	//小区下门禁与球机数组(涉及列表顺序)
	var villageChildren = [videoName,pdvrName];
	//特殊第二级(门禁数组与球机)
	var specialVideoLevel = [];
	//第二层级门禁数组
	var secondVideoLevel = [];
	//第二层级球机数组
	var secondPdvrVideoLevel = [];
	//第三层级门禁数组
	var thirdVideoLevel = [];
	//第四层级设备信息
	var fourVideoLevel = [];
	//获取第一层级列表数组对象
	var firstObj = {};
	firstObj.name = data.name;
	firstObj.pdvr = data.pdvr;
	firstObj.door = data.door;
	//注:接口未提供id，自己自定义ID值
	firstObj.id = 1;
	firstObj.children = villageChildren;
	firstVideoLevel.push(firstObj);
	//1代表第一层级小区级数组
	videoKeyLevel[1] = firstVideoLevel;
	//自定义id递进值(增上递进值,防止相同等级id重合)
	var summation = 10;
	//定义特殊第二层级(门禁设备与球机)
	for(var h = 0; h < villageChildren.length; h++){//1:门禁 2:球机
		var specialObj = {};
		specialObj.parentId = firstObj.id;
		specialObj.id = h + summation;
		specialObj.name = villageChildren[h];
		specialVideoLevel.push(specialObj);
		//6代表特殊第二层级(门禁设备与球机)
		videoKeyLevel[6] = specialVideoLevel;
		summation+=10;
	}
	//获取第二层级门禁视频列表节点
	var firstChildren = data.door;
	for(var i = 0; i < firstChildren.length; i++ ){
		//获取第二层级列表数组对象
		var secondObj = {};
		var secondVideo = firstChildren[i];
		//为第二层级节点添加上一级父节点信息
		secondObj.parentName = firstObj.name;
		//第二层级返回数据有子节点则继续执行
		secondObj.name = secondVideo.name;
		//赋予父节点ID
		secondObj.parentId = specialVideoLevel[0].id;//该节点ID自定义，可优化
		secondObj.id = i + summation;
		secondObj.children = secondVideo.children;
		secondVideoLevel.push(secondObj);
		//2代表第二层级门禁数组
		videoKeyLevel[2] = secondVideoLevel;
		//获取第二层级对象子节点
		var secondChildren = secondVideo.children;
		summation+=10;
		for(var j = 0; j < secondChildren.length; j++ ){
			//获取第三层级列表数组对象
			var thirdObj = {};
			var thirdVideo = secondChildren [j];
			//为第三层级节点添加上一级父节点信息
			thirdObj.parentName = secondObj.name;
			thirdObj.name = thirdVideo.name;
			//赋予父节点ID
			thirdObj.parentId = secondObj.id;
			thirdObj.id = j + summation;
			thirdObj.children = thirdVideo.children;
			thirdVideoLevel.push(thirdObj);
			//3代表第三层级门禁数组
			videoKeyLevel[3] = thirdVideoLevel;
			summation+=10;
			//获取第三层级门禁单元下的设备信息(第四层级)
			var fourVideo = thirdVideo.children;
			var fourObj = {};
			fourObj.children = fourVideo;
			//获取单元号名
			fourObj.parentName = thirdObj.name;
			//赋予父节点ID
			fourObj.parentId = thirdObj.id;
			//自定义id使用时需与其本身返回id区分
			fourObj.id = j + summation;
			fourVideoLevel.push(fourObj);
			//4代表第四层级设备信息
			videoKeyLevel[4] = fourVideoLevel;
			summation+=10;
		}
	}
	//获取第二层级球机节点信息
	var pdvrList = data.pdvr;
	if(pdvrList.length > 0){
		for(var k = 0; k < pdvrList.length; k++ ){
			//获取第二层级球机列表数组对象
			var pdvrObj = {};
			var pdvrVideo = pdvrList[k];
			//为第二层级节点添加上一级父节点信息
			pdvrObj.parentName = firstObj.name;
			for(var g = 0; g < specialVideoLevel.length; g++){
				var level = specialVideoLevel[g];
				if(level.name == pdvrName){
					//赋予父节点ID(球机)
					pdvrObj.parentId = specialVideoLevel[g].id;//该节点ID自定义，可优化
				}
			}
			//自定义id使用时需与其本身返回id区分
			pdvrObj.id = k + summation;
			//存放球机属性信息
			pdvrObj.attribute = pdvrVideo;
			secondPdvrVideoLevel.push(pdvrObj);
			//5代表球机节点信息
			videoKeyLevel[5] = secondPdvrVideoLevel;
			summation+=10;
			
		}
	}else{
		//5代表球机节点信息
		videoKeyLevel[5] = [];
	}
}

/**
 * 视频监控点飞行定位
 * @param lon
 * @param lat
 */
function flyVideoPosion(lon,lat){
	//获取飞行定位坐标
	var height = 15;
	var Azimuth = 0.273371041489176;
	var Pitch = -0.5019506333936141;
	var range = 77.73607483319054;
	var time = 3;
	// 飞行定位
	map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
}

/**
 * 模糊查询视频监控信息
 */
function videoSearch(){
	//查询之前恢复原先状态
	$(".gm").css("color","#666666");
	//第四层级门禁设备数组
	var fourVideoLevel = videoKeyLevel[4];
	//第二层级球机设备数组
	var secondPdvrVideoLevel = videoKeyLevel[5];
	//获取关键字keyWord
	var keyWord =$.trim($("#videoSearch").val());
	//搜索参数不为空
	if(keyWord!='' && keyWord!=null){
		//获取正则对象
		var reg = new RegExp(keyWord);
		//循环遍历第五层级视频监控数组获取相似匹配数据
		for(var i = 0; i < fourVideoLevel.length; i++){
			var serial_no = fourVideoLevel[i].children.serial_no;
			var doorId ="door_" + fourVideoLevel[i].children.serial_no;
			if(serial_no.match(reg)){
				videoSearchArray.push(doorId);
			}
		}
		//循环遍历第二层级球机设备数组获取相似匹配数据
		for(var j = 0; j < secondPdvrVideoLevel.length; j++){
			var serial_no = secondPdvrVideoLevel[j].attribute.serial_no;
			var pdvrId = "pdvr_" + secondPdvrVideoLevel[j].attribute.serial_no;
			if(serial_no.match(reg)){
				videoSearchArray.push(pdvrId);
			}
		}
		//模糊查询标识变红
		for(var k = 0; k < videoSearchArray.length; k++ ){
			var id = videoSearchArray[k];
			$("#"+id).css("color","#DD313A");
			//获取所查询设备上几级.zjd1元素标签集合
			var zjdLabels = $("#"+id).parents('.treeSearch').prev();
			for(var t =0; t < zjdLabels.length; t++ ){
				var zjdLabel = zjdLabels.eq(t).find('div');
				//若已经展开则不再展开
				if(!(zjdLabel.children('.tree_xl').hasClass('tree_xlclick'))){
					zjdLabel.click();
				}
			}
		}
		//清空视频监控和数组
		videoSearchArray = [];
		//若未打开第一层级则执行点击事件
		if(!($('.zjd').find('div').children('.tree_xl').hasClass('tree_xlclick'))){
			$('.zjd').find('div').click();
		}
	}
}

/**
 * 初始化加载摄像头所有图层信息
 */
function loadLayer(){
	//获取球机设备信息数组
	var secondPdvrVideoLevel =  videoKeyLevel[5];
	//获取门禁设备信息视频监控数组
	var fourVideoLevel = videoKeyLevel[4];
	//遍历门禁设备数组
	for(var i = 0; i < fourVideoLevel.length; i++ ){
		var level = fourVideoLevel[i];
		createMapFeature(level);
	}
	//遍历球机设备信息数组
	for(var j = 0; j < secondPdvrVideoLevel.length; j++ ){
		var level = secondPdvrVideoLevel[j];
		createMapFeature(level);
	}
}

/**
 * 初始化加载摄像头图片信息
 * @param level 设备信息
 * @param parentName 设备信息父级名称
 * @param customId 自定义id值
 * @returns imageFeature 图片要素
 */
function loadImagLayer(level,parentName,customId){
	//图片标注ID(可自定义赋值，拾取可取)
	 var videoImageValue = level.id + "," + parentName + "," + customId + "," + level.channel_id;
	 var commonNum = '1';//图层拾取事件时判定值
	 var imageFeature = map3D.addImageLabel(videoImageLayer, videoImageValue,level.longitude,level.latitude,
	 imageHeight,commonNum);//图片高度相对上调26
	 return imageFeature;
}

/**
 * 初始化加载摄像头文字信息
 * @param level 设备信息
 * @returns textFeature 文字要素
 */
function loadTextLayer(level){
	//获取摄像头文字信息
	var labelName = level.serial_no;
	var textFeature = map3D.addTextLabel(videoTextLayer,labelName,level.longitude,level.latitude,
    videoHeight);
	return textFeature;
}

/**
 * 初始加载摄像头模型信息
 * @param level 设备信息
 * @returns modelFeature 模型要素
 */
function loadModelLayer(level){
	//获取模型主键
	var modelId = "1";
	//获取旋转角
	var pitch = '0.34';
	//添加模型图层信息
	var modelFeature = map3D.addModelLabel(doorLayer,{
	  lon:level.longitude,
	  lat:level.latitude,
	  height:videoHeight,
	  modelName:modelId,
	  xScale:"1.0",
	  yScale:"1.0",
	  zScale:"1.0",
	  pitch:pitch
	});
	return modelFeature;
}

/**
 * 初始加载球机模型信息
 * @param level 设备信息
 * @returns modePdvrlFeature 球机模型要素
 */
function loadPdvrModelLayer(level){
	//获取模型主键
	var modelId = "1";
	//获取旋转角
	var pitch = '';
	//添加模型图层信息
      var modePdvrlFeature = map3D.addModelLabel(pdvrLayer,{
	  lon:level.longitude,
	  lat:level.latitude,
	  height:videoHeight,
	  modelName:modelId,
	  xScale:"3.0",
	  yScale:"3.0",
	  zScale:"3.0",
	  pitch:pitch
	});
	return modePdvrlFeature;
}

/**
 * 加载摄像头页面弹窗
 * @param pos 坐标值
 * @param videoImageUrl 弹框路径
 * @param id 设备信息id值
 * @param customId 自定义id
 */
function loadVideoDialog(pos,videoImageUrl,id,customId){
		if (webResp) {
			cancelVideoWegdit();
		}
		//存放标识性id值
		videoDialogId = customId;
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]);								///< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]);								///< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight",  pos[2]);												///< 指向经纬度坐标高度
		pOption.AddConfig("Widget", "360");													///< 窗口宽度
		pOption.AddConfig("Height", "150");	//150	-125											///< 窗口高度
		pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
		pOption.AddConfig("Radial", "20");													///< 圆角直径
		pOption.AddConfig("Url", videoImageUrl);					                        ///< 指向网页url
		pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
		pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
		webResp  = map.CreateResponser("TipsDialogResponser", pOption);						///< 创建响应器
		webResp.AddObserver();
		map.AddResponser(webResp);															///< 响应器添加至场景
	
}

/**
 * 初始化创建三种图层(模型，文字，图片)
 */
function createAllVideoLayers(){
	createImagLayer();
	createTextLayer();
	createModelLayer();
}

/**
 * 初始化创建摄像头图片信息
 */
function createImagLayer(){
	videoImageLayer = map3D.createImageLabelLayer({
		liftUp:"0",
		iconUrl:videoImageLayerUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	vectorAllLayer.push(videoImageLayer);//往图片标注图层组中添加所创建图层
}

/**
 * 初始化创建摄像头文字信息
 */
function createTextLayer(){
	videoTextLayer = map3D.createTextLabelLayer({
		 //创建后shp保存路径
         shpUrl:"D:\\test.shp",
         liftUp:28,
         lineState:"0",
         fontSize:6,
         fontColor:"1.0, 1.0, 1.0, 0.5",
         backColor:"1.0,0.0,1.0,0.0",
         align:"4"
       });
	videoTextLayers.push(videoTextLayer);
}


/**
 * 初始化创建摄像头模型信息
 */
function createModelLayer(){
	//动态获取SDK路径信息
	 SDKpath = content3d.GetSDKPath().replace("\\bin","");
	 //获取球机模型路径
	 var pdvrPath =  SDKpath + "data\\tmp\\model\\球型.wrl.004.wrl";
	 //获取门禁模型路径
	 var doorPath =  SDKpath + "data\\tmp\\model\\杆球.wrl.004.wrl";
	 //创建球机模型
	 pdvrLayer = map3D.createModelLabelLayer("D:\\t1.shp",pdvrPath);
	 videoModelLayers.push(pdvrLayer);
     //创建门禁监控模型
     doorLayer = map3D.createModelLabelLayer("D:\\t2.shp", doorPath);
     videoModelLayers.push(doorLayer);
}


/**
 * 拾取事件开启
 */
function videoPickUp(){
	vectorPickLayer = map3D.labelPick(vectorAllLayer); // 图片拾取
	//开启响应器
	FireOnResponserNotifAll();
}


/**
 * 取消拾取
 */
function cancelVideoPickUp(){
	 map3D.destroyLabelPick(vectorAllLayer);
	 videoPickEvent(false);
	 vectorPickLayer = "";
}

/**
 * 关闭视频监控弹窗
 */
function cancelVideoWegdit(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	webResp = null;
	videoDialogId = null;
} 



/**
 * 传递参数进入视频弹窗页面
 */
function sendParam() {
	if(webResp){
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("FunctionName", "Test");											///< 函数名(SDK定义，建议不修改)
		pOption.AddConfig("FunctionParam", "20");											///< 函数参数
		webResp.UpdateResponserOptions(pOption);											///< 创建响应器
	}
}

/**
 * 单个图层(设备图层控制显隐)
 * 门禁监控第五层级与球机第二层级
 * @param id
 */
function singleVideoFeature(id){
	var level = videoInfo[id];
	var value = $("#xy_"+id).val();
	if(value == '0'){//已显示，准备隐藏
		//删除当前图层要素
		$("#xy_"+id).css("background","url(../img/tree_xy1.png)");
		for(var i = 0; i < videoArrayLayer.length; i++ ){
			var deleteLayer = videoArrayLayer[i];
			if(id == deleteLayer.id){
				deleteVideoFeatures(deleteLayer);
				videoArrayLayer.splice(i,1);
				//若视频监控属性弹框存在则关闭
				if (videoDialogId !=null && videoDialogId == id) {
					cancelVideoWegdit();
				}
			}
		}
		$("#xy_"+id).val('1');
	}else{//已隐藏准备显示
		$("#xy_"+id).css("background","url(../img/tree_xy2.png)");
		//创建新图层要素数组
		createMapFeature(level);
		$("#xy_"+id).val('0');
	}
	//判断是否为球机,俩者联动上级方式不一(球机)
	if(level.attribute != undefined && level.attribute !=null ){
		//改变第二层选中状态(设备->球机)
		childrenLinkParent(id);
		//改变第一层选中状态(门禁设备->小区)
		childrenLinkParent(level.parentId);
	}else{//门禁设备
		//改变第四层级选中状态(设备信息->单元)
		childrenLinkParent(id);
		//改变第三层级选中状态(单元->楼号)
		childrenLinkParent(level.parentId);
		//改变第二层选中状态(楼号->门禁设备)
		var buildingId = document.getElementById("xy_"+level.parentId).name.split("_video")[0];
		childrenLinkParent(buildingId);
		//改变第一层选中状态(门禁设备->小区)
		var doorId = document.getElementById("xy_"+buildingId).name.split("_video")[0];
		childrenLinkParent(doorId);
	}
}

/**
 * 门禁监控第一层级(社区)
 * @param key
 */
function videoShowOrHideFirst(key){
	//获取特殊第二层级列表(门禁与球机)
	var specialVideoLevel = videoKeyLevel[6];
	var isAll = $("#xy_" + key).val();
	//匹配门禁数组寻出所有子项信息
	for(var i =0; i < specialVideoLevel.length; i++ ){
		var level = specialVideoLevel[i];
		var id = level.id;
		//获取子节点显隐状态
		var value = $("#xy_" + id).val();
		if(key == level.parentId){
			if(isAll == '0'){//已显示准备隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					videoShowOrHideSec(id);
				}
			}else{//已隐藏准备显示
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					videoShowOrHideSec(id);
				}
			}
		}
	}
	//子页面iframe样式变化
	$("#videoFourDialog").contents().find("#sp").toggleClass("spclick");
}

/**
 * 门禁监控第二层级(门禁设备与球机)
 * @param key 
 */
function videoShowOrHideSec(key){
	//获取第二层级列表数组(楼号)
	var secondVideoLevel = videoKeyLevel[2];
	//5代表球机节点信息
	var secondPdvrVideoLevel = videoKeyLevel[5]; 
	var isAll = $("#xy_" + key).val();
	//匹配门禁数组寻出所有子项信息
	for(var i =0; i < secondVideoLevel.length; i++ ){
		var level = secondVideoLevel[i];
		var id = level.id;
		//获取子节点显隐状态
		var value = $("#xy_" + id).val();
		if(key == level.parentId){
			if(isAll == '0'){//已显示准备隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					videoShowOrHideThir(id);
				}
			}else{//已隐藏准备显示
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					videoShowOrHideThir(id);
				}
			}
		}
	}
	//匹配数组寻出所有球机子项信息
	for(var i =0; i < secondPdvrVideoLevel.length; i++ ){
		var level = secondPdvrVideoLevel[i];
		//第五层级数据有给id值,使用数据id
		var id = level.id;
		//获取子节点显隐状态
		var value = $("#xy_" + id).val();
		if(key == level.parentId){
			if(isAll == '0'){//已显示准备隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					singleVideoFeature(id);
				}
			}else{//已隐藏准备显示
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					singleVideoFeature(id);
				}
			}
		}
	}
}


/**
 * 门禁监控第三层级(楼号)
 * @param key 
 */
function videoShowOrHideThir(key){
	//获取第四层级列表数组(单元号)
	var thirdVideoLevel = videoKeyLevel[3];
	var isAll = $("#xy_" + key).val();
	//匹配数组寻出所有子项信息
	for(var i =0; i < thirdVideoLevel.length; i++ ){
		var level = thirdVideoLevel[i];
		var id = level.id;
		//获取子节点显隐状态
		var value = $("#xy_" + id).val();
		if(key == level.parentId){
			if(isAll == '0'){//已显示准备隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					videoShowOrHideFour(id);
				}
			}else{//已隐藏准备显示
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					videoShowOrHideFour(id);
				}
			}
		}
	}
}

/**
 * 门禁监控第四层级(单元号)
 * @param key 
 */
function videoShowOrHideFour(key){
	//获取第五层级列表数组(设备信息)
	var fourVideoLevel = videoKeyLevel[4];
	var isAll = $("#xy_" + key).val();
	//匹配数组寻出所有子项信息
	for(var i =0; i < fourVideoLevel.length; i++ ){
		var level = fourVideoLevel[i];
		var id = level.id;
		//获取子节点显隐状态
		var value = $("#xy_" + id).val();
		if(key == level.parentId){
			if(isAll == '0'){//已显示准备隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					singleVideoFeature(id);
				}
			}else{//已隐藏准备显示
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					singleVideoFeature(id);
				}
			}
		}
	}
}

/**
 * 子节点联动父节点
 * @param id
 */
function childrenLinkParent(id){
	//获取当前元素name值
	var checkName = document.getElementById("xy_"+id).name;
	//获取当前元素父节点id
	var parentId = checkName.split("_video")[0];
	//获取所有同级父节点数组
	var videoDoms = $('[name="' + checkName + '"]');
	//子节点总个数 
	var sum = videoDoms.length;
	//选中节点数
	var selectNum = 0;
	//累加选中的个数
	for(var i = 0; i < sum; i++){
		var value =  videoDoms.eq(i).val();
		if(value == '0'){//显示(选中)
			selectNum++;
		}
	}
	//判断是否全选
	if(selectNum == sum){
		$("#xy_" + parentId).css("background", "url(../img/tree_xy2.png)");
		$("#xy_" + parentId).val("0");
	}else{
		$("#xy_" + parentId).css("background", "url(../img/tree_xy1.png)");
		$("#xy_" + parentId).val("1");
	}
}

/**
 * 删除所有图层要素组信息
 * @param deleteLayer
 */
function deleteVideoFeatures(deleteLayer){
	deleteImageFeature(deleteLayer);
	deleteModelFeature(deleteLayer);
	deleteTextFeature(deleteLayer);
}

/**
 * 删除图片要素
 * @param deleteLayer
 */
function deleteImageFeature(deleteLayer){
	map3D.deleteImageById({
		feature:deleteLayer.imageFeature,
		layer:deleteLayer.videoImageLayer
		}); // 删除一个图片要素
}

/**
 * 删除模型要素
 * @param deleteLayer
 */
function deleteModelFeature(deleteLayer){
	map3D.deleteModelById({
		feature:deleteLayer.modelFeature,
		layer:deleteLayer.modelLayer
		}); // 删除一个模型要素
}

/**
 * 删除文字要素
 * @param deleteLayer
 */
function deleteTextFeature(deleteLayer){
	map3D.deleteTextById({
		feature:deleteLayer.textFeature,
		layer:deleteLayer.videoTextLayer
		}); // 删除一个文字要素
}

/**
 * 创建添加要素对象，存入数组
 * @param level
 */
function createMapFeature(level){
	var parentName = level.parentName;
	var mapFeature = {};
	//区分是否为球机
	if(level.children != null && level.children != undefined){//有children属性为门禁
		var levelChildren = level.children;
		var imageFeature = loadImagLayer(levelChildren,parentName,level.id);
		var textFeature = loadTextLayer(levelChildren);
		var modelFeature = loadModelLayer(levelChildren);
		mapFeature.id = level.id;
		mapFeature.modelLayer = doorLayer;
	}else{//无children属性为球机
		var levelAttribute = level.attribute;
		var imageFeature = loadImagLayer(levelAttribute,parentName,level.id);
		var textFeature = loadTextLayer(levelAttribute);
		var modelFeature = loadPdvrModelLayer(levelAttribute);
		mapFeature.id = level.id;
		mapFeature.modelLayer = pdvrLayer;
	}
	mapFeature.imageFeature = imageFeature;
	mapFeature.textFeature = textFeature;
	mapFeature.modelFeature = modelFeature;
	mapFeature.videoImageLayer = videoImageLayer;
	mapFeature.videoTextLayer = videoTextLayer;
	//要素对象存入数组
	videoArrayLayer.push(mapFeature);
}
