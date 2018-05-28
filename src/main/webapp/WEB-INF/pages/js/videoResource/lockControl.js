/**
 * 门禁监控功能板块
 * 
 * @author shine
 * @version 7.0
 */

//是否初次加载门禁监控列表
var fristLockFlag = true;
//门禁层级列表对象
var lockKeyLevel = [];
//门禁设备层级名称
var lockName = '门禁设备';
//门禁设备模型要素组
var lockArrayLayer = [];
//门禁设备模型图层
var lockLayer = null;
//门禁设备模型图层组
var lockLayers = [];
//门禁设备信息存储
var lockInfo = [];
//门禁模型高度
var lockHeight = videoHeight;
//关闭门数组
var closeDoorArray = [];
//当前点击门禁设备编号
var lockNum = null;
//门禁记录开始时间
var startTime = null;
//门禁记录结束截至时间
var endTime = null;
//设置每页数目数
var pageSize = 7;
//创建门禁响应器
var lockWebResp = null;
//门禁拾取状态弹窗路径
var lockPickStateUrl = "http://" + projectIP + ":" + projectPort
+"/ICGis/mapTools/lockState.do";
//开启门禁旋转角
var openPitch = "-1.2";
//关闭门禁旋转角
var closePitch = "0.34";
//自定义分页id数组
var pageIdArray = ["one_1","two_2","three_3","four_4","five_5"];
//小区门禁记录定时器
var villageTime;
//小区视频门禁记录定时时间
var lockStateTime = 200;
//当前拾取门禁编号id
var pickDoorId = null;
//小区门口门禁上面悬浮的图标
var doorImageUrl = "http://" + projectIP + ":" + projectPort
+"/ICGis/img/view1.png";
//小区门图片标注
var doorImageLayer = '';
//门禁列表坐标数组
var lockPointArray = [];
//拾取时标识判断是哪种矢量图标
var ename = '2';
/**
 *获取门禁监控列表
 */
function getLockList(){
	//清空搜索栏信息
	$("#lockSearch").val('');
	//初次加载门禁监控列表一次
	if(fristLockFlag){
		var url = "http://janus.sshmt.com/api/community/locks";
		var data = {
			 UUID : '660f3afb-0abb-4254-8cc7-f866e36293ad'
		};
		$.ajax({
			url:url,
			data:data,
			type:"get",
			success:function(data){
				if(data.code == '0'){
					//获取门禁列表信息
					var data = data.data;
					var lockList = createLockList(data);
					//挂载视频监控列表
					$("#lockList").html(lockList);
					//重新绑定事件
					addLockEvent();
				//	展开列表
					$(".lockOpen").trigger("click");
				}
			},
			error:function(e){
				
			}
		});
		//加载门禁状态列表
		lockStateList(1);
		//初始化创建门禁模型图层
		//createLockModel();
		//初始化点击门禁设备信息
		//lockShowOrHideFir("80280000003");
		fristLockFlag = false;
	}
	//开启门禁拾取事件
	//lockPickUp();
	//开启全区门禁列表记录
	openVillageLockLog();
	//开启门禁实时推送
	LockPush();
}


/**
 * 重新生成列表后添加事件
 */
function addLockEvent(){
	$('.zjdLock').next().hide();
	$('.zjdLock1').next().hide();
	$('.zjdLock').find('div').click(function(){
		$(this).parent('div').next().toggle();
	});
	$('.zjdLock1').find('div').click(function(){
		$(this).parent('div').next().toggle();
	});
	$('.zjdLock').find('div').click(function(){
		$(this).children('.tree_xl_lock').toggleClass('tree_xlclick_lock');
	});
	$('.zjdLock1').find('div').click(function(){
		$(this).children('.tree_xl_lock').toggleClass('tree_xlclick_lock');
	});
	$('.tree_xy_lock').click(function(){
		$(this).toggleClass('tree_xyclick');
	});
	$('.zjdLock2 div .gm_lock').click(function(){
		$('.zjdLock2 div .gm_lock').removeClass('gmclick_lock');
		$(this).addClass('gmclick_lock');
	});
}

/**
 * 生成第一层级门禁列表
 * @param  data
 * @return lockList
 */
function createLockList(data){
	//获取结果集列表
	getLockLevel(data);
	var firstLockLevel = lockKeyLevel[1];
	var name = firstLockLevel[0].name;
	var id =  firstLockLevel[0].id;
	var lockList = '';
	lockList += '<div class="zjdLock">';
	lockList += '<div >';
	lockList +=	'<span class="tree_xl_lock"></span>';
	lockList +=	'<span class="pic"><img src="../img/tree_jd1.png"></span>';
	lockList +=	'<span class="lockOpen">' + name + '</span>';
	lockList += '</div>';
	lockList += '<span class="tree_xy_lock"  id = "xy_' + id + '" value = "1" onclick = "lockShowOrHideFir(\'' + id + '\')"></span>';
	lockList += '</div>';
	lockList += createLockSecList(id);
	return lockList;
}

/**
 * 生成第二层级门禁列表
 * @param  parentId
 * @return lockList
 */
function createLockSecList(parentId){
	var secondLockLevel = lockKeyLevel[2];
	var lockList = '';
	lockList += '<div class = "treeSearch">';
	for(var i = 0; i < secondLockLevel.length; i++){
		var secondLockObj = secondLockLevel[i];
		var name = secondLockObj.name;
		var id = secondLockObj.id;
		if(secondLockObj.parentId == parentId){
			lockList += '<div class="zjdLock1">';
			lockList += '<div style="width: 184px;height: 16px;float: left;">';
			lockList +=	'<span class="tree_xl_lock"></span>';
			lockList +=	'<span class="pic"><img src="../img/tree_jd1.png"></span>';
			lockList +=	'<span>' + name + '</span>';
			lockList += '</div>';
			lockList += '<span class="tree_xy_lock" name="' + secondLockObj.parentId + '_video" id = "xy_' + id + '" value = "1" onclick = "lockShowOrHideSec(\'' + id + '\')"></span>';
			lockList += '</div>';
			lockList += createLockThirList(id);
		}
	}
	lockList += '</div>';
	return lockList;
}

/**
 * 生成第三层级门禁列表
 * @param  parentId
 * @return lockList
 */
function createLockThirList(parentId){
	var thirdLockLevel = lockKeyLevel[3];
	var lockList = '';
	lockList += '<div class = "treeSearch">';
	for(var i = 0; i < thirdLockLevel.length; i++){
		var thirdLockObj = thirdLockLevel[i];
		var name = thirdLockObj.name;
		var id = thirdLockObj.id;
		var lon = thirdLockObj.longitude;
		var lat = thirdLockObj.latitude;
		var height = thirdLockObj.height;
		lockInfo.push(thirdLockObj);
		if(thirdLockObj.parentId == parentId){
			lockList += '<div class="zjdLock2">';
			lockList += '<div onclick = "LockLogPosition(' + lon + ',' + lat + ',\'' + height + '\',\'' + id + '\');">';
			lockList +=	'<span class="pic"><img src="../img/tree_jd3.png" style = "filter:alpha(opacity=90);"></span>';
			lockList +=	'<span name="gm_lock" value = "0" class = "gm_lock" style = "width:174px;" id = "' + id + '">' + name + '</span>';
			lockList += '</div>';
			lockList += '<span class="tree_xy_lock" name="' + thirdLockObj.parentId + '_video" id = "xy_' + id + '" value = "1" onclick = "singleLockFeature(\'' + id + '\')"></span>';
			lockList += '</div>';
		}
	}
	lockList += '</div>';
	return lockList;
}

/**
 * 处理门禁返回结果集合
 * @param data
 */
function getLockLevel(data){
	//第一层级门禁列表(村名称)
	var firstLockLevel = [];
	//第二层级门禁列表(自定义门禁设备层级)
	var secondLockLevel = [];
	//第三层级门禁列表(单元)
	var thirdLockLevel = [];
	//获取所有的门禁列表坐标
	getLockPoint();
	for(var i = 0; i < data.length; i ++){
		var data = data[i];
		//处理第一层级结果集
		var firstLockObj = {};
		firstLockObj.id = data.id;
		firstLockObj.name = data.name;
		firstLockObj.children = data.children;
		firstLockLevel.push(firstLockObj);
		lockKeyLevel[1] = firstLockLevel;
		//处理第二层级(自定义层级)
		var secondLockObj = {};
		secondLockObj.name = lockName;
		secondLockObj.id = 'secondLockId';
		secondLockObj.parentId = firstLockObj.id;
		secondLockLevel.push(secondLockObj);
		lockKeyLevel[2] = secondLockLevel;
		//处理第三层级(单元楼)
		for(var j = 0; j < firstLockObj.children.length; j++){
			var thirdLockObj = {};
			var lockArray = firstLockObj.children[j];
			//判断门禁类型(m开头为单元门，d开头语为小区门)
			var lockType = lockArray.id.split('-')[1].slice(0,1);
			thirdLockObj.id = lockArray.id;
			thirdLockObj.name = lockArray.name;
			thirdLockObj.longitude = lockArray.longitude;
			thirdLockObj.latitude = lockArray.latitude;
			thirdLockObj.parentId = secondLockObj.id;
			thirdLockObj.lockType = lockType;
			var height = getLockPointByNo(lockArray.id,lockPointArray);
			if(height == null){
				thirdLockObj.height = 15;
			}else{
				thirdLockObj.height = height;
			}
			thirdLockLevel.push(thirdLockObj);
			lockKeyLevel[3] = thirdLockLevel;
		}
	}
}

/**
 * 根据设备编号获取当前设备的高程
 * @param serial_no
 * @returns
 */
function getLockPointByNo(serial_no,lockPointArray){
	var height = null;
	if(lockPointArray == null || lockPointArray.length == 1){
		return;
	}
	//根据门禁编号匹配门禁经纬度坐标值
	for(var i = 0; i < lockPointArray.length; i++){
		if(serial_no == lockPointArray[i].serial_no){
			height = lockPointArray[i].axis_z;
			break;
		}
	}
	return height;
}

/**
 * 获取所有的门禁列表坐标
 * @returns
 */
function getLockPoint(){
	var url = 'http://device.sshmt.com/api/threeD/getLongitude';
	var data = {
			UUID:'660f3afb-0abb-4254-8cc7-f866e36293ad',
			clientType:'2'
	};
	$.ajax({
		url:url,
		type:'get',
		data:data,
		success:function(data){
			lockPointArray = data;
		},
		error:function(e){
			
		}
	});
}

/**
 * 模糊查询门禁信息
 */
function lockSearch(){
	//查询之前恢复原先状态
	$(".gm_lock").css("color","#666666");
	//获取模糊查询对象
	var thirdLockLevel = lockKeyLevel[3];
	//模糊查询匹配数组
	var lockSearchArray = [];
	//获取搜索关键字
	var keyWord = $.trim($("#lockSearch").val());
	//若搜索关键字不为空
	if(keyWord != '' && keyWord != null){
		//获取正则对象
		var reg = new RegExp(keyWord);
		for(var i = 0; i < thirdLockLevel.length; i++){
			var name = thirdLockLevel[i].name;
			var id = thirdLockLevel[i].id;
			if(name.match(reg)){
				lockSearchArray.push(id);
			}
		}
	}
	//循环数组改变颜色样式
	for(var j = 0; j < lockSearchArray.length; j++){
		var id = lockSearchArray[j];
		$("#"+id).css("color","#DD313A");
		//获取所查询设备上几级.zjd1元素标签集合
		var zjdLabels = $("#"+id).parents('.treeSearch').prev();
		//遍历所有zjd1进行展开
		for(var t =0; t < zjdLabels.length; t++ ){
			var zjdLabel = zjdLabels.eq(t).find('div');
			//若已经展开则不再展开
			if(!(zjdLabel.children('.tree_xl_lock').hasClass('tree_xlclick_lock'))){
				zjdLabel.click();
			}
		}
	}
	//清空视频监控和数组
	lockSearchArray = [];
	//若未打开第一层级则执行点击事件
	if(!($('.zjdLock').find('div').children('.tree_xl_lock').hasClass('tree_xlclick_lock'))){
		$('.zjdLock').find('div').click();
	}
}
	
/**
 * 门禁设备飞行定位
 * @param lon
 * @param lat
 */
function flyLockPosion(lon,lat,height){
	if((lon == null || lat == null || height == 'null' )
							||
		(lon == undefined || lat == undefined || height == undefined)){
		return;
	}
	//获取飞行定位坐标
	var Azimuth = 0.27271596188962;
	var Pitch = -0.5019505534844149;
	var range = 10.6002366997493;
	var time = 3;
	// 飞行定位
	map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
}

/**
 * 飞行定位门禁并生成门禁记录列表
 * @param lon
 * @param lat
 * @param id
 * @returns
 */
function LockLogPosition(lon,lat,height,id){
	flyLockPosion(lon,lat,height);
	//lockNum = id;
}

/**
 * 创建门禁模型
 */
function createLockModel(){
	//动态获取SDK路径信息
	 var SDKpath = content3d.GetSDKPath().replace("\\bin","");
	 //获取门禁模型路径
	 //var lockPath =  SDKpath + "data\\tmp\\model\\men.wrl";
	 var lockPath =  SDKpath + "data\\tmp\\model\\SGXCJZM0016.wrl.001.wrl";
	 //创建门禁模型
	 lockLayer = map3D.createModelLabelLayer("D:\\t1.shp",lockPath);
	 vectorAllLayer.push(lockLayer);
}

/**
 * 初始化创建小区门图片点
 */
function createDoorImagLayer(){
	doorImageLayer = map3D.createImageLabelLayer({
		liftUp:"0",
		iconUrl:doorImageUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	//vectorAllLayer.push(doorImageLayer);//往图片标注图层组中添加所创建图层
}

/**
 * 初始化加载摄像头图片信息
 * @param level 门禁信息
 * @returns imageFeature 图片要素
 */
function addDoorImagLayer(level){
	//图片标注ID(可自定义赋值，拾取可取)
	 var videoImageValue = '';
	 if((level.longitude == null || level.latitude == null || level.height ==null )
				||
			(level.longitude == undefined || level.latitude == undefined || level.height == undefined)){
			return;
		}
	 //图片高度相对上调26
	 var doorHeight = (parseInt(level.height)+3);
	 var commonNum = '1';
	 var imageFeature = map3D.addImageLabel(doorImageLayer, videoImageValue,level.longitude,level.latitude,
			 doorHeight,commonNum);//图片高度相对上调26
	 return imageFeature;
}

/**
 * 添加门禁模型要素
 * @param  level
 * @return lockModelFeature
 */
function addLockModelFeature(level,pitch){
	//获取模型主键
	var modelId = level.id + "," + level.name;
	//模型拾取的时候用于分辨拾取的是哪个矢量图层
	if((level.longitude == null || level.latitude == null || level.height ==null )
											||
		(level.longitude == undefined || level.latitude == undefined || level.height == undefined)){
		return;
	}
	//添加模型图层信息
	var lockModelFeature = map3D.addModelLabel(lockLayer,{
	  lon:level.longitude,
	  lat:level.latitude,
	  height:level.height,
	  modelName:modelId,
	  xScale:"1.0",
	  yScale:"1.0",
	  zScale:"1.0",
	  pitch:pitch,
	  ename:ename
	});
	return lockModelFeature;
}

/**
 * 移除门禁设备模型
 * @param deleteLayer
 *
 */
function deleteLockModelFeature(deleteLayer){
	if(deleteLayer.lockModelFeature == null || deleteLayer.lockModelFeature == undefined ){
		return;
	}
	map3D.deleteModelById({
		feature:deleteLayer.lockModelFeature,
		layer:lockLayer
		}); // 删除一个模型要素
}

/**
 * 删除图片要素
 * @param deleteLayer
 */
function deleteDoorImageFeature(deleteLayer){
	if(deleteLayer.doorImageFeature == null || deleteLayer.doorImageFeature == undefined){
		return;
	}
	map3D.deleteImageById({
		feature:deleteLayer.doorImageFeature,
		layer:deleteLayer.doorImageLayer
		}); // 删除一个图片要素
}

/**
 * 开启门禁
 * @returns
 */
function openDoor(){
	var level = getClickLock();
	var mapFeature = getClickFeature(level.id);
	if(mapFeature!=null && mapFeature.lockModelFeature!=null){//不为门出入口
		//var height = getLockPointByNo(lockStateLog.pid,lockPointArray);
		updateModel(level,mapFeature,openPitch);
	}
}

/**
 * 关闭门禁
 * @returns
 */
function closeDoor(){
	var level = getClickLock();
	var mapFeature = getClickFeature(level.id);
	if(mapFeature!=null && mapFeature.lockModelFeature!=null){
		updateModel(level,mapFeature,closePitch);
	}
}

/**
 * 获取通道id
 * @returns
 */
function playLockVideo(){
	var level = getClickLock();
	//获取当前设备编号
	var id = level.id;
	var url = "http://janus.sshmt.com/api/community/lock/live";
	var data = {
			controlNum : id
	};
	$.ajax({
		url:url,
		data:data,
		type:"get",
		success:function(data){
			if(data.code == '0'){
				//获取门禁通道id值
				var dataArray = data.data;
				for(var i = 0; i < dataArray.length; i++){
					videoPlayChannel = dataArray[i].channel_id;
				}
				//播放当前门禁视频
				previewVideo({
					width:"480px",//600px
					height:"370px",
					top:"500px",
					right:"0px"
				});
			}
		},
		error:function(e){
		}
	});
}


/**
 * 获取当前点击的门禁对象
 * @returns
 */
function getClickLock(){
	var level = null;
	var lockDoms = $('[name="gm_lock"]');
	for(var i = 0; i < lockDoms.length; i++){
		var lockDom = lockDoms.eq(i);
		if(lockDom.hasClass("gm_lock gmclick_lock")){
			var id = lockDom.attr("id");
			for(var j = 0; j < lockInfo.length; j++){
				if(id == lockInfo[j].id){
					level = lockInfo[j];
				}
			}
		}
	}
	return level;
}

/**
 * 获取当前点击的门禁要素对象
 * @param id
 * @returns
 */
function getClickFeature(id){
	var mapFeature = null;
	for(var k = 0; k < lockArrayLayer.length; k++){
		if(id == lockArrayLayer[k].id){
			mapFeature = lockArrayLayer[k];
		}
	}
	return mapFeature;
}
/**
 * 更新模型位置
 */
function updateModel(level,mapFeature,pitch){
	var modelName = level.id + "," + level.name;
	var newlockModelFeature = 
		map3D.updateModelLabel({
		  newLayer:mapFeature.lockLayer,
		  oldLabel:mapFeature.lockModelFeature,
		  lon:level.longitude,
		  lat:level.latitude,
		  height:level.height,
		  modelId:modelName,
		  xScale:"1.0",
		  yScale:"1.0",
		  zScale:"1.0",
		  pitch:pitch,
		  ename:ename
		});
	//更新要素对象组里面的要素信息
	for(var k = 0; k < lockArrayLayer.length; k++){
		if(mapFeature.id == lockArrayLayer[k].id){
			lockArrayLayer[k].lockModelFeature = newlockModelFeature ;
		}
	}
	if(pitch == openPitch){
		for(var i = 0; i < closeDoorArray.length; i++ ){
			//若原本门属于关闭状态，则设为开启
			if(level.id == closeDoorArray[i]){
				closeDoorArray.splice(i,1);
			}
		}
	}else if(pitch == closePitch){
		closeDoorArray.push(level.id);
	}
}




/**
 * 门禁监控第一层级
 * @param key 
 */
function lockShowOrHideFir(key){
	//获取当前节点显隐状态
	var isAll = $("#xy_"+key).val();
	var secondLockLevel = lockKeyLevel[2];
	for(var i = 0; i < secondLockLevel.length; i++){
		var level = secondLockLevel[i];
		var id = level.id;
		var value = $("#xy_"+id).val();
		if(level.parentId = key){
			if(isAll == '0'){//若已经显示则隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					lockShowOrHideSec(id);
				}
			}else {
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					lockShowOrHideSec(id);
				}
			}
		}
	}
	//子页面iframe样式变化
	$("#videoFourDialog").contents().find("#mj").toggleClass("mjclick");
}

/**
 * 门禁监控第二层级(门禁设备)
 * @param key 
 */
function lockShowOrHideSec(key){
	//获取当前节点显隐状态
	var isAll = $("#xy_"+key).val();
	var thirdLockLevel = lockKeyLevel[3];
	for(var i = 0; i < thirdLockLevel.length; i++){
		var level = thirdLockLevel[i];
		var id = level.id;
		var value = $("#xy_"+id).val();
		if(level.parentId = key){
			if(isAll == '0'){//若已经显示则隐藏
				$("#xy_" + key).css("background", "url(../img/tree_xy1.png)");
				$("#xy_" + key).val("1");
				if(value == '0'){//若子节点已显示则隐藏(否则不做操作)
					singleLockFeature(id);
				}
			}else {
				$("#xy_" + key).css("background", "url(../img/tree_xy2.png)");
				$("#xy_" + key).val("0");
				if(value == '1'){//若子节点已经隐藏则显示(否则不做操作)
					singleLockFeature(id);
				}
			}
		}
	}
}

/**
 * 单个图层(设备图层控制显隐)
 * 门禁监控第五层级与球机第二层级
 * @param id
 */
function singleLockFeature(id){
	//根据id获取子节点的属性次数对象
	var level = null;
	for(var j = 0; j < lockInfo.length; j++ ){
		//判断子节点属性对象id
		if(id == lockInfo[j].id)
		{
			level = lockInfo[j];
		}
	}
	var value = $("#xy_"+id).val();
	if(value == '0'){//已显示，准备隐藏
		//删除当前图层要素
		$("#xy_"+id).css("background","url(../img/tree_xy1.png)");
		for(var i = 0; i < lockArrayLayer.length; i++ ){
			var deleteLayer = lockArrayLayer[i];
			if(id == deleteLayer.id){
				deleteLockModelFeature(deleteLayer);
				//若果是小区门禁则多加一层图片标识要素
				if(deleteLayer.doorImageFeature !=null || deleteLayer.doorImageFeature !=undefined){
					deleteDoorImageFeature(deleteLayer);
				}
				lockArrayLayer.splice(i,1);
			}
		}
		$("#xy_"+id).val('1');
	}else{//已隐藏准备显示
		$("#xy_"+id).css("background","url(../img/tree_xy2.png)");
		//创建新图层要素数组
		createLockFeature(level);
		$("#xy_"+id).val('0');
	}
	//子集联动父集修改样式(引用videoMonitor.js方法)
	childrenLinkParent(id);//第二层级
	childrenLinkParent(level.parentId);//第三层级
}

var firstCreateImage = true;
/**
 * 创建图层要素数组对象
 * @param level
 */
function createLockFeature(level){
	var lockModelFeature = null;
	//小区门标识图标
	var doorImageFeature = null;
	for(var i = 0; i < closeDoorArray.length; i++){
		var closeDoorId = closeDoorArray[i];
		if(level.id == closeDoorId && level.lockType != 'd'){//当前门是关闭的
			lockModelFeature = addLockModelFeature(level,closePitch);
		}
	}
	//若当前门不是关闭的则
	if(lockModelFeature == null && level.lockType != 'd'){
		lockModelFeature = addLockModelFeature(level,openPitch);
	}
	var mapFeature = {};
	mapFeature.lockModelFeature = lockModelFeature;
	mapFeature.id = level.id;
	mapFeature.lockLayer = lockLayer;
	if(level.lockType == 'd'){//判断小区门类型当前门为小区门d
		mapFeature.doorImageLayer = doorImageLayer;
		var doorImageFeature = addDoorImagLayer(level);
		mapFeature.doorImageFeature = doorImageFeature;
	}
	lockArrayLayer.push(mapFeature);
}


/**
 * 根据门禁编号与时间获取当前门禁开门记录信息
 * @returns lockLogData(门禁记录对象)
 */
function getVillageLog(){
	//开启定时器
	/*villageTime = window.setInterval(function(){*/
	var lockLogData = null;
	var url = "http://janus.sshmt.com/api/community/openlog";
	var data = {
			UUID:"660f3afb-0abb-4254-8cc7-f866e36293ad",
			startTime:startTime,
			endTime:endTime
	};
	$.ajax({
		url:url,
		data:data,
		type:"get",
		success:function(data){
			lockLogData = data;
		},
		error:function(e){
		}
	});
	return lockLogData;
	/*},lockStateTime);*/
}

/**
 * 根据门禁编号与时间获取当前门禁开门记录信息
 * @returns lockLogData(门禁记录对象)
 */
function getLockLogData(){
	var lockLogData = null;
	var url = "http://janus.sshmt.com/api/community/lock/openlog";
	var data = {
			controlNum:lockNum,
			UUID:"660f3afb-0abb-4254-8cc7-f866e36293ad",
			startTime:startTime,
			endTime:endTime
	};
	$.ajax({
		url:url,
		data:data,
		type:"get",
		success:function(data){
			lockLogData = data;
		},
		error:function(e){
		}
	});
	return lockLogData;
}

/**
 * 根据日期模糊查询门禁记录
 */
function searchLockListByDate(){
	//获取子页面点击日期
	startTime = lockListFrame.window.document.getElementById("StartTime").value.split(" ")[0];
	endTime = lockListFrame.window.document.getElementById("EndTime").value.split(" ")[0];
	var data = getVillageLog();
	return data;
}


/**
 * 获取日期
 * @param pdVal
 * @returns
 */
function showTime(pdVal) {
    var trans_day = "";
    var cur_date = new Date();
    var cur_year = new Date().getFullYear();
    var cur_month = cur_date.getMonth() + 1;
    var real_date = cur_date.getDate();
    cur_month = cur_month > 9 ? cur_month : ("0" + cur_month);
    real_date = real_date > 9 ? real_date : ("0" + real_date);
    var eT = cur_year + "-" + cur_month + "-" + real_date;
    if (pdVal == 1) {
trans_day = addByTransDate(eT, 1);
    }
    else if (pdVal == -1) {
trans_day = reduceByTransDate(eT, 1);
    }
    else {
trans_day = eT;
    }
   //处理
    return trans_day;
}

/**
 * 获取当前日期之前的日期
 * @param dateParameter
 * @param num
 * @returns
 */
function reduceByTransDate(dateParameter, num) {
    var translateDate = "", dateString = "", monthString = "", dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/"); 
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate - num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位   
    if ((newDate.getMonth() + 1).toString().length == 1) {
monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位   
    if (newDate.getDate().toString().length == 1) {
dayString = 0 + "" + newDate.getDate().toString();
    } else {
dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
} 

/**
 * 获取当前日期后的日期
 * @param dateParameter
 * @param num
 * @returns
 */
function addByTransDate(dateParameter, num) {
    var translateDate = "", dateString = "", monthString = "", dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/"); 
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate + num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位   
    if ((newDate.getMonth() + 1).toString().length == 1) {
monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位   
    if (newDate.getDate().toString().length == 1) {
dayString = 0 + "" + newDate.getDate().toString();
    } else {
dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
}

/**
 * 获取当前日期
 * @returns
 */
function currentTime() {
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours(); www.jquerycn.cn
    var m = d.getMinutes();
    var se = d.getSeconds();
    var s = vYear+"-"+ (vMon < 10 ? "0" + vMon : vMon)+"-" + (vDay < 10 ? "0" + vDay : vDay)+" " + (h < 10 ? "0" + h : h)+":" + (m < 10 ? "0" + m : m)+":" + (se < 10 ? "0" + se : se);
    return s;
}

/**
 * 关闭当前门禁记录列表
 * @returns
 */
function closeLockLogMenu(){
	$("#lockListFrame").css("height","38px");
}

/**
 * 展开当前门禁记录列表
 * @returns
 */
function openLockLogMenu(){
	$("#lockListFrame").css("height","228px");
}

/**
 * 展开左侧列表
 * @returns
 */
function lendonWithLock(){
	var width = document.body.clientWidth;
	$("#lockListFrame").css("width",width - 72 - 272  + "px");
	$("#lockListFrame").css("left",72 + 272 + 6  + "px");
}

/**
 * 关闭左侧列表
 * @returns
 */
function lendonWithoutLock(){
	var width = document.body.clientWidth;
	$("#lockListFrame").css("width",width - 72 + "px");
	$("#lockListFrame").css("left", 72 + "px")
}

/**
 * 门禁状态列表查询
 * @returns
 */
function lockStateList(pageNo){
		var url = "http://janus.sshmt.com/api/community/brokenlock";
		var data = {
				UUID:"660f3afb-0abb-4254-8cc7-f866e36293ad"
		};
		$.ajax({
			url:url,
			data:data,
			type:"get",
			success:function(data){
				if(data.code == '0'){
					var totalPage = Math.ceil(data.data.length/pageSize);//总页数
					var lockPageArray =  pageLockStateData(data.data);//获取分页结果集
					var lockStateList = createStateList(lockPageArray[pageNo]);//获取门禁状态列表
					var resultList = lockPager(pageNo,totalPage);//获取门禁分页
					$("#lockState").html(lockStateList);
					$("#lockStatePage").html(resultList);
				}
			},
			error:function(e){
			}
		});
}


/**
 * 创建门禁列表
 * @param data
 * @returns
 */
function createStateList(data){
	var lockStateList = '';
	//若当前选择分页数大于总分页数则
	if(data == null || data == undefined){
		for(var j = 0; j < pageSize; j++){
			lockStateList += '<tr>';
			lockStateList += '<td valign="middle" align="center"></td>';
			lockStateList += '<td style="color: red;" valign="middle" align="center"></td>';
			lockStateList += '<td valign="middle" align="center" class="stateImageTd"><img  style="margin-top: 4px;" src="../img/af_dw2.png" ></td>';
			lockStateList += '<td valign="middle" align="center"></td>';
			lockStateList += '</tr>';
		}
		return lockStateList;
	}
	//当前分页数未大于总分页数
	for(var i = 0; i < pageSize; i++){
		var lockStateLog = data[i];
		var height = getLockPointByNo(lockStateLog.pid,lockPointArray);
		if(lockStateLog == null || lockStateLog == undefined ){
			lockStateList += '<tr>';
			lockStateList += '<td valign="middle" align="center"></td>';
			lockStateList += '<td style="color: red;" valign="middle" align="center"></td>';
			lockStateList += '<td valign="middle" align="center" class="stateImageTd"><img  style="margin-top: 4px;" src="../img/af_dw2.png" ></td>';
			lockStateList += '<td valign="middle" align="center"></td>';
			lockStateList += '</tr>';
		}else{
			var state = lockStateLog.lock_status;
			switch(state){
			case 0:
				state = "在线";
				break;
			case 1:
				state = "未启用";
				break;
			case 2:
				state = "故障";
				break;
			default:
				break;
			}
			lockStateList += '<tr>';
			lockStateList += '<td valign="middle" align="center">' + lockStateLog.pid + '</td>';
			lockStateList += '<td style="color: red;" valign="middle" align="center">' + state + '</td>';
			lockStateList += '<td valign="middle" align="center" class="stateImageTd"><img id="stateImage_' + lockStateLog.pid + '" style="margin-top: 4px;" src="../img/af_dw2.png" onclick = "lockStateflyLockPosion(\'' + lockStateLog.longitude + '\',\'' + lockStateLog.latitude + '\',\'' + height + '\',\'' + lockStateLog.pid + '\');"></td>';
			lockStateList += '<td valign="middle" align="center">' + lockStateLog.name + '</td>';
			lockStateList += '</tr>';
		}
	}
	return lockStateList;
}

/**
 * 门禁状态列表飞行定位
 * @param lon
 * @param lat
 * @returns
 */
function lockStateflyLockPosion(lon,lat,height,id){
	//所有图标变灰
	$(".stateImageTd img").attr("src","../img/af_dw2.png");
	//图标变蓝
	$("#stateImage_" + id).attr("src","../img/af_dw1.png");
	flyLockPosion(lon,lat,height);
}


/**
 * 对后台数据进行分页处理
 * @param data
 * @returns
 */
function pageLockStateData(data){
	var lockPageArray = [];// 根据页数分
	var pageBySize = [];//根据每页数分
	var count = data.length;//获取记录条数
	var pageCount = Math.ceil(count/pageSize);//总页数
	var pageNum = 0;
	for(var i = 0 ; i < count; i++){
		var level = data[i];
		pageBySize.push(level);
		if((i+1)%(pageSize) == 0 || ((pageNum == (pageCount -1))&&(i == count-1))){
			pageNum++;
			lockPageArray[pageNum] = pageBySize;
			pageBySize =[];
		}
	}
	return lockPageArray;
}

/**
 * 分页查询事件
 * @param pageNo
 * @param totalPage
 * @returns
 */
function lockPager(pageNo, totalPage) {
	var currPage = pageNo;
	var totalPage = totalPage;
	var resultList = '';
	resultList += '<li class="pagenumber_k">';
	//上一页
	if(currPage == 1){
		resultList += '<div>&lt;</div>';
	}else{
		resultList += '<div onclick = "pageStateList(' + (currPage-1) +')">&lt;</div>';
	}
	//第一页
	resultList += '<span id="' + pageIdArray[0] + '" class="one" onclick = "pageStateList(1)">1</span>';
	//第二页
	resultList += '<span id="' + pageIdArray[1] + '"  onclick = "pageStateList(2)">2</span>';
	//第三页
	resultList += '<span id="' + pageIdArray[2] + '"  onclick = "pageStateList(3)">3</span>';
	//第四页
	resultList += '<span id="' + pageIdArray[3] + '" onclick = "pageStateList(4)">4</span>';
	//第五页
	resultList += '<span id="' + pageIdArray[4] + '"  onclick = "pageStateList(5)">5</span>';
	//下一页
	resultList += '<div onclick = "pageStateList(' + (currPage + 1) +')">&gt;</div>';
	resultList += '</li>';
	return resultList;
}


/**
 * 点击下面分页按钮分页查询
 * @param pageNo
 * @returns
 */
function pageStateList(pageNo){
	lockStateList(pageNo);
	var id = pageIdArray[pageNo - 1];
	if(pageNo < 1 || pageNo > 5){//超出第5页或者小于第一页则全部移除样式
		$('.pagenumber li span').removeClass('one');
	}else{
		$('.pagenumber li span').removeClass('one');
		$("#"+id).addClass('one');
	}
}

/**
 * 创建门禁弹窗
 * @returns
 */
function createLockDialog(pos,lockPickUrl){
	if (lockWebResp) {
		closeLockDiaolog();
	}
	var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
	pOption.AddConfig("Longitude", pos[0]);								///< 指向经纬度坐标经度
	pOption.AddConfig("Latitude", pos[1]);								///< 指向经纬度坐标维度
	pOption.AddConfig("PosHeight",  parseInt(pos[2]) + 2.5 + "");												///< 指向经纬度坐标高度
	pOption.AddConfig("Widget", "200");													///< 窗口宽度
	pOption.AddConfig("Height", "125");	//150	-125											///< 窗口高度
	pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
	pOption.AddConfig("Radial", "20");													///< 圆角直径
	pOption.AddConfig("Url", lockPickUrl);	///< 指向网页url
	pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
	pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
	lockWebResp  = map.CreateResponser("TipsDialogResponser", pOption);						///< 创建响应器
	lockWebResp.AddObserver();
	map.AddResponser(lockWebResp);															///< 响应器添加至场景
}

/**
 * 关闭门禁弹窗
 * @returns
 */
function closeLockDiaolog(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	lockWebResp = null;
	//content3d.detachEvent('FireOnResponserNotify',integerActive);//取消时需要解除绑定预览事件
}

/**
 * 开启全区门禁监控列表
 * @returns
 */
function openVillageLockLog(){
	//获取前一天时间
	//startTime = showTime(-1);
	startTime = getYesterdayFormatDate();
	//获取当前时间
	//endTime = showTime(0);
	endTime = getNowFormatDate();
	//调用子页面获取门禁列表接口
	lockListFrame.window.getLockLogFir();
	//赋予日期框初始值
	$("#lockListFrame").contents().find("#StartTime").val(startTime);
	$("#lockListFrame").contents().find("#EndTime").val(endTime);
	$("#lockListFrame").css("display","block");
}

/**
 * 门禁推送
 */
function LockPush(){
	 if ("WebSocket" in window) {
	        var ws = new WebSocket("ws://node-server.sshmt.com:9020");
	        ws.onopen = function (ev) {
            //channelId 订阅的通道号
            //testPlate 车辆、 testDoor 门禁、testFpp 防攀爬
            var channelId = "testDoor";//通道号表示订阅信息
            var clientId = Math.random().toString(36).substr(2);//客户端的标识
            var regestr = "{\"channelId\":\"" + channelId + "\",\"clientId\":\"" + clientId
                + "\"}";
            ws.send(regestr);
	        };

	        ws.onmessage = function (ev) {
	        	showLockPush(ev.data)
	        };

	        ws.onclose = function (ev) {
	            ws.close();
	        };

	        ws.onerror = function (ev) {
	            ws.close();
	        }
	    } else {
	        //alert("浏览器不支持websocket");
	    }
}

/**
 * 门禁推送人员记录
 */
function showLockPush(data){
	var lockLog = data;
	var lockList = '';
	lockList += '<tr>';
	lockList += '<td valign="middle" align="center">'+ lockLog.door +'</td>';
	lockList += '<td valign="middle" align="center">'+ lockLog.time +'</td>';
	lockList += '<td valign="middle" align="center">'+ lockLog.name +'</td>';
	lockList += '<td valign="middle" align="center">'+ lockLog.address +'</td>';
	lockList += '<td valign="middle" align="center">'+ lockLog.open_type +'</td>';
	//lockList += '<td valign="middle" align="center">'+ lockLog.state +'</td>';
	lockList += '<td valign="middle" align="center">正常</td>';
	lockList += '</tr>';
	var dom = $("#lockListFrame").contents().find("#lockListSearch");
	lockList.appendTo(dom);
}