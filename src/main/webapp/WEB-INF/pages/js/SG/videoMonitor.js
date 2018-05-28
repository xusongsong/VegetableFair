/**
 * 寿光视频资源展示方法集
 * 
 * @author shine
 * 
 * @date 2018-03-31
 */

//备注:观看此方法时，请先以方法为切入点，先看方法数目以及其作用，连成一条线形成业务路径，再去观看代码

//视频层级对象数组(用于存储分级列表数组)
var videoKeyLevel = [];
//飞行高度(后台接口未返回高度参数值，自行定义高度值)
var videoHeight = 70;
//摄像头图片图层(初始加载的摄像头图层)
var videoImageLayer = null;
//矢量图层组(矢量图层创建时，用于全部矢量图层的拾取)
var vectorAllLayer = [];
//拾取图层
var vectorPickLayer = '';
//摄像头图片路径
var videoImageLayerUrl = "http://" + projectIP + ":" + projectPort
+"/VegetableFair/img/view1.png";
//摄像头属性信息
//var videoInfo = [];
//矢量要素图层组(图片单体化要素对象数组)
var videoArrayLayer = [];
//视频监控页面路径
var videoResourceUrl = "http://" + projectIP + ":" + projectPort
+ "/VegetableFair/mapTools/videoResourceSG.do";
//页面弹框响应器参数(生成页面弹窗时的参数值信息)
var webRespSG = null;
//当前开启的弹窗code值(用于判定当前是哪个图标拾取生成发的弹窗)
var videoDialogIndexCode = null;
//当前预览视频的indexCode
var realIndexCode = null;
//判断当前列表是否初次加载
var videoFlage = true;
//判断是否开启拾取
var pickFlage = true;
//12层建筑模型标识图片图层数组
var buildLayers = [];
//12层建筑模型标识图片图层
var buildLayer = null;
//12层建筑模型图片要素数组
var buildFeatures = [];
//12层建筑模型图片坐标数组
var buildPointArray = [{name:'1号馆',x:118.813717937,y:36.8563757715,z:63.3013083814},//一号馆
						{name:'2号馆',x:118.811010057,y:36.856398129,z:41.7567635365},//二号馆
						{name:'3-4号馆',x:118.809719986,y:36.8564169437,z:39.9116802234},//三四号馆
						{name:'5号馆',x:118.81097065,y:36.8577110929,z:33.2510929089},//五号馆
						{name:'6号馆',x:118.812893505,y:36.8576505363,z:36.4305257592},//六号馆
						{name:'7号馆',x:118.810969788,y:36.8585250163,z:34.6178127304},//七号馆
						{name:'8号馆',x:118.812853768,y:36.8585020544,z:33.5016383138},//八号馆
						{name:'9号馆',x:118.81102879,y:36.8593976796,z:33.2655241312},//九号馆
						{name:'10号馆',x:118.812875448,y:36.8593735307,z:35.3972772276},//十号馆
						{name:'11号馆',x:118.811157633,y:36.8554989052,z:33.949042608},//十一号馆
						{name:'12号馆',x:118.814617291,y:36.858863837,z:35.5813969132}];//十二号馆
var buildBackgroundUrl = "http://" + projectIP + ":" + projectPort
+"/VegetableFair/img/build1.png";
//建筑图标高程
var buildHeight = 60;
/**由于未提供查询人脸视频组织编号接口，以下为业务数据自取**/
//人脸第四层级组织编号
var faceFourCode = '37078302';
/**
 * 获取视频资源列表
 * @param param
 * @returns
 */
function getVideoList(param){
	//var videoLevel = findControlUnitPage(param);
	//var total = videoLevel.record[0].total;
	//param.size = total;
	//查询所有的组织信息
	if(videoFlage){
		var videoLevel = findControlUnitPage(param);
		//若返回的结果集不为空则
		if(videoLevel){
			//列表挂载
			var videoList = createVideoList(videoLevel);
			$("#videoList").html(videoList);
			//添加交互事件(重新自定义生成列表后需要自行重新添加)
			addVideoEvent();
		}else{
			return;
		}
		//创建图片要素图层(初始化的时候创建只创建一次)
		//createVideoImageLayer();
		//开启拾取事件(初始化时值开启一次)
		videoFlage = false;
	}
}

/**
 * 重新生成列表后添加事件(创建事件时可以去map.js拾取)
 */
function addVideoEvent(){
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
 * 分页查询所有的组织树信息
 * @param param(组织参数传递)
 * @returns
 */
function findControlUnitPage(param){
	var url = "../artemis/findControlUnitPage";
	var data = param;
	var result = {};
	$.ajax({
		url:url,
		type:"get",
		data:data,
		success:function(data){
			if(data.success == 1){
				result = data;
			}
		},
		error:function(e){
			
		}
	});
	return result;
}

/**
 * 分页查询所有的监控点位信息
 * @param param
 * @returns
 */
function findCameraInfoPage(param){
	var url = "../artemis/findCameraInfoPage";
	var data = param;
	var result = {};
	$.ajax({
		url:url,
		type:"get",
		data:data,
		success:function(data){
			if(data.success == 1){
				result = data;
			}
		},
		error:function(e){
			
		}
	});
	return result;
}

/**
 * 获取结果集列表(涉及分级挂载可以自行前端处理后端数据形成层级结构)
 * @param data
 * @returns
 */
function getLevelList(data){
	//声明6个层级数组
	var firstVideoLevel  = [];
	var secondVideoLevel = [];
	var thirdVideoLevel  = [];
	var fourVideoLevel   = [];
	var fiveVideoLevel   = [];
	var sixVideoLevel    = [];
	//判断数据是否为空(若无判断则下面会空指针异常)
	if(data.record == null || data.record == undefined){
		return;
	}
	var record = data.record;
	//赋值前5层级数组
	for(var i = 0; i < record.length; i++){
		var level = record[i];
		var unitLevel = level.unitLevel;
		switch(unitLevel){
		case "1":
			firstVideoLevel.push(level);
			break;
		case "2":
			secondVideoLevel.push(level);
			break;
		case "3":
			thirdVideoLevel.push(level);
			break;
		case "4":
			fourVideoLevel.push(level);
			break;
		case "5":
			fiveVideoLevel.push(level);
			break;
		default :
			break;
		}
	}
	//将5个层级数组存入全局大层级数组中
	videoKeyLevel[1] = firstVideoLevel;
	videoKeyLevel[2] = secondVideoLevel;
	videoKeyLevel[3] = thirdVideoLevel;
	videoKeyLevel[4] = fourVideoLevel;
	videoKeyLevel[5] = fiveVideoLevel;
	//查询第六层级数组
	var videoLevel = findCameraInfoPage({
		"start":"0",
		"size":"100000",//由于接口未提供查询所有的数据，所以自定义赋最大值，可自行修改
		"orderby":"0",
		"order":"0"
	});
	//赋值第六层级数组
	for(var j = 0; j < videoLevel.record.length; j++){
		var level = videoLevel.record[j];
		sixVideoLevel.push(level);
	}
	videoKeyLevel[6] = sixVideoLevel;
}

/**
 * 第一层级数组创建(6层级的列表创建都是一形式，但由于挂载绑定方式不一致，所以未能整合为一个方法)
 * @param data
 * @returns
 */
function createVideoList(data){
	//为全局变量层级列表赋值
	getLevelList(data);
	var videoList = '';
	//获取第一层级数组数据
	var firstVideoLevel = videoKeyLevel[1];
	if(firstVideoLevel == null || firstVideoLevel == undefined){
		return;
	}
	//循环挂载第一层级列表(有些取值可以在初始化列表时用属性值进行表示)
	for(var i = 0; i < firstVideoLevel.length; i++){
		var level = firstVideoLevel[i];
		var indexCode = level.indexCode;
		videoList += '<div class="zjd">';
		videoList += '<div>';
		videoList += '<span class="tree_xl"></span>';
		videoList += '<span class="pic"><img src="../img/tree_jd1.png"></span>';
		videoList += '<span> '+ level.name + '</span>';
		videoList += '</div>';
		videoList += '<span class="tree_xy" id="xy_'+indexCode+'" value="0" onclick="videoShowOrHideFir(\'' + indexCode + '\')" ></span>';
		videoList += '</div>';
		videoList += createVideoSecList(indexCode);
	}
	return videoList;
}

/**
 * 创建第二层级列表
 * @param parentIndexCode
 * @returns
 */
function createVideoSecList(parentIndexCode){
	//开始挂载第二层级列表
	var videoList = '<div class = "treeSearch">';
	var secondVideoLevel = videoKeyLevel[2];
	if(secondVideoLevel == null || secondVideoLevel == undefined){
		return;
	}
	//循环挂载第二层级列表
	for(var i =0; i < secondVideoLevel.length; i++){
		var level = secondVideoLevel[i];
		var indexCode = level.indexCode;
		//判断是否为该层级的子层级
		if(parentIndexCode == level.parentIndexCode){
			videoList +='<div class="zjd1" style="margin-left:15px;">';
			videoList +='<div style="width: 184px;height: 16px;float: left;">';
			videoList +='<span class="tree_xl"></span>';
			videoList +='<span class="pic"><img src="../img/tree_jd1.png"></span>';
			videoList +='<span>' + level.name + '</span>';
			videoList +='</div>';
			videoList +='<span class="tree_xy" name="' + parentIndexCode + '_video" id="xy_'+indexCode+'" value="0" onclick="videoShowOrHideSec(\'' + indexCode + '\')"></span>';
			videoList +='</div>';
			videoList += createVideoThirList(indexCode);
		}
	}
	videoList +='</div>';
	return videoList;
}

/**
 * 创建第三层级列表
 * @param parentIndexCode
 * @returns
 */
function createVideoThirList(parentIndexCode){
	//开始挂载第三层级列表
	var videoList = '<div class = "treeSearch">';
	var thirdVideoLevel = videoKeyLevel[3];
	if(thirdVideoLevel == null || thirdVideoLevel == undefined){
		return;
	}
	//循环挂载第三层级列表
	for(var i = 0; i < thirdVideoLevel.length; i++ ){
		var level = thirdVideoLevel[i];
		var indexCode = level.indexCode;
		//判断是否为该层级的子层级
		if(parentIndexCode == level.parentIndexCode){
			videoList += '<div class="zjd1" style="margin-left: 35px;width: 224px;">';
			videoList += '<div>';
			videoList += '<span class="tree_xl"></span>';
			videoList += '<span class="pic"><img src="../img/tree_jd1.png"></span>';
			videoList += '<span>' + level.name + '</span>';
			videoList += '</div>';
			videoList +='<span class="tree_xy" name="' + parentIndexCode + '_video" id="xy_'+indexCode+'" value="0" onclick="videoShowOrHideThir(\'' + indexCode + '\')"></span>';
			videoList += '</div>';
			videoList += createVideoFourList(indexCode);
		}
	}
	videoList += '</div>';
	return videoList;
}

/**
 * 创建第四层级列表
 * @param parentIndexCode
 * @returns
 */
function  createVideoFourList(parentIndexCode){
	//开始挂载第四层级列表
	var videoList = '<div class = "treeSearch">';
	var fourVideoLevel = videoKeyLevel[4];
	if(fourVideoLevel == null || fourVideoLevel == undefined){
		return;
	}
	//循环挂载第四层级列表
	for(var i = 0; i < fourVideoLevel.length; i++){
		var level = fourVideoLevel[i];
		var indexCode = level.indexCode;
		//判断是否为该层级的子层级
		if(parentIndexCode == level.parentIndexCode){
			if(indexCode == faceFourCode ){//当挂载人脸识别模块时直接跳过进行下一次循环
				continue;
			}
			videoList += '<div class="zjd1" style="margin-left: 55px;width: 204px;">';
			videoList += '<div>';
			videoList += '<span class="tree_xl"></span>';
			videoList += '<span class="pic"><img src="../img/tree_jd1.png"></span>';
			videoList += '<span>' + level.name + '</span>';
			videoList += '</div>';
			videoList +='<span class="tree_xy" name="' + parentIndexCode + '_video" id="xy_'+indexCode+'" value="0" onclick="videoShowOrHideFour(\'' + indexCode + '\')"></span>';
			videoList += '</div>';
			videoList += createVideoFiveList(indexCode);
		}
	}
	videoList += '</div>';
	return videoList;
}

/**
 * 创建第五层级列表
 * @param parentIndexCode
 * @returns
 */
function createVideoFiveList(parentIndexCode){
	//开始创建第五层级列表
	var videoList = '<div class = "treeSearch">';
	var fiveVideoLevel = videoKeyLevel[5];
	if(fiveVideoLevel == null || fiveVideoLevel == undefined){
		return;
	}
	//循环挂载第五层级列表
	for(var i = 0; i < fiveVideoLevel.length; i++){
		var level = fiveVideoLevel[i];
		var indexCode = level.indexCode;
		//判断是否为该层级的子层级
		if(parentIndexCode == level.parentIndexCode){
			videoList += '<div class="zjd1" style="margin-left: 75px;width: 184px;">';
			videoList += '<div style="width: 164px;">';
			videoList += '<span class="tree_xl"></span>';
			videoList += '<span class="pic"><img src="../img/tree_jd1.png"></span>';
			videoList += '<span class="video">' + level.name + '</span>';
			videoList += '</div>';
			videoList +='<span class="tree_xy" name="' + parentIndexCode + '_video" id="xy_'+indexCode+'" value="0" onclick="videoShowOrHideFive(\'' + indexCode + '\')"></span>';
			videoList += '</div>';
			videoList += createVideoSixList(indexCode);
		}
	}
	videoList += '</div>';
	return videoList;
}

/**
 * 创建第六层级列表
 * @param parentIndexCode
 * @returns
 */
function createVideoSixList(parentIndexCode){
	//开始挂载第六层级列表
	var videoList = '<div class = "treeSearch">';
	var sixVideoLevel = videoKeyLevel[6];
	if(sixVideoLevel == null || sixVideoLevel == undefined){
		return;
	}
	//循环挂载第六层级列表
	for(var i = 0; i < sixVideoLevel.length; i++){
		var level = sixVideoLevel[i];
		var indexCode = level.indexCode;
		//videoInfo[indexCode] = level;//可以将对象存入全局数据中，数组序号即为其id值，但由于indexCode不知后续是否会添加文字，所以暂不适用此方式
		//判断是否为该层级的子层级
		if(parentIndexCode == level.parentIndexCode){
			videoList += '<div class="zjd2">';
			videoList += '<div onclick="flySGPosition(\'' + level.longitude + '\',\'' + level.latitude + '\');">';
			videoList += '<span class="pic"><img src="../img/ss_ico.png"></span>';
			videoList += '<span class="gm">' + level.name + '</span>';
			videoList += '</div>';
			videoList +='<span class="tree_xy" name="' + parentIndexCode + '_video" id="xy_'+indexCode+'" value="0" onclick="videoShowOrHideSix(\'' + indexCode + '\')"></span>';
			videoList += '</div>';
		}
	}
	videoList +='</div>';
	return videoList;
}

/**-----------------------------------------------------------------控制图层显影方法汇总------------------------------------------------------**/

/**
 * 控制第一层及图层显影(该方法可根据实际生成结构进行适当修改)
 * @param indexCode(当前图层显影编号)
 * @returns
 */
function videoShowOrHideFir(indexCode){
	//获取当前图层的显影状态
	var isAll =  $("#xy_"+indexCode).val();
	//获取当前层级的下一层级数组对象
	var secondVideoLevel = videoKeyLevel[2];
	//判断下一层级数组对象是否为空
	if(secondVideoLevel == null || secondVideoLevel == undefined){
		return;
	}
	//循环遍历其子层级对象
	for(var i = 0; i < secondVideoLevel.length; i++){
		var level = secondVideoLevel[i];
		var childrenCode = level.indexCode;
		//获取子层级对象
		var childrenVal =  $("#xy_"+childrenCode).val();
		//判断是否为当前层级的子层级对象
		if(indexCode == level.parentIndexCode){
			if(isAll == '1'){//若父层级已显示则隐藏
				if(childrenVal == '1'){
					videoShowOrHideSec(childrenCode);
				}
				//设置父层级val值为隐藏
				$("#xy_"+indexCode).val('0');
				//切换父层级样式信息
				$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
			}else{
				if(childrenVal == '0'){//若父层级隐藏则显示
					videoShowOrHideSec(childrenCode);
				}
				$("#xy_"+indexCode).val('1');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
			}
		}
	}
}

/**
 * 控制第二图层显影
 * @param indexCode
 * @returns
 */
function videoShowOrHideSec(indexCode){
	//获取当前图层对象的显影状态
	var isAll =  $("#xy_"+indexCode).val();
	//获取当前层级图层的下一级数组对象
	var thirdVideoLevel = videoKeyLevel[3];
	//判断下一层级数组对象是否为空
	if(thirdVideoLevel == null || thirdVideoLevel == undefined){
		return;
	}
	//循环遍历下一层级数组对象
	for(var i = 0; i < thirdVideoLevel.length; i++){
		var level = thirdVideoLevel[i];
		var childrenCode = level.indexCode;
		var childrenVal =  $("#xy_"+childrenCode).val();
		//判断是否为当前层级子层级数组
		if(indexCode == level.parentIndexCode){
			if(isAll == '1'){//父层级若显示则隐藏
				if(childrenVal == '1'){//子层级若显示则隐藏
					videoShowOrHideThir(childrenCode);
				}
				$("#xy_"+indexCode).val('0');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
			}else{
				if(childrenVal == '0'){//子层级若隐藏则显示
					videoShowOrHideThir(childrenCode);
				}
				$("#xy_"+indexCode).val('1');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
			}
		}
	}
}

/**
 * 第三层级图层显影控制
 * @param indexCode
 * @returns
 */
function videoShowOrHideThir(indexCode){
	//获取当前图层显影控制val值
	var isAll =  $("#xy_"+indexCode).val();
	//获取当前图层的下一层级图层组对象
	var fourVideoLevel = videoKeyLevel[4];
	//判断下一层级数组对象是否为空
	if(fourVideoLevel == null || fourVideoLevel == undefined){
		return;
	}
	//循环子层级列表数组
	for(var i = 0; i < fourVideoLevel.length; i++){
		var level = fourVideoLevel[i];
		var childrenCode = level.indexCode;
		var childrenVal =  $("#xy_"+childrenCode).val();
		//判断是否为当前图层的子图层数组
		if(indexCode == level.parentIndexCode){
			if(isAll == '1'){//父层级显示则隐藏
				if(childrenVal == '1'){//子层级显示则隐藏
					videoShowOrHideFour(childrenCode);
				}
				$("#xy_"+indexCode).val('0');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
			}else{
				if(childrenVal == '0'){//子层级隐藏则显示
					videoShowOrHideFour(childrenCode);
				}
				$("#xy_"+indexCode).val('1');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
			}
		}
	}
}

/**
 * 第四层级图层控制显影
 * @param indexCode
 * @returns
 */
function videoShowOrHideFour(indexCode){
	//获取当前图层的显影状态
	var isAll =  $("#xy_"+indexCode).val();
	//获取当前图层组对象的下一层级图层数组
	var fiveVideoLevel = videoKeyLevel[5];
	//判断下一层级数组对象是否为空
	if(fiveVideoLevel == null || fiveVideoLevel == undefined){
		return;
	}
	//循环遍历当前图层数组的下一图层数组
	for(var i = 0; i < fiveVideoLevel.length; i++){
		var level = fiveVideoLevel[i];
		var childrenCode = level.indexCode;
		var childrenVal =  $("#xy_"+childrenCode).val();
		//判断是否为当前图层数组的子节点数组
		if(indexCode == level.parentIndexCode){
			if(isAll == '1'){//父层级若显示则隐藏
				if(childrenVal == '1'){//子层级若显示则隐藏
					videoShowOrHideFive(childrenCode);
				}
				$("#xy_"+indexCode).val('0');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
			}else{
				if(childrenVal == '0'){//子层级若隐藏则显示
					videoShowOrHideFive(childrenCode);
				}
				$("#xy_"+indexCode).val('1');//更改父层级状态值
				$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
			}
		}
	}
}

/**
 * 第五图层控制显影
 * @param indexCode
 * @returns
 */

function videoShowOrHideFive(indexCode){
	//获取当前图层数组的显影状态值
	var isAll =  $("#xy_"+indexCode).val();
	//获取当前图层组列表对象的下一层级列表
	var sixVideoLevel = videoKeyLevel[6];
	//判断下一层级数组对象是否为空
	if(sixVideoLevel == null || sixVideoLevel == undefined){
		return;
	}
	//循环遍历下一层级列表数组对象
	for(var i = 0; i < sixVideoLevel.length; i++){
		var level = sixVideoLevel[i];
		var childrenCode = level.indexCode;
		var childrenVal =  $("#xy_"+childrenCode).val();
		//判断该子层级列表对象是否为当前图层的子节点
		if(indexCode == level.parentIndexCode){
			if(isAll == '1'){//当前层级显示则隐藏
				if(childrenVal == '1'){//子层级图层显示则隐藏
					videoShowOrHideSix(childrenCode);
				}
				$("#xy_"+indexCode).val('0');//改变当前层级节点的样式
				$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
			}else{
				if(childrenVal == '0'){//子层级隐藏则显示
					videoShowOrHideSix(childrenCode);
				}
				$("#xy_"+indexCode).val('1');//改变当前图层的显影状态
				$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
			}
		}
	}
}

/**
 * 控制单图层(第六层级)显影
 * @param indexCode
 * @returns
 */
function videoShowOrHideSix(indexCode){
	//获取当前图层的显影状态值
	var state = $("#xy_"+indexCode).val();
	//获取当前层级的图层对象
	var level = getVideoInfoByCode(indexCode);
	//判断当前图层对象是否为空
	if(level == null || level == undefined){
		return;
	}
	if(state == '1'){//若显示则隐藏
		$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
		//循环遍历矢量要素图层组(图片单体化要素对象数组)
		for(var i = 0; i < videoArrayLayer.length; i++){
			var mapFeature = videoArrayLayer[i];
			//判断当前图层是否为要素图层
			if(indexCode == mapFeature.indexCode){
				deleteImageFeature(mapFeature);//删除当前要素
				videoArrayLayer.splice(i,1);//将要素移除出数组
				if(indexCode == videoDialogIndexCode ){//若当前弹框开启则
					cancelVideoWegdit();
				}
				break;
			}
		}
		//更新当前图层显影状态值
		$("#xy_"+indexCode).val('0');
	}else{//若隐藏则显示
		$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
		//创建当前图层要素对象
		createMapFeature(level);
		$("#xy_"+indexCode).val('1');
	}
	//控制父层级显影，取得每一上层级父层级indexCode编号
	childrenLinkParent(indexCode);
}

/**
 * 子层级关联父层级(子层级全选中时，父层级选中)
 * @param indexCode
 * @returns
 */
function childrenLinkParent(indexCode){
	//循环前判定该节点是否存在
	if( document.getElementById("xy_"+indexCode)){
		//获取当前图层的name值(在创建列表时已以name值表示父节点code值)
		var checkName = document.getElementById("xy_"+indexCode).name;
		if(checkName == null || checkName == undefined){//级联到父层级停止级联
			return;
		}
		var parentIndexCode = checkName.split("_video")[0];
		//获取所有同一父节点的子层级图层数组对象(以name值进行判定)
		var Doms = $('[name = "' + checkName + '"]');
		//获取所有子层级数组的长度值(用于判定当前选中值是否等于数组总长度，来判断显影)
		var sum = Doms.length;
		var selectNum = 0;
		//循环遍历所有的val值进行选中累加
		for(var i = 0; i < Doms.length; i++){
			var val = Doms.eq(i).val();
			if(val == '1'){
				selectNum++;
			}
		}
		//当前图层是否全部选中判断
		if(selectNum == 0){//若全部未选中则
			$("#xy_"+parentIndexCode).css("background","url(../img/tree_xy1.png)");
			$("#xy_"+parentIndexCode).val('0');
		}else{//若有一个选中则
			$("#xy_"+parentIndexCode).css("background","url(../img/tree_xy2.png)");
			$("#xy_"+parentIndexCode).val('1');
		}
		childrenLinkParent(parentIndexCode);
	}
}

/**
 * 模糊查询视频监控信息(根据查询结果展开所有的父层级节点)
 * 
 */
function videoSearchInfo(readyStr){
	//定义匹配字符数组
	var videoSearchArray = [];
	//初始化所有的最后一子层级颜色
	//$('.gm').css("color","#666666");
	//获取需要模糊查询的数组
	var sixVideoLevel = videoKeyLevel[6];
	//判断当前数组是否为空
	if(sixVideoLevel == null || sixVideoLevel ==undefined){
		return;
	}
	if(readyStr == null || readyStr == undefined){//如果不是初始化自行定位则模糊搜索
		//获取输入的模糊查询信息
		var keyWord = $.trim($("#videoSearch").val());
	}else{
		var keyWord = readyStr;
	}
	//若输入的模糊查询信息不为空则
	if(keyWord !=null && keyWord != ''){
		//根据模糊查询信息定义正则对象
		var reg = new RegExp(keyWord);
		//循环模糊查询数组进行模糊匹配
		for(var i = 0; i < sixVideoLevel.length; i++){
			var level = sixVideoLevel[i];
			var name = level.name;
			var indexCode = level.indexCode;
			//根据层级名称进行模糊判断
			if(name.match(reg)){//若是则存入id值
				videoSearchArray.push(indexCode);
			}
		}
	}
	//循环遍历id数组进行模糊匹配
	for(var j = 0; j < videoSearchArray.length; j++){
		var id = videoSearchArray[j];
		//根据业务效果改变当前颜色
		//$('#xy_'+id).css("color","#DD313A");
		//获取当前层级之上的所有父层级节点
		var zjdLabels = $("#xy_"+id).parents('.treeSearch').prev();
		if(zjdLabels == null || zjdLabels == undefined){
			return;
		}
		//循环所有父层级节点
		for(var k =0; k < zjdLabels.length; k++ ){
			var zjdLabel = zjdLabels.eq(k).find('div');
			if(zjdLabel.children('.tree_xl')){
				//判断所有当前层级是否已经点击，若已点击则不做操作
				if(!(zjdLabel.children('.tree_xl').hasClass('tree_xlclick'))){
					zjdLabel.click();
				}
			}
		}
	}
}



/**-----------------------------------------------图层显影控制升级版(整合了图层显影统一入口,但需要根据实际需求应用，可以自行修改)------------------------**/
/**
 * 父层级节点控制显影状态(对当前前五个层级的方法的汇总)
 * @param indexCode(当前显影层级的编号)
 * @param num(当前显影的层级)
 * @returns
 */
function videoParentShowOrHide(indexCode,num){
	//获取当前图层的显影状态
	var isAll =  $("#xy_"+indexCode).val();
	//获取当前层级的下一层级数组对象
	var childrenVideoLevel = videoKeyLevel[num+1];
	//判断下一层级数组对象是否为空
	if(childrenVideoLevel == null || childrenVideoLevel == undefined){
		return;
	}
	//循环遍历其子层级对象
	for(var i = 0; i < childrenVideoLevel.length; i++){
		var level = childrenVideoLevel[i];
		var childrenCode = level.indexCode;
		//获取子层级对象
		var childrenVal =  $("#xy_"+childrenCode).val();
		//判断是否为当前层级的子层级对象
		if(indexCode == level.parentIndexCode){
			if(isAll == '1'){//若父层级已显示则隐藏
				if(childrenVal == '1'){
					videoParentShowOrHide(childrenCode,num+1);
				}
				//设置父层级val值为隐藏
				$("#xy_"+indexCode).val('0');
				//切换父层级样式信息
				$("#xy_"+indexCode).css("background","url(../img/tree_xy1.png)");
			}else{
				if(childrenVal == '0'){//若父层级隐藏则显示
					videoParentShowOrHide(childrenCode,num+1);
				}
				$("#xy_"+indexCode).val('1');
				$("#xy_"+indexCode).css("background","url(../img/tree_xy2.png)");
			}
		}
	}
}

/**
 * 控制所有层级图层显影(六层级控制)
 * @param indexCode
 * @param num
 * @returns
 */
function videoShowOrHideAll(indexCode,num){
	//判断当前节点是否为最后一层及节点(单图层控制，方法与父节点不同)
	if(num == videoKeyLevel){//若当前为单图层节点则
		videoShowOrHideSix(indexCode);
	}else{//若当前图层为父节点则
		videoParentShowOrHide(indexCode,num);
	}
}
/**----------------------------------------------------------------------SDK工具类------------------------------------------------------**/
/**
 * 飞行定位
 * @param lon
 * @param lat
 * @returns
 */
function flySGPosition(lon,lat){
	//获取飞行定位坐标
	var height = videoHeight;
	var Azimuth = 0.273371041489176;
	var Pitch = -0.5019506333936141;
	var range = 77.73607483319054;
	var time = 3;
	// 飞行定位(需判断经纬度是都为空，若不判断，map3D会报类型不匹配)
	if(lon == '' || lat == ''){
		return;
	}
	map3D.flyPosition(lon, lat, height, Azimuth, Pitch, range, time);
}

/**
 * 创建图片图层(参照SDK方法)
 * @returns
 */
function createVideoImageLayer(){
	videoImageLayer = map3D.createImageLabelLayer({
		liftUp:"0",
		iconUrl:videoImageLayerUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	vectorAllLayer.push(videoImageLayer);//往图片要素图层组中添加所创建图层
}

/**
 * 删除图片要素(参照SDK方法)
 * @param deleteLayer
 */
function deleteImageFeature(deleteLayer){
	 if(deleteLayer.imageFeature == '' || deleteLayer.imageFeature == undefined){
		 return;
	 }
	map3D.deleteImageById({
		feature:deleteLayer.imageFeature,
		layer:deleteLayer.videoImageLayer
		}); // 删除一个图片要素
}

/**
 * 创建图片要素
 * @param level
 * @returns
 */
function loadImagLayer(level){
	//设置当前变量方便拾取时获取当前拾取对象的信息
	var videoImageValue = '';
	//将时间戳转为时间节点
	var createTime = dateTurn(level.createTime);
	//拼接待获取的参数值信息
	var videoImageValue = level.indexCode + "," + level.name + ","  + level.pixel + "," + createTime;
	//判断当前拾取的是哪个图层(适用于一个场景同时存在多拾取事件)
	var ename = '1';
	//判断当前对象的经纬度是否为空，为空则不创建要素
	if(level.longitude == '' || level.latitude == ''){
		 return;
	 }
	//创建图片要素信息(参照SDK图片要素创建)
	var imageFeature = map3D.addImageLabel({
		layer:videoImageLayer, 
		imageValue:videoImageValue,
		Lon:level.longitude,
		Lat:level.latitude,
		Height:videoHeight,
		ename:ename});
	return imageFeature;
}

/**
 * 生成摄像头属性弹窗
 * @param pos(摄像头属性弹窗的经纬度高程坐标)
 * @param videoImageUrl(弹窗路径，后台编写)
 * @param indexCode(用于赋值当前打开的是哪个弹窗)
 * @returns
 */
function loadVideoDialog(pos,videoImageUrl,indexCode){
		if (webRespSG) {//若已存在弹窗则关闭
			cancelVideoWegdit();
		}
		//当前弹窗唯一编号赋值
		videoDialogIndexCode = indexCode;
		//SDK方法调用，请查询SDK弹窗生成文档
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]);												///< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]);												///< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight",  pos[2]);											///< 指向经纬度坐标高度
		pOption.AddConfig("Widget", "366");													///< 窗口宽度
		pOption.AddConfig("Height", "140");	//150	-125									///< 窗口高度
		pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
		pOption.AddConfig("Radial", "20");													///< 圆角直径
		pOption.AddConfig("Url", videoImageUrl);					                        ///< 指向网页url
		pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
		pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
		webRespSG  = map.CreateResponser("TipsDialogResponser", pOption);					///< 创建响应器
		webRespSG.AddObserver();
		map.AddResponser(webRespSG);														///< 响应器添加至场景
}

/**
 * 关闭视频监控弹窗
 */
function cancelVideoWegdit(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	webRespSG = null;
} 

/**
 * 拾取事件开启
 */
function videoPickUp(){
	vectorPickLayer = map3D.labelPick(vectorAllLayer); // 图片拾取
	pickFlage = false;
	//开启响应器(SDK多进程事件所有响应事件统一入口)
	//FireOnResponserNotifAll();
}

/**---------------------------------------------------------------------------------------------------------------------------
/**
 * 根据当前编号获取当前编号所对应的层级对象
 * @param indexCode
 * @returns level
 */
function getVideoInfoByCode(indexCode){
	var level = {};
	//获取第六层级列表数组
	var sixVideoLevel = videoKeyLevel[6];
	//判断当前层级数组对象是否为空
	if(sixVideoLevel == null || sixVideoLevel == undefined){
		return;
	}
	//循环遍历第六层级数组对象
	for(var i = 0; i < sixVideoLevel.length; i++){
		//根据indexCode值匹配对象值
		if(sixVideoLevel[i].indexCode == indexCode){
			level = sixVideoLevel[i];
			break;
		}
	}
	return level;
}

/**
 * 初始化创建图层要素方法(图层显示方法)
 * @param level
 * @returns
 */
function createMapFeature(level){
	var mapFeature = {};
	//加载图片要素
	var imageFeature = loadImagLayer(level);
	//生成要素对象(其他属性可以自行根据需要进行添加)
	mapFeature.videoImageLayer = videoImageLayer;//要素属性
	mapFeature.imageFeature = imageFeature;//图层属性
	mapFeature.indexCode = level.indexCode;//id属性唯一标识
	//要素图层组中存入要素对象
	videoArrayLayer.push(mapFeature);
}


/**-------------------------------------------------------------------封装工具类-----------------------------------------------------------**/

/**
 * 工具类：时间戳转为时间字符创
 * @param createTime
 * @returns
 */
function dateTurn(createTime){
	var d = new Date(Number(createTime));    //根据时间戳生成的时间对象
	var date = dateJudge(d.getFullYear()) + "年" + dateJudge(d.getMonth() + 1) + "月" + dateJudge(d.getDate()) + "日" ;
			  /* dateJudge(d.getHours()) + ":" + 
	           dateJudge(d.getMinutes()) ;*/
	return date;
}

/**
 * 判断日期时间是否小于10
 * @param str
 * @returns
 */
function dateJudge(str){
	return str < 10 ? '0'+str:str;
}

/**
 * 根据秘钥获取当前暗钥信息(视频传输时接入使用)
 * @returns videoParam(封装所有视频路径所需要的属性信息)
 */
function getVideoParam(){
	var videoParam = {};
	//传输网段IP
	var SvrIp = artemisHost.split(":")[0];
	//传输网段端口
	var SvrPort = artemisHost.split(":")[1];
	//获取钥匙
	videoParam.artemisAppKey = artemisAppKey;
	//赋值对象参数相关信息
	videoParam.SvrIp = SvrIp;
	videoParam.SvrPort = SvrPort;
	//当前拾取摄像头的indexCode值
	videoParam.CamList = realIndexCode;
	videoParam.palyType = playType;
	//传输协议，默认为1(当前使用的视频流全部为1，所以未提取配置文件，后期有需要优化时，可自行提取到配置文件中)
	videoParam.httpsflag = "1";
	$.ajax({
		url:'../artemis/securityParam',
		type:'get',
		data:{
			appKey:artemisAppKey
		},
		success:function(data){
			if(data.success == 1){
				videoParam.appSecret = data.record.appSecret;
				videoParam.time = data.record.time;
				videoParam.timeSecret = data.record.timeSecret;
			}
		},
		error:function(e){
			
		}
	});
	return videoParam;
}

/**
 * 初始化默认展开资源列表
 * @returns
 */
function showVideoListReady(){
	//初始化点击展开视频资源页面
	$('.k3,.k4,.k5,.k6,.k7,.k8_1,.k9,.k10').show();
	$('.k3_1,.k4_1,.k5_1,.k6_1,.k7_1,.k8,.k9_1,.k10_1').hide();
	$(".btm_left_menu .zh_k").hide().eq(2).show();
	//获取视频监控列表
	getVideoList({
		"start":"0",
		"size":"1000",
		"orderby":"0",
		"order":"0"
	});
	//默认点击二号展厅
	videoSearchInfo("二层展厅");
}

/**-----------------------------------------------------创建菜博会文字信息----------------------------------**/
/**
 * 创建菜博会建筑文字标识(目前初始坐标为12点演示坐标，后面根据需求进行优化)
 * @returns
 */
function createBuildLayer(){
	    buildLayer = map3D.CreatePointTextEditLayerfunction({
			liftUp:"2",//接地线抬升值(配置该项接地线将是文字到点之间，否则是文字、点到地底)
			backgroundUrl:buildBackgroundUrl,//背景图片
			CharacterMode:"1",//字符大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值
			AlignmentMode:"4"//设置文字位于要素的位置
			});
		buildLayers.push(buildLayer);
}

/**
 * 根据坐标点集创建文字要素
 * @param level
 * @returns
 */
function addBuildFeature(){
	//循环遍历所有的图层坐标数组，添加图片标识
	for(var i = 0; i < buildPointArray.length; i++){
		var level = buildPointArray[i];
		var mapFeature = {};
		//创建建筑图片要素信息(参照SDK图片要素创建)
		var buildFeature = map3D.addTextLabel({
			layer:buildLayer, 
			Lon:level.x,
			Lat:level.y,
			Height:level.z + 30,
			name:level.name});
		mapFeature.buildLayer = buildLayer;
		mapFeature.buildFeature = buildFeature;
		buildFeatures.push(mapFeature);
	}
}

/**
 * 清除所有的建筑文字标识要素
 * @returns
 */
function deleteBuildFeature(){
	if(buildFeatures){
		for(var i = 0; i < buildFeatures.length; i++){
			var deleteLayer = buildFeatures[i];
			if(deleteLayer.buildFeature == null || deleteLayer.buildLayer == null 
					|| deleteLayer.buildFeature == undefined || deleteLayer.buildLayer == undefined  ){
				return;
			}
			map3D.deleteTextById({
				feature:deleteLayer.buildFeature,
				layer:deleteLayer.buildLayer
				}); // 删除一个图片要素
			//buildFeatures.splice(i,1);若单独控制显隐
		}
	}
	//图层组置空
	buildFeatures = [];
}

/**
 * 初始化加载建筑属性信息
 * @returns
 */
function loadBuildLayer(){
	//createBuildLayer();
	addBuildFeature();
}

