/**
 * @author shine
 * 
 * 视频巡更方法集
 * 
 * @date 2018-3月-29日
 */

//备注:观看此方法时，请先以方法为切入点，先看方法数目以及其作用，连成一条线形成业务路径，再去观看代码

//是否已绘制路径
var recordPatrolFlage = false;
//绘制图层组
var recordPatrolLayers = [];
//绘制图层
var recordPatrolLayer = null;
//巡更数组存储信息
var patrolInfo = [];
//巡更图层组
var patrolAddLayers = [];
//播放速度
var patrolSpeed = 15;
//提示语
var patrolTip = "请输入绘制路径名称";
//当前播放的按钮ID
var playVideoId = null;
//存储路径播放机关键点坐标
var PositionArray = [];
//关键点坐标转换成场景大坐标
var KeyPositionArray = [];
//关键点求交点过程中，一个关键点只求交一次
var keyPatrolReadyArr = [];
//视频资源监控点关键点坐标
var videoPatrolArr = [];
//视频巡更播放视频indexCode集(用于判断当前indexCode值是否播放过)
var videoPreviewPatrols = [];
//视频巡更播放时请求接口只调用一次(防止请求时间过长，影响请求效率)
var videoPatrolPraram = {};
/**
 * 查询视频巡更列表
 * @param pageNumber (分页数)
 * @returns
 */
function findPatroList(pageNumber){
	//获取输入框搜索(若为空默认为查询所有)
	var patrolsearchName = $("#patrolInputText").val();
	//重新获取请求视频参数(分页请求)
	//videoPatrolPraram = getVideoParam();
	$.ajax({
		url:"../mapTools/findPath.do",
		type:"post",
		data:{
			pathName : patrolsearchName,
			pageNo : pageNumber
		},
		success:function(data){
			if(data.success == 1){
				//获取结果集数据
				var records = data.record.records;
				var totalRecord = data.record.totalRecords;
				var totalPage = data.record.totalPage;
				//生成结果集列表
				var patrolList = '';
				patrolList += createPatrolList(records);
				patrolList += createPageList(pageNumber,totalPage);
				$('#gl_menu_ljgl').html(patrolList);
			}else{
				//若查询的结果为空则
				var totalPage = 0;
				var patrolList = '';
				patrolList += createPageList(pageNumber,0);
				$('#gl_menu_ljgl').html(patrolList);
			}
		},
		error:function(e){
			
		}
	});
}

/**
 * 绘制视频巡更路径
 * @returns
 */
function recordPatrol(){
	//若已经开启绘制则清除之前的绘制图层
	if(recordPatrolFlage){
	    map.RemoveLayer(recordPatrolLayer);
	}
	//开始绘制路径信息
	recordPatrolLayer = map3D.addGraphics(3,{});//0 是矩形  1是圆   2是多边形   3是线
	//数据列表存储绘制的图层以图层id为数组序号
	recordPatrolLayers[recordPatrolLayer.GetLayerID()] = recordPatrolLayer;
	//已绘制图层
	recordPatrolFlage = true;
	//输入框中显示输入名称提示语(由于input placeholder属性需要IE9及以上支持，所以使用value值提示)
	$("#patrolInputText").val(patrolTip);
}


/**
 * 保存绘制的视频巡更
 * @returns
 */
function addPatrol(){
	//获取输入框中的输入名称信息
	var patrolIAddName = $("#patrolInputText").val();
	//若输入框中未输入信息则
	if(patrolIAddName == '' || patrolIAddName == patrolTip){
		alert('请填写需保持的路径名称！！！');
		return;
	}
	//若输入名称过长则
	if(patrolIAddName.length > 20){
		alert('路径名称过长,请重新输入!');
		$("#patrolInputText").val('');
		return;
	}
	//获取当前绘制的巡更视角点坐标
	var viewPoints = map3D.getViewPoint();
	var viewPointArray = viewPoints.split(';');
	//取返回值的旋转角，俯仰角，视野距离
	var viewModel = viewPointArray[3].split(':')[1] + "," + viewPointArray[4].split(':')[1] + "," + viewPointArray[5].split(':')[1]
	var lnglats = '';
	//若已绘制路线则获取关键点位信息
	if(recordPatrolFlage){
		var opt = recordPatrolLayer.GetLayerResult();
        if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject"){
        	lnglats = opt.GetConfigValueByKey("Points");
        }
	}else{
		alert('请点击【绘制】按钮进行路径绘制');
		return;
	}
	if(lnglats == ''){
		alert('请点击【绘制】按钮进行路径绘制');
		return;
	}
	//通过ajax请求调用后台接口添加巡更信息
	$.ajax({
		url:'../mapTools/addPath.do',
		type:'post',
		data:{
			userId      :   "",
			pathName 	:	patrolIAddName,
			lnglats  	: 	lnglats,
			viewModel	:	viewModel
		},
		success:function(data){
			if(data.success == 1){
				alert("巡更路线添加成功！");
				$("#patrolInputText").val('');
				findPatroList(1);
			}else{
				alert(data.msg);
			}
		},
		error:function(e){
			
		}
	});
	//清除输入框内容
	$("#patrolInputText").val('');
	//清除已绘制图层
	cleanPatrol();
}

/**
 * 删除视频巡更
 * @returns
 * @param id
 */
function deletePatrol(id){
	//提示是否删除
	if(confirm("确定删除此巡更路线?")){
		$.ajax({
			url:"../mapTools/deletePath.do",
			type:"post",
			data:{
				id:id
			},
			success:function(data){
				if(data.success == 1){
					//删除成功则刷新列表
					findPatroList(1);
				}
				//注:后台删除失败未有提示(删除失败请查询接口调用是否成功)
			},
			error:function(e){
				
			}
		});
	}
}


/**
 * 清除当前的绘制图层
 * @returns
 */
function cleanPatrol(){
	//绘制图层状态设为false值
	recordPatrolFlage = false;
    map.RemoveLayer(recordPatrolLayer);
}

/**
 * 视频巡更操作(包含删除:暂停:停止:播放操作)
 * @returns
 */
function patrolOpeart(videoId){
	//获取当前点击的操作类型
	var type = videoId.split('_')[0];
	var id = videoId.split('_')[1];
	switch(type){
		case "play" :
			//点击播放停止其他所有的视频巡更(实现单路径一起播放)
			for(var i = 0; i < patrolInfo.length; i++){
				if(patrolInfo[i] !=undefined && patrolInfo[i] != null){
					//获取所有巡更列表
					var readyId = patrolInfo[i].id;
					//判断是否已开启播放若是则
					if($("#play_"+readyId).val() == '1' && readyId != id ){
						//停止当前播放的巡更
						stopPatrol(readyId);
						// 播放按钮样式 - 关
						$("#play_" + readyId).css("background", "url(../img/bf.png)");
						$("#play_" + readyId).val(0);
					}
					//判断是否已开启暂停若是则
					if($("#paush_"+readyId).val() == '1' && readyId != id ){
						//停止当前暂停的巡更
						stopPatrol(readyId);
						// 暂停按钮样式 - 关
						$("#paush_" + readyId).css("background", "url(../img/zt.png)");
						$("#paush_" + readyId).val(0);
					}
				}
			}
			//若视频巡更未播放则(val值用于判断当前巡更是否播放)
			if($("#play_"+id).val() == '0'){
				// 停止按钮样式 - 关
				$("#stop_" + id).css("background", "url(../img/tz.png)");
				$("#stop_" + id).val(0);
				// 暂停按钮样式 - 关
				$("#paush_" + id).css("background", "url(../img/zt.png)");
				$("#paush_" + id).val(0);
				// 播放按钮样式 - 开
				$("#play_" + id).css("background", "url(../img/bf1.png)");
				$("#play_" + id).val(1);
			}
			//播放当前巡更视频
			playPatrol(id);
			break;
		case "delete":
			//删除当前巡更
			deletePatrol(id);
			//删除的巡更从数组中移除
			patrolInfo.splice(id,1);
			//已添加图层移除
			patrolAddLayers.splice(id,1);
			break;
		case "stop":
			if($("#stop_"+id).val() == '0'){
				// 停止按钮样式 - 开
				$("#stop_" + id).css("background", "url(../img/tz1.png)");
				$("#stop_" + id).val(1);
				// 暂停按钮样式 - 关
				$("#paush_" + id).css("background", "url(../img/zt.png)");
				$("#paush_" + id).val(0);
				// 播放按钮样式 - 关
				$("#play_" + id).css("background", "url(../img/bf.png)");
				$("#play_" + id).val(0);
				//该定时器的设定是为了页面定时效果
				setTimeout(function(){
					// 样式停止按钮样式 - 关
					$("#stop_" + id).css("background", "url(../img/tz.png)");
			     },1000);
			}
			stopPatrol(id);
			break;
		case "paush":
			if($("#paush_"+id).val() == '0'){
				if($("#stop_"+id).val() == '1'){
					return;
				}
				// 暂停按钮样式 - 开
				$("#paush_" + id).css("background", "url(../img/zt1.png)");
				$("#paush_" + id).val(1);
				// 播放按钮样式 - 关
				$("#play_" + id).css("background", "url(../img/bf.png)");
				$("#play_" + id).val(0);
				/*setTimeout(function(){
					// // 暂停按钮样式 - 关
					$("#paush_" + id).css("background", "url(../img/zt.png)");
			     },1000);*/
			}
			 paushPatrol(id);
			break;
		default :
			break;
	}
}

/**
 * 视频巡更列表创建
 * @param data (后端获取结果集)
 * @returns patrolList(返回结果集列表)
 */
function createPatrolList(data){
	var patrolList = '';
	//判断数据是否为空，空则返回
	if(data == null || data == undefined){
		return;
	}
	//循环拼接数组结果集列表
	for(var i = 0; i < data.length; i++){
		var patrolLevel = data[i];
		patrolInfo[patrolLevel.id] = patrolLevel;
		var id = patrolLevel.id;
		patrolList += '<div class="xianshimenu3">';
		patrolList += '<div class="jz_ssjg4">';
		patrolList += '<span class="ss_index_menu_bh1">' + (i+1) + '</span>';
		patrolList += '<span class="ljgh_bf">';
		patrolList += '<span class="ddmc">' + patrolLevel.pathName + '</span>';
		patrolList += '<span class="xg_sdsc_sc" id = delete_' + id + ' onclick = "patrolOpeart(\'delete_' + id + '\')";></span>';
		patrolList += '<span class="tz" value = "0" id = stop_' + id + ' onclick = "patrolOpeart(\'stop_' + id + '\')"; ></span>';
		patrolList += '<span class="zt" value = "0" id = paush_'+ id +' onclick = "patrolOpeart(\'paush_' + id+ '\')";></span>';
		patrolList += '<span class="bf" value = "0" id = play_' + id + ' onclick = "patrolOpeart(\'play_' + id + '\')";></span>';
		patrolList += '</span>';
		patrolList += '</div>';
		patrolList += '</div>';
	}
	return patrolList;
}

/**
 * 分页视频巡更列表创建
 * @param pageNo (分页数)
 * @param totalPage (总页数)
 * @returns pageList (分页结果集列表)
 */
function createPageList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	//中间展示几页数目
	var middlePageSize = 3;
	//分页列表拼接
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageList += '<span style="width: 15px;" onclick="findPatroList(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick="findPatroList(' + (currPage - 1) + ')">&lt;</span>';
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
			pageList += '<span style="width: 25px;" class="shuzi" onclick="findPatroList(' + page + ')"><b>' + page + '</b></span>';
		}
	}
	//下一页
	if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick= "findPatroList(' + (currPage + 1) + ') ">&gt;</span>';
	}
	//最后一页
	pageList += '<span style="width: 15px;" onclick="findPatroList(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}

/**
 * 鼠标移入输入框事件(当鼠标移入输入框中清除输入框内容)
 * @returns
 */
function patrolFouces(){
	$("#patrolInputText").val('');
}

/**
 * 播放视频子事件
 * @param id (需要播放的巡更id值)
 */
function playPatrol(id){
	//获取播放巡更对象
	var patrolLevel = patrolInfo[id];
	var lnglats = patrolLevel.lnglats;
	var viewModelArray = patrolLevel.viewModel.split('|');
	var str = '';
	//拼接距离点参数坐标
	for(var i = 0 ; i < viewModelArray.length; i++){
		if(i == 0){
			str += viewModelArray[i];
		}else{
			str += "," + viewModelArray[i];
		}
	}
	//若初次播放未创建图层则
	if(patrolAddLayers[id] == undefined){
		//var patrolAddLayer=map3D.createDynamicPath({modelUrl :"",viewObject : "0.0,-0.408,50",coordStr : lnglats});
		var patrolAddLayer = map3D.addRoamPath(lnglats,str,patrolSpeed);//关键点坐标， 视角距离，路径巡更速度
		patrolAddLayers[id] = patrolAddLayer;
		layermap[patrolAddLayer.GetLayerID()] = patrolAddLayer;//填入图层更新事件总图层组
		//patrolAddFlage = false;
	}
	 map3D.playRoamPath(patrolAddLayers[id]);//路径播放
	 PositionArray = [];//存储路径播放机关键点坐标
     KeyPositionArray = [];//关键点坐标转换成场景大坐标
     PositionArray = lnglats.substr(0, lnglats.length - 1).split(';')
     /**  关键点转换为大场景坐标 */
     for(var i = 0 ; i < PositionArray.length ; ++i){
       var keyPoint = PositionArray[i].split(',');
       var scenPoint = map3D.coordTransformation(1,{Lon:keyPoint[0],Lat:keyPoint[1],Height:keyPoint[2]});//坐标转换
       KeyPositionArray.push(scenPoint);
     }
     playVideoId = id;
     //该响应事件绑定巡更过程中的触发事件
     notifyLayerState = 'playPatrol';
}

/**
 * 停止巡更
 * @param id
 */
function stopPatrol(id){
	//若已播放则
	if(patrolAddLayers[id] != undefined){
		map3D.stopRoamPath(patrolAddLayers[id]);
		 //重置求交数组
	     keyPatrolReadyArr = [];
	     //重置视频播放数组
	     videoPreviewPatrols = [];
	     notifyLayerState = null;
	}
}

/**
 * 暂停巡更
 * @param id
 */
function paushPatrol(id){
	//若已添加图层则
	if(patrolAddLayers[id] != undefined){
		map3D.pauseRoamPath(patrolAddLayers[id]);
	}
	//若已添加图层则
	if(patrolAddLayers[id] != null){
		//设置当前巡更图层隐藏
		patrolAddLayers[id].SetVisible(false);
	}
	 notifyLayerState = null;
}

/**
 * 获取所有视频监控关键点坐标
 * @returns
 */
function getVideoPosition(){
	//单取菜博会监控点编号(单选匹配菜博会摄像头)
	var vegetableIndexCode = "37078330002160274659";
	var sixVideoLevel = videoKeyLevel[6];//获取第六层级坐标点坐标
	for(var i = 0; i < sixVideoLevel.length; i++){
		var str = '';
		//若不存在经纬度坐标则进行下一个数值循环
		if(sixVideoLevel[i].longitude == null || sixVideoLevel[i].longitude == '' 
			|| sixVideoLevel[i].latitude == null || sixVideoLevel[i].latitude == ''){
			continue;
		}
		//筛选菜博会摄像头:注释则显示全部
		if(sixVideoLevel[i].parentIndexCode == vegetableIndexCode ){
			str += sixVideoLevel[i].longitude + "," + sixVideoLevel[i].latitude + "," + videoHeight + "," + sixVideoLevel[i].indexCode + "," + sixVideoLevel[i].name;
			videoPatrolArr.push(str);
		}
	}
}

/**
 * 检验实时点与平面点是否相交(因实时监控点缺乏高度，所以现锁定为俩个坐标的差乘积)
 */
function checkPosiSG(currentPosi,targetPosi){
	//调整范围距离
    var buffer = 30;
    var mPos = currentPosi.split(',');
    var positions = targetPosi.split(',');
    //将经纬度坐标转化为场景坐标
    var mPosScreen = map3D.coordTransformation(1,{Lon:mPos[0],Lat:mPos[1],Height:mPos[2]});
    var positionsScreen = map3D.coordTransformation(1,{Lon:positions[0],Lat:positions[1],Height:positions[2]});
    //因摄像头坐标固定均为70，所以隐藏Z坐标比值关系(自定义为0)
    var dis = (mPosScreen.split(',')[0] * 1 - positionsScreen.split(',')[0] * 1) * (mPosScreen.split(',')[0] * 1 - positionsScreen.split(',')[0] * 1)
    + (mPosScreen.split(',')[1] * 1 - positionsScreen.split(',')[1]) * (mPosScreen.split(',')[1] * 1 - positionsScreen.split(',')[1]);
    //console.log(dis);
    if(dis < buffer * buffer){
        return true;
    }
    return false;
}