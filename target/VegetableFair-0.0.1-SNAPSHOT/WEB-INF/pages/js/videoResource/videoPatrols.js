/**
 * @author shine
 * 视频巡更方法集
 * @date 2018-3月-29日
 */

//输入栏是否为关键字搜索(true:是  false:否)
//var searchFlage = true;
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
//是否需要添加播放图层
//var patrolAddFlage = true;

/**
 * 查询视频巡更列表
 * @param pageNumber (分页数)
 * @returns
 */
function findPatroList(pageNumber){
	var patrolsearchName = $("#patrolInputText").val();
	$.ajax({
		url:"../mapTools/findPath.do",
		type:"post",
		data:{
			pathName : patrolsearchName,
			pageNo : pagenumber
		},
		success:function(data){
			if(data.success == 1){
				var records = data.record.records;
				var totalRecord = data.record.totalRecords;
				var totalPage = data.record.totalPage;
				var patrolList = '';
				patrolList += createPatrolList(records);
				patrolList += createPageList(pageNumber,totalPage);
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
	recordPatrolLayer = map3D.addGraphics(3,{});//0 是矩形  1是圆   2是多边形   3是线
	recordPatrolLayers[recordPatrolLayer.GetLayerID()] = recordPatrolLayer;
	recordPatrolFlage = true;
	$("#patrolInputText").val('请输入绘制的路径名称');
}


/**
 * 保存绘制的视频巡更
 * @returns
 */
function addPatrol(){
	var patrolIAddName = $("#patrolInputText").val();
	if(patrolIAddName == ''){
		alert('请填写需保持的路径名称！！！');
	}
	if(patrolIAddName.length > 20){
		alert('路径名称过长,请重新输入!');
		$("#patrolInputText").val('');
		return;
	}
	var viewPoints = map3D.getViewPoint();
	var viewPointArray = viewPoints.split(';');
	var viewModel = viewPointArray[3].split(':')[1] + "," + viewPointArray[4].split(':')[1] + "," + viewPointArray[5].split(':')[1]
	var lnglats = '';
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
				findPatroList(1);
			}else{
				alert(data.msg);
			}
		},
		error:function(e){
			
		}
	});
	$("#patrolInputText").val('');
	cleanPatrol();
}

/**
 * 删除视频巡更
 * @returns
 * @param id
 */
function deletePatrol(id){
	if(confirm("确定删除此巡更路线?")){
		$.ajax({
			url:"../mapTools/deletePath.do",
			type:"",
			data:{
				id:id
			},
			success:function(data){
				if(data.success == 1){
					findPatroList(1);
				}
			},
			error:function(e){
				
			}
		});
	}
}


/**
 * 清除当前的视频巡更
 * @returns
 */
function cleanPatrol(){
	recordPatrolFlage = false;
    map.RemoveLayer(recordPatrolLayer);
}

/**
 * 视频巡更操作
 * @returns
 */
function patrolOpeart(ids){
	var type = ids.split('_')[0];
	var id = ids.splitt('_')[1];
	switch(type){
		case "play" :
			if($("#play_"+id).val() == '0'){
				// 停止按钮样式 - 关
				$("#stop_" + id).css("background", "url(../img/tz.png)");
				$("#stop_" + id).val(0);
				// 暂停按钮样式 - 关
				$("#pause_" + id).css("background", "url(../img/zt.png)");
				$("#pause_" + id).val(0);
				// 播放按钮样式 - 开
				$("#play_" + id).css("background", "url(../img/bf1.png)");
				$("#play_" + id).val(1);
			}
			playPatrol(id);
			break;
		case "delete":
			deletePatrol(id);
			break;
		case "stop":
			if($("#stop"+id).val() == '0'){
				// 停止按钮样式 - 开
				$("#stop_" + id).css("background", "url(../img/tz1.png)");
				$("#stop_" + id).val(1);
				// 暂停按钮样式 - 关
				$("#pause_" + id).css("background", "url(../img/zt.png)");
				$("#pause_" + id).val(0);
				// 播放按钮样式 - 关
				$("#play_" + id).css("background", "url(../img/bf.png)");
				$("#play_" + id).val(0);
			}
			stopPatrol(id);
			break;
		case "paush":
			if($("#paush_"+id).val() == '0'){
				if($("#stop_"+id).val() == '1'){
					return;
				}
				// 暂停按钮样式 - 开
				$("#pause_" + id).css("background", "url(../img/zt1.png)");
				$("#pause_" + id).val(1);
				// 播放按钮样式 - 关
				$("#play_" + id).css("background", "url(../img/bf.png)");
				$("#play_" + id).val(0);
			}
			 paushPatrol(id);
			break;
		default :
			break;
	}
}

/**
 * 视频巡更列表创建
 * @returns
 */
function createPatrolList(data){
	var patrolList = '';
	if(data == null || data == undefined){
		return;
	}
	for(var i = 0; i < data.length; i++){
		var patrolLevel = data[i];
		patrolInfo[patroLevel.id] = patrolLevel;
		var id = patrolLevel.id;
		patrolList += '<div class="xianshimenu3">';
		patrolList += '<div class="jz_ssjg4">';
		patrolList += '<span class="ss_index_menu_bh1">' + (i+1) + '</span>';
		patrolList += '<span class="ljgh_bf">';
		patrolList += '<span class="ddmc">' + patrolLevel.pathName + '</span>';
		patrolList += '<span class="sdsc_sc" id = delete_' + id + ' onclick = "deletePatrol(' + id + ')";></span>';
		patrolList += '<span class="tz" value = "0" id = stop_' + id + ' oncllick = "patrolOpeart(stop_' + id + ')"; ></span>';
		patrolList += '<span class="zt" value = "0" id = paush_'+ id +' onclick = "patrolOpeart(paush_' + id+ ')";></span>';
		patrolList += '<span class="bf" value = "0" id = play_' + id + ' onclick = "patrolOpeart(play_' + id + ')";></span>';
		patrolList += '</span>';
		patrolList += '</div>';
		patrolList += '</div>';
	}
	return patrolList;
}

/**
 * 分页视频巡更列表创建
 * @returns
 */
function createPageList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageNode += '<span style="width: 25px;" onclick="findPowerPath(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick="findPatroList(' + (currPage - 1) + ')">&lt;</span>';
	}
	//中间每一页
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	var endPage = (startPage + 3 ) > totalPage ? totalPage :(startPage + 3); 
	for(var page; page <= endPage; page++){
		if(page == currPage){
			'<span style="width: 25px;" class="shuzi"><b>' + currPage + '</b></span>';
		}else{
			'<span style="width: 25px;" class="shuzi" onclick="findPatroList(' + page + ')"><b>' + page + '</b></span>';
		}
	}
	//下一页
	if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick= "findPatroList(' + (currPage + 1) + ') ">&gt;</span>';
	}
	//最后一页
	pageNode += '<span style="width: 25px;" onclick="findPowerPath(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}

/**
 * 鼠标移入输入框事件
 * @returns
 */
function patrolFouces(){
	$("#patrolInputText").val('');
}

function playPatrol(id){
	var patrolLevel = patrolInfo[id];
	var lnglats = patrolLevel.lnglats;
	var viewModelArray = patrolLevel.viewModel.split('|');
	var str = '';
	for(var i = 0 ; i < viewModelArray.length; i++){
		if(i == 0){
			str += viewModelArray[i];
		}else{
			str += "," + viewModelArray[i];
		}
	}
	if(patrolAddLayers[id] == undefined){
		var patrolAddLayer = map3D.addRoamPath(lnglats,str,patrolSpeed);// 距离、路径巡更速度
		patrolAddLayers[id] = patrolAddLayer;
		//patrolAddFlage = false;
	}
	 map3D.playRoamPath(patrolAddLayers[id]);//路径播放
	 var PositionArray = [];//存储路径播放机关键点坐标
     var KeyPositionArray = [];//关键点坐标转换成场景大坐标
     PositionArray = lnglats.split(';');
     /**  关键点转换为大场景坐标 */
     for(var i = 0 ; i < PositionArray.length - 1 ; ++i){
       var keyPoint = PositionArray[i].split(',');
       var scenPoint = map3D.coordTransformation(1,{Lon:keyPoint[0],Lat:keyPoint[1],Height:keyPoint[2]});//坐标转换
       KeyPositionArray.push(scenPoint);
     }
     videoPatrolEvent(true,id);
     
}

function stopPatrol(id){
	if(patrolAddLayers[id] != undefined){
		map3D.stopRoamPath(patrolAddLayers[id]);
	}
}

function paushPatrol(id){
	if(patrolAddLayers[id] != undefined){
		map3D.pauseRoamPath(patrolAddLayers[id]);
	}
	if(patrolAddLayers[id] != null){
		playArray[id].SetVisible(false);
	}
}

function videoPatrolEvent(flag,id){
    if (flag){
    	function VPSDKCtrl::FireOnLayerNotify(layerid, type){
    		var patrolAddLayer = patrolAddLayer[id];
    		var opt = patrolAddLayer.GetLayerResult();//获取图层结果集
    		 if((opt.GetConfigValueByKey("DataSourceTypeName") == "dynamicpath") &&(type == 2)){
 		        var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
 				/** 
 				=================================
 				业务逻辑处理 start
 				=================================
 				*/
 		        for(var i = 0; i < PositionArray.length; i+=){
 		        	if(map3D.CalcBuffer(val,KeyPositionArray[i]) && i < PositionArray.length){
 	 					if(i >= PositionArray.length - 1){
 	 						alert(PositionArray[i-1]);//获取的是最后一个点的坐标值
 	 						alert("最后转角点"+(i-1));
 	 					}else{
 	 						alert(PositionArray[i-1]);//获取的是除最后一个点的其他坐标
 	 						alert("转角点"+(i-1));
 	 					}
 	 				}
 		        }
 				/** 
 				=================================
 				业务逻辑处理 end
 				=================================
 				*/
    	}
    }
}