/**
 * 视频接入播放公共方法,响应事件汇总
 * @author shine
 * @date 2018-3-14
 * 
 */

/**
 * 判断当前视频是否初次加载播放
 */
var loadVideoPlayFlag = true;

/**
 * 播放视频资源(嵌入显示:ifram videoPlaySG.js)
 */
function previewImplantVideo(){
	if(loadVideoPlayFlag){
		//跳转视频播放页面
		$("#lockPlayFrame").attr("src","../mapTools/videoPlaySG.do");
		loadVideoPlayFlag = false;
	}else{
		//若已开启则关闭视频播放器
		lockPlayFrame.window.closeVideo();
		//重新打开视频播放器
		$("#lockPlayFrame").attr("src","../mapTools/videoPlaySG.do");
	}
	$("#lockPlayFrame").css("display","block");
}

/**
 * 点击关闭按钮时关闭当前视频播放
 */
function cancelPreviewVideo(){
	lockPlayFrame.window.closeVideo();
	$("#lockPlayFrame").css("display","none");
}


/**
 * 播放视频资源(以弹窗显示)
 * @param count(窗口数)
 */
function previewPopVideo(count){
	 var videoParam = getVideoParam();
	 var param = 'hikvideoclient://ReqType:' + videoParam.palyType + ';' + 'VersionTag:artemis' + ';' +  ';'+'WndCount:' + count + ';'+'SvrIp:' + videoParam.SvrIp + ';' + 'SvrPort:' + videoParam.SvrPort + ';' + 'Appkey:' + videoParam.artemisAppKey + ';' + 'AppSecret:' + videoParam.appSecret + ';' + 'time:' + videoParam.time + ';' + 'timesecret:' + videoParam.timeSecret + ';' + 'httpsflag:' +  videoParam.httpsflag + ';' + 'CamList:' + videoParam.CamList + ';';
     document.getElementById("previewPopVideo").src = param;
}


/**-----------------------------------响应事件汇总----------------------------------------**

/**
 * 响应事件总入口
 * @param msg
 */
function FireOnResponserNotifAll(){
	function VPSDKCtrl::FireOnResponserNotify(str,id)
	{	
		//拾取事件
		if(str == "PickVectorResponser"){
			//根据获取的别名字符进行判断
			var ename = map3D.getLabelValue(vectorPickLayer).ename;
			switch(ename){
			case '1'://拾取视频资源图标的响应事件
				videoPickEvent();
				break;
			case '2'://门禁拾取
				lockPickEvent();
				break;
			case '3'://人脸设备拾取
				facePickEvent();
				break;
			/**20180525**/
			case '4'://标注拾取事件
				labelPickEvent();
				break;
			/**20180525**/
			default:
				break;
			
			}
		}
		//页面弹窗事件
		if(str == "TipsDialogResponser"){//若皆属于事件弹窗事件但未拾取的情况下，可以自定义全局变量名称进行评定条件
			
			switch(notifyState){//自定义的参数值，用于判定弹窗事件，为了便于查看，自定义名称取方法名称
			case 'videoPickEvent'://拾取视频图标的弹窗交互事件
				integerActive();
				break;
			case 'lockPickEvent':
				lockIntegerActive();
				break;
			case 'facePickEvent'://人脸设备触发事件
				faceIntegerActive();
				break;
			case 'startAddLabel':
				saveLabelWegdit();//保存标注弹窗
				break;
			case 'flyAlarmPosition':
				faceAlarmActive();//人脸预警弹窗
				break;
			/**20180525**/
			case 'addLabelEvent':
				labelAddIntegerEvent();//标注添加弹窗响应事件
				break;
			case 'labelPickEvent':
				labelAttributeIntegerEvent();//标注属性弹窗响应事件
				break;
			/**20180525**/
			default:
				break;
			}
		}
		//截图事件
		if(str == "SceneshotResponser"){ 
			imageEvent();
		}
	}
}

/**
 * 响应事件总入口(后面有类似的事件都需要往后面追加)
 */
function FireOnLayerNotifyAll(){
	function VPSDKCtrl::FireOnLayerNotify(layerid,type)
	{
		var layer = layermap[layerid];//根据图层ID获取图层
		if(layer == null || layer == undefined){
			return;
		}
		var opt = layer.GetLayerResult();
		var typeName = opt.GetConfigValueByKey("DataSourceTypeName");
		switch(typeName){
		case "as_heightcontrol"://控高分析
			heightControlState = 1 ;
			getHeightControl(layerid,type);
			break;
		case "as_viewshed"://视域分析
			viewState = 1 ;
			loadViewShe(layerid,type);
			loadViewAim(layerid,type);
			break;
		case "as_linesight"://通视分析
			sightState = 1 ;
			loadLineShe(layerid,type);
			loadLineAim(layerid,type);
			break;
		case "dynamicpath"://视频巡更
			switch(notifyLayerState){//自定义的参数值，用于判定弹窗事件，为了便于查看，自定义名称取方法名称
			case 'playPatrol'://拾取视频图标的弹窗交互事件
				videoPatrolEvent();
				//zoneAnalysis();
				break;
			default:
				break;
			}
			break;
		default:
			break;
		}
	}
}

/**
 * 初始化开启响应事件
 */
function startNotifyEvent(){
	FireOnResponserNotifAll();
	FireOnLayerNotifyAll();
}


/**
 * 视频监控图标拾取事件
 * @returns
 */
function videoPickEvent(){
		//获取拾取图片标注点坐标
	    var pos = map3D.getLabelValue(vectorPickLayer).points.split(',');
	    var videoImageValueArr = map3D.getLabelValue(vectorPickLayer).imageValue.split(",");
	    //拼接参数信息
	    var videoImageUrl = videoResourceUrl + "?indexCode=" + videoImageValueArr[0] + 
	    "&name=" + videoImageValueArr[1]+ "&pixel=" + videoImageValueArr[2]+ 
	    "&createTime=" + videoImageValueArr[3]+"&longitude=" + pos[0]+ "&latitude=" + pos[1];
	    //拾取图片标注生成弹窗
	    loadVideoDialog(pos,videoImageUrl,videoImageValueArr[0]);
	    notifyState = "videoPickEvent";
	    integerActive();//开启弹窗响应事件
}

/**
 * 视频监控弹窗子父页面交互事件
 * @returns
 */
function integerActive(){
		//SDK获取页面里面传递出来的参数的方法
		var msg = webRespSG.GetResponserResult().GetConfigValueByKey("Param");
		var msgs = msg.split('@#');
		//获取触发事件的状态值，若触发事件是预览事件，则执行预览方法	
		if(msgs[0] == "1"){
			//获取当前的播放的摄像头编号值
			realIndexCode = msgs[1];
			//播放弹窗视频
			previewPopVideo(1);
			//播放嵌入视频
			//previewImplantVideo();
			//关闭页面弹窗
			cancelVideoWegdit();
		}else if(msgs[0] == "0"){
			cancelVideoWegdit();
		}
}

/**
 * 人脸设备相机拾取触发事件
 */
function facePickEvent(){
	//获取拾取图片标注点坐标
    var pos = map3D.getLabelValue(vectorPickLayer).points.split(',');
    var faceImageValueArr = map3D.getLabelValue(vectorPickLayer).imageValue.split(",");
    //拼接参数信息
    var faceWebUrlParam = faceWebUrl + "?indexCode=" + faceImageValueArr[0] + 
    "&name=" + faceImageValueArr[1]+ "&pixel=" + faceImageValueArr[2]+ 
    "&createTime=" + faceImageValueArr[3]+"&longitude=" + pos[0]+ "&latitude=" + pos[1];
    //拾取图片标注生成弹窗
    loadFaceDialog(pos,faceWebUrlParam);
    notifyState = "facePickEvent";
    faceIntegerActive();//开启弹窗响应事件
}

/**
 * 设备弹窗交互事件
 */
function faceIntegerActive(){
	//SDK获取页面里面传递出来的参数的方法
	var msg = faceWebResp.GetResponserResult().GetConfigValueByKey("Param");
	var msgs = msg.split('@#');
	//获取触发事件的状态值，若触发事件是预览事件，则执行预览方法	
	if(msgs[0] == "1"){
		//获取当前的播放的摄像头编号值
		realIndexCode = msgs[1];
		//播放弹窗视频
		previewPopVideo(1);
		//关闭页面弹窗
		cancelVideoWegdit();
	}else if(msgs[0] == "0"){
		cancelFaceDialog();
	}
}

/**
 * 设备预警弹窗交互事件
 */
function faceAlarmActive(){
	//SDK获取页面里面传递出来的参数的方法
	var msg = faceDetailResp.GetResponserResult().GetConfigValueByKey("Param");
	var msgs = msg.split('@#');
	//获取触发事件的状态值，若触发事件是预览事件，则执行预览方法	
	if(msgs[0] == "0"){
		//判断当前关闭的弹窗id
		var id = msgs[0];
		cancelFaceDetailDialog(msgs[1]);
	}
}


/**
 * 门禁拾取响应事件
 * @returns
 */
function lockPickEvent(){
	//拾取门禁开关(0开启 1关闭)
	var pickDoor = 0;
	//门禁地址
    var name = map3D.getLabelValue(vectorPickLayer).Name.split(",")[1];
    //门禁编号
    pickDoorId =  map3D.getLabelValue(vectorPickLayer).Name.split(",")[0];
    var pos = map3D.getLabelValue(vectorPickLayer).points.split(',');
    for(var i = 0 ; i < closeDoorArray.length; i++){
    	if(pickDoorId == closeDoorArray[i]){
    		pickDoor = 1;
    	}
    }
    //门禁拾取对象参数封装
    var pickParamObj = {};
    //拼接url地址传递
	var lockPickUrl = lockPickStateUrl + "?lockId=" +pickDoorId +
	"&name=" +  name + "&pickDoor=" + pickDoor;
    createLockDialog(pos,lockPickUrl);
    notifyState = "lockPickEvent";
    lockIntegerActive();
}

/**
 * 主页面处理子页面传递的参数或方法
 * @returns
 */
function lockIntegerActive(){
	//SDK获取页面里面传递出来的参数的方法
	var msg = lockWebResp.GetResponserResult().GetConfigValueByKey("Param");
	var msgs = msg.split('@#');
	//获取触发事件的状态值，若触发事件是预览事件，则执行预览方法	
	if(msgs[0] == "0"){//关闭弹窗
		closeLockDiaolog();
	}else if(msgs[0] == "1"){//响应弹窗事件
		//获取是否关闭门禁(0 关闭 1开启)
		var closeDoor = msgs[1];
		var level = null;
		//根据拾取id获取对象
		for(var i = 0; i < lockInfo.length; i++){
			if(pickDoorId == lockInfo[i].id){
				level = lockInfo[i];
			}
		}
		//根据id获取图层对象
		var mapFeature = null;
		for(var j = 0; j < lockArrayLayer.length; j++){
			if(pickDoorId == lockArrayLayer[j].id){
				mapFeature = lockArrayLayer[j];
			}
		}
		if(closeDoor == 0){//执行关闭
			updateModel(level,mapFeature,closePitch);
		}else if(closeDoor == 1){//执行开启
			updateModel(level,mapFeature,openPitch);
		}
	}
}

/**
 * 截图事件
 */
function imageEvent(){
	$("#printScreenFrame").css("display","none");
	alert("截图成功,图片保存路径为:" + imageFilePath + imageName );
	//map.RemoveResponser("SceneshotResponser"); //移除截图响应器
	//content3d.detachEvent("FireOnResponserNotify", imageEvent);
	//printScreenFlag = true;
} 

/**
 * 视频巡更监听事件(可作为模板参照)
 */
function videoPatrolEvent1(){
	var patrolAddLayer = patrolAddLayers[playVideoId];
	if(patrolAddLayer == null || patrolAddLayer == undefined){
		return;
	}
	var opt = patrolAddLayer.GetLayerResult();//获取图层结果集
	var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
	if(PositionArray == null || PositionArray == undefined){
		return;
	}
     //循环遍历关键节点信息数组
     for(var i = 0; i < PositionArray.length; i++){
     	//判断当前所经过的节点是否与关键节点相交
     	if(map3D.CalcBuffer(val,KeyPositionArray[i]) && i < PositionArray.length){
     		//在关键点求交过程中，一个关键点只匹配一次
     		for(var j = 0; j < keyPatrolReadyArr.length; j++){
     			if(KeyPositionArray[i] == keyPatrolReadyArr[j]){
     				return;
     			}
     		}
     		keyPatrolReadyArr.push(KeyPositionArray[i]);
			//若到了最后一个节点则
     		if(i >= PositionArray.length - 1){
					alert(PositionArray[i]);//获取的是最后一个点的坐标值
					alert("最后转角点"+(i));
					// 路径播放样式改变
					$("#play_" + playVideoId).css("background", "url(../img/bf.png)");
					$("#play_" + playVideoId).val(0);
					 notifyLayerState = null;//关闭当前巡更事件
					return;
				}else{
					alert(PositionArray[i]);//获取的是除最后一个点的其他坐标
					alert("转角点"+(i));
					return;
				}
			}
     }
 }

/**
 * 动态视频巡更监听事件(结合视频播放)
 */
function videoPatrolEvent(){
	var patrolAddLayer = patrolAddLayers[playVideoId];
	if(patrolAddLayer == null || patrolAddLayer == undefined){
		return;
	}
	var opt = patrolAddLayer.GetLayerResult();//获取图层结果集
	var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
	var valArr = val.split(",");
	var realVal =  map3D.coordTransformation(2,{posX:valArr[0],posY:valArr[1],posZ:valArr[2]});//坐标转换(场景坐标转经纬度坐标)
	//var realVal = valArr[0] + "," + valArr[1] + "," + videoHeight;//重置实时坐标点的高度值(因为视频监控高度值固定)
	if(PositionArray == null || PositionArray == undefined){
		return;
	}
	//遍历摄像头数组对象,将其与实时点坐标进行匹配
	for(var k = 0; k < videoPatrolArr.length; k++){
	   	 var arr = videoPatrolArr[k].split(",");
	   	 var targetPosi = arr[0] + "," + arr[1] + "," + arr[2];
	   	 var indexCode = arr[3];
	   	 var name = arr[4];
	   	 //判断实时点坐标与摄像头坐标是否符合相交条件
	   	 if(checkPosiSG(realVal,videoPatrolArr[k])){
			var realArr = [];
			videoPreviewPatrols.push(indexCode);
			var count = 0;
			//循环判断当前indexCode值是否值出现一次
			for(var i = 0; i < videoPreviewPatrols.length; i++){
				if(videoPreviewPatrols[i] == indexCode){
					count++;
				}
			}
			//若只出现一次则开始播放视频
			if(count <= 1){
				realArr.push(indexCode);
				//视频巡更播放中弹出第一个点位信息时会发生卡顿,由于访问秘钥接口时间过长(初始化秘钥接口，分页查询时刷新秘钥)
				/*var videoParam = videoPatrolPraram;
				videoParam.CamList = realArr;
				var param = 'hikvideoclient://ReqType:' + videoParam.palyType + ';' + 'VersionTag:artemis' + ';' +  ';'+'WndCount:' + 4 + ';'+'SvrIp:' + videoParam.SvrIp + ';' + 'SvrPort:' + videoParam.SvrPort + ';' + 'Appkey:' + videoParam.artemisAppKey + ';' + 'AppSecret:' + videoParam.appSecret + ';' + 'time:' + videoParam.time + ';' + 'timesecret:' + videoParam.timeSecret + ';' + 'httpsflag:' +  videoParam.httpsflag + ';' + 'CamList:' + videoParam.CamList + ';';
				document.getElementById("previewPopVideo").src = param;*/
				//window.location.href = param;
				previewAllPopVideo(9,realArr);
	 			count = 0;
	 			//当遇到监控点位时暂停前行，播放监控点视频
	 			patrolOpeart("paush_"+playVideoId);
			}
		}
	}
     //循环遍历关键节点信息数组(以下方法是为了当视频播放到关键点位时所进行的逻辑判断)
     for(var i = 0; i < PositionArray.length; i++){
     	//判断当前所经过的节点是否与关键节点相交
     	if(map3D.CalcBuffer(val,KeyPositionArray[i]) && i < PositionArray.length){
     		//在关键点求交过程中，一个关键点只匹配一次
     		for(var j = 0; j < keyPatrolReadyArr.length; j++){
     			if(KeyPositionArray[i] == keyPatrolReadyArr[j]){
     				return;
     			}
     		}
     		//若该关键点与实时点未发生交集则
     		keyPatrolReadyArr.push(KeyPositionArray[i]);
			//若到了最后一个节点则
     		if(i >= PositionArray.length - 1){
					//alert(PositionArray[i]);//获取的是最后一个点的坐标值
					//alert("最后转角点"+(i));
					// 路径播放样式改变
					$("#play_" + playVideoId).css("background", "url(../img/bf.png)");
					$("#play_" + playVideoId).val(0);
					//重置求交数组
				    keyPatrolReadyArr = [];
				    //重置视频播放数组
				    videoPreviewPatrols = [];
					notifyLayerState = null;//关闭当前巡更事件
					return;
				}else{
					return;
				}
			}
     }
 }


/**
 * 初始化调整UI位置信息
 */
function trimReady(){
	//初始化调整人脸识别列表信息(确定高度，使用下拉条)
	$(".sbjg").css("height",document.body.clientHeight - 80 - 24 + "px");
}

/**
 * 初始化创建所有图层
 */
function createAllLayer(){
	//创建图片要素图层(初始化的时候创建只创建一次)
	createVideoImageLayer();
	//创建人脸图层(初始化的时候创建只创建一次)
	createFaceImage();
	//创建所有文字标注图层(初始化的时候创建只创建一次)
	createBuildLayer();
	//初始化创建预警图层
	createAlarmGif();
	/**20180525**/
	//创建标注图片图层
	createLabelImageLayer();
	//创建文字标注图层
	createLabelTextLayer();
	/**20180525**/
}

/**
 * 初始化加载所有初始化事件(根据现场需求)
 */
function loadSGByReady(){
	//初始化加载倾斜摄影
	getOSGBList();
	showOrhiddenOSGB(1342);
	//初始化加载多进程响应事件
	startNotifyEvent();
	//初始化创建所有图层
	createAllLayer();
	//初始化加载菜博会建筑文字标识图层
	loadBuildLayer();
	//查询所有抓拍机列表(根据预警信息值反查抓拍机经纬)
	//getPosePicture(1);
	//初始化默认展开资源列表
	//showVideoListReady();
	//初始化开启拾取事件(拾取事件的开启需要建立在图层创建的前提下,勿将方法置反)
	videoPickUp();
	//初始化加载模型
	//loadModelReady();
	//初始化获取所有菜博会监控点位坐标数组
	//getVideoPosition();
	//初始加载一次运用IE缓存机制再次获取秘钥时不会发生卡顿(会延迟5-6秒时间初始化时)
	//getVideoParam();
	//初始化加载全部标注点
	getLabelList(1);
}

/**
 * 初始化控制地图图层显示(根据现场需求)
 */
function loadModelReady(){
	for(var i = 0; i < modelLevelInfo.length; i++){
		var id = modelLevelInfo[i].layerID + "#@false";//存在特殊字符#导致juqery id 选择器失效
		document.getElementById(id).click();
	}
}