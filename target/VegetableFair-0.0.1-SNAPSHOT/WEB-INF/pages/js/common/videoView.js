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
 */
function previewPopVideo(){
	 var videoParam = getVideoParam();
	 var param = 'hikvideoclient://ReqType:' + videoParam.palyType + ';' + 'VersionTag:artemis' + ';' +  ';'+'WndCount: 1'+';'+'SvrIp:' + videoParam.SvrIp + ';' + 'SvrPort:' + videoParam.SvrPort + ';' + 'Appkey:' + videoParam.artemisAppKey + ';' + 'AppSecret:' + videoParam.appSecret + ';' + 'time:' + videoParam.time + ';' + 'timesecret:' + videoParam.timeSecret + ';' + 'httpsflag:' +  videoParam.httpsflag + ';' + 'CamList:' + videoParam.CamList + ';';
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
			default:
				break;
			
			}
		}
		//页面弹窗事件
		if(str == "TipsDialogResponser"){//若皆属于事件弹窗事件但未拾取的情况下，可以自定义全局变量名称进行评定条件
			if(vectorPickLayer){
				var ename = map3D.getLabelValue(vectorPickLayer).ename;
			}
			switch(ename){
			case '1'://拾取视频图标的弹窗交互事件
				integerActive();
				break;
			case '2':
				lockIntegerActive();
				break;
			default:
				break;
			
			}
			//当弹窗不经过拾取生成自定义生成并可能存在多次触发时，
			switch(notifyState){//自定义的参数值，用于判定弹窗事件，为了便于查看，自定义名称取方法名称
			case 'startAddLabel':
				saveLabelWegdit();
				break;
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
			videoPatrolEvent();
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
			previewPopVideo();
			//播放嵌入视频
			previewImplantVideo();
			//关闭页面弹窗
			cancelVideoWegdit();
		}else if(msgs[0] == "0"){
			cancelVideoWegdit();
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
 * 视频巡更监听事件
 */
function videoPatrolEvent(){
	var patrolAddLayer = patrolAddLayers[playVideoId];
	if(patrolAddLayer == null || patrolAddLayer == undefined){
		return;
	}
	var opt = patrolAddLayer.GetLayerResult();//获取图层结果集
	var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
     //循环遍历关键节点信息数组
     for(var i = 0; i < PositionArray.length; i++){
     	//判断当前所经过的节点是否与关键节点相交
     	if(map3D.CalcBuffer(val,KeyPositionArray[i]) && i < PositionArray.length){
				//若到了最后一个节点则
     		if(i >= PositionArray.length - 1){
					alert(PositionArray[i-1]);//获取的是最后一个点的坐标值
					alert("最后转角点"+(i-1));
					// 路径播放样式改变
					$("#play_" + playVideoId).css("background", "url(../img/bf.png)");
					$("#play_" + playVideoId).val(0);
				}else{
					alert(PositionArray[i-1]);//获取的是除最后一个点的其他坐标
					alert("转角点"+(i-1));
				}
			}
     }
 }

